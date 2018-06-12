/*jshint esversion: 6 */
'use strict';


/**
 * Delete uploaded data resource
 * Delete uploaded data resource from the datal lake for a specific resourceid
 *
 * operator String The end operator making the request
 * resourceid String The resourceid of the data resource to be deleted
 * no response value expected for this operation
 **/

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');


exports.doDeleteObject = function(resourceid) {
		var cos = cosConnection.configure();
        return cos.deleteObject({
          Bucket: cosConnection.objectsBucketName,
          Key: resourceid
        }).promise();
};

exports.doDeleteMetadata = function(resourceid) {
	var cos = cosConnection.configure();
    return cos.deleteObject({
      Bucket: cosConnection.metadataBucketName,
      Key: resourceid
    }).promise();
};
