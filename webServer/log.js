var log4js = require('log4js');
var path = require("path");
log4js.configure({
	appenders: [{
		type: 'console'
	}, {
		type: 'file',
		filename: path.join(__dirname + '/../logs/dispatch.log'),
		category: 'server',
		maxLogSize: 1048576
	}, {
		type: 'file',
		filename: path.join(__dirname + '/../logs/test.log'),
		category: 'test',
		maxLogSize: 1048576
	}]
});

//Global
logger = log4js.getLogger('server');
testLogger = log4js.getLogger('test');
// module.exports = testLogger;
// module.exports = logger;

// logger.setLevel('ERROR');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');
// Output:
// [2010-01-17 11:43:37.987] [ERROR] cheese - Cheese is too ripe!
// [2010-01-17 11:43:37.990] [FATAL] cheese - Cheese was breeding ground for listeria.