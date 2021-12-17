const mongoose = require('mongoose');

const Task = mongoose.model('Tasks', {
  description: {
    type: String,
    required: true,
    trim: true,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  owner: {
    //telling mongoDB that this is a object id
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    //reference to User model
    ref: 'User',
  },
});

module.exports = Task;
