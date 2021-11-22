require("../src/db/mongoose");
const User = require("../src/models/user");

//618d1118eb7945ae12165fa7
// User.findByIdAndUpdate("618d110ceb7945ae12165fa5", {
//    age: 1,
// })
//    .then((user) => {
//       console.log(user);
//       return User.countDocuments({ age: 1 });
//    })
//    .then((userWithAge1) => {
//       console.log(userWithAge1);
//    })
//    .catch((err) => {
//       console.log(e);
//    });

const FindUserAndUpdate = async (id, age) => {
   const user = await User.findByIdAndUpdate(id, {
      age,
   });
   const userCount = await User.countDocuments({ age });

   return userCount;
};

FindUserAndUpdate("618bf1476525e3ec9c398dc4", 100)
   .then((count) => {
      console.log(count);
   })
   .catch((e) => {
      console.log(e);
   });
