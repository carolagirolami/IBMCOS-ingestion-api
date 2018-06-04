'use strict';


/**
 * Delete uploaded data resource
 * Delete uploaded data resource from the datal lake for a specific resourceid
 *
 * user String The end user making the request
 * resourceid String The resourceid of the data resource to be deleted
 * no response value expected for this operation
 **/

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');


exports.doDeleteObject = function(resourceid) {
		var cos = cosConnection.configure();
        return cos.deleteObject({
          Bucket: cosConnection.bucketName,
          Key: resourceid
        }).promise();
}
