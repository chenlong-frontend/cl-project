import React, { Component } from 'react';
import { Toast } from 'antd-mobile';
import style from './css/album.css';
import down_load from '../../assets/img/monitor/svg/down_load.svg';
import { connect } from 'react-redux';
import {NavAction} from '../../store/actions/nav'
import request from '../../api/monitor/camera.js'

window.NProgress.start()

class AlbumContent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgHeight: 255,
            slideIndex: 0
        }
        this.changeData = this.changeData.bind(this)
    }
    changeData(val) {
        request.changePhoto({id: this.props.pic.album_id, flag: val}).then(value => {
            console.log(value.msg)
            if (value.code === 201) {
                Toast.info(value.msg, 2, null, false);
            } else {
                this.props.onReturnPic(value.data)
            }
        })
    }
    savePic () {
        const ip = document.location.origin + '/zjsbs/'
        const pic = this.props.pic.org_pic
        const pic_url = ip + pic;
            // const pic_url = 'http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg\n'
        console.log(pic_url);
        window.SSInterActvieController.callSaveImageToAlbum(pic_url);
    }
    render () {
        console.log(this.props.pic)
        return (
            <div className={style.albumContent}>
                <div className={style.ctrl_bar}>
                    <span className={style.last} onClick={(e) => this.changeData('1', e)}>上一张</span>
                    <span className={style.next} onClick={(e) => this.changeData('2', e)}>下一张</span>
                </div>

                <div className={style.photo_box}>
                    <img src={this.props.pic.org_pic} style={{height: this.state.imgHeight}} alt="*"/>
                </div>

                <div className={style.inform}>
                    <div className={style.left}>
                        <div>截屏来源 : {this.props.pic.unit_type}</div>
                        <div>位置 : {this.props.pic.position}</div>
                        <div>截屏时间 : {this.props.pic.time}</div>
                    </div>
                    <span className={style.line}></span>
                    <div className={style.right} onClick={() => {this.savePic()}}>
                        <img src={down_load} alt='*'/>
                        <div>保存到手机</div>
                    </div>
                </div>
            </div>
        )
    }
}

class Album extends Component{
    constructor (props) {
        super (props)
        this.state = {picData: {album_id: '', thumbnail: '', unit_type: '', position: '', time: '', org_pic: ''}}
    }
    componentDidMount() {
        console.log(this.props.match.params.album_id)
        request.changePhoto({id: this.props.match.params.album_id, flag: 0}).then(value => {
            this.setState({picData: value.data})
        })
        this.props.navSet({title: '视频监控'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div className={style.body}>
                <div className={style.content}>
                    <AlbumContent pic={this.state.picData} onReturnPic={(val) => {this.setState({picData: val})}}/>
                </div>
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
})(Album)