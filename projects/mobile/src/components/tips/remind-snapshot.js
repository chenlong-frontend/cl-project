import React, { Component } from 'react'
import tips from '../../assets/svg/tip.svg'
import style from './remind-snapshot.css'

class Remind extends Component {
    render () {
        return (
            <div>
                <div className={style.box} onClick={() => {this.props.onRemindChange()}}>
                    <div className={style.img}>
                        <img src={tips} alt={''} />
                    </div>
                    <p>
                        <a className={style.link}>{this.props.text}</a>
                    </p>
                </div>
            </div>
        )
    }
}

export default Remind

