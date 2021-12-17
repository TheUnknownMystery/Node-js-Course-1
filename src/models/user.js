const mongoose = require('mongoose');
const validator = require('validator');
const Task = require('../models/task');

const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secret_key = require('../../auth/secret_key');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a postive number');
      }
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner',
});

//creating up a custom function made by us
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Unable to login');
  }
  const isMatch = await bycrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Unable to login');
  }
  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  //the modified function is used to check if the password has been modified
  //if it has been modified, then it will be hashed
  //if it has not been modified, then it will not be hashed

  //hash the password before saving the user
  if (user.isModified('password')) {
    user.password = await bycrypt.hash(user.password, 8);
  }
  //the next function is used to move to the next middleware
  //if there is no next middleware, it will go to the next function
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  await Task.deleteMany({ owner: user._id });
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, secret_key, {
    expiresIn: '7 days',
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};
const User = mongoose.model('User', userSchema);

module.exports = User;
