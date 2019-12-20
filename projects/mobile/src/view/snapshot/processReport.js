import React, { Component } from 'react'
import { Modal, List, InputItem, TextareaItem, Toast } from 'antd-mobile'
import { createForm } from 'rc-form';
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { ChatBoxSnapshot } from '../../components/components'
import request from '../../api/request'
import style from './css/processReport.css'
import {NavAction} from '../../store/actions/nav'
import edit from '../../assets/img/snapshot/edit.png'

// 表单
class Report extends Component {
    render () {
        return (
            <List>
                <InputItem
                    placeholder="处理流程"
                    clear
                    value={this.props.proValue}
                    moneyKeyboardAlign="left"
                    onChange={(v) => { this.props.onProChange(v) }}
                >处理流程:</InputItem>
                <TextareaItem
                    title="处理内容"
                    placeholder="处理内容"
                    data-seed="logId"
                    autoHeight
                    value={this.props.contentValue}
                    onChange={(v) => { this.props.onContentChange(v) }}
                />
            </List>
        )
    }
}

const ReportWrapper = createForm()(Report);

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            form:{
                process:"",
                content:"",
                record_id:"",
                iss_id:"",
                pic:""
            },
            list:[{}],
            user:{}
        };
    }
    componentDidMount() {
        this.props.navSet({title: '违章处理完成情况'})
        const requestAsync = async () => {
            // ***************请求用户信息************//
            await request({type: 2, data: {}}).then((data) => {
                let user = data.info
                user.emp_name = user.name
                this.setState({
                    user: user
                })
            })
            // ***************请求报告信息************//
            await request({type: 9, data: {}}).then((data) => {
                this.setState({
                    list: data
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
                <div style={{position: 'absolute', top: '45px', bottom: '100px', left: '0', right: '0', padding: '20px 20px 20px 10px'}}>
                    <ChatBoxSnapshot list={this.state.list} />
                </div>
                <div className={style.bottom}>
                    <a onClick={()=>{this.setState({modal: true})}}><img alt={''} src={edit} /></a>
                </div>
                <Modal
                    visible={this.state.modal}
                    transparent
                    title="汇报进度"
                    style={{width: '80%'}}
                    onClose={()=>{this.setState({modal: false})}}
                    footer={[{ text: '提交',
                        onPress: () => {
                            console.log(this.state.form)
                            let listItem = Object.assign({}, this.state.form, this.state.user)
                            listItem.create_time = format(new Date(), 'YYYY-MM-DD')
                            Toast.loading('提交中...', 0);
                            this.setState({modal: false})
                            request({type: 10, data: {}}).then((data) => {
                                this.state.list.push(listItem)
                                Toast.hide()
                            })
                        }
                    }]}
                >
                    <div style={{ maxHeight: 200, overflow: 'scroll' }}>
                        <ReportWrapper
                            onProChange={(v)=> {
                                this.setState({
                                    form:Object.assign({},this.state.form,{process:v})
                                })
                            }}
                            proValue={this.state.form.process}
                            contentValue={this.state.form.content}
                            onContentChange={(v)=> {
                                this.setState({
                                    form:Object.assign({},this.state.form,{content:v})
                                })
                            }}
                        />
                    </div>
                </Modal>
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