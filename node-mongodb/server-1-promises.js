
const Promise = require('bluebird');

var MongoClient = Promise.promisifyAll(require('mongodb').MongoClient),
    assert = require('assert');

var dboper = require('./operations');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
var DB;

// Use connect method to connect to the Server

MongoClient.connectAsync(url)
    .then(function (db) {
        //assert.equal(null, err);
        console.log("Connected correctly to server");
        DB = db;
        return dboper.insertDocument(db, {name: "Vadonut1", description: "Test"}, "dishes")
    }).then(function (result) {
        console.log(result.ops);
        console.log("Bla bla");

        return dboper.findDocuments(DB, "dishes");
    }).then(function(docs) {
        console.log(docs);
        return dboper.updateDocument(DB, { name: "Vadonut1" }, { description: "Updated Test" }, "dishes");
    }).then(function(result) {
        //console.log(result);
        return dboper.findDocuments(DB, "dishes");
    })
    .then(function(docs) {
        console.log(docs);

        DB.dropCollection("dishes", function (result) {
                                 console.log(result);
                                 DB.close();
        });

    })
    .catch(function (error) {
        console.log(error);
    });

// MongoClient.connect(url, function (err, db) {
//     assert.equal(null, err);
//     console.log("Connected correctly to server");
//
//     dboper.insertDocument(db, { name: "Vadonut", description: "Test" },
//         "dishes", function (result) {
//             console.log(result.ops);
//
//             dboper.findDocuments(db, "dishes", function (docs) {
//                 console.log(docs);
//
//                 dboper.updateDocument(db, { name: "Vadonut" },
//                     { description: "Updated Test" },
//                     "dishes", function (result) {
//                         console.log(result.result);
//
//                         dboper.findDocuments(db, "dishes", function (docs) {
//                             console.log(docs)
//
//                             db.dropCollection("dishes", function (result) {
//                                 console.log(result);
//
//                                 db.close();
//                             });
//                         });
//                     });
//             });
//         });
// });
