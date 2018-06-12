/*jshint esversion: 6 */
'use strict';

var util = require('util');
var utils = require('../utils/writer.js');
var Metadata = require('../service/MetadataService');



module.exports.getMetadata = function getMetadata (req, res, next) {
  var operator = req.swagger.params['operator'].value;
  var resourceid = req.swagger.params['resourceid'].value;
  Metadata.doGetMetadata(resourceid)
    .then(function (data) {	
        utils.writeJson(res, data.Body.toString());
    })
    .catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.code), err.statusCode);	   
    });
};
