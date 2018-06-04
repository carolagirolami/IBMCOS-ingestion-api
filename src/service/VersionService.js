'use strict';


/**
 * Show version
 * Displays the current version of data ingestion release.
 *
 * no response value expected for this operation
 **/
exports.getVersion = function() {
   return new Promise(function(resolve, reject) {
     resolve("version 1.0");
   });
   
}

