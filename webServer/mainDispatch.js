//var index = require('./app/index');
//var user = require('./app/user');
//var search = require('./app/search');
require("./log");

module.exports = function (app) {
//    app.all('*', function (req, res, next) {
//        //i will check permission here
//        logger.info("all\t" + req.path);
//        next();
//    });

    app.get('/', function (req, res) {
        res.render("login");
    });

    app.get(/index/ig, function (req, res) {
        res.render("index_melo");
    });

    app.get(/table_chembook/ig, function (req, res) {
        res.render("table_chembook");
    });

    app.get(/current_review/ig, function (req, res) {
        res.render("current_review");
    });

    app.get(/empty1/ig, function (req, res) {
        res.render("empty1");
    });

    app.get(/dxsp/ig, function (req, res) {
        res.render("dxsp");
    });

    app.get(/shop_cart/ig, function (req, res) {
        res.render("shop_cart");
    });

    app.get(/history_review/ig, function (req, res) {
        res.render("history_review");
    });

    app.get(/history_buy_list/ig, function (req, res) {
        res.render("history_buy_list");
    });
    app.get(/analysis_vendor/ig, function (req, res) {
        res.render("analysis_vendor");
    });
    app.get(/analysis_month/ig, function (req, res) {
        res.render("analysis_vendor");
    });
    app.get(/compare_price/ig, function (req, res) {
        res.render("compare_price");
    });
    app.get(/quotation/ig, function (req, res) {
        res.render("quotation");
    });
    app.get(/mychart/ig, function (req, res) {
        res.render("mychart");
    });
    app.get(/buget/ig, function (req, res) {
        res.render("buget");
    });

//    app.get('/', index.index);
//    app.post('/login',  user.login);
//    app.post('/search', search.search);


   // app.get('/view/result.html', function (req, res) {
   //     logger.info("/view/result.html\t" + req.body);
   //     res.render("result");
   // });


};
