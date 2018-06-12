/*jshint esversion: 6 */
'use strict';

var util = require('util');
var utils = require('../utils/writer.js');
var SearchByKey = require('../service/SearchByKeyService');



module.exports.searchByKey = function searchByKey (req, res, next) {
	var tenantid = req.swagger.params['tenantid'].value;
	var sourceid = req.swagger.params['sourceid'].value;
	var subjectid = req.swagger.params['subjectid'].value;
	var operator = req.swagger.params['operator'].value;
	var maxResults = req.swagger.params['maxResults'].value;
	var offset = req.swagger.params['offset'].value;

	SearchByKey.doListObjects(tenantid,sourceid,subjectid,operator,maxResults,offset)
	.then( function (data) {
		var objectList = {};
		console.log("Get metadata done with success");
		objectList["nextOffset"]=data["NextMarker"];
		var resourceids =[];
		for (var i=0; i<data["Contents"].length; i++)
		{
			resourceids[i]=data["Contents"][i]["Key"];
			console.log('resourceid:'+resourceids[i]);
		} 
		objectList["resultsList"]=resourceids;
		utils.writeJson(res, JSON.stringify(objectList));	   		
	})
	.catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
