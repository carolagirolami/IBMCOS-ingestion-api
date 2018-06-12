/*jshint esversion: 6 */
'use strict';


/**
 * Download data resource from data lake
 * Retrieves a data resource, referenced by its resourceid
 *
 * tenantid String The tenant identifier of the client application
 * operator String The end operator making the request
 * resourceid String The resourceid of the resource to be retrieved
 * returns InputStream
 **/
var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');

exports.doCheckObject = function (resourceid) {
    console.log('Check object id:'+resourceid);
    var cos = cosConnection.configure();
	return cos.headObject({
        Bucket: cosConnection.metadataBucketName,
        Key: resourceid,
    }).promise();
};

exports.doGetObject = function (resourceid) {
    console.log('Download object id:'+resourceid);
    var cos = cosConnection.configure();
	return cos.getObject({
        Bucket: cosConnection.objectsBucketName,
        Key: resourceid,
        ResponseContentType: 'application/octet-stream'
    }).promise();
};

