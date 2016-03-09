"use strict";
var registry = require('protoncms-core').registry;
var createUtility = require('component-registry').createUtility;

var IImageService = require('protoncms-core').interfaces.IImageService;

var ServiceUtility = createUtility({
    implements: IImageService,
    name: 'cloudinary',
    
    urlMatchesService: function (src) {
        return (src && src.indexOf('cloudinary.com') > 0);
    },
    
    generateUrl: function (src, size, gravity) {
        // Create a resized version of the url
        // http://res.cloudinary.com/demo/image/upload/w_90,h_70/sample.jpg

        // If we don't have size specified, just return the src
        if (!size) {
            return src
        } else {
            var tmp = src.split('/image/upload/');
            // http://cloudinary.com/documentation/image_transformations
            // Test url http://res.cloudinary.com/fmtk/image/upload/w_1291,h_407,c_fill,g_faces:center,q_90/path/to/image.jpg
            // Example size on different quality settings:
            // q_50: 31.1kb; q_60: 35.5kb; q_70: 42.2kb; q_80: 52.9kb; q_90: 96.6kb
            var tmpOutp = {
                "w_": size.x,
                "h_": size.y,
                "c_fill": true,
                "q_": "60"
            };
        
            // Allow passing custom gravity option
            if (!gravity) {
                tmpOutp["g_faces"] = ":center";
            } else {
                tmpOutp["g_" + gravity] = true;
            }
        
        
            var options = [];
            for (var key in tmpOutp) {
                if (tmpOutp[key]) {
                    if (typeof tmpOutp[key] === "boolean") {
                        options.push(key)
                    } else {
                        options.push(key + tmpOutp[key])
                    }
                }
            }
            return tmp[0] + '/image/upload/' + options.join(',') + '/' + tmp[1];
        }
    }
    
});

registry.registerUtility(ServiceUtility);