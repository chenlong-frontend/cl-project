import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import requestData from '../../api/request'
import request from '../../api/workflow/deal'
import { ListWork, Count, SearchInput } from '../../components/components'

window.NProgress.start()

// tab页
class TabMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondaryText: ''
        };
        this.tabChange = this.tabChange.bind(this);
        this.tabSecondaryChange = this.tabSecondaryChange.bind(this);
    }
    componentDidMount () {
        this.setState({secondaryText: this.props.secondaryText})
    }
    tabChange(tab, index) {
        index === 0 ? this.props.onTextChange(tab.title + this.props.dealCount + '条') : this.props.onTextChange(this.state.secondaryText)
    }
    tabSecondaryChange (tab, index) {
        let text;
        index === 0 ? text = (tab.title + this.props.processCount + '条') : text = (tab.title + this.props.endCount + '条');
        this.props.onTextChange(text);
        this.setState({secondaryText: text})
        console.log(text)
    }
    render() {
        return (
            <div style={{ position: 'absolute', top: 45, bottom: 40, left: 0, right: 0 }}>
                <Tabs tabs={[{ title: '待我处理的' }, { title: '我处理的' }]}
                      tabBarBackgroundColor='#DCE6EE'
                      onChange={this.tabChange}
                >
                    <ListWork type={0} list={this.props.dealList} onItemChanage={(data)=>{this.props.onItemChanage(data)}} />
                    <Tabs tabs={[{ title: '流程进行中' }, { title: '流程结束' }]}
                          tabBarBackgroundColor='#FFFFFF'
                          swipeable={false}
                          tabBarUnderlineStyle={{display: 'none'}}
                          tabBarActiveTextColor='#424242'
                          tabBarInactiveTextColor='#7F7F7F'
                          onChange={this.tabSecondaryChange}
                    >
                        <ListWork list={this.props.processList} onItemChanage={(data)=>{this.props.onItemChanage(data)}} />
                        <ListWork list={this.props.endList} onItemChanage={(data)=>{this.props.onItemChanage(data)}} />
                    </Tabs>
                </Tabs>
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSort = this.handleSort.bind(this)
        this.state = {
            dealList: [{}],
            dealCount: 0,
            processList: [{}],
            processCount: 0,
            endList: [{}],
            endCount: 0,
            text: '当前无信息',
            searchDisplay: false,
            sortType: 'up'
        };
    }
    componentDidMount () {
        this.props.navSet({title: '待办事项',search: ()=>{
            this.setState({searchDisplay: true})
        }, sort: ()=>{
            let sortType = this.state.sortType === 'up'?'down':'up';
            this.handleSort(sortType)
            this.setState({ sortType })
        }});
        const requestAsync = async () => {
            await request.getDealList().then(data => {
                this.setState({
                    dealList: data.data.issue,
                    dealCount: data.data.count,
                    text: '待我处理的' + data.data.count + '条',
                });
            })
            await request.getProcessList().then(data => {
                this.setState({
                    processList: data.data.issue,
                    processCount: data.data.count
                });
            })
            await request.getEndList().then(data => {
                this.setState({
                    endList: data.data.issue,
                    endCount: data.data.count
                });
            })
            return true
        }
        requestAsync().then(v => {window.NProgress.done()
        }).catch(e => {window.NProgress.done()})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    handleTextChange(text) {
        this.setState({text: text});
    }
    handleSort(val){
        let sortType = val === 'down'?1:-1;
        function sortFn(a, b) {
            return sortType*(Date.parse(a.history_time) - Date.parse(b.history_time))
        }
        let dealList = this.state.dealList.sort(sortFn);
        let processList = this.state.processList.sort(sortFn);
        let endList = this.state.endList.sort(sortFn);
        this.setState({ dealList, processList, endList});
    }
    render() {
        return (
            <div>
                <TabMenu dealList={this.state.dealList} secondaryText={'流程进行中' + this.state.processCount + '条'}
                         processList={this.state.processList} endList={this.state.endList}
                         dealCount={this.state.dealCount} processCount={this.state.processCount} endCount={this.state.endCount}
                         onTextChange={this.handleTextChange}
                         onItemChanage={(data) => {
                             requestData({type: 404, data: data}).then(val => {
                                 this.props.history.push(`${val.form_url}/${data.cur_node_id}/${data.is_edit}/${data.history_id}/${data.record_id}/${data.form_table_name}/${data.form_id}/${data.flow_id}/${data.form_table_id}/${data.history_time}`)
                             })
                         }}
                />
                <Count text={this.state.text} />
                <div style={{position: 'fixed' , display: (this.state.searchDisplay?'block':'none'),zIndex: 9999, backgroundColor: '#efeff4', top: 0, bottom: 0, right: 0, left: 0}}>
                    <SearchInput onSearchChange={() => {this.setState({searchDisplay: false});}} placeholder={"按姓名或状态别名搜索"} />
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