const mongoose = require("mongoose");
const validator = require("validator");

const connection_url = "mongodb://127.0.0.1:27017/";
const databasename = "task-manager";
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
//    useNewUrlParser: true,
// });

mongoose.connect(`${connection_url + databasename}`, {
   useNewUrlParser: true,
});

// const Task = mongoose.model('tasks', {
//    description: {
//       type: String,
//       trim: true,
//       required: true,
//    },

//    completed: {
//       type: Boolean,
//       default: false,
//    },
// });

// const userTask = new Task({
//    description: `  Eath Lunch  `,
// })
//    .save()
//    .then((res) => {
//       console.log(res);
//    })
//    .catch((err) => {
//       console.log(err);
//    });

// const User = mongoose.model('users', {
//    name: {
//       type: String,
//       required: true,
//       trim: true,
//    },
//    email: {
//       type: String,
//       required: true,
//       trim: true,
//       lowercase: true,

//       validate(value) {
//          if (!validator.isEmail(value)) {
//             throw new Error('invalid email');
//          }
//       },
//    },
//    age: {
//       type: Number,
//       default: 0,
//       validate(val) {
//          if (val < 0) {
//             throw new Error('Age must not be negative');
//          }
//       },
//    },

//    password: {
//       type: String,
//       required: true,
//       trim: true,

//       validate(val) {
//          if (val.length < 6) {
//             throw new Error('please enter more charecters');
//          } else if (val.toLowerCase().includes('password')) {
//             throw new Error('cannot use word "password" in the password');
//          }
//       },
//    },
// });

//validating data using the use function
// const user = new User({
//    name: 'nile',
//    email: 'BNILE@GMAIL.com',
//    password: 'Hello2222password',
// });

// user
//    .save()
//    .then((user) => {
//       console.log('working!');
//       console.log(user);
//    })
//    .catch((err) => {
//       console.log(err);
//    });
