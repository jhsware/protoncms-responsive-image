'use strict';
var $ = require('jquery');

module.exports.uploadFile = function(options, callback) { 
    
    // Check parameters
    if (typeof options !== 'object') {
        return callback("Missing options object")
    } else if (typeof callback !== 'function') {
        return callback("Missing callback function")
    } else {
        var err = ['targetUrl', 'imageFile'].filter(function (prop) {return options[prop] === undefined});
        if (err.length > 0) {
            return callback("Missing required option params: " + err.join(", "))
        }        
    }
    
    // Prepare upload
    var formData = new FormData()
    formData.append("file", options.imageFile)

    $.ajax({
        method: options.method || "POST",
        url: options.targetUrl,
        headers: options.headers,
        data: formData,
        processData: false,
        contentType: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr()
            if(myXhr.upload) {
                // TODO: We aren't removing this event listener!!!
              myXhr.upload.addEventListener('progress', function(e){
                var total = e.total
                var loaded = e.loaded
                var perc = loaded / total
                options.onProgress && options.onProgress(perc, loaded, total)
              }, false)
            }
            return myXhr
        },
        success: function(body) {
            callback(undefined, body)
        },
        error: function(error) {
            callback(error)
        }
    })
}