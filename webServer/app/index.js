/*
 * GET home page.
 */


var path = require('path');
exports.index = function (req, res) {

    // var html = path.normalize(__dirname + '/../../webApp/login/index.html');
//    var html = path.normalize('search/search.html');
//    logger.trace("render index" + html);
//    res.sendfile(html);
    res.render("index");


};

exports.getLoginUser = function (req, res) {
    res.json(req.session["user"] || {});
};
