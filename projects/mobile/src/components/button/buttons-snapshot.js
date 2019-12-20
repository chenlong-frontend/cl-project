import React, { Component } from 'react'
import style from './buttons-snapshot.css'

class Buttons extends Component {
    render () {
        return (
                <div className={style.buttonBox}>
                    {this.props.type === 'single'? (
                        <div className={style.singleButton}>
                            <button
                                onClick={()=>{
                                    if (this.props.onSingle) {
                                        this.props.onSingle()
                                    }
                                }}
                                className={style.primary}>{this.props.singleText}</button>
                        </div>
                    ) : (
                        <div className={style.button}>
                            <div className={style.left}>
                                <button
                                    onClick={()=>{
                                        if (this.props.onLeft) {
                                            this.props.onLeft()
                                        }
                                    }}
                                    className={style[this.props.colorType]}>{this.props.leftText}</button>
                            </div>
                            <div className={style.right}>
                                <button
                                    onClick={()=>{
                                        if (this.props.onRight) {
                                            this.props.onRight()
                                        }
                                    }}
                                >{this.props.rightText}</button>
                            </div>
                        </div>
                    )
                    }

                </div>
            )
    }
}

export default Buttons