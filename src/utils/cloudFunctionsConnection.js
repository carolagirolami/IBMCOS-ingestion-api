/*jshint esversion: 6 */
'use strict';

/**
 *  Retrieve connections parameters and connect to IBM COS instance
 **/

var openwhisk = require('openwhisk');

/*
var DEFAULT_CLOUDFUNCTION_API_HOST = process.env.DEFAULT_CLOUDFUNCTION_API_HOST;
var DEFAULT_CLOUDFUNCTION_NAMESPACE = process.env.DEFAULT_CLOUDFUNCTION_NAMESPAC;
var DEFAULT_CLOUDFUNCTION_API_KEY = process.env.DEFAULT_CLOUDFUNCTION_API_KEY;
*/
var DEFAULT_CLOUDFUNCTION_API_HOST = "openwhisk.eu-gb.bluemix.net"; 
var DEFAULT_CLOUDFUNCTION_NAMESPACE = 'carolagirolami_dev';
var DEFAULT_CLOUDFUNCTION_API_KEY = 'b34153d2-5c2e-4ef6-a9e9-24362d51fafe:Kq46uUUxEpYwuL4YNsOj8h4UElRA8iDOF5U1gEgjQFw3DuXGwGWn60LG1JBey2nD';

var sqlcloudFunction = exports.sqlcloudFunction = "sqlcloudfunction";
var sqlcloudFunctionBucket  = exports.sqlcloudFunctionBucket = "cos://us-geo/metadata.net STORED AS JSON";
var hl7parsercloudFunction = exports.hl7parsercloudFunction = "hl7parsercloudfunction";


var options = {
		apihost :DEFAULT_CLOUDFUNCTION_API_HOST, 
		api_key: DEFAULT_CLOUDFUNCTION_API_KEY,
		namespace: DEFAULT_CLOUDFUNCTION_NAMESPACE
};

var configure_openwhisk = exports.configure_openwhisk = function ()
{
	console.log("Configure client for connection to openwhisk");
	return openwhisk(options);
};