import React, { Component } from 'react'
import style from './process-snapshot.css'

class Process extends Component {
    render() {
        return (
            <div className={style.progress}>
                <div className={style.left}>
                    <a className={this.props.active === 0?style.active:''}>待审核</a>
                    <span />
                    <a className={this.props.active === 1?style.active:''}>待处理</a>
                    <span />
                    <a className={this.props.active === 2?style.active:''}>已处理</a>
                    <span />
                    <a className={this.props.active === 3?style.active:''}>已确认</a>
                </div>
                <div className={style.right}>
                    <div onClick={() => {
                        this.props.onTimeChange()
                    }} className={style.time}>
                        <p>变更时间</p>
                        <p>{this.props.time}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Process