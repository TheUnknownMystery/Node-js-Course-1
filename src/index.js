const express = require('express');
require('./db/mongoose');

//importing routes from routes folder
const UserRouter = require('./routers/users');
const TaskRouter = require('./routers/tasks');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   //the next function is used to move to the next middleware
//   //console.log(req.method, req.path);
//   //req.method get the type like GET, POST, PUT, DELETE
//   /*
//   we need to call next to move
//   to the next middleware
//   or the request will be stuck
//   */

//   if (req.method === 'GET') {
//     res.send('GET requests are disabled');
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send('Site is under maintenance');
// });

//this is going to parse incoming json object
app.use(express.json());

// const router = new express.Router()

// app.get('/test', async (req, res) => {
//   res.send('This is from my other router')
// })

// //regitering my router
// app.use(router)
app.use(UserRouter);
app.use(TaskRouter);
//listening to the port 3000
app.listen(port, () => {
  console.log(`running on port ${port}🌬️🌬️`);
});

//bcrypt is a hashing algorithm
//https://www.npmjs.com/package/bcrypt

//const bycrypt = require('bcrypt');

//hey what are rounds?
//rounds is the number of times the hash function is run
//the higher the number, the more time it takes to hash the password
//the lower the number, the more time it takes to hash the password

// const myFunction = async () => {
//   //normal password
//   const password = 'redcooljuice'
//   //password and number of rounds
//   const hashedPassword = await bycrypt.hash(password, 8)

//   console.log(password)
//   console.log(hashedPassword)

//   //comparing password and hashed password
//   //if the password is correct, it will return true
//   //if the password is incorrect, it will return false
//   const isMatch = await bycrypt.compare(password, hashedPassword)
//   console.log(isMatch)
// }
// myFunction()

// const jwt = require('jsonwebtoken');

// const myFunction = async () => {
//   const token = jwt.sign({ _id: 'abc2' }, 'Thisismynewcourse', {
//     expiresIn: '7 days',
//   });
//   console.log(token);

//   const data = jwt.verify(token, 'Thisismynewcourse');
//   console.log(data);
// };
// myFunction();
