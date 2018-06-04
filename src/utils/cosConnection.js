'use strict';

/**
 *  Retrieve connections parameters and connect to IBM COS instance
 **/

var AWS = require('ibm-cos-sdk');
var util = require('util');

/*
var DEFAULT_IAM_ENDPOINT = "https://iam.bluemix.net/oidc/token";
var DEFAULT_ENDPOINT_URL = "https://s3-api.us-geo.objectstorage.softlayer.net";
var DEFAULT_API_KEY = "1rfAIDpkUBMQLPlPnVD4KE6vPNzAlGpxnqf7ZLNC7_K4";
var DEFAULT_SERVICE_INSTANCE_ID = "crn:v1:bluemix:public:cloud-object-storage:global:a/bb8a72628edc88f203c685fd8b0af2ca:39b8f9ba-c4d1-462f-a7fc-99978c739377::";
*/


var DEFAULT_IAM_ENDPOINT = process.env.DEFAULT_IAM_ENDPOINT;
var DEFAULT_ENDPOINT_URL = process.env.DEFAULT_ENDPOINT_URL;
var DEFAULT_API_KEY = process.env.DEFAULT_API_KEY;
var DEFAULT_SERVICE_INSTANCE_ID = process.env.DEFAULT_SERVICE_INSTANCE_ID;


var bucketName = exports.bucketName = "objects.net";


var config = {
	    endpoint: DEFAULT_ENDPOINT_URL,
	    apiKeyId: DEFAULT_API_KEY,
	    ibmAuthEndpoint: DEFAULT_IAM_ENDPOINT,
	    serviceInstanceId: DEFAULT_SERVICE_INSTANCE_ID,
	};

var configure = exports.configure = function ()
{
	console.log("Configure client for connection");
	return new AWS.S3(config);
}

