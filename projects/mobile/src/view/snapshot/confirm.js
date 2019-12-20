import React, { Component } from 'react'
import { Tabs, WhiteSpace } from 'antd-mobile'
import { ButtonsSnapshot, ProcessSnapshot, PhotoSnapshot, ReadOnlySnapshot, TipsRemind } from '../../components/components'
import { connect } from 'react-redux'
import request from '../../api/request'
import stateDone from '../../assets/svg/state_done.svg'
import {ResultAction} from '../../store/actions/snapshot/index'
import {NavAction} from '../../store/actions/nav'

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form: {}
        }
    }
    componentDidMount() {
        this.props.navSet({title: '违章记录确认'})
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
                <div style={{ position: 'absolute', top: 45, bottom: 128, left: 0, right: 0 }}>
                    <Tabs tabs={[{ title: '违章记录' }, { title: '处理记录' }]}
                          tabBarBackgroundColor='#EBF5FD'
                    >
                        <div>
                            <PhotoSnapshot img={this.state.form.vio_pic} />
                            <div style={{padding: '8px 40px 20px 20px', backgroundColor: '#FFFFFF'}}>
                                <div style={{padding: '10px 0 8px 0'}}>
                                    <TipsRemind text={"查看违章记录及其处理记录，确认无误后点击完成"} />
                                </div>
                                <ReadOnlySnapshot title="违章位置" text={this.state.form.address} />
                                <ReadOnlySnapshot title="违章类型" text={this.state.form.vio_type_name} />
                                <ReadOnlySnapshot title="违章时间" text={this.state.form.upload_time} />
                                <ReadOnlySnapshot title="发现人" text={this.state.form.upload_name} />
                                <ReadOnlySnapshot title="违章详情" text={this.state.form.vio_desc} />
                            </div>
                        </div>
                        <div>
                            <PhotoSnapshot img={this.state.form.process_pic} />
                            <div style={{padding: '8px 40px 20px 20px', backgroundColor: '#FFFFFF'}}>
                                <ReadOnlySnapshot title={'问题等级'} text={this.state.form.vio_level_name} />
                                <ReadOnlySnapshot title={'指派部门'} text={this.state.form.gro_name} />
                                <ReadOnlySnapshot title={'审核意见'} text={this.state.form.verify_advise} />
                                <WhiteSpace/>
                                <ReadOnlySnapshot title={'处理人'} text={this.state.form.processor} />
                                <ReadOnlySnapshot title={'处理说明'} text={this.state.form.process_advise} />
                            </div>
                        </div>
                    </Tabs>
                </div>
                <div style={{position: 'fixed', bottom: 80, width: '100%'}}>
                    <ProcessSnapshot active={2} time={this.state.form.history_time}
                                     onTimeChange={() => {}}
                    />
                </div>
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <ButtonsSnapshot
                        onSingle={()=>{
                            let param = Object.assign({}, this.state.form, {click_event: 5, next_node_id: this.state.form.next_nodes[0].id})
                            request({type: 4, data: param}).then((data) => {
                                this.props.resultType({text: '', title: '确认违章记录已妥善处理完成', icon: stateDone})
                                this.props.history.replace('/snapshot-result')
                            })
                        }}
                        singleText={"确认违章记录 处理完成"} colorType={'primary'} type={'single'} />
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