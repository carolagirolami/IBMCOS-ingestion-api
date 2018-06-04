'use strict';

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');

/**
 * Get metadata of an uploaded data resource
 * Retrieves attributes from the data lake for a resource ID
 *
 * tenantid String The tenant identifier of the client application
 * user String The end user making the request
 * resourceid String The resourceid of the data resource for which metadata should returned
 * returns ObjectMeta
 **/


exports.doGetMetadata = function(resourceid) {
	 console.log('Creating metadata'); 
	 var cos = cosConnection.configure();
	 return cos.headObject({
	    Bucket: cosConnection.bucketName,
	    Key: resourceid
	 }).promise();
}
