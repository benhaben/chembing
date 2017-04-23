/*
 * GET users listing.
 */
//require("../log");
//var path = require('path');
//var db = require("./../models").db;
//
//var crypto = require('crypto');
//
//encryptPassword = function(password) {
//    return crypto.createHash("md5").update(password).digest("base64");
//};
//
//comparePassword = function(password, plainText) {
//    return encryptPassword(plainText) === this.password;
//};


// exports.list = function (req, res) {
//     res.send("respond with a resource");
// };

// exports.create = function (req, res) {
//     var createUser = new UsersModel(req.body);
//     UsersModel.findOne({name:req.body.name}, function (err, user) {
//         if (err)
//             return res.json({err:err});
//         if (user) {
//             return res.json({err:"用户名已经存在"});
//         }
//         createUser.save(function (err, user) {
//             if (err) {
//                 return res.json({err:err});
//             }
//             req.session["user"] = user;
//             res.json();
//         });
//     });

// };

// exports.login = function (req, res) {
//     logger.log("login : " + req.body.name + req.body.password);
//     UsersModel.findOne({name:req.body.name}, function (err, user) {
//         if (err)
//             return res.json({err:err});
//         if (!user) {
//             return res.json({err:'用户名不存在'});
//         }
//     logger.log("login : " + user.name + user.password);

//         if (!user.authenticate(req.body.password))
//             return res.json({err:'密码错误'});
//         req.session["user"] = user;
//         // res.json(user);
//         return res.json({success:'成功登录'});
//     });
// };

// exports.logout = function (req, res) {
//     req.session["user"] = null;
//     // var html = path.normalize(__dirname + '/../views/index.html');
//     // res.sendfile(html);
// };
