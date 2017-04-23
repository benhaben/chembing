debugger;

require("../log");
var XLSX = require('xlsx');
var path = require("path");
var filePath = path.join(__dirname + '/testFiles/roles.xlsx');
var workbook = XLSX.readFile(filePath);
var mongodb = require('mongodb');
var config = require("../config");
require("../log");
var server = new mongodb.Server(config.host, config.port, {
  auto_reconnect: true
});
var db = new mongodb.Db(config.db, server, {
  safe: true
});

var crypto = require('crypto');

encryptPassword = function(password) {
  return crypto.createHash("md5").update(password).digest("base64");
};


db.open(function(err, db) {
  if (!err) {

    db.collection('roles', function(err, collection) {
      if (err) {
        console.log(err);
      } else {
        workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);

          if (roa.length > 0) {

              roa.forEach(function(row){

                  row.password = encryptPassword(row.password.toString());
                  testLogger.info(row.password);

              });

              collection.insert(roa, {
              safe: true
            }, function(err, result) {
              console.log(result);
            });
          }
        });

      }
    });
  } else {
    console.log(err);
  }
});
//var mongojs = require("mongojs");
//mongojs.create();
//// an example using an object instead of an array
//async.series({
//        one: db.open(callback){
//            setTimeout(function(){
//                callback(null, 1);
//            }, 200);
//        },
//        two: function(callback){
//            setTimeout(function(){
//                callback(null, 2);
//            }, 100);
//        }
//    },
//    function(err, results) {
//        // results is now equal to: {one: 1, two: 2}
//    });
// async.waterfall([
//   function(callback){
//    callback(null， ‘one’， ‘two’);
//   }，
//   function(arg1， arg2， callback){
//    callback(null， ‘three’);
//   }，
//   function(arg1， callback){
//  // arg1 now equals ‘three’
//  callback(null， ‘done’);
//  }
//  ]， function (err， result) {
//  // result now equals ‘done’ 
// });