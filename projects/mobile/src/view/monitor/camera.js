import React, { Component } from 'react';
import style from './css/camera.css';
import request from '../../api/monitor/camera.js'

class CameraChild extends Component{
    constructor (props) {
        super (props)
        this.removeCamera = this.removeCamera.bind(this)
        this.addCamera = this.addCamera.bind(this)
    }
    removeCamera (e) {
        e.stopPropagation()
        this.props.onTextChange()
        request.dealCamera('-1').then(value => {})
    }
    addCamera (e) {
        console.log(this.props.index)
        e.stopPropagation()
        this.props.onTextChange(this.props.cameraItem)
        this.props.onReturnIndex(this.props.index)
        console.log(this.props.cameraItem.camera_id)
        request.dealCamera(this.props.cameraItem.camera_id).then(value => {})
    }
    render () {
        return (
            <div>
                <div className={style.box}></div>
                <div className={style.name}>{this.props.cameraItem.camera_name}</div>
                {
                    this.props.isDefault ? (<a  className={style.chooseSetting} onClick={this.removeCamera}>取消默认</a>) : (<a  className={style.setting} onClick={this.addCamera}>设为默认</a>)
                }
                <div className={style.p}>位置 : <span className={style.address}>{this.props.cameraItem.area_name}</span></div>
                <div className={style.p}>型号 : <span className={style.model}>{this.props.cameraItem.unit_type}</span></div>
                <div className={style.p}>运转 : <span className={style.status}>{this.props.cameraItem.state === '0' ? <span className={style.primary}>正常</span> : <span className={style.danger}>危险</span>}</span></div>
            </div>
        )
    }
}

class DefaultData extends Component{
    constructor(props) {
        super(props);
        this.state = {isDefault: true}
    }
    render () {
        console.log(this.props.defaultData)
        return (
            <div>
                {
                    this.props.defaultData && Object.keys(this.props.defaultData).length > 0 ? (
                        <div>
                            <div className={style.title}>默认查看</div>
                            <li className={style.item} onClick={() => {this.props.onReturnNumber(this.props.index)}}>
                                <CameraChild cameraItem={this.props.defaultData} isDefault={this.state.isDefault} onTextChange={() => {this.props.onTextChange()}} onReturnIndex={val => {this.props.onReturnIndex(val)}}/>
                            </li>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}

class RecentData extends Component{
    render () {
        console.log(this.props.defaultData)
        return (
            <div>
                <div className={style.title}>最近查看</div>
                {
                    this.props.camera.map((item, index) => (
                        <li className={style.item} key={index} onClick={() => {this.props.onReturnNumber(index)}}>
                            <CameraChild cameraItem={item} index={index} onTextChange={(val) => {this.props.onTextChange(val)}} onReturnIndex={val => {this.props.onReturnIndex(val)}}/>
                        </li>
                    ))
                }

            </div>
        )
    }
}

class Cameras extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
    }
    render () {
        console.log(this.props.defaultData)
        return (
            <div className={style.fixed_box}>
                <ul className={style.list}>
                    <DefaultData camera={this.props.cameraInfo} defaultData={this.props.defaultData}
                                 index={this.state.index}
                                 onReturnNumber={(val) => {this.props.onReturnNumber(val)}}
                                 onTextChange={(val) => {this.props.onTextChange(val)}}/>
                    <RecentData camera={this.props.cameraInfo} defaultData={this.props.defaultData}
                                onReturnNumber={(val) => {this.props.onReturnNumber(val)}}
                                onReturnIndex={val => {this.setState({index: val})}}
                                onTextChange={(val) => {this.props.onTextChange(val)}}/>
                </ul>
            </div>
        )
    }
}

export default Cameras