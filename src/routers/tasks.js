const express = require('express'); // !importing Express web server framework
const Task = require('../models/task'); // !importing Task model
const auth = require('../middleware/auth'); // !importing auth middleware

const TaskRouter = express.Router(); // creating a router object

TaskRouter.post('/tasks', auth, async (req, res) => {
  //const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }

  // task
  //    .save()
  //    .then(() => {
  //       res.status(201).send(task);
  //    })
  //    .catch((error) => {
  //       res.status(400).send(error);
  //    });
});

TaskRouter.get('/tasks', auth, async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.find({
      id,
      owner: req.user._id,
    });
    //await req.user.populate('tasks').execPopulate();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
  // Task.find({})
  //    .then((task) => {
  //       res.send(task);
  //    })
  //    .catch((err) => {
  //       console.log(err);
  //       res.status(500).send();
  //    });
});

TaskRouter.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    //const task = await Task.findById(id);
    const task = await Task.findOne({
      id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
  // Task.findById(id)
  //    .then((task) => {
  //       if (!task) {
  //          res.status(404).send();
  //       }

  //       res.send(task);
  //    })
  //    .catch((e) => {
  //       res.status(500).send();
  //    });
});

TaskRouter.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const task = await Task.findOne({
      id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

TaskRouter.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = TaskRouter;
