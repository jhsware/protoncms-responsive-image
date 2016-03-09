'use strict';
var React = require('react');
var $ = require('jquery');
var ImageMixin = require('./ImageMixin');

var ImageDiv = React.createClass({
    mixins: [ImageMixin],
    
    componentDidMount: function () {
        this.updateRealSize();
    },

    render: function () {
        var styles = {
            backgroundImage: 'url("' + this.state.src + '")'

        };
        
        // Add style dict
        if (this.props.style) {
            for (var key in this.props.style) {
                styles[key] = this.props.style[key];
            }
        }
        
        // TODO: Add image for web indexing
        // <img style={{display: "none"}} src={this.props.data.image_url} alt={this.props.data.title}/>
        return (
            <div ref="el" className={this.props.className} style={styles} onClick={this.onClick} >
                {this.props.children}
                {this.state.preloadSrc && <ImagePreloader src={this.state.preloadSrc} onUpdateSrc={this.updateSrc} />}
            </div>

        )
    }
})
module.exports = ImageDiv;