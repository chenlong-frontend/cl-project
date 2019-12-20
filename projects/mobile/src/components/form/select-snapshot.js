import React, { Component } from 'react'
import { Picker } from 'antd-mobile'
import style from './select-snapshot.css'

class SelectSnapshot extends Component {
    render () {
        return (
            <div className={style.myInputRow}>
                <div className={style.left}>{this.props.title} :</div>
                    <Picker
                        data={this.props.list}
                        cols={1}
                        title={this.props.text}
                        onChange={v => {
                            let select = this.props.list.filter(val => {
                                return val.value === v[0]
                            })
                            this.props.onValueChange({label: select[0].label, value: v})
                        }}
                    >
                        <div className={style.right}>
                            <span className={style.unRead}>
                             {this.props.text}
                            </span>
                        </div>
                    </Picker>
            </div>
        )
    }
}

export default SelectSnapshot