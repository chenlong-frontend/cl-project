import React, { Component } from 'react'
import style from './textBox-snapshot.css'
import { format } from 'date-fns'

// 时间
class TimeBar extends Component {
    render () {
        return (
            <div className={style.time}>
                <span>{this.props.time}</span>
            </div>
        )
    }
}

// 会话文字框
class ChatBox extends Component {
    render () {
        return (
            <div>
                {this.props.list.map((val, index) => (
                    <div key={index}>
                        <div className={style.chatContentTalkText + ' ' + style.chatContentTalkOther}>
                            <div className={style.clearFix}>
                                <div className={style.message}>
                                    <div className={style.img}>
                                        <div className={style.headPic}>
                                            <img alt={''} src={val.emp_avatar} />
                                        </div>
                                        <div className={style.name}>{val.emp_name}</div>
                                    </div>
                                    <div className={style.content}>
                                        <div className={style.bubble}>
                                            <div className={style.bubbleCount}>
                                                <div className={style.plain}>
                                                    <div className={style.prePlain}>
                                                        <div className={style.title}>处理流程 : {val.process}<span/></div>
                                                        <p className={style.text}>{val.content}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <TimeBar time={format(val.create_time, 'YYYY-MM-DD')} />
                    </div>
                ))}
            </div>

        )
    }
}

export default ChatBox