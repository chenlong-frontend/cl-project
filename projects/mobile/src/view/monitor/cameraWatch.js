import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { Icon, Carousel, DatePicker } from 'antd-mobile';
import { format, addMinutes } from 'date-fns'
import { Modal} from 'antd-mobile';
import style from './css/camera.css';
import camera from '../../assets/img/monitor/svg/camera.svg';
import play from '../../assets/img/monitor/svg/play.svg';
import playBack from '../../assets/img/monitor/svg/playback.svg';
import warning from '../../assets/img/monitor/warning.png';
import {NavAction} from '../../store/actions/nav'
import request from '../../api/monitor/camera.js'

window.NProgress.start()

class CameraContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            slideIndex: 0,
            cameraLength: 0,
            chooseId: ''
        }
        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.removeChoose = this.removeChoose.bind(this);
        this.addChoose = this.addChoose.bind(this);
    }
    moveLeft () {
        this.props.onChangeIndex('toLeft')
    }
    moveRight () {
        this.props.onChangeIndex('toRight')
    }
    removeChoose() {
        this.props.onReturnId('-1')
        request.dealCamera('-1').then(value => {})
    }
    addChoose(id, e) {
        e.preventDefault()
        this.props.onReturnId(id)
        request.dealCamera(id).then(value => {})
    }
    render () {
        console.log(this.props.index)
        return (
            <div className={style.cameraBox}>
                <div className={style.tab_ctrl_left} onClick={this.moveLeft}>
                    <Icon type="left" size='md'/>
                </div>
                <div className={style.tab_ctrl_right} onClick={this.moveRight}>
                    <Icon type="right" size='md'/>
                </div>
                <div className={style.cameraGroup}>
                    <Carousel autoplay={false} dots={false} selectedIndex={this.props.index} infinite>
                        {
                            this.props.cameraInfo.map((item, index) => (
                                <div key={index} className={style.cameraItem}>
                                    <div className={style.img}>
                                        <img src={camera} alt='*' />
                                    </div>
                                    {this.props.chooseId === item.camera_id ? <div className={style.chooseSetting} onClick={this.removeChoose}>取消默认</div> : <div className={style.setting} onClick={this.addChoose.bind(this, item.camera_id)}>设为默认</div>}
                                    <span className={style.status}>运转 :{item.state === '0' ? <span className={style.primary}>正常</span> : <span className={style.danger}>危险</span>}</span>
                                    <div className={style.info}>
                                        <div>{item.camera_name}</div>
                                        <div>位置 : {item.area_name}</div>
                                        <div>型号 : {item.unit_type}</div>
                                        <div>接入时间 : {item.time}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
        )
    }
}

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

class VideoPlay extends Component {
    constructor(props) {
        super(props);
        const nowTimeStamp = Date.now();
        const now = new Date(nowTimeStamp);
        this.state = {
            modal: false,
            time: 5,
            timeIndex: 0,
            date: now,
        }
        this.vistMonitor = this.vistMonitor.bind(this)
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
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
    chooseTime (index, e) {
        console.log(this.props.text[index].time)
        this.setState({time: this.props.text[index].time})
        this.setState({timeIndex: index})
    }
    vistMonitor () {
        request.visitMonitor(this.props.camera.camera_id).then(value => {})
        console.log(this.props.camera.camera_id)
        const url = 'rtsp://' + this.props.camera.username+ ':' + this.props.camera.password + '@' + this.props.camera.video_ip + ':' + this.props.camera.video_port + '/cam/realmonitor?channel=' + this.props.camera.camera_port + '&subtype=1'
        // const url = 'rtsp://admin:zjzn1234@218.3.171.238:1554/cam/realmonitor?channel=10&subtype=1'
        const title = this.props.camera.camera_name;
        const type = 2
        console.log(url, title, type, this.props.camera.camera_id, this.props.camera.area_name, '0.5625', '0')
        window.SSInterActvieController.callLiveVideo(url, title, type, this.props.camera.camera_id, this.props.camera.area_name, '0.5625', '0')
    }
    watchVideo () {
        const startTime = format(this.state.date, 'YYYY_MM_DD_HH_mm_ss')
        const endTime = format(addMinutes(this.state.date, this.state.time), 'YYYY_MM_DD_HH_mm_ss')
        const url = 'rtsp://' + this.props.camera.username + ':' + this.props.camera.password + '@' + this.props.camera.video_ip + ':' + this.props.camera.video_port +  '/cam/playback?channel=' + this.props.camera.camera_port + '&subtype=1&starttime=' + startTime + '&endtime=' + endTime
        // const url = 'rtsp://admin:zjzn1234@218.3.171.238:1554/cam/realmonitor?channel=10&subtype=1'
        const title = this.props.camera.camera_name;
        const type = 2
        console.log(url, title, type, this.props.camera.camera_id, this.props.camera.area_name, '0.5625', '0')
        window.SSInterActvieController.callLiveVideo(url, title, type, this.props.camera.camera_id, this.props.camera.area_name, '0.5625', '0')
    }
    render () {
        return (
            <div className={style.alarm}>
                <div className={style.play}>
                    <div className={style.box}>
                        <a onClick={this.vistMonitor}><img src={play} alt='*'/></a>
                        <a onClick={this.showModal('modal')}><img src={playBack} alt='*'/></a>
                    </div>
                </div>

                <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose('modal')}
                    title="Title"
                    style={{width: '255px'}}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div className={style.pos_div}>
                        <div className={style.pos_msg}>查看录像回放</div>
                        <div className={style.pos_playtime}>
                            <span>开始时间:</span>
                            <DatePicker
                                mode="date"
                                value={this.state.date}
                                onChange={date => this.setState({ date })}
                            >
                                <input type="text" readOnly value={format(this.state.date, 'YYYY-MM-DD HH:mm:ss')} placeholder="选择开始时间" />
                            </DatePicker>

                        </div>
                        <div className={style.pos_playtime}>
                            <span>回放时长:</span>
                            <div className={style.show_before}>
                                {
                                    this.props.text.map((item, index) => (
                                         <div className={index === this.state.timeIndex ? style.time_show : ''}  key={index}  onClick={(e) => this.chooseTime(index, e)}>{item.text}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className={style.pos_warning}>
                            <img src={warning} alt='*'/>
                            <span>回放时间越长加载速度越慢</span>
                        </div>
                        <div className={style.pos_btn} onClick={() => this.watchVideo()}>查询录像</div>
                    </div>
                </Modal>

            </div>
        )
    }
}

const text = [{text:'5分钟', time: 5}, {text: '10分钟', time: 10}, {text: '半小时', time: 30}]

class Camera extends Component{
    constructor (props) {
        super (props)
        this.state= {allData: [{}], chooseId: '', index: this.props.match.params.index * 1}
    }
    componentDidMount() {
        console.log(this.props.match.params.number)
        // this.setState({index: this.props.match.params.index * 1})
        this.props.navSet({title: '视频监控'})
        const requestAsync = async () => {
            if (this.props.match.params.number === '1') {
                await request.getCameraInfo().then(data => {
                    data.is_default === 0 ? this.setState({allData: data.index.slice(1)}) : this.setState({allData: data.index})
                    data.is_default === 0 && this.setState({chooseId: data.index[0].camera_id})
                })
                return true
            }
            if (this.props.match.params.number === '2') {
                await request.getListInfo(this.props.match.params.fileId).then(data => {
                    this.setState({allData: data.cameras})
                    this.setState({chooseId: this.props.match.params.id})
                })
                return true
            }
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    onChangeIndex (val) {
        console.log(val)
        val === 'toLeft' && this.setState(prevState => ({
            index: prevState.index === 0 ? this.state.allData.length - 1 : prevState.index - 1
        }))
        val === 'toRight' &&  this.setState(prevState => ({
            index: prevState.index === this.state.allData.length - 1 ? 0 : prevState.index + 1
        }))
    }
    render () {
        console.log(this.state.index)
        console.log(this.state.allData.length)
        return (
            <div className={style.body}>
                <div className={style.content}>
                    <CameraContent cameraInfo={this.state.allData} index={this.state.index}
                                   chooseId={this.state.chooseId}
                                   onChangeIndex={val => {this.onChangeIndex(val)}}
                                   onReturnId={val => {val === '-1' ? this.setState({chooseId: ''}) : this.setState({chooseId: val})}}/>
                    <VideoPlay text={text} camera={this.state.allData[this.state.index]}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state)=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(Camera))
