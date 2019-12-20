import React, { Component } from 'react';
import style from './css/list.css';
import fold from '../../assets/img/monitor/svg/fold.svg';
import camera from '../../assets/img/monitor/svg/camera.svg';
import request from '../../api/monitor/camera.js'

class Lists extends Component{
    constructor(props) {
        super(props);
        this.state = {
            catalog: [],
            cameras: [],
            fileId: '',
            path:[{name: "总目录", id: "", p_id: "-1"}]
        }
        this.addChoose = this.addChoose.bind(this);
        this.removeChoose = this.removeChoose.bind(this);
    }
    componentDidMount() {
        request.getListInfo().then(data => {
            this.setState({catalog: data.catalog, cameras: data.cameras})
        })
    }
    removeChoose (e) {
        e.stopPropagation()
        this.props.onIdChange('')
        request.dealCamera('-1').then(value => {})
    }
    addChoose (index, e) {
        e.stopPropagation()
        console.log(this.props.chooseId)
        this.props.onIdChange(this.state.cameras[index])
        request.dealCamera(this.state.cameras[index].camera_id).then(value => {})
    }
    catalogSelect (index, item) {
        this.state.path.push(item)
        this.setState({path: this.state.path, fileId: item.id})
        request.getListInfo(item.id).then(data => {
            this.setState({catalog: data.catalog, cameras: data.cameras})
        })
    }
    catalogBack (index, e) {
        this.setState({path: this.state.path.slice(0, index + 1), fileId: this.state.path[index].id})
        request.getListInfo(this.state.path[index].id).then(data => {
            this.setState({catalog: data.catalog, cameras: data.cameras})
        })
    }
    render () {
        return (
            <div className={style.cameraList}>
                <div className={style.head} onTouchCancel={(e) => {e.stopPropagation()}}>
                    {
                        this.state.path.map((item,index) => (
                            <a className={style.active} onClick={(e) => this.catalogBack(index, e)} key={index}>{item.name}  {this.state.path.length - 1 !== index ? (<span>></span>) : ''} </a>
                        ))
                    }
                 </div>

                <div className={style.fixed_box}>
                    {
                        this.state.catalog.map((item, index) => (
                            <div className={style.center} key={index} onClick={() => this.catalogSelect(index, item)}>
                                <div className={style.left}>
                                    <img className={style.img} src={fold} alt='*'/>
                                </div>
                                <div className={style.middle}>
                                    <p className={style.text}>{item.name}</p>
                                </div>
                                <div className={style.right}></div>
                                <div className={style.space}></div>
                            </div>
                        ))
                    }

                    {
                        this.state.cameras ? (
                            this.state.cameras.map((item, index) => (
                                <div className={style.center} key={index} onClick={() => {this.props.onReturnNum([index, this.props.chooseId, this.state.fileId])}}>
                                    <div className={style.left}>
                                        <img className={style.img} src={camera} alt='*' />
                                    </div>
                                    <div className={style.middle}>
                                        <span className={style.area}>{item.camera_name}</span>
                                        <span className={style.state_normal}>{item.state}</span>
                                        <p className={style.number}>{item.unit_type}</p>
                                    </div>
                                    <div className={style.right}>
                                        {this.props.chooseId === item.camera_id ? <a className={style.selected} onClick={this.removeChoose}>取消默认</a> : <a onClick={(e) => this.addChoose(index, e)}>设为默认</a>}
                                    </div>
                                    <div className={style.space}></div>
                                </div>
                            ))
                            ) : ''

                    }
                </div>
            </div>
        )
    }
}

export default Lists