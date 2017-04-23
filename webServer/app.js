/**
 * Module dependencies.
 */

require('./log');
logger.trace('start running, at app.js');

var mainDispatch = require('./mainDispatch');
var settings = require('./config');

var express = require('express');
var http = require('http');
var path = require('path');
//var MongoStore = require('connect-mongo')(express);
var app = express();

// all environments---------------------------------------------start
app.set('port', process.env.PORT || 3000);

//TODO: add favorite icon
app.use(express.favicon());
//app.use(express.favicon(__dirname + '/public/images/favicon.ico'))
app.use(express.compress());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.multipart());

// Register ejs as .html. If we didmain
// not call this, we would need to
// name our views foo.ejs instead
// of foo.html. The __express method
// is simply a function that engines
// use to hook into the Express view
// system by default, so if we want
// to change "foo.ejs" to "foo.html"
// we simply pass _any_ function, in this
// case `ejs.__express`.

app.engine('.html', require('ejs').__express);

// Optional since express defaults to CWD/views
app.set('views', path.join(__dirname, '/../webApp/view'));

// Without this you would need to
// supply the extension to res.render()
// ex: res.render('users.html').
app.set('view engine', 'html');


// 当想在一个表单中使用像 PUT 这样的方法，我们可以使用一个命名为 _method 的 hidden input，它可以用以修改 HTTP 方法。
// 为了做这个，我们首先需要 methodOverride 中间件，它必须出现于 bodyParser 后面，以便使用它的 req.body中所包含的表单值。
app.use(express.methodOverride());

app.use(express.cookieParser('chem admin manager'));
app.use(express.session());

app.use(express.static(path.join(__dirname, '/../webApp')));
app.use(express.static(path.join(__dirname, '/../webApp/img')));
//app.use(express.static(path.join(__dirname, '/../webApp/view')));
app.use(express.static(path.join(__dirname, '/../webApp/melo')));
app.use(express.static(path.join(__dirname, '/../webApp/melo/plugins')));

//调用路由解析的规则。
app.use(app.router);

// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function() {
	logger.trace('Express server listening on port ' + app.get('port'));
});

//call function, pass app
mainDispatch(app);