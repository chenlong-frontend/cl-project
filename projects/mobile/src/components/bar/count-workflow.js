import React, { Component } from 'react'

const divStyle = {
    position: 'fixed',
    bottom: 0,
    zIndex: 10,
    backgroundColor: '#EFEFEF',
    width: '100%'
};
const pStyle = {
    textAlign: 'center',
    margin: 0,
    lineHeight: '40px',
    fontSize: '14px',
    color: '#8f8f94'
};

// 底部统计
class Count extends Component {
    render() {
        return (
            <div style={divStyle}><p style={pStyle}>{this.props.text}</p></div>
        )
    }
}

export default Count