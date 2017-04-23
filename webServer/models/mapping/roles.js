var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var crypto = require('crypto');

encryptPassword = function(password) {
    return crypto.createHash("md5").update(password).digest("base64");
};

comparePassword = function(password, plainText) {
    return encryptPassword(plainText) === this.password;
};

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
        set: encryptPassword
    },
    roles: {
        type: [String],
        required: true,
    default:
        ["researcher"]
    },

    phone: String,

    //ref to transaction
    docs: {
        type: [Schema.ObjectId]
    },
}, {
    strict: false
});

schema.method("authenticate", function(plainText) {
    return encryptPassword(plainText) === this.password;
});

var models = ['Roles'];

models.forEach(function(modelName) {
    mongoose.model(modelName, schema);
});


// var schema = new Schema({
//     company: {
//         type: String,
//         index: true
//     },
//     name: {
//         type: String,
//         unique: true,
//         index: true,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     ////////////////////////////////////
//     //license>category>dataownership
//     license: {
//         type: [String],
//         required: true,
//     default:
//         ["all"]
//     },
//     category: {
//         type: [String],
//         required: true,
//     default:
//         ["search", "buy"]
//     },
//     dataownership: {
//         type: [String],
//         required: true,
//     default:
//         ["all"]
//     },
//     /////////////////////////////////////
//     password: {
//         type: String,
//         required: true,
//         set: encryptPassword
//     },
//     roles: {
//         type: [String],
//         required: true,
//     default:
//         ["researcher"]
//     },

//     phone: String,

//     //ref to transaction
//     docs: {
//         type: [Schema.ObjectId]
//     },
// }, {
//     strict: false
// });