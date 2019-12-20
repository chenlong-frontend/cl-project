import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PhotoSnapshot, ProcessSnapshot, ButtonsSnapshot, TipsRemind, ReadOnlySnapshot } from '../../components/components'
import request from '../../api/snapshot/issueVerify'
import requestData from '../../api/request'
import {NavAction} from '../../store/actions/nav'

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {},
            issueInfo: [{label: '暂无数据', value: ''}],
            vioType: '请选择违章类型'
        }
    }
    componentDidMount() {
        this.props.navSet({title: '违章记录查看'})
        const requestAsync = async () => {
            await requestData({type: 404, data: this.props.match.params}).then(data => {
                console.log(data)
                this.setState({
                    form: data,
                    vioType: data.vio_type_name
                })
            })
            await request.getIssueInfo().then(data => {
                this.setState({issueInfo: data.data.map(val => {
                    val.label = val._name
                    val.value = val._id
                    return val
                })})
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
                    <div style={{padding: '8px 40px 20px 20px'}}>
                        <div style={{padding: '15px 0'}}>
                            <TipsRemind text={'请仔细查看后审核'} />
                        </div>
                        <ReadOnlySnapshot title="违章位置" text={this.state.form.address} />
                        <ReadOnlySnapshot title="违章类型" text={this.state.vioType} />
                        {/*<SelectSnapshot onValueChange={(val) => {*/}
                            {/*this.setState({*/}
                                {/*form: Object.assign({}, this.state.form, {vio_type_id: val.value[0]}),*/}
                                {/*vioType: val.label*/}
                            {/*})*/}
                        {/*}} list={this.state.issueInfo} title="违章类型" text={this.state.vioType} />*/}
                        <ReadOnlySnapshot title="违章时间" text={this.state.form.upload_time} />
                        <ReadOnlySnapshot title="发现人" text={this.state.form.upload_name} />
                        <ReadOnlySnapshot title="违章详情" text={this.state.form.vio_desc} />
                        {/*<TextareaSnapshot value={this.state.form.vio_desc} onTextChange={val => {*/}
                            {/*this.setState({form: Object.assign({}, this.state.form, {vio_desc: val})})*/}
                        {/*}} title="违章详情" placeholder={'请填写违章详情'} />*/}
                    </div>
                </div>
                <div style={{position: 'fixed', bottom: 80, width: '100%'}}>
                    <ProcessSnapshot onTimeChange={()=>{}} active={0} time={this.state.form.history_time} />
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ButtonsSnapshot
                        onLeft={() => {
                            let data = this.props.match.params
                            this.props.history.push(`/snapshot-verifySubmit/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                        }}
                        onRight={() => {
                            let data = this.props.match.params
                            this.props.history.push(`/snapshot-verifyFailSubmit/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                        }}
                        leftText="通过审核" rightText="审核不通过"
                        colorType={'primary'} />
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