import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import request from '../../api/request'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'
import { PhotoSnapshot, ProcessSnapshot, ButtonsSnapshot, TipsRemind, SelectSnapshot, TextareaSnapshot } from '../../components/components'
import doneSvg from '../../assets/svg/state_done.svg'

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                gro_id: '',
                verify_advise: '',
                vio_level_id: ''
            },
            levelInfo: [{label: '暂无数据', value: ''}],
            depInfo: [{label: '暂无数据', value: ''}],
            vioType: '请选择审核部门',
            levelType: '请选择问题等级'
        }
    }
    componentDidMount() {
        this.props.navSet({title: '审核通过'})
        const requestAsync = async () => {
            await request({type: 404, data: this.props.match.params}).then(data => {
                this.setState({
                    form: Object.assign({},this.state.form, data),
                    levelInfo: data.vio_level.map(val => {
                        return {
                            label: val._name,
                            value: val._id
                        }
                    }),
                    depInfo: data.next_nodes.map(val => {
                        return {
                            label: val.name,
                            value: val.id
                        }
                    })
                })
            })
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    render () {
        return (
            <div>
                <div style={{position: 'absolute', top: '45px', bottom: '40px', left: 0, right: 0, overflow: 'auto'}}>
                    <PhotoSnapshot img={this.state.form.vio_pic} />
                    <div style={{padding: '8px 40px 10px 20px', backgroundColor: '#FFF'}}>
                        <div style={{padding: '15px 0'}}>
                            <TipsRemind text={'请指派违章处理部门，并填写意见'} />
                        </div>
                        <SelectSnapshot
                            onValueChange={val => {
                                this.setState({
                                    form: Object.assign({}, this.state.form, {vio_level_id: val.value[0]}),
                                    levelType: val.label
                                })
                            }}
                            list={this.state.levelInfo} title="问题等级" text={this.state.levelType}/>
                        <SelectSnapshot
                            onValueChange={val => {
                                this.setState({
                                    form: Object.assign({}, this.state.form, {gro_id: val.value[0]}),
                                    vioType: val.label
                                })
                            }}
                            list={this.state.depInfo} title="处理部门" text={this.state.vioType}/>
                        <TextareaSnapshot value={this.state.form.verify_advise} onTextChange={val => {
                            this.setState({form: Object.assign({}, this.state.form, {verify_advise: val})})
                        }} title="审核意见" placeholder={'请填写审核意见'} />
                    </div>
                    <div style={{paddingBottom: 10}}>
                        <ButtonsSnapshot onSingle={()=>{
                            if (this.state.form.gro_id.length === 0 || this.state.form.verify_advise.length ===0 || this.state.form.vio_level_id.length ===0) {
                                Toast.info('请将数据填写完整', 1.5)
                                return false
                            }
                            Toast.loading('提交中...', 0);
                            let param = Object.assign({}, this.state.form, {click_event: 2, next_node_id: this.state.form.gro_id})
                            request({type: 4, data: param}).then(() => {
                                this.props.setResult({text: '违章记录已审核通过', title: '已提交至指定负责人处理', icon: doneSvg})
                                Toast.hide()
                                this.props.history.replace('/snapshot-result')
                            }).catch(() => {Toast.hide()})
                        }} colorType={'primary'} type={'single'} singleText="审核通过" />
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ProcessSnapshot onTimeChange={()=>{}} active={1} time={this.state.form.history_time} />
                </div>
            </div>
        )
    }
}

export default connect((state)=> ({}), dispatch=>{
    return {
        setResult: (param)=>{
            dispatch(ResultAction(param))
        },
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)