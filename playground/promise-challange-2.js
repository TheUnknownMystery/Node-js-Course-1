require("../src/db/mongoose");
const Task = require("../src/models/task");

const id = "618f83fcffa84b1bfae463c1";
// Task.findByIdAndDelete(id, {})
//    .then((deletedTask) => {
//       console.log(deletedTask);
//       return Task.countDocuments({ completed: false });
//    })
//    .then((count) => {
//       console.log(count);
//    })
//    .catch((e) => {
//       console.error(e);
//    });

const DeleteTaskAndCount = async (id) => {
   const task = await Task.findByIdAndDelete(id);
   const task_count = await Task.countDocuments({ completed: false });

   return task_count;
};

DeleteTaskAndCount(id)
   .then((doc_count) => {
      console.log(doc_count);
   })
   .catch((err) => {
      console.log(err);
   });
