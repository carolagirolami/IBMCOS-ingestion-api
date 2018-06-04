'use strict';

var utils = require('../utils/writer.js');
var Upload = require('../service/UploadService');
var express = require('express');
var bodyParser = require('body-parser');


module.exports.postData = function postData (req, res, next) {
	var tenantid = req.swagger.params['tenantid'].value;
	var sourceid = req.swagger.params['sourceid'].value;
	var entityid = req.swagger.params['entityid'].value;
	var user = req.swagger.params['user'].value;
	var body = req.swagger.params['body'].value;

	//Generate resource id and metadata map then pass to the create objects as arguments with he body.
	Promise.all([Upload.doGenerateResourceId(tenantid,sourceid,entityid,user,body),
		Upload.doGenerateMetadata(tenantid,sourceid,entityid,user,body)])
		.then(([resourceid,metadata])=>{
			Upload.doCreateObject(resourceid,metadata,body)
			.then(function () {
				utils.writeJson(res, metadata);
			}).catch(function (err, data) {
				utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
			});
		})
		.catch(function (err, data) {
			utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
		});

}