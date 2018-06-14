/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the “License”);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an “AS IS” BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*jshint esversion: 6 */
'use strict';

/**
 * Upload data resource to data lake
 * Writes a data resource with the specified filename and associated metadata 
 *
 * tenantid String The tenant identifier of the client application
 * sourceid String Identifier of source originating the data
 * operator String The operator identifier in the uploaded data (optional)
 * body InputStream The data object to write to data-lake (optional)
 * returns ObjectMeta
 **/

var AWS = require('ibm-cos-sdk');
var util = require('util');
var cloudFunctionsConnection = require('../utils/cloudFunctionsConnection.js');
var cosConnection = require('../utils/cosConnection.js');

exports.doParseContent = function(contenttype,body){
	//validate document
	var ow = cloudFunctionsConnection.configure_openwhisk();
	if ( contenttype === "HL7" )
	{
		var name = cloudFunctionsConnection.hl7parsercloudFunction;
		var blocking = true, result = true;
		var params = {
				hl7input: body.toString().replace(/\n/g,"\r"), 
		};
		console.log("params"+ JSON.stringify(params));
		console.log("name"+ name);
		return ow.actions.invoke({name, blocking, result, params});
		// return promise
	}
	else
	{
		console.log("ALL other cases");
		var validationdata = {};
		validationdata["isValid"] = true;
		return new Promise(function(resolve, reject){ resolve(validationdata);});
	}
};


//resourceid : tenant-source-subject-creationTime-uuid
exports.doGenerateResourceId = function(tenantid,sourceid,subjectid,operator,body) {
    //generate uuid
    const uuidv4 = require('uuid/v4');
    var uuid = uuidv4();
    //get current time    
    var dateFormat = require('dateformat');
    var now = new Date();
    var nowFormatted = dateFormat(now, "yyyymmddHHMMssl"); 
    //build resurceid 
    var resourceid = tenantid +'-'+ sourceid +'-'+ subjectid +'-'+ nowFormatted + '-' + uuid;
    console.log('resourceid:'+resourceid);
    return resourceid;
};
  
exports.doGenerateMetadata = function(tenantid,sourceid,subjectid,operator,contenttype,validationdata,resourceid,body) {	  
    var metadata = {};
    //save metadata in a map object
    metadata = {
    		"sourceId":sourceid,
    		"tenantId":tenantid,
    		"subjectId":subjectid,
    		"operator":operator,
    		"contenttype":contenttype,
    		"objectSize":body.length.toString(),
    		"resourceid":resourceid
    };
    metadata = Object.assign(metadata,validationdata["metadata"]);
    console.log("metadata"+JSON.stringify(metadata));   
    return metadata;
};
  
exports.doCreateObject = function(resourceid,body) {
    	var cos = cosConnection.configure();
    	console.log("Create object");
    	console.log("resourceid"+resourceid);
    return cos.putObject({
        Bucket: cosConnection.objectsBucketName,
        Key: resourceid,
        Body: body
    }).promise();
};

exports.doCreateMetadata = function(resourceid,metadata) {
	var cos = cosConnection.configure();
	console.log("metadata"+JSON.stringify(metadata));
	console.log("resourceid"+resourceid);
	return cos.putObject({
	    Bucket: cosConnection.metadataBucketName,
	    Key: resourceid,
	    Body: JSON.stringify(metadata)
	}).promise();
};
