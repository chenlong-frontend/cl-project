import React, { Component } from 'react'
import style from './comments.css'
import iconPrev from '../../assets/img/vr/3_icon_prev.png'
import iconColor from '../../assets/img/vr/3_icon_color.png'
import backBtn from '../../assets/img/vr/3_back.png'
// 跳转路由
import { withRouter } from 'react-router'


class Section extends Component {
    constructor (props) {
        super(props);
        this.state = {
            formList : {
                'remark': '',
                'level': ''
            }
        }
    }

    toPreInfo () {
        this.props.history.push('/vr-index')
    }

    render () {
        let { remark, level} = this.props.msgList;
        let iconJson = [false,false,false,false,false]
        for (let i = 0; i < level; i ++) {
            iconJson[i] = true
        }
        return (
            <div className={style.article}>
                <div className={style.section}>
                    <div className={style.ques}>
                        <textarea cols="30" rows="10" maxLength="300" placeholder="rweteg" readOnly ref="remark" value={remark}></textarea>
                    </div>
                    <div className={style.comments}>
                        {iconJson.map((val, index) => (
                            <img key={index}
                                 src={val ? iconColor : iconPrev}
                                 alt="pic"/>
                        ))}
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.readcomm}>
                        <img src={backBtn} alt="pic" onClick={() => this.toPreInfo()}/>
                    </div>
                </div>
            </div>
        )
    }
}


// 注入路由
const MenuWithRouter = withRouter(Section)

class View extends Component {

    componentDidMount () {
        console.log(this.props.location.state)
        //console.log(this.props.location.state)
    }
    render() {
        return (
            <div className={style.article}>
                <MenuWithRouter msgList={this.props.location.state}/>
            </div>
        )
    }
}
export default View