import React, { Component } from 'react'
import style from './top-workflow.css'

// 顶部按钮
class Tab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        }
    }
    handleAClick (index, val) {
        this.setState({
            index: index
        });
        this.props.onTabChange(val, index)
    }
    render() {
        return (
            <div  className={style.box}>
                {this.props.item.map((val, index)=>(
                    <a key={index} onClick={() => this.handleAClick(index, val)} className={this.props.index === index ? style.active : '' }>{val.name}</a>
                ))}
            </div>
        )
    }
}

export default Tab