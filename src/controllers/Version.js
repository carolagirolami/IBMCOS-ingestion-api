'use strict';

var utils = require('../utils/writer.js');
var Version = require('../service/VersionService');

module.exports.getVersion = function getVersion (req, res, next) {
  Version.getVersion()
    .then(function (data) {
      utils.writeJson(res, JSON.stringify(data));
    })
    .catch(function (err, data) {
    	utils.writeJson(res, JSON.stringify(err.message), err.statusCode);	   
    });
};
