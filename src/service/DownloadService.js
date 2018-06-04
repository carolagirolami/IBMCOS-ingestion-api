'use strict';


/**
 * Download data resource from data lake
 * Retrieves a data resource, referenced by its resourceid
 *
 * tenantid String The tenant identifier of the client application
 * user String The end user making the request
 * resourceid String The resourceid of the resource to be retrieved
 * returns InputStream
 **/
var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');


exports.doGetObject = function (resourceid) {
    console.log('Download object');
    var cos = cosConnection.configure();
	return cos.getObject({
        Bucket: cosConnection.bucketName,
        Key: resourceid,
        ResponseContentType: 'application/octet-stream'
    }).promise();
}

