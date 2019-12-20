import React, { Component } from 'react'
import style from './experience.css'
import itemBg from '../../assets/img/vr/item_bg.png'
// 跳转路由
import { withRouter } from 'react-router'
import request from '../../api/vr/index'

class Section extends Component {
    constructor (props) {
        super(props);
        this.state = {
            expList: [{
                "name":"",
                "time":"",
                "start_time":"",
                "end_time":"",
                "is_feedback":false
            }],
            count: 0
        }
    }
    componentDidMount () {
        let self = this
        request.getAllList().then(
            data => {
                // console.log(data.data)
                self.setState(
                    {
                        expList: data.data.records,
                        count: data.data.count
                    }
                )
            }
        )
    }
    toCommentPage  (id) {
        var path = {
            pathname:'/vr-comments',
            state:id,
        }
        this.props.history.push(path)
    }
    toHasCommentPage  (remark,level) {
        // console.log(id,remark,level)
        let sendData = {
            'remark': remark,
            'level': level
        }
        var path = {
            pathname:'/vr-hasComments',
            state:sendData,
        }
        this.props.history.push(path)
    }
    toForwardPage(){
        this.props.history.push('/vr-index')
    }
    render () {
        return (
            <div className={style.vrexeperience}>
                <div className={style.title}>
                    本月共<span>{this.state.count}</span>次
                </div>
                <div className={style.closebtn} onClick={() => this.toForwardPage()}></div>{/*@click="toForwardPage()"*/}
                <div className={style.mui_content}>
                    <div className={style.item_list}>
                        {this.state.expList.map((val, index) => (
                            <div key={index} className={style.experience_box}>
                                <img src={itemBg} alt="pic"/>
                                <div className={style.first_line}>
                                    <span>{val.name}</span>
                                    <div>
                                        {val.time}
                                    </div>
                                </div>
                                <div className={style.second_line}>
                                    <div>
                                        {val.start_time}
                                    </div>
                                    {val.is_feedback ? (
                                        <span onClick={ () => this.toCommentPage(val.id)}>反馈&gt;</span>
                                    ) : (
                                        <span className={style.has_resp}
                                              onClick={ () => this.toHasCommentPage(val.remark, val.level)}>已反馈&gt;</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

// 注入路由
const MenuWithRouter = withRouter(Section)

class View extends Component {
    render() {
        return (
            <div className={style.article}>
                <MenuWithRouter />
            </div>
        )
    }
}

export default View