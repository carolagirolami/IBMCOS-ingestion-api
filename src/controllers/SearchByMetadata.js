'use strict';

var util = require('util');
var utils = require('../utils/writer.js');
var SearchByMetadata = require('../service/SearchByMetadataService');



module.exports.searchByMetadata = function searchByMetadata (req, res, next) {
	var tenantid = req.swagger.params['tenantid'].value;
	var sourceid = req.swagger.params['sourceid'].value;
	var entityid = req.swagger.params['entityid'].value;
	var user = req.swagger.params['user'].value;
	var maxResults = req.swagger.params['maxResults'].value;
	var marker = req.swagger.params['marker'].value;

	SearchByMetadata.doListObjects(tenantid,sourceid,entityid,user,maxResults,marker)
	.then( function (data) {
		var objectList = {};
		console.log("Get metadata done with success");
		objectList["exceedsLimit"]=data["IsTruncated"];
		objectList["nextMarker"]=data["NextMarker"];
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
