'use strict';

/**
 * Upload data resource to data lake
 * Writes a data resource with the specified filename and associated metadata 
 *
 * tenantid String The tenant identifier of the client application
 * sourceid String Identifier of source originating the data
 * user String The user identifier in the uploaded data (optional)
 * body InputStream The data object to write to data-lake (optional)
 * returns ObjectMeta
 **/

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cosConnection = require('../utils/cosConnection.js');


//resourceid : tenant-source-entity-creationTime-uuid

exports.doGenerateResourceId = function(tenantid,sourceid,entityid,user,body) {
  return new Promise(function(resolve, reject) {
    //generate uuid
    const uuidv4 = require('uuid/v4');
    var uuid = uuidv4();
    //get current time    
    var dateFormat = require('dateformat');
    var now = new Date();
    var nowFormatted = dateFormat(now, "yyyymmddHHMMssl"); 
    //build resurceid 
    var resourceid = tenantid +'-'+ sourceid +'-'+ entityid +'-'+ nowFormatted + '-' + uuid;
    console.log('resourceid:'+resourceid);
    resolve(resourceid);
  });
}
  
exports.doGenerateMetadata = function(tenantid,sourceid,entityid,user,body) {
  return new Promise(function(resolve, reject) {  
    var metadata = {};
    //save metadata in a map object
    metadata = {
    		"sourceId":sourceid,
    		"tenantId":tenantid,
    		"entityId":entityid,
    		"user":user,
    		"objectSize":body.length.toString()
    };
    console.log("metadata"+JSON.stringify(metadata));
    resolve(metadata);
   });
}
  
exports.doCreateObject = function(resourceid,metadata,body) {
    	var cos = cosConnection.configure();
    	console.log('Create object');
    	metadata.resourceid=resourceid;
    return cos.putObject({
        Bucket: cosConnection.bucketName,
        Key: resourceid,
        Metadata: metadata,
        Body: body
    }).promise();
}
