'use strict';

var util = require('util');
var utils = require('../utils/writer.js');
var Metadata = require('../service/MetadataService');



module.exports.getMetadata = function getMetadata (req, res, next) {
  var user = req.swagger.params['user'].value;
  var resourceid = req.swagger.params['resourceid'].value;
  Metadata.doGetMetadata(resourceid)
    .then(function (response) {	
      utils.writeJson(res, JSON.stringify(response.Metadata));
    })
    .catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
