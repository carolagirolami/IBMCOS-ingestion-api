/*jshint esversion: 6 */
'use strict';

var utils = require('../utils/writer.js');
var Download = require('../service/DownloadService');

module.exports.getData = function getData (req, res, next) {
	var operator = req.swagger.params['operator'].value;
	var resourceid = req.swagger.params['resourceid'].value;
	Download.doCheckObject(resourceid)
	.then(()=>Download.doGetObject(resourceid))
	.then(function (data) {	
		utils.writeAll(res, data.Body.toString());
	})
	.catch(function (err, data) {
		utils.writeJson(res, JSON.stringify(err.code), err.statusCode);	   
	});
};
