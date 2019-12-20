import React, { Component } from 'react'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import request from '../../api/request'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'
import { PhotoSnapshot, ProcessSnapshot, ButtonsSnapshot, SelectSnapshot, TextareaSnapshot } from '../../components/components'
import stateFail from '../../assets/svg/state_fail.svg'

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                fail_id: '',
                verify_advise: ''
            },
            failInfo: [{label: '暂无数据', value: ''}],
            vioType: '请选择驳回原因'
        }
    }
    componentDidMount() {
        this.props.navSet({title: '审核不通过'})
        const requestAsync = async () => {
            await request({type: 404, data: this.props.match.params}).then(data => {
                this.setState({
                    form: Object.assign({},this.state.form, data),
                    failInfo: data.fail_reason.map(val => {
                        return {
                            label: val._name,
                            value: val._id
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
                <div style={{position: 'absolute', top: '45px', bottom: '40px', left: 0, right: 0, overflow: 'auto',backgroundColor: '#FFF'}}>
                    <PhotoSnapshot onTimeChange={()=>{}} img={this.state.form.vio_pic} />
                    <div style={{padding: '8px 40px 10px 20px'}}>
                        <SelectSnapshot
                            onValueChange={val => {
                                this.setState({
                                    form: Object.assign({}, this.state.form, {fail_id: val.value[0]}),
                                    vioType: val.label
                                })
                            }}
                            list={this.state.failInfo} title="驳回原因" text={this.state.vioType}/>
                        <TextareaSnapshot value={this.state.form.verify_advise} onTextChange={val => {
                            this.setState({form: Object.assign({}, this.state.form, {verify_advise: val})})
                        }} title="审核意见" placeholder={'请填写审核意见'} />
                    </div>
                    <div style={{paddingBottom: 10}}>
                        <ButtonsSnapshot onSingle={()=>{
                            if (this.state.form.fail_id === 0 || this.state.form.verify_advise ===0) {
                                Toast.info('请将数据填写完整', 1.5)
                                return false
                            }
                            let param = Object.assign({}, this.state.form, {click_event: 3, next_node_id: '20170831113128002'})
                            Toast.loading('提交中...', 0);
                            request({type: 4, data: param}).then(() => {
                                this.props.setResult({text: '违章记录已拒绝', icon: stateFail})
                                Toast.hide()
                                this.props.history.replace('/snapshot-result')
                            }).catch(() => {Toast.hide()})
                        }} colorType={'primary'} type={'single'} singleText="审核不通过" />
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ProcessSnapshot active={0} time={this.state.form.history_time} />
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