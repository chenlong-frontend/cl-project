import React, { Component } from 'react'
import style from './readOnly-snapshot.css'

class readOnlySnapshot extends Component {
    render () {
        return (
            <div className={style.myInputRow}>
                <div className={style.left}>{this.props.title} :</div>
                <div className={style.right}>
                    <span className={style.unRead}>
                        {this.props.text}
                    </span>
                </div>
            </div>
        )
    }
}

export default readOnlySnapshot