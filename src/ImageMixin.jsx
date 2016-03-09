"use strict";
var registry = require('protoncms-core').registry;
var React   = require('react/addons');
var _       = require('lodash');
var $ = require('jquery');

var IImageService = require('protoncms-core').interfaces.IImageService;

/*
        if (!_.isUndefined(this.props.image.url)) {
            imageUrl = this.props.image.url;
        }
*/

var isDesktopBrowser = function () {
    // https://en.wikipedia.org/wiki/Display_resolution
    return window.screen.width >= 1280
}

// First some support functions
var _imageUrlGenerators = {

    'other': function (src, size) {
        // Do nothing...
        return src
    }
};

var _getSizeFromUrl = function (src) {
    if (!src) {
        return undefined;
    }

    // http://placehold.it/100x100
    var re = /\/([0-9]*)x([0-9]*)/;
    var m;

    var i = 0;
    while ((m = re.exec(src)) != null) {
        if (m.index === re.lastIndex) {
            re.lastIndex++;
        }
        // View your result using the m-variable.
        // eg m[0] etc.
        if (i++ > 10) { break };
    }

    if (m) {
        return {
            x: m[1],
            y: m[2]
        }
    } else {
        // Default size if none is passed
        return {x: 600, y: 400};
    }

};

var _getImageServiceUtility = function (src) {
    var imageServiceUtils = registry.getUtilities(IImageService)
    
    var defaultService;
    var src;
    for (var i = 0, imax = imageServiceUtils.length) {
        var utilObj = imageServiceUtils[i];
        if (utilObj.name === undefined) {
            defaultService = utilObj.utility;
        } else {
            if (utilObj.utility.urlMatchesService(src)) {
                return utilObj.utility
            }
        }
    }
    return defaultService;
}

// Then a mixin

var ImageMixin = {
    propTypes : {
        imageUrl: React.PropTypes.string,
        src: React.PropTypes.string,
        className: React.PropTypes.string
    },
    
    getInitialState: function () {
        var src = this.getSrc();
        return {
            src: src
        }
    },

    onClick: function (e) {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    },

    getSrc: function (size) {
        var src;
        if (!this.props.imageUrl) {
            // if imageUrl is undefined or null
            src = this.props.src;
            src = src.replace("http://", "//").replace("https://", "//");
        } else {
            src = this.props.imageUrl.replace("http://", "//").replace("https://", "//");
            if (!size) {
                var size = _getSizeFromUrl(this.props.src);
            }
            src = _getImageServiceUtility(src)(src, size, this.props.gravity);

        }
        return src;
    },
    
    componentWillUnmount: function () {
        // Set src to some mini-image to GC on mobile Safari (is this still needed?)
        this.setState({
            src: '/assets/img/trans.gif'
        });
    },
    
    updateRealSize: function () {
        var state = this.state;
        
        var $el = $(this.refs['el'].getDOMNode());
        var width = $el.outerWidth();
        var height = $el.outerHeight();
        
        // TODO: Handle desktop size with respect to the max size of the screen
        if (isDesktopBrowser()) {
            // On desktop we return images in steps of 300 so we don't get a huge nrof rendered image sizes
            var tmp = Math.floor(width / 300) + 1;
            var newWidth = tmp * 300;
            var size = {
                x: newWidth,
                y: Math.round(newWidth / width * height)
            }
        } else {
            var size = {
                x: width,
                y: height
            }
        }
        
        // We need a low res version with the same aspect ratio
        /*
        var lowResSize = {
            x: Math.round(size.x / 10),
            y: Math.round(size.y / 10),
        }
        
        state.src = this.getSrc(lowResSize);
        */
        this.setState({
            preloadSrc: this.getSrc(size)
        });
    },
    
    updateSrc: function (src) {
        this.setState({
            src: src
        });
    }
};

module.exports.ImageMixin = ImageMixin;