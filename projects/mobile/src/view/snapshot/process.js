import React, { Component } from 'react'
import { WhiteSpace  } from 'antd-mobile'
import { PhotoSnapshot, ProcessSnapshot, ReadOnlySnapshot, TipsRemind, ButtonsSnapshot } from '../../components/components'
import { connect } from 'react-redux'
import request from '../../api/request'
import {NavAction} from '../../store/actions/nav'
import style from './css/process.css'

// 底部按钮
class BottomBtn extends Component {
    render () {
        return (
            <div className={style.buttonBox}>
                <div className={style.button}>
                <div className={style.left}>
                   <button
                        onClick={()=>{this.props.onLeft()}}
                   >汇报进度</button>
                </div>
                <div className={style.right}>
                    <button
                        onClick={()=>{this.props.onRight()}}
                    >违章处理完成情况</button>
                </div>
                </div>
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }
    componentDidMount() {
        this.props.navSet({title: '违章记录-待处理'})
        const requestAsync = async () => {
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
                <div style={{position: 'absolute', top: '45px', bottom: '128px', left: 0, right: 0, overflow: 'auto'}}>
                    <PhotoSnapshot img={this.state.form.vio_pic} />
                    <div style={{padding: '0 40px 20px 20px'}}>
                        <div style={{padding: '15px 0 8px 0'}}>
                            <TipsRemind text={'请查看审核意见，点击底部按钮填写违章处理情况'} />
                        </div>
                        <ReadOnlySnapshot title="违章位置" text={this.state.form.address} />
                        <ReadOnlySnapshot title="违章类型" text={this.state.form.vio_type_name} />
                        <ReadOnlySnapshot title="违章时间" text={this.state.form.upload_time} />
                        <ReadOnlySnapshot title="发现人" text={this.state.form.upload_name} />
                        <ReadOnlySnapshot title="违章详情" text={this.state.form.vio_desc} />
                        <WhiteSpace/>
                        <ReadOnlySnapshot title={'问题等级'} text={this.state.form.vio_level_name} />
                        <ReadOnlySnapshot title={'指派部门'} text={this.state.form.gro_name} />
                        <ReadOnlySnapshot title={'审核意见'} text={this.state.form.verify_advise} />
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 80, width: '100%'}}>
                    <ProcessSnapshot active={1} time={this.state.form.history_time}
                                     onTimeChange={() => {}}
                    />
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    {this.state.form.is_over === 1?
                        <ButtonsSnapshot
                            onSingle={()=>{
                                this.setState({form: Object.assign({}, this.state.form, {is_over: '0'}),})
                            }}
                            type={'single'} singleText={'我来处理'} />:
                        <BottomBtn onLeft={()=>{
                            let data = this.props.match.params
                            this.props.history.push(`/snapshot-processReport/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                        }}
                                   onRight={()=>{
                                       let data = this.props.match.params
                                       this.props.history.push(`/snapshot-processSubmit/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                                   }}
                        />}
                </div>
            </div>
        )
    }
}

export default connect(state=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)