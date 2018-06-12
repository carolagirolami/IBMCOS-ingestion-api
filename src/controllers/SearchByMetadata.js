/*jshint esversion: 6 */
'use strict';

var util = require('util');
var utils = require('../utils/writer.js');
var SearchByMetadata = require('../service/SearchByMetadataService');



module.exports.searchByMetadata = function searchByMetadata (req, res, next) {
	var tenantid = req.swagger.params['tenantid'].value;
	var sourceid = req.swagger.params['sourceid'].value;
	var subjectid = req.swagger.params['subjectid'].value;
	var operator = req.swagger.params['operator'].value;
	var contenttype = req.swagger.params['contenttype'].value;
	var maxResults = req.swagger.params['maxResults'].value;
	var offset = req.swagger.params['offset'].value;
	var index = "";
	var jobid ="";
	
	if ( offset !== null && offset !== "" )
	{
		var arr = offset.split("#");
		if ( arr.length !== 2 )
		{
			utils.writeJson(res, JSON.stringify("Bad input format"), 404);	  
			return;
		}
		index = Number(arr[0]);
		jobid =	arr[1];
	}
	

	SearchByMetadata.doQueryObjects(tenantid,sourceid,subjectid,operator,contenttype,maxResults,index,jobid)
	.then( function (data) {
		var objectList = {};
		console.log("Get metadata done with success");
		objectList["jobid"] = data["jobId"];
		var jsonObject = JSON.parse(data["result_set_sample"]);
		if(jsonObject.data.length > 0)
		{
			objectList["nextOffset"] = data["result_next_index"];
			objectList["resultsList"] = jsonObject.data;
		}
		
		utils.writeJson(res, JSON.stringify(objectList));	
	})
	.catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
