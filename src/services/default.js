"use strict";
var registry = require('protoncms-core').registry;
var createUtility = require('component-registry').createUtility;

var IImageService = require('protoncms-core').interfaces.IImageService;

var utils = require('./utils');

/*
    options = {
        imageFile: fileObject,  // The actual file
        targetUrl: string,      // Url to enpoint
        [method: string],       // Endpoint method (default "POST")
        [headers: string],      // Headers to pass such as access tokens etc.
        [onProgress: function (perc, loaded, total)] // callback to pass progress
    }
*/

var ServiceUtility = createUtility({
    implements: IImageService,
    
    urlMatchesService: function (src) {
        return true;
    },
    
    generateUrl: function (src) {
        return src;
    },
    
    upload: utils.uploadFile
    
});

registry.registerUtility(ServiceUtility);