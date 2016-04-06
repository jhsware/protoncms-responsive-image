'use strict';
var React = require('react');
var $ = require('jquery');
var ImageMixin = require('./ImageMixin');
var ImagePreloader = require('./ImagePreloader');

// Eventually the React-components

var Image = React.createClass({
    mixins: [ImageMixin],

    onLoadReady: function (e) {
        e.preventDefault();
        this.updateRealSize();
        this.props.onLoad && this.props.onLoad();
    },
    
    componentDidMount: function () {
        $(this.refs['el'].getDOMNode()).on('load', this.onLoadReady);
    },
    
    componentWillUnmount: function () {
        $(this.refs['el'].getDOMNode()).off('load', this.onLoadReady)
    },

    render: function () {

        return (
            <span>
                <img ref="el" src={this.state.src} className={this.props.className} onClick={this.onClick} />
                {this.state.preloadSrc && <ImagePreloader src={this.state.preloadSrc} onUpdateSrc={this.updateSrc} />}
            </span>
        )
    }
});
module.exports = Image;