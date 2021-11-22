const express = require('express');

const User = require('../models/user');
const auth = require('../middleware/auth');

const UserRouter = new express.Router();
// router.get('/test', (req, res) => {
//   res.send('This is from my other router')
// })

UserRouter.post('/users', async ({ body }, res) => {
  //console.log(req.body);
  //const user = new User(req.body);
  const user = new User(body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user });
  } catch (err) {
    res.status(400).send(err);
  }
  // user
  //    .save()
  //    .then(() => {
  //       res.status(201).send(user);
  //    })
  //    .catch((e) => {
  //       res.status(400).send(e);
  //    });
});

UserRouter.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    res.send({
      user: user,
      token,
    });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});

UserRouter.get('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

UserRouter.post('/users/logoutAll', auth, async (request, response) => {
  try {
    //setting the tokens to an empty array
    // request.user.tokens = [];
    // await request.user.save();
    // response.send(200);
    console.log('E');
  } catch (e) {
    response.status(500).send(e);
  }
});
// UserRouter.get('/users', auth, async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }

//   // User.find({})
//   //    .then((users) => {
//   //       res.send(users);
//   //    })
//   //    .catch((err) => {
//   //       res.status(500).send();
//   //    });
// });

UserRouter.get('/users/me', auth, async (req, res) => {
  res.send(req.user);
});

// UserRouter.get('/users/:id', async ({ params }, res) => {
//   //const ID = req.params.id

//   try {
//     const user = await User.findById(params.id);

//     if (!user) {
//       return res.status(404).send();
//     }
//     res.send(user);
//   } catch (e) {
//     res.status(500).send();
//   }

// User.findById(ID)
//    .then((user) => {
//       if (!user) {
//          res.status(404).send();
//          return;
//       }
//       res.send(user);
//    })
//    .catch((e) => {
//       res.status(500).send();
//    });
//});

////////////////////////////////////////
//      DELETING A USER USING ID
////////////////////////////////////////
UserRouter.delete('/users/me', async (req, res) => {
  //const ID = req.params.id
  try {
    // const user = await User.findByIdAndDelete(req.user._id);

    // if (!user) {
    //   return res.status(404).send();
    // }
    await req.user.remove();
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

//its designed to update a resource ot 'patch' it
UserRouter.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const user = await User.findById(req.user._id);

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    // if (!user) {
    //   return res.status(404).send();
    // }

    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = UserRouter;
