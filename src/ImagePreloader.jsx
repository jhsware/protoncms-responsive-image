'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var ImagePreloader = React.createClass({
    
    getInitialState: function () {
        return {
            src: this.props.src
        }
    },
    
    onLoadReady: function (e) {
        e.preventDefault();
        this.props.onUpdateSrc(this.props.src);
    },
    
    componentDidMount: function () {
        $(ReactDOM.findDOMNode(this.refs['el'])).on('load', this.onLoadReady);
    },
    
    componentWillUnmount: function () {
        $(ReactDOM.findDOMNode(this.refs['el'])).off('load', this.onLoadReady)
        // TODO: Set src to some mini-image to GB on mobile Safari (is this still needed?)
        this.setState({
            src: '/assets/img/trans.gif'
        });
    },
    
    render: function () {
        return (
            <img ref="el" style={{display: 'none'}} src={this.state.src} />
        )
    }
})
module.exports = ImagePreloader;