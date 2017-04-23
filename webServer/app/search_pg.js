var pg = require('pg');
require("../log");
var conString = require('../config').connectionStringPG;

var Cursor = require('pg-cursor')

pg.connect(conString, function(err, client, done) {

    //imagine some_table has 30,000,000 results where prop > 100
    //lets create a query cursor to efficiently deal with the huge result set

    var cursor = client.query(new Cursor('SELECT * FROM bingo."MolTable";'));

    //read the first 100 rows from this cursor
    cursor.read(100, function(err, rows) {
        if(err) {
            //cursor error - release the client
            //normally you'd do app-specific error handling here
            return done(err)
        }

        //when the cursor is exhausted and all rows have been returned
        //all future calls to `cursor#read` will return an empty row array
        //so if we received no rows, release the client and be done
        if(!rows.length) return done()

        //do something with your rows
        //when you're ready, read another chunk from
        //your result

        logger.info("rows " + rows.toArray());

    })
});