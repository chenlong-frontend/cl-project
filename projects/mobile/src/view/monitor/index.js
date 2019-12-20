import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
// import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import style from './index.css';
import header from '../../assets/img/monitor/svg/header.svg';
import CameraBox  from './camera.js'
import ListBox from './list.js'
import AlbumBox from './album.js'
import request from '../../api/monitor/camera.js'

window.NProgress.start()

class MonitorContent extends Component {
    constructor(props) {
        super(props);
        this.state = {pro_info: {}}
    }
    componentDidMount () {
        request.getCameraInfo().then(data => {
            console.log(data.pro_info[0])
            this.setState({pro_info: data.pro_info[0]})
        })
    }
    render () {
        const department = this.state.pro_info
        return (
            <div className={style.folder}>
                <div className={style.top}>
                    <div className={style.img}>
                        <img src={header} alt="pic" />
                    </div>
                    <div className={style.text}>
                        <div className={style.department}>{department.name}</div>
                        <div className={style.address}>{department.address}</div>
                    </div>
                    <div className={style.right}>
                        <div className={style.position}>共{department.count}台</div>
                    </div>
                </div>
            </div>
        )
    }
}

class TabChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chooseId: '-1',
            allData: [],
            defaultData: {},
            index: -1
        }
    }
    componentDidMount () {
        request.getCameraInfo().then(data => {
            data.is_default === 0 && this.setState({defaultData: data.index[0]})
            data.is_default === 0 ? this.setState({allData: data.index.slice(1)}) : this.setState({allData: data.index})
        })
    }
    render () {
        const tabs = [
            { title: '视频监控' },
            { title: '监控列表' },
            { title: '截屏相册' }
        ];
        console.log(this.state.defaultData)
        return (
            <div className={style.tabIntroduce}>
                <Tabs tabs={tabs} initialPage={0} tabBarPosition="bottom">
                    <div style={{ display: 'flex', width: '100%', height: '430px', backgroundColor: '#F5F5F9' }}>
                        <CameraBox cameraInfo={this.state.allData} defaultData={this.state.defaultData} onReturnNumber={(val) => {this.props.onReturnNumber(val)}}  onTextChange={(val) => {this.setState({defaultData: val})}}/>
                    </div>
                    <div style={{ display: 'flex', width: '100%', height: '430px', backgroundColor: '#F5F5F9' }}>
                        <ListBox chooseId={this.state.defaultData ? this.state.defaultData.camera_id: ''} onReturnNum={(val) => {this.props.onReturnNum(val)}} onIdChange={val => {this.setState({defaultData: val})}}/>
                    </div>
                    <div style={{ display: 'flex', width: '100%', height: '430px', backgroundColor: '#F5F5F9' }}>
                        <AlbumBox onReturnPhoto={(val) => {this.props.onReturnPhoto(val)}}/>
                    </div>
                </Tabs>
            </div>
        )
    }
}

class Monitor extends Component{
    componentDidMount() {
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
                    <MonitorContent />
                    <TabChange onReturnNumber={(val) => {this.props.history.push(`/monitor-camera-watch/${val}/1/1/1`)}}
                               onReturnNum={(val) => {this.props.history.push(`/monitor-camera-watch/${val[0]}/2/${val[1]}/${val[2]}`)}}
                               onReturnPhoto={(val) => {this.props.history.push(`/monitor-album-watch/${val.album_id}`)}}/>
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
})(Monitor)