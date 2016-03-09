'use strict';
var React = require('react');
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
        $(this.refs['el'].getDOMNode()).on('load', this.onLoadReady);
    },
    
    componentWillUnmount: function () {
        $(this.refs['el'].getDOMNode()).off('load', this.onLoadReady)
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