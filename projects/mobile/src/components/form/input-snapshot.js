import React, { Component } from 'react'
import style from './input-snapshot.css'

class inputSnapshot extends Component {
    render () {
        return (
            <div className={style.myInputRow}>
                <div className={style.left}>{this.props.title} :</div>
                <div className={style.right}>
                    <input type="text" readOnly="readOnly" className={style.unRead + ' ' + style.input} />
                </div>
            </div>
        )
    }
}

export default inputSnapshot