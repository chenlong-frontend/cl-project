import React, { Component } from 'react'
import style from './textarea-snapshot.css'

class TextareaSnapshot extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        this.props.onTextChange(e.target.value)
    }
    render () {
        return (
            <div className={style.myInputRow}>
                <div className={style.left}>{this.props.title} :</div>
                <div className={style.right}>
                    <textarea className={style.textarea} placeholder={this.props.placeholder} maxLength='150'
                        value={this.props.value} onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }
}

export default TextareaSnapshot