import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import { ReadOnlySnapshot, TextareaSnapshot, ButtonsSnapshot, ProcessSnapshot, TipsRemind } from '../../components/components'
import style from './css/processSubmit.css'
import { connect } from 'react-redux'
import request from '../../api/request'
import stateDone from '../../assets/svg/state_done.svg'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'
import photoPic from '../../assets/img/snapshot/takePhoto.png'

// 拍照
class TakePhoto extends Component {
    render () {
        return (
            <div className={style.photoBox}>
                <div className={style.imgBox} onClick={() => {
                    this.props.onPhotoChange()
                }}>
                    {this.props.photo.length === 0 ? (
                        <div className={style.tips}>
                            <img alt={''} src={photoPic} />
                        </div>
                    ) : (
                        <img alt={''} src={this.props.photo} />
                    )}
                </div>
                <div style={{padding: '15px 0'}}>
                    <TipsRemind text={'点击拍摄照片'} />
                </div>
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                processor:"",
                process_advise:""
            },
            photo: ''
        }
    }
    componentDidMount() {
        this.props.navSet({title: '违章处理完成情况'})
        const requestAsync = async () => {
            await request({type: 2, data: {}}).then(data => {
                this.setState({form: Object.assign({}, this.state.form, {processor: data.info.name})})
            });
            await request({type: 404, data: this.props.match.params}).then(data => {
                this.setState({
                    form: Object.assign({}, this.state.form, data)
                })
            })
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div>
                <div style={{position: 'absolute', backgroundColor: '#FFFFFF',top: '45px', bottom: '40px', left: 0, right: 0, overflow: 'auto'}}>
                    <TakePhoto photo={this.state.photo} onPhotoChange={() => {
                        window.__camera__ = this
                        request({type: 8, data: {}}).then(data => {
                            window.APPDATA.COMPONENTNAME = 'snapIssueWrite'
                            window.SSInterActvieController.callCameralOrAlbum(data)
                        })
                    }} />
                    <div style={{padding: '8px 40px 10px 20px'}}>
                        <ReadOnlySnapshot title="处理人" text={this.state.form.processor} />
                        <TextareaSnapshot
                            onTextChange={(v=>{
                                this.setState({form:Object.assign({}, this.state.form, {process_advise: v})})
                            })}
                            title="处理说明" text={this.state.form.process_advise} />
                    </div>
                    <div>
                        <ButtonsSnapshot
                            onSingle={()=>{
                                if (this.state.form.processor === 0 || this.state.form.process_advise ===0 || this.photo === 0) {
                                    Toast.info('请将数据填写完整 ', 1.5)
                                    return false
                                }
                                console.log(this.state.form)
                                let param = Object.assign({}, this.state.form, {click_event: 4, next_node_id: this.state.form.next_nodes[0].id})
                                Toast.loading('提交中...', 0);
                                request({type: 4, data: param}).then(() => {
                                    this.props.resultType({text: '已提交至指定负责人确认', title: '确认违章记录已妥善处理完成', icon: stateDone})
                                    Toast.hide()
                                    this.props.history.replace('/snapshot-result')
                                }).catch(() => {Toast.hide()})
                            }}
                            colorType={'primary'} type={'single'} singleText={"提交处理情况"} />
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ProcessSnapshot active={1} onTimeChange={()=>{}}  time={this.state.form.history_time} />
                </div>
            </div>
        )
    }
}

export default connect((state)=>({}), dispatch => {
    return {
        resultType: param => {
            dispatch(ResultAction(param))
        },
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)