"use strict";
var registry = require('protoncms-core').registry;
var createUtility = require('component-registry').createUtility;

var IImageService = require('protoncms-core').interfaces.IImageService;

var ServiceUtility = createUtility({
    implements: IImageService,
    
    urlMatchesService: function (src) {
        return true;
    },
    
    generateUrl: function (src, size, gravity) {
        return src;
    }
    
});

registry.registerUtility(ServiceUtility);