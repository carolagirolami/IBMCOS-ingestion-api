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
 * entityid String A entity ID associated to some data resources in the data lake
 * user String The end user making the request
 * maxResults Long The maximum number of entries to be returned. Default and limit is 1000. (optional)
 * marker String Next marker for subsequent queries. Default is \"\" (optional)
 * returns array of resourceids
 **/

exports.doListObjects = function(tenantid,sourceid,entityid,user,maxResults,marker) {
		var objectList = {};
		if( maxResults == null )
			maxResults = 1000;
		if( marker == null )
			marker = "";
		var prefix = tenantid +'-'+ sourceid +'-'+ entityid +'-';
		console.log('List objects');
		console.log('query:'+prefix);
		console.log('maxResults:'+maxResults);
		console.log('marker:'+marker);
		console.log('List objects');  
		var cos = cosConnection.configure();
		return cos.listObjects({
			Bucket: cosConnection.bucketName, /* required */
			Marker: marker,
			MaxKeys: maxResults,
			Prefix: prefix
		}).promise();           // successful response
}

