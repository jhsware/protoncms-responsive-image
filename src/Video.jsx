'use strict';
var React = require('react');
var $ = require('jquery');
var ImageMixin = require('./ImageMixin');

var Video = React.createClass({

    didEndPlaying: function (e) {
        this.props.onEnded && this.props.onEnded(e);
    },

    componentDidMount: function () {
        $(this.getDOMNode()).on('ended', this.didEndPlaying);
    },

    componentWillUnmount: function () {
        $(this.getDOMNode()).off('ended', this.didEndPlaying);
    },

    render: function () {
        return (
            <video {...this.props} />
        )
    }
})

module.exports.Video = Video;