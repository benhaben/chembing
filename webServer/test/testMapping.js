var modelPackage =require("../models");
var Researcher = require("./../models").Researcher;
require("./../log");

var test = function(schema) {
	var researcher = new schema();
	researcher.name = "yin";
	researcher.password = "1111";
    researcher.email = "shenyin@rocketmail.com";
	researcher.save(function(error, researcher) {

		if (error) {
			testLogger.error(error);
			return;
		}
		testLogger.info(researcher);
	});
};

var models = ['Researcher', 'Buyer', 'Leader',
	'Treasurer', 'Vendor'];


models.forEach(function(modelName){
     test(modelPackage[modelName]);
});