'use strict';

var utils = require('../utils/writer.js');
var Download = require('../service/DownloadService');

module.exports.getData = function getData (req, res, next) {
  var user = req.swagger.params['user'].value;
  var resourceid = req.swagger.params['resourceid'].value;
  Download.doGetObject(resourceid)
    .then(function (data) {
      console.log("OK");	
      utils.writeAll(res, data.Body.toString());
    })
    .catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
