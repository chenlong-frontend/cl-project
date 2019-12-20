import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'
import request from '../../api/request'
import { ReadOnlySnapshot, SelectSnapshot, TextareaSnapshot } from '../../components/components'
import getTime from '../../components/tool/getTime'
import style from './css/issueWrite.css'
import stateDone from '../../assets/svg/state_done.svg'
import shotEdit from '../../assets/img/snapshot/shotEdit.png'

// 已拍照片
class Photo extends Component{
    render () {
        return (
            <div className={style.edit}>
                <div className={style.imgBox}>
                    <img alt={''} src={this.props.photo} onClick={() => {this.props.onPhotoChange()}} />
                </div>
                <div className={style.bottom}>
                    <a onClick={()=>{this.props.onTakePhoto()}}><img src={shotEdit} alt={''} /><span className={style.text}>点击此处或照片可重新拍摄</span></a>
                </div>
            </div>
        )
    }
}

// 表单
class FormShot extends Component {
    render () {
        return (
            <div className={style.formBox}>
                <ReadOnlySnapshot title="违章位置" text={this.props.form.address} />
                <SelectSnapshot onValueChange={(val) => {
                    this.props.onVioTypeId(val)
                }} list={this.props.issueInfo} title="违章类型" text={this.props.vioTypeText} />
                <ReadOnlySnapshot title="违章时间" text={this.props.form.upload_time} />
                <ReadOnlySnapshot title="发现人" text={this.props.form.upload_name} />
                <TextareaSnapshot value={this.props.descValue} onTextChange={val => {
                    this.props.onTextChange(val)
                }} title="违章详情" placeholder={'请填写违章详情'} />
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                address:"",
                upload_name:"",
                upload_time:"",
                vio_desc:"",
                vio_type_id:""
            },
            issueInfo: [{}],
            vioType: '请选择违章类型',
            photo: ''
        }
        this.takePhoto = this.takePhoto.bind(this)
    }
    componentDidMount() {
        window.__camera__ = this
        request({type: 8, data: {}}).then(data => {
            window.APPDATA.COMPONENTNAME = 'snapIssueWrite'
            window.SSInterActvieController.callCameralOrAlbum(data)
        })
        this.props.navSet({title: '上传记录'})
        const requestAsync = async () => {
            await request({type: 2, data: {}}).then(data => {
                this.setState({form: Object.assign({}, this.state.form, {upload_name: data.info.name})})
            });
            await request({type: 7, data: {}}).then(data => {
                this.setState({issueInfo: data.map(val => {
                    val.label = val._name
                    val.value = val._id
                    return val
                })})
            })
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
        this.setState({
            form: Object.assign({}, this.state.form, {upload_time: getTime(), address: window.APPDATA.LOCATION}),
            photo: window.PHOTO
        })
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    takePhoto () {
        window.__camera__ = this
        request({type: 8, data: {}}).then(data => {
            window.APPDATA.COMPONENTNAME = 'snapIssueWrite'
            window.SSInterActvieController.callCameralOrAlbum(data)
        })
    }
    render () {
        return (
            <div>
                <Photo photo={this.state.photo} onPhotoChange={this.takePhoto} onTakePhoto={this.takePhoto} />
                <FormShot
                    onVioTypeId={val => {
                        this.setState({
                            form: Object.assign({}, this.state.form, {vio_type_id: val.value[0]}),
                            vioType: val.label
                        })
                    }}
                    vioTypeText={this.state.vioType}
                    onTextChange={val => {this.setState({form: Object.assign({}, this.state.form, {vio_desc: val})})}}
                    descValue = {this.state.form.vio_desc}
                    issueInfo={this.state.issueInfo} form={this.state.form}
                />
                <div className={style.submit}>
                    <Button style={{height: '40px', lineHeight: '40px'}} type="primary"
                            onClick={() => {
                                let formCheck = Object.keys(this.state.form).every(a=>{
                                    return this.state.form[a].length !== 0
                                })
                                if (!formCheck) {
                                    Toast.info('请将数据填写完整', 1.5)
                                    return false
                                }
                                Toast.loading('提交中...', 0);
                                let param = Object.assign({}, this.state.form, {click_event: 1, next_node_id: "0"})
                                request({type: 4, data: param}).then(() => {
                                    this.props.resultType({text: '已提交至指定负责人审核', title: '请等待审核完成', icon: stateDone})
                                    Toast.hide()
                                    this.props.history.replace('/snapshot-result')
                                }).catch(() => {Toast.hide()})
                            }}
                    >上传记录</Button>
                </div>
            </div>
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        resultType: param => {
            dispatch(ResultAction(param))
        },
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)