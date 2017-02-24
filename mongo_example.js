// "use strict";

// const MongoClient = require("mongodb").MongoClient;

// const MONGODB_URI = "mongodb://localhost:27017/tweeter";
// MongoClient.connect(MONGODB_URI, (err, db) => {
//   if (err) {
//     console.error(`Failed to connect: ${MONGODB_URI}`);
//     throw err;
//   }

//   // We have a connection to the "tweeter" db, starting here.
//   console.log(`Connected to mongodb: ${MONGODB_URI}`);


// // db.collection("tweets").find({}, (err, results) => {
// //     if (err) throw err;

// //     // ==> So we Read The Fantastic Manual, right?

// //     // ==> We can iterate on the cursor to get results, one at a time:
// //     console.log("for each item yielded by the cursor:");
    
// //     // results.each((err, item) => console.log("  ", item));
// //     results.toArray((err, resultsArray) => {
// //       if (err) throw err;

// //       console.log("results.toArray:", resultsArray);
// //     });
//     // This is the end...
// //     db.close();
// // });
//     db.collection("tweets").find().toArray((err, results) => {
//     if (err) throw err;

//     console.log("results array: ", results);

//     // This is the end...
//     db.close();
//   });

//   // // ==> Let's "get all the tweets". In Mongo-speak, we "find" them.
//   // db.collection("tweets").find({}, (err, result) => {
//   //   // Lazy error handling:
//   //   if (err) throw err;

//   //   // ==> Fair warning: This is going to log a lot of stuff...
//   //   console.log("find result: ", result);
//   //   console.log("type of find result: ", typeof result);

//   //   // ==> This is inside this callback now. Think about it:
//   //   // This is now the "end of the program", right?.
//   //   db.close();
//   // });

// });

"use strict";

const MongoClient = require("mongodb").MongoClient;

//const {MongoClient} = require("mongodb");



MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  // function getTweets(callback) {
  //   db.collection("tweets").find().toArray((err, tweets) => {
  //     if (err) {
  //       return callback(err);
  //     }
  //     callback(null, tweets);
  //   });
  // }

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });

});