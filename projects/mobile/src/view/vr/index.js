import React, { Component } from 'react'
import { Modal} from 'antd-mobile';
import style from './index.css'
import request from '../../api/vr/index'
// 需要用到的图片
import headerBgImg from '../../assets/img/vr/1_header-bg.png'
import btnOpen from '../../assets/img/vr/1_btn_open.png'
import btnClose from '../../assets/img/vr/1_btn_close.png'
import closeBtn from '../../assets/img/vr/1_close.png'
import timeBtn from '../../assets/img/vr/1_time_btn.png'
import timeDate from '../../assets/img/vr/1_timedate.png'
import itemBg from '../../assets/img/vr/item_bg.png'
import bgMusic from '../../assets/source/qcyx.mp3'
import errorImg from '../../assets/img/vr/error.png'
// 跳转路由
import { withRouter } from 'react-router'

// 弹框用到的函数
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

// 播放音乐功能
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlay:true,
            audioIcon: {btnOpen},
        }
    }

    controlAudio (type) {
        console.log(type)
        const audio = document.getElementById("audio");
        if (type === 'play') {
            audio.pause();
            this.setState({
                isPlay: false
            });
        } else if (type === 'pause') {
            audio.play();
            this.setState({
                isPlay: true
            });
        }
    }

    render () {
        return (
            <div className={style.header}>
                <div className={style.header_img + ' ' + style.btn_voice}>
                    <img onClick={ () => this.controlAudio(this.state.isPlay ? 'play' : 'pause') } src={this.state.isPlay ? btnOpen : btnClose} alt="pic" />
                </div>
                <audio src={bgMusic} loop autoPlay id="audio"></audio>
                <div className={style.header_title}>
                    VR安全教育体验
                </div>
                <div className={style.header_img + ' ' + style.btn_close}>
                    <img src={closeBtn} alt="pic" />
                </div>
            </div>
        )
    }
}

// 扫码计时
class Section extends Component {
    constructor(props) {
        super(props);
        this.changeToCount = this.changeToCount.bind(this)
        this.startCount = this.startCount.bind(this)
        this.counterTime = this.counterTime.bind(this)
        this.state = {
            transitionFlag: true,
            isStart:false,
            startTime: 0,
            pauseTime: 0,
            globalTimer:null, //获取setInterval对象值
            checkTimer:null,  // 获取轮询检查的对象
            computedTime:"00:00:00",   // ---------需要返回给父组件一个状态，去通知列表更新--------//
            exp_id:'',  // 后台解析后的
            photoString:'20171209144628513',  // app返回的字符串，还需要过一遍后台
        }
    }

    // 开始计时，之后要调app的方法，app还要调本地方法
    changeToCount () {
        if (this.state.photoString !== '') {
            let self = this
            let reqJson = {
                'id': self.state.photoString
            }
            request.getStart(reqJson).then(
                data => {
                    if (data.code === 0 ) {
                        console.log("请求扫码成功，准备计时...");
                        self.setState(
                            {
                                transitionFlag: false,
                                exp_id: data.data.id
                            }
                        )
                        // console.log(self.state)
                        self.startCount()
                    }
                }
            )
        }
    }
    // 计时结束
    stopCount () {
        let self = this;
        if(self.state.startTime){
            console.log('体验结束...')
            window.clearInterval(self.state.globalTimer);
            // //自动加上一分钟，舍去了秒数
            var hour = Number(self.state.computedTime.substr(0,self.state.computedTime.indexOf(":")));
            var minute = Number(self.state.computedTime.substring(self.state.computedTime.indexOf(":")+1,self.state.computedTime.lastIndexOf(":")))+1;
            var  allTime = hour + "小时" + minute + "分钟";

            // //这里需要传三个时间，开始，结束，总时长 去1053接口
            let reqJson = {
                'exp_id' : self.state.exp_id,
                'start_time' : self.state.startTime,
                'time': allTime,
                'end_time' : self.state.pauseTime
            }
            // console.log(reqJson)
            request.addVreXP(reqJson).then(
                data => {
                    console.log(data)
                    if (data.code === 0) {
                        console.log('添加记录成功，然后更新下方数据列表！')
                        self.props.onRecordsChange()
                    } else {
                        console.log('添加记录不成功')
                        self.props.onModelChange({
                            errormsg:"体验失败，请重新尝试！",
                            modal1: true
                        })
                    }
                }
            )
            let currTime = new Date();
            this.setState(
                {
                    // transitionFlag: true,
                    globalTimer : null,
                    isStart : false,
                    pauseTime : self.formatTime(currTime),
                    computedTime : "00:00:00"
                }
            )

        }
    }
    //计时方法
    counterTime (counterTime) {
        let nowDate = new Date().getTime();
        let num = nowDate - counterTime;
        let grade1 = num % (3600*1000);   //计算小时后剩余的毫秒数
        let grade2 = grade1 % (60*1000);  //计算分钟后剩余的毫秒数
        let hour = Math.floor(num / (3600*1000));
        let minute = Math.floor(grade1/(60*1000));
        let second = Math.round(grade2/1000);
        second = second<10 ? "0"+second : second;
        minute = minute<10 ? "0"+minute : minute;
        hour = hour<10 ? "0"+hour : hour;
        this.setState(
          { computedTime : (hour+":"+minute+":"+second) }
        )
    }
    // 轮询检查是否被占用
    ajaxForCheck () {
        var self = this;
        let reqJson = {
            'id': self.state.exp_id
        }
        var checktimer = setInterval(function () {
            request.allCheck(reqJson).then(
                data => {
                    if (data.code === 3 ) {
                        console.log("轮询请求code为3")
                        clearInterval(checktimer);
                        // 这边调stopCount方法，停止计时
                        self.stopCount();
                        self.props.onModelChange({
                            errormsg:"对不起，该项目已被其他人使用!",
                            modal1: true
                        })
                    }else if(data.code === 0){
                        console.log("轮询请求code为0")
                    }
                }
            )
        },500);
    }
    startCount () {
        if(!this.state.isStart){
            let self = this;
            let startTime1 = new Date().getTime();
            let currTime = new Date();
            let timer = setInterval(function () {
                self.counterTime(startTime1);
             },500);
            self.setState(
                {
                    startTime : self.formatTime(currTime),
                    globalTimer : timer,
                    isStart : true
                }
            )
            // self.ajaxForCheck()
        }
    }
    formatTime (currTime) {
        let hour = currTime.getHours()<10 ? "0"+currTime.getHours() : currTime.getHours();
        let minute = currTime.getMinutes()<10 ? "0" + currTime.getMinutes() : currTime.getMinutes();
        let time = currTime.getFullYear()+"-"+(currTime.getMonth()+1)+"-"+currTime.getDate()+" "+hour+":"+minute;
        return time;
    }

    render () {
        /*扫一扫*/
        if (this.state.transitionFlag) {
            return (
                <div className={style.section}>
                    <div className={style.scan_box}  onClick={() => this.changeToCount()}>
                    <img src={headerBgImg} alt="pic"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={style.section}>
                    <div className={style.timedate}>
                        <img src={timeDate} alt="pic" />
                        <span>体验时间：</span>
                        <span>{this.state.computedTime}</span>
                        <span>点击下方按钮结束体验</span>
                        <div>
                            <img src={timeBtn} alt="pic" onClick={() => this.stopCount()}/>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            records: [{
                emp_id : "",
                end_time : "-12-14 16:47",
                id : "",
                is_feedback : false,
                level :  "",
                name : "",
                remark : "",
                start_time : "2017--11 16:47",
                time : ""
            }]
        }
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
    toMoreExes () {
        console.log(1111)
        if(this.state.records.length > 0){
            this.props.history.push('/vr-experience')
        }else{
            return false;
        }
    }
    render () {
        return (
            <div className={style.footer}>
                <div className={style.firstBox}>
                    {this.props.records.length > 0 ?
                        this.props.records.map((val, index) => (
                            <div key={index} className={style.experience_box + ' ' + ( index === 0 ? style.first_exp : ' ') }>
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
                        )) : (
                        <div className={style.no_data}><img src={errorImg} alt="pic"/></div>
                        )}
                </div>
                <span className={style.show_more1} onClick={() => this.toMoreExes()}></span>
                <span className={style.show_more2} onClick={() => this.toMoreExes()}></span>
            </div>
        )
    }
}


// 注入路由
const MenuWithRouter = withRouter(Footer)

class View extends Component {
    constructor(props) {
        super(props);
        this.handleModelChange = this.handleModelChange.bind(this)
        this.handleUpdateRecords = this.handleUpdateRecords.bind(this)
        this.state = {
            // 体验记录
            experienceList:[],
            // 弹框
            errormsg:"数据请求异常，请重新尝试！",
            modal1: false,
            records: []
        };
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    componentDidMount () {
         this.handleUpdateRecords()
    }

    // 添加体验记录的状态提升
    handleModelChange (bool) {
        // console.log(bool)
        this.setState({
            modal1 : bool.modal1,
            errormsg: bool.errormsg
        })
    }

    handleUpdateRecords () {
        let self = this
        request.getList().then(
            data => {
                self.setState({
                    records: data.data
                })
                console.log(self.state.records)
            }
        )
    }

    render() {
        return (
            <div className={style.article}>
                <Header />
                <Section onModelChange={this.handleModelChange} onRecordsChange={this.handleUpdateRecords}/>
                <MenuWithRouter records={this.state.records}/>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    // maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="提示"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div >
                        {this.state.errormsg}
                    </div>
                </Modal>
            </div>
        )
    }
}

export default View
