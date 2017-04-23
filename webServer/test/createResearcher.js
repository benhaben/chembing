util = require('../models/mapping/utilits');
var dbName = "test";
require("./../log");
var config = require('./../config');
var schemaDoc = require("./document").schemaDoc;

var mongoose = require('mongoose');
var crypto = require('crypto');
mongoose.connect(config.connectionstringTest);
var db = mongoose.connection;
db.on('error', function(err) {
    testLogger.error('connect to %s error: ', dbName, err.message);
    process.exit(1);
});
db.once('open', function() {
    testLogger.trace('%s has been connected.', dbName);

    Schema = mongoose.Schema;

    var schema = new Schema({
        company: {
            type: String,
            index: true
        },
        name: {
            type: String,
            unique: true,
            index: true,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        ////////////////////////////////////
        //license>category>dataownership
        license: {
            type: [String],
            required: true,
        default:
            ["all"]
        },
        category: {
            type: [String],
            required: true,
        default:
            ["search", "buy"]
        },
        dataownership: {
            type: [String],
            required: true,
        default:
            ["all"]
        },
        /////////////////////////////////////
        password: {
            type: String,
            required: true,
            set: util.encryptPassword
        },
        sex: String,

        phone: String,

        //will have subdoc here in the future
        doc : [schemaDoc]
    });
    schema.method("authenticate", function(plainText) {
        return encryptPassword(plainText) === this.password;
    });

    var Model = mongoose.model('researcher', schema);
    // Model.schema.path('category').validate(function(value) {
    //     var ret = true;
    //     value.forEach(function(el) {
    //         // /i (忽略大小写)
    //         // /g (全文查找出现的所有匹配字符)
    //         // /m (多行查找)
    //         // /gi(全文查找、忽略大小写)
    //         // /ig(全文查找、忽略大小写)
    //         ret = /dominate | search | buy | approve /i.test(el);
    //         if (ret === false) {
    //             return false;
    //         }
    //     });
    //     return ret;
    // }, '非法权限');

    var entity = new Model();
    entity.name = "yin22";
    entity.password = "1111";
    entity.email = "shenyin@rocketmail.com";
    entity.category = ["dominate","search"];
    entity.doc[0] = ({name : "毒药"});
    // entity.doc.push({name : "病毒"});

    entity.save(function(error, entity) {
        if (error) {
            testLogger.error(error);
            return;
        }
        testLogger.info(entity);
    });
});


function encryptPassword(password) {
    return crypto.createHash("md5").update(password).digest("base64");
}