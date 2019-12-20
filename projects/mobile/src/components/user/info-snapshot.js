import React, { Component } from 'react'
import style from './info-snapshot.css'

// 用户信息
class Info extends Component {
    render() {
        return (
            <div>
                <div className={style.top}>
                    <div className={style.topLeft}>
                        <div className={style.headPic}>
                            <img alt={''} src={this.props.userInfo.emp_avatar} />
                        </div>
                        <div className={style.info}>
                            <p className={style.name}>{this.props.userInfo.name}</p>
                            <p className={style.job}>{this.props.userInfo.dep_name}</p>
                        </div>
                    </div>
                    {/*<div className={style.topRight}>*/}
                        {/*<h3 className={style.position}>技术部负责人</h3>*/}
                   {/*</div>*/}
                </div>
            </div>
        )
    }
}

export default Info