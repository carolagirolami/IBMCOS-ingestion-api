'use strict';

var utils = require('../utils/writer.js');
var Delete = require('../service/DeleteService');

module.exports.deleteData = function deleteData (req, res, next) {
	var user = req.swagger.params['user'].value;
	var resourceid = req.swagger.params['resourceid'].value;
	Delete.doDeleteObject(resourceid)
	.then(function (data) {
		var response = JSON.stringify("Object deleted with success");	
		utils.writeJson(res, data);
	})
	.catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
