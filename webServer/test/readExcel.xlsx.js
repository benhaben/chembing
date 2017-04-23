var XLSX = require('xlsx');
require("../log");
var path = require("path");
var filePath = path.join(__dirname + '/testFiles/比价数据.xlsx');
var workbook = XLSX.readFile(filePath);
// var sheet_name_list = xlsx.SheetNames;

// var obj = to_json(xlsx);
// testLogger.info(obj);
var mongodb = require('mongodb');
var server = new mongodb.Server('localhost', 27017, {
  auto_reconnect: true
});
var config = require("../config")
var db = new mongodb.Db(config.db, server, {
  safe: true
});
db.open(function(err, db) {
  if (!err) {

    db.collection('documents', function(err, collection) {
      if (err) {
        console.log(err);
      } else {
        workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          if (roa.length > 0) {
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