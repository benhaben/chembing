// http://blog.fens.me/nodejs-core-cluster/
// https://npmjs.org/package/catiline 
// https://github.com/Unitech/pm2  , http://cnodejs.org/topic/51f8c15144e76d216a588fcc
// http://revdancatt.com/2013/09/17/node-day-1-getting-the-server-installing-node-and-pm2/
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    console.log("master start...");

    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('listening',function(worker,address){
        console.log('listening: worker ' + worker.process.pid +', Address: '+address.address+":"+address.port);
    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(0);
}