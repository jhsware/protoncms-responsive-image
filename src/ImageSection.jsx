'use strict';
var React = require('react');
var $ = require('jquery');
var ImageMixin = require('./ImageMixin');

var ImageSection = React.createClass({
    mixins: [ImageMixin],
    
    componentDidMount: function () {
        this.updateRealSize();
    },

    render: function () {
        var styles = {
            backgroundImage: 'url("' + this.getSrc({x: 1600, y: 600}) + '")'
        };

        // TODO: Add image for web indexing
        // <img style={{display: "none"}} src={this.props.data.image_url} alt={this.props.data.title}/>
        return (
            <section ref="el" className={this.props.className} style={styles} onClick={this.onClick}>
                {this.props.children}
                {this.state.preloadSrc && <ImagePreloader src={this.state.preloadSrc} onUpdateSrc={this.updateSrc} />}
            </section>

        )
    }
})
module.exports = ImageSection;
