/*jshint esversion: 6 */
'use strict';

var utils = require('../utils/writer.js');
var Delete = require('../service/DeleteService');
var Download = require('../service/DownloadService');

module.exports.deleteData = function deleteData (req, res, next) {
	var operator = req.swagger.params['operator'].value;
	var resourceid = req.swagger.params['resourceid'].value;
	Download.doCheckObject(resourceid)
    .then(()=>Delete.doDeleteObject(resourceid))
	.then(()=>Delete.doDeleteMetadata(resourceid))
	.then(function () {
		var response = JSON.stringify("Object deleted with success");	
		utils.writeJson(res, response);
	})
	.catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.code), err.statusCode);	   
    });
};
