/*jshint esversion: 6 */
'use strict';

var AWS = require('ibm-cos-sdk');
var util = require('util');
var squel = require("squel");

var cloudFunctionsConnection = require('../utils/cloudFunctionsConnection.js');

/**
 * Search datalake and return list of resource IDs and attributes Searches and
 * retrieves resource IDs and metadata from the data lake based on search
 * criteria
 * 
 * tenantid String The tenant identifier of the client application sourceid
 * String Identifier of source originating the data subjectid String A subject
 * ID associated to some data resources in the data lake operator String The end
 * operator making the request maxResults Long The maximum number of entries to
 * be returned. Default and limit is 1000. (optional) offset String Next offset
 * for subsequent queries. Default is \"\" (optional) returns array of
 * resourceids
 */

exports.doQueryObjects = function(tenantid,sourceid,subjectid,operator,contenttype,maxResults,index,jobid) {
	var objectList = {};
	if( maxResults === null || maxResults === "") { maxResults = 1000;}
	if( index === null ) { index = ""; }
	if( jobid === null ) { jobid = ""; }
	console.log('Query objects');
	console.log('maxResults:'+maxResults);
	console.log('index:'+index);
	console.log('jobid:'+jobid);
	console.log('List objects');  

	var select = squel
	.select()
	.from(cloudFunctionsConnection.sqlcloudFunctionBucket);

	if( tenantid !== "" ) { select.where("tenantid= \""+ tenantid + "\""); }
	if( sourceid !== "" )  { select.where("sourceid= \""+ sourceid+"\""); }
	if( subjectid !== "" )  { select.where("subjectid= \""+ subjectid+"\""); }
	if( operator !== "" )  { select.where("operator= \""+ operator+"\" "); }
	if( contenttype !== "" )  { select.where("contenttype= \""+ contenttype+"\""); }

	console.log("sqlSelect"+select.toString());

	var ow = cloudFunctionsConnection.configure_openwhisk();
	var name = cloudFunctionsConnection.sqlCloudFunction;
	var blocking = true, result = true;
	var params = {
			sql: select.toString(), 
			maxresults: maxResults, 
			index: index, 
			jobid: jobid
	};


	console.log("params"+ JSON.stringify(params));

	return ow.actions.invoke({name, blocking, result, params});
	// return promise
};

