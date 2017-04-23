require('../log')
var config = require('../config');
//var mongodb = require('mongodb');
//options = {};
//options.logger = {};
//options.safe = true;
//options.logger.doDebug = true;
//options.logger.debug = function (message, object) {
//    // print the mongo command:
//    // "writing command to mongodb"
//    logger.info(message);
//
//    // print the collection name
//    logger.info(object.json.collectionName)
//
//    // print the json query sent to MongoDB
//    logger.info(object.json.query)
//
//    // print the binary object
//    logger.info(object.binary)
//}
//
//var server = new mongodb.Server(config.host, config.port, {
//   auto_reconnect: true
//});
//
//
//db = new mongodb.Db(config.db, server, options);
//db.open(function(err, db) {
//    if (err) {
//        logger.info(err)
//    };
//});


var util = require('util');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
//
//var auth = {
//    user: 'username',
//    pass: 'password',
//    host: 'hostname',
//    port: 1337,
//    name: 'databaseName'
//};
//
//var uri = util.format('mongodb://%s:%s@%s:%d/%s',
//    auth.user, auth.pass, auth.host, auth.port, auth.name);

/** Connect to the Mongo database at the URI using the client */
//client.connect(config.connectionstring, { auto_reconnect: true }, function (err, db) {
//    if (err) throw err;
//    else if (!db) console.log('Unknown error connecting to database');
//    else {
//
//        console.log('Connected to MongoDB database server at:');
//        console.log('\n\t%s\n', uri);
//
//        // Create or access collections, etc here using the database object
//        exports.db = db;
//    }
//});
