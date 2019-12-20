import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import request from '../../api/workflow/start'
import requestData from '../../api/request'
import { ListWork, Count, TabTop } from '../../components/components'

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabTop: [{}],
            tabDeep: [{}],
            tabTopIndex: 0,
            activeTabTop: {},
            showAllFlag: true,
            count: 0,
            list: [{}],
        }
        this.handleTab = this.handleTab.bind(this)
        this.deepTabChange = this.deepTabChange.bind(this)
    }
    componentDidMount () {
        this.props.navSet({title: '抄送给我的'})
        const requestAsync = async () => {
            await request.getList().then(data => {
                this.setState({list: data.data})
            })
            await request.getTopTab().then(data => {
                let arr = data.data.map(val => {
                    val.name = val.node_name
                    return val
                })
                arr.unshift({name: '全部'})
                this.setState({tabTop: arr})
            })
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    // 流程点击
    handleTab (val, index) {
        this.setState({tabTopIndex: index, activeTabTop: val})
        if (val.name === '全部') {
            this.setState({showAllFlag: true})
            request.getList().then(data => {
                this.setState({list: data.data})
            })
        } else {
            this.setState({showAllFlag: false})
            console.log(val)
            request.getDeepTab(val.flow_id).then(data => {
                console.log(data)
                let arr = data.data.nodes.map(val => {
                    val.title = val.alias
                    return val
                })
                arr.unshift({title: '全部', flow_id: val.flow_id, node_ids: []})
                this.setState({
                    tabDeep: arr,
                    list: data.data.orders
                })
            })
        }
    }
    // 流程下节点点击
    deepTabChange(tab, index) {
        if (tab.title === "全部") {
            request.getDeepTab(tab.flow_id).then(data => {
                this.setState({list: data.data.orders})
            })
        } else {
            request.getNodeList({flow_id: this.state.activeTabTop.flow_id, node_ids: tab.node_ids}).then(data => {
                this.setState({list: data.data})
            })
        }
        console.log(tab)
    }
    render() {
        return (
            <div>
                <TabTop item={this.state.tabTop} index={this.state.tabTopIndex} onTabChange={this.handleTab} />
                <div style={{ position: 'fixed', top: 85, bottom: 40, left: 0, right: 0, backgroundColor: '#FFFFFF',overflowX: 'auto' }}>
                    {this.state.showAllFlag?(<ListWork list={this.state.list} up={false}
                                                       onItemChanage={(data) => {
                                                           requestData({type: 404, data: data}).then(val => {
                                                               this.props.history.push(`${val.form_url}/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                                                           })
                                                       }}
                        />)
                        :<Tabs tabs={this.state.tabDeep}  tabBarBackgroundColor='#DCE6EE'
                               tabBarActiveTextColor='#424242' tabBarInactiveTextColor='#7F7F7F'
                               onChange={this.deepTabChange}
                        ><ListWork list={this.state.list}
                                   onItemChanage={(data) => {
                                       requestData({type: 404, data: data}).then(val => {
                                           this.props.history.push(`${val.form_url}/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                                       })
                                   }}
                        /></Tabs>}
                </div>
                <Count text={'共' + this.state.list.length + '条'} />
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