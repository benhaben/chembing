require("../log");
var db = require("./../models").db;
var zmq = require('zmq');
var Q = require('q');
exports.search = function(req, res) {
    if (req.body.mol) {
        Q.all(connectSearchServer(req)).then(function(results) {
            var keys = [];
            var values = [];
            myData = JSON.parse(results, function(key, value) {
                keys.push(key);
                values.push(value);
                return value;
            });
            if (keys.length > 0) {
                var params = [];
                for (var i = 0; i < keys.length; i++) {
                    params.push({
                        CAS: keys[i]
                    });
                };
                Q.all(searchInMongoDB({
                    $or: params
                })).then(function(results) {
                    res.send(results);
                });
            };
        });
    } else {
        var andFilters = generateSQLWithAnd(req);
        Q.all(searchInMongoDB(andFilters)).then(function(results) {
            //get svg from search server
//            for (var i = 0; i < results.length; i++) {
//
//            };
//            res.redirect('http://google.com');
//            res.redirect('/login/index.html');
            res.render(result);
        });
    }
}
var generateSQLWithAnd = function(req) {
    var andFilters = [];
    if (req.body.name !== undefined) {
        name = new RegExp('.*' + req.body.name + '.*', 'g');
        logger.info("search in mongodb : name - " + name);
        andFilters.push({
            cn_name: name,
            en_name: name
        });
    }
    if (req.body.CAS !== undefined) {
        andFilters.push({
            CAS: req.body.CAS
        });
    }
    return {
        $and: andFilters
    };
}
var searchInMongoDB = function(param) {
    //important: don't reject here
    logger.info("searchInMongoDB");
    var deferred = Q.defer();
    var collection = db.collection("documents");
    collection.find(param, function(err, cur) {
        if (!err) {
            cur.toArray(function(err, doc) {
                deferred.resolve(doc);
            });
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
};
var connectSearchServer = function(req) {
    logger.info("Connecting to search server...");
    var deferred = Q.defer();
    var mol = req.body.mol;
    var requester = zmq.socket('req');
    requester.connect("tcp://localhost:5555");
    requester.on("message", function(reply) {
        logger.info("Received reply", ": [", reply.toString(), ']');
        deferred.resolve(reply.toString());
        requester.close();
    });
    if (req.body.mol === undefined) {
        deferred.resolve();
    } else {
        requester.send(JSON.stringify({method:"search_by_mol",param:mol}));
        // requester.send(mol);
    }
    return deferred.promise;
}