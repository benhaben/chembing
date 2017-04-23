( function() {
var mongoose = require('mongoose'), db, async = require('async');
mongoose.connect('mongodb://127.0.0.1/test');
db = mongoose.connection;   
db.once('open', function callback() {
    var collection = require('../src/db').Category;
    async.parallel([
    function(callback) {
        collection.find({
            categoryType : 1
        }).sort({
            categoryName : 1
        }).exec(callback);
    },
    function(callback) {
        collection.find({
            category : 2
        }).sort({
            categoryName : 1
        }).exec(callback);
    }], function(err, result) {
        if (err)
            throw err;
        console.log('a');
        console.log(result);
        console.log('b');
    });
});
}());