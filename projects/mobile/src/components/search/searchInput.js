import React, { Component } from 'react'
import { SearchBar, Grid } from 'antd-mobile';
import { Count, TabTop, ListWork } from '../../components/components'
import stateDeal from '../../assets/svg/state_deal.svg'
import stateProcess from '../../assets/svg/state_process.svg'
import stateDone from '../../assets/svg/state_done.svg'
import style from './searchInput.css'
import request from '../../api/components/searchInput'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabTop: [{name: '待我处理', id: 0}, {name: '流程进行中', id: 1}, {name: '流程已结束', id: 2}],
            list: [{}],
            count: 0,
            tabTopIndex: 0,
            resultDisplay: false
        }
        this.handleTab = this.handleTab.bind(this)
    }
    componentDidMount () {
        console.log(this.props.name)
    }
    handleTab (val, index) {
        request.getList(val.id).then(data => {
            this.setState({
                list: data.data.issue,
                count: data.data.count,
                tabTopIndex: index
            })
        })
    }
    render() {
        const type = [{text: '待我处理', icon: stateDeal, id: 0},
            {text: '流程进行中', icon: stateProcess, id: 1},
            {text: '流程已结束', icon: stateDone, id: 2}]
        return (
            <div>
                <SearchBar cancelText={'返回'} placeholder={this.props.placeholder}
                    showCancelButton={true}
                    onCancel={(val) => {this.props.onSearchChange();this.setState({resultDisplay: false})}}
                />
                <div style={{display: (this.state.resultDisplay?'none':'block')}}>
                    <Grid data={type} hasLine={false}
                        onClick={el => {
                            this.setState({tabTopIndex: el.id})
                            this.setState({resultDisplay: true})
                            request.getList(el.id).then(data => {
                                this.setState({
                                    list: data.data.issue,
                                    count: data.data.count
                                })
                            })
                        }}
                        columnNum = {3} itemStyle={{backgroundColor: '#efeff4'}}
                        className='search-input-icon' square={false} />
                </div>
                <div style={{display: (this.state.resultDisplay?'block':'none')}}>
                    <TabTop item={this.state.tabTop} index={this.state.tabTopIndex} onTabChange={this.handleTab} />
                    <div className={style.resultBox}>
                        <ListWork list={this.state.list} />
                    </div>
                    <Count text={'搜索结果' + this.state.count + '条'} />
                </div>
            </div>
        )
    }
}

export default Search