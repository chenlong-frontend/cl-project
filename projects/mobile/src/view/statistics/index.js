import React, { Component } from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import style from './index.css'
import {NavAction} from '../../store/actions/nav'
import camera from '../../assets/img/statistics/camera.png'
import folder from '../../assets/img/statistics/folder-open-o.png'
import playImg from '../../assets/img/statistics/youtube-play.png'
import users from '../../assets/img/statistics/users.png'

window.NProgress.start()

// 身体部分
const Boxs = ({ className = '', imgSrc = ''}) => (
    <div className={style.box+` ${className}`}>
        <img src={imgSrc} alt="pic" />
        <span>随手拍处理率本</span>
        <h2>0</h2>
    </div>
)
const coment = {
    box1: {
        boxClassName: style.box1,
        imgSrc: camera,
        showMsh: '随手拍处理率本月'
    },
    box2: {
        boxClassName: style.box2,
        imgSrc: folder,
        showMsh: '项目文档总数'
    },
    box3: {
        boxClassName: style.box3,
        imgSrc: playImg,
        showMsh: '项目摄像头总数'
    }
}
const WingBlankExample = (props) => (
    <div style={{ padding: '15px 0' }}>
        <WingBlank>
            <Boxs
                className={props.coment.box1.boxClassName}
                imgSrc={props.coment.box1.imgSrc}/>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank>
            <Boxs
                className={props.coment.box2.boxClassName}
                imgSrc={props.coment.box2.imgSrc}/>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank >
            <Boxs
                className={props.coment.box3.boxClassName}
                imgSrc={props.coment.box3.imgSrc}/>
        </WingBlank>

        <WhiteSpace size="lg" />
        <WingBlank >
            <div className={style.box4} >
                <img src={users} alt="pic"/>
                <h3>项目总人数</h3>
                <h1>暂无数据</h1>
                <div className={style.ibox_content} style={{background: "none", border: "none"}}>
                    <h5>今日出勤人数（暂无数据）</h5>
                    <div className={style.progress + ' ' + style.progress_striped} style={{border: "#fff 1px solid"}}>
                        <div style={{width: "0%", backgroundColor: "#1cb394"}}
                             aria-valuemax="100" aria-valuemin="0"
                             aria-valuenow="100" role="progressbar"
                             className={style.progress_bar + ' ' + style.progress_bar_success }>
                            <span className="sr-only">35% Complete (success)</span>
                        </div>
                    </div>

                    <h5>工地在场人数（暂无数据）</h5>

                    <div className={style.progress  + ' ' + style.progress_striped}>
                        <div style={{width: "0%", border: "1px #fff solid"}}
                             aria-valuemax="100"
                             aria-valuemin="0"
                             aria-valuenow="50"
                             role="progressbar"
                             className={style.progress_bar}>
                            <span className="sr-only">40% Complete (success)</span>
                        </div>
                    </div>
                </div>
            </div>
        </WingBlank>
    </div>
);

class View extends Component {
    componentDidMount () {
        this.props.navSet({title: '项目看板'});
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render() {
        return (
            <div>
                <WingBlankExample coment={coment}/>
            </div>
        )
    }
}

export default connect((state)=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)