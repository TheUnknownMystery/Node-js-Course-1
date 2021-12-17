// const mongodb = require('mongodb');

/*The MongoClient Will Help us to connect to
the database to perfoarm 4 basic crud
oparation create,read,update,delete*/

// const MongoClient = mongodb.MongoClient;
// const objectID = mongodb.ObjectId;

const { MongoClient, ObjectId } = require('mongodb');

/*
The Object Id function is a constructor
function which will return us a special
set of numbers and alphabets like this ax3r93m3f0
this id is made up of the the current time
with a random generated digit and another random 
generated digit. So we can extract the time 
when the object was 
created in using the object id
since the object id is made up of a combination
of the time when the object was 
created and some randomley
generated numbers

ObjectId
Description
ObjectId(<hexadecimal>)
Returns a new ObjectId value. The 12-byte ObjectId value consists of:

a 4-byte timestamp value, representing the ObjectId's creation, measured in seconds since the Unix epoch
a 5-byte random value generated once per process. This random value is unique to the machine and process.
a 3-byte incrementing counter, initialized to a random value
While the BSON format itself is little-endian, the timestamp and counter values are big-endian, with the most significant bytes appearing first in the byte sequence.

ObjectId() can accept the following parameter:

LINK = https://docs.mongodb.com/manual/reference/method/ObjectId/
*/
//creates an object id
// const object_id = new ObjectId();

//getting the binary value
// console.log(object_id.id);
//converting the object id to string
// console.log(object_id.toHexString().length);
//getting the timestamp using the object id
//as the object is made up of a timestamp
//when the object was created
//The Time stamp is the timestamp is of when a object is created
// console.log(object_id.getTimestamp());
//to connect out app we need a connection url
const connectionUrl = 'mongodb://127.0.0.1:27017';
const database_name = 'task-manager';

/*Mongo Client Will Help us to connect to 
The server*/

/*The Url parser that was used by default is 
depricated and now is need to be added 
manually using MongoClient*/

/*Call back is going to be called when
we are connected to the database its asynchronus*/

/*We we have the client object then we are connected to the database */
MongoClient.connect(
   connectionUrl,
   {
      useNewUrlParser: true,
   },
   (err, client) => {
      if (err) {
         console.log('unable to connect');
         return;
      }
      console.log('connected correctly! 🐦🐦🐦');

      //reference to the database
      //no need to create this manually
      //we can do this using code...
      const db = client.db(database_name);

      //INSERT OPERATION
      //inserting a single document in a users collection

      // db.collection('users').insertOne(
      //    {
      //       _id: object_id,
      //       name: 'Vikram',
      //       age: 14,
      //    },
      //    (error, result) => {
      //       if (error) {
      //          return console.log('data not added!');
      //       }
      //       //array of documents
      //       console.log(result);
      //    }
      // );
      //inserting more than one collection at the same time
      // db.collection('users').insertMany(
      //    [
      //       {
      //          name: 'Jen',
      //          age: 28,
      //       },
      //       {
      //          name: 'Gunthur',
      //          age: 27,
      //       },
      //    ],
      //    (error, results) => {
      //       if (error) {
      //          return console.log('Error failed to add document');
      //       }
      //       console.log(results.acknowledged);
      //    }
      // );
      // db.collection('tasks').insertMany(
      //    [
      //       {
      //          task_name: 'sleep',
      //          task_description: 'sleep the dog',
      //          isCompleted: true,
      //       },
      //       {
      //          task_name: 'wake',
      //          task_description: 'wake up dog',
      //          isCompleted: true,
      //       },
      //    ],
      //    (err, result) => {
      //       if (err) {
      //          return console.log('Hey! you have an error');
      //       }
      //       console.log(result.acknowledged);
      //    }
      // );
      // db.collection('users').findOne(
      //    {
      //       //this will not work as this is not binary but a string
      //       //_id: '618a42e4fa2a4f2fb1d1183a',

      //       //converting this into binary which is accepted by mongodb
      //       _id: new ObjectId('618a42e4fa2a4f2fb1d1183a'),
      //    },
      //    (err, user) => {
      //       if (err) {
      //          return console.log('error unable to fetch user');
      //       }
      //       if (user === null) {
      //          return console.log('user not found');
      //       }
      //       console.log(user);
      //    }
      // );
      //----Getting The user documents with filters----\\
      //since we do not have callback here
      //we will convert this response to
      //an array
      // db.collection('users')
      //    .find({
      //       age: 14,
      //    })
      //    .toArray((err, users) => {
      //       if (err) {
      //          return err;
      //       }
      //       console.log(users);
      //    });

      //we can also get the number
      //of documents with age 14 or other properties
      //with count function
      // db.collection('users')
      //    .find({
      //       age: 14,
      //    })
      //    .count((err, res) => {
      //       console.log(count);
      //    });

      // db.collection('tasks').findOne(
      //    {
      //       _id: new ObjectId('618a63985ca619ad55a7637c'),
      //    },
      //    (err, res) => {
      //       if (err) {
      //          return console.log(err);
      //       }
      //       console.log(res);
      //    }
      // );

      //can use callback because the find
      //method returns cursor/pointer
      // db.collection('tasks')
      //    .find({
      //       isCompleted: false,
      //    })
      //    .toArray((error, res) => {
      //       if (error) {
      //          console.log(error);
      //          return;
      //       }
      //       console.log(res);
      //    });

      // db.collection('users')
      //    .updateOne(
      //       {
      //          _id: new ObjectId('618a42e4fa2a4f2fb1d1183a'),
      //       },
      //       {
      //          // $set: {
      //          //    name: 'Mike',
      //          // },

      //          $inc: {
      //             age: 1,
      //          },
      //       }
      //    )
      //    .then((res) => {
      //       console.log(res);
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //    });

      // db.collection('tasks')
      //    .updateMany(
      //       {
      //          isCompleted: false,
      //       },
      //       {
      //          $set: {
      //             isCompleted: true,
      //          },
      //       }
      //    )
      //    .then((res) => {
      //       console.log(res.modifiedCount);
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //    });

      // db.collection('users')
      //    .deleteMany({
      //       age: 28,
      //    })
      //    .then((res) => {
      //       console.log(res);
      //    })
      //    .catch((err) => {
      //       console.log(err);
      //    });

      const taskRef = db.collection('tasks');

      taskRef
         .deleteOne({
            task_description: 'sleep the dog',
         })
         .then((res) => {
            console.log(res);
         })
         .catch((err) => {
            console.log(err);
         });
   }
);
