import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import request from '../../api/request'
import { ReadOnlySnapshot, SelectSnapshot, TextareaSnapshot } from '../../components/components'
import style from './css/issueWrite.css'
import shotEdit from '../../assets/img/snapshot/shotEdit.png'
import { withRouter } from 'react-router'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'
import { connect } from 'react-redux'
import stateDone from '../../assets/svg/state_done.svg'

// 已拍照片
class Photo extends Component{
    render () {
        return (
            <div className={style.edit}>
                <div className={style.imgBox} onClick={() => {
                    this.props.onPhotoChange()
                }}>
                    <img alt={''} src={this.props.imgSrc} />
                </div>
                <div className={style.bottom}>
                    <a><img src={shotEdit} alt={''} /><span className={style.text}>点击照片可重新拍摄</span></a>
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
            form: {},
            issueInfo: [{label: '暂无数据', value: ''}],
            vioType: '请选择违章类型',
            photo: ''
        }
    }
    componentDidMount() {
        this.props.navSet({title: '重新上传记录'})
        const requestAsync = async () => {
            await request({type: 404, data: this.props.match.params}).then(data => {
                this.setState({
                    form: Object.assign({}, this.state.form, data),
                    vioType: data.vio_type_name,
                    photo: data.vio_pic
                })
            })
            await request({type: 7, data: {}}).then(data => {
                this.setState({issueInfo: data.map(val => {
                    val.label = val._name
                    val.value = val._id
                    return val
                })})
            });
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        console.log(this.state.form)
        return (
            <div>
                <Photo imgSrc={this.state.photo} onPhotoChange={() => {
                    window.__camera__ = this
                    request({type: 8, data: {}}).then(data => {
                        window.APPDATA.componentName = 'snapIssueWrite'
                        window.SSInterActvieController.callCameralOrAlbum(data)
                    })
                }} />
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
                                let param = Object.assign({}, this.state.form, {click_event: 6, next_node_id: this.state.form.next_nodes[0].id})
                                Toast.loading('提交中...', 0);
                                request({type: 4, data: param}).then(() => {
                                    this.props.resultType({text: '已提交至指定负责人重新审核', title: '请等待审核完成', icon: stateDone})
                                    Toast.hide()
                                    this.props.history.replace('/snapshot-result')
                                }).catch(() => {
                                    Toast.hide()
                                })
                            }}
                    >重新上传</Button>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state)=>({}), dispatch => {
    return {
        resultType: param => {
            dispatch(ResultAction(param))
        },
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View))