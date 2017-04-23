require("../log");
var XLSX = require('xlsx');
var path = require("path");
var filePath = path.join(__dirname + '/testFiles/docs.xlsx');
var workbook = XLSX.readFile(filePath);
var mongodb = require('mongodb');
var config = require("../config");
var server = new mongodb.Server(config.host, config.port, {
  auto_reconnect: true
});
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
          roa.forEach(function(item) {
            logger.info(item);
          });
          if (roa.length > 0) {
            collection.insert(roa, {
              safe: true
            }, function(err, result) {
              if (err) {
                logger.error(result);
              }
            });
          }
        });

      }
    });

    db.ensureIndex('documents', {
      CAS: 1,
      cn_name: 1,
      en_name: 1
    }, {}, function(err, indexName) {});
  } else {
    console.log(err);
  }
});