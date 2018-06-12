/*jshint esversion: 6 */
'use strict';

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');

/**
 * Search datalake and return list of resource IDs and attributes
 * Searches and retrieves resource IDs and metadata from the data lake based on search criteria
 *
 * tenantid String The tenant identifier of the client application
 * sourceid String Identifier of source originating the data
 * subjectid String A subject ID associated to some data resources in the data lake
 * operator String The end operator making the request
 * maxResults Long The maximum number of entries to be returned. Default and limit is 1000. (optional)
 * offset String Next offset for subsequent queries. Default is \"\" (optional)
 * returns array of resourceids
 **/

exports.doListObjects = function(tenantid,sourceid,subjectid,operator,maxResults,offset) {
		var objectList = {};
		if( maxResults === null ) { maxResults = 1000; }
		if( offset === null ) { offset = ""; }
		var prefix = tenantid +'-'+ sourceid +'-'+ subjectid +'-';
		console.log('List objects');
		console.log('query:'+prefix);
		console.log('maxResults:'+maxResults);
		console.log('offset:'+offset);
		console.log('List objects');  
		var cos = cosConnection.configure();
		return cos.listObjects({
			Bucket: cosConnection.objectsBucketName, /* required */
			Marker: offset,
			MaxKeys: maxResults,
			Prefix: prefix
		}).promise();           // successful response
};

