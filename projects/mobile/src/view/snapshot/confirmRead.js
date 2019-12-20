import React, { Component } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { connect } from 'react-redux'
import request from '../../api/request'
import {NavAction} from '../../store/actions/nav'
import { ProcessSnapshot, PhotoSnapshot, ReadOnlySnapshot } from '../../components/components'

class View extends Component {
    constructor(props) {
        super(props)
        this.state={
            getForm: {}
        }
    }
    componentDidMount() {
        this.props.navSet({title: '违章记录确认'})
        const requestAsync = async () => {
            await request({type: 404, data: this.props.match.params}).then(data => {
                this.setState({
                    getForm: Object.assign({}, this.state.getForm, data)
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
                <div style={{ position: 'absolute', top: 45, bottom: 48, left: 0, right: 0 }}>
                    <Tabs tabs={[{ title: '违章记录' }, { title: '处理记录' }]}
                          tabBarBackgroundColor='#EBF5FD'
                    >
                        <div>
                            <PhotoSnapshot img={this.state.getForm.vio_pic} />
                            <div style={{padding: '8px 40px 20px 20px', backgroundColor: '#FFFFFF'}}>
                                <ReadOnlySnapshot title="违章位置" text={this.state.getForm.address} />
                                <ReadOnlySnapshot title="违章类型" text={this.state.getForm.vio_type_name} />
                                <ReadOnlySnapshot title="违章时间" text={this.state.getForm.upload_time} />
                                <ReadOnlySnapshot title="发现人" text={this.state.getForm.upload_name} />
                                <ReadOnlySnapshot title="违章详情" text={this.state.getForm.vio_desc} />
                            </div>
                        </div>
                        <div>
                            <PhotoSnapshot img={this.state.getForm.process_pic} />
                            <div style={{padding: '8px 40px 20px 20px', backgroundColor: '#FFFFFF'}}>
                                <ReadOnlySnapshot title={'问题等级'} text={this.state.getForm.vio_level_name} />
                                <ReadOnlySnapshot title={'指派部门'} text={this.state.getForm.gro_name} />
                                <ReadOnlySnapshot title={'审核意见'} text={this.state.getForm.verify_advise} />
                                <WhiteSpace/>
                                <ReadOnlySnapshot title={'处理人'} text={this.state.getForm.processor} />
                                <ReadOnlySnapshot title={'处理说明'} text={this.state.getForm.process_advise} />
                            </div>
                        </div>
                    </Tabs>
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ProcessSnapshot active={3} onTimeChange={() => {}} time={this.state.getForm.history_time} />
                </div>
            </div>
        )
    }
}

export default connect((state)=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)