'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
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
        $(ReactDOM.findDOMNode(this.refs['el'])).on('load', this.onLoadReady);
    },
    
    componentWillUnmount: function () {
        $(ReactDOM.findDOMNode(this.refs['el'])).off('load', this.onLoadReady)
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