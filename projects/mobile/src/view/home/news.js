import React, { Component } from 'react';
import request from '../../api/home/index.js'
import style from './index.css';
import { Tabs } from 'antd-mobile';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'

class NewsInfo extends Component {
    render () {
        return (
            <div>
                {
                    this.props.content.map((item, index) =>
                        <li key={index} onClick={() => {this.props.onChangeData(item.news_id)}}>
                            <a>
                                {/*{item.img.length > 0 ? (*/}
                                    {/*<img src={item.img} alt='*'/>*/}
                                {/*) : ''}*/}
                                <div>{item.news_list_title}</div>
                                <div className={style.time}>{item.news_list_time}</div>
                            </a>
                        </li>
                    )
                }
            </div>
        )
    }
}

class TabChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstNews: [],
            secondNews: [],
            thirdNews: [],
            initialIndex: 0,
            page1: 1,
            page2: 1,
            page3: 1,
            start_index1: 0,
            start_index2: 0,
            start_index3: 0,
            count1: '',
            count2: '',
            count3: '',
            text: '加载',
            text1: '加载',
            text2: '加载',
            text3: '加载'
        }
        this.changeType = this.changeType.bind(this)
    }
    componentDidMount() {
        request.returnCount({count: '1', news_list_clazz: '30'}).then(value => {
            this.setState({count1: value.data[0].count})
            request.getDetailNews({page_count: value.data[0].count, start_index:this.state.start_index1, page: this.state.page1, news_list_clazz: '30'}).then(value => {
                this.setState({firstNews: value.data})
            })
        })
        request.returnCount({count: '1', news_list_clazz: '31'}).then(value => {
            this.setState({count2: value.data[0].count})
            request.getDetailNews({page_count: value.data[0].count, start_index:this.state.start_index2, page: this.state.page2, news_list_clazz: '31'}).then(value => {
                this.setState({secondNews: value.data})
            })
        })
        request.returnCount({count: '1', news_list_clazz: '77'}).then(value => {
            this.setState({count3: value.data[0].count})
            request.getDetailNews({page_count: value.data[0].count, start_index:this.state.start_index3, page: this.state.page3, news_list_clazz: '77'}).then(value => {
                this.setState({thirdNews: value.data})
            })
        })
    }
    getMoreInfo () {
        if (this.state.initialIndex === 0) {
            if (Math.ceil(this.state.count1 / 20) <= this.state.page1 ) {
                this.setState({text: '亲，我们也是有底线的', text1: '亲，我们也是有底线的'})
            } else {
                request.getDetailNews({page_count: this.state.count1, start_index:this.state.start_index1 + 20, page: this.state.page1 + 1, news_list_clazz: '30'}).then(value => {
                    for (let o of value.data) {
                        this.state.firstNews.push(o)
                    }
                    this.setState({firstNews: this.state.firstNews, start_index1: this.state.start_index1 + 20, page1: this.state.page1 + 1})
                })
            }
        }
        if (this.state.initialIndex === 1) {
            if (Math.ceil(this.state.count2 / 20) <= this.state.page2 ) {
                this.setState({text: '亲，我们也是有底线的', text2: '亲，我们也是有底线的'})
            } else {
                request.getDetailNews({page_count: this.state.count2, start_index:this.state.start_index2 + 20, page: this.state.page2 + 1, news_list_clazz: '31'}).then(value => {
                    for (let o of value.data) {
                        this.state.secondNews.push(o)
                    }
                    this.setState({secondNews: this.state.secondNews, start_index2: this.state.start_index2 + 20, page2: this.state.page2 + 1})
                })
            }
        }
        if (this.state.initialIndex === 2) {
            if (Math.ceil(this.state.count3 / 20) <= this.state.page3 ) {
                this.setState({text: '亲，我们也是有底线的', text3: '亲，我们也是有底线的'})
            } else {
                request.getDetailNews({page_count: this.state.count3, start_index:this.state.start_index3 + 20, page: this.state.page3 + 1, news_list_clazz: '77'}).then(value => {
                    for (let o of value.data) {
                        this.state.thirdNews.push(o)
                    }
                    this.setState({thirdNews: this.state.thirdNews, start_index3: this.state.start_index3 + 20, page3: this.state.page3 + 1})
                })
            }
        }
    }
    changeType (tab, index) {
        this.setState({initialIndex: index})
        if (index === 0) {
            this.setState({text: this.state.text1})
        }
        if (index === 1) {
            this.setState({text: this.state.text2})
        }
        if (index === 2) {
            this.setState({text: this.state.text3})
        }
    }
    render () {
        const tabs = [
            { title: '集团要闻' },
            { title: '企业动态' },
            { title: '其他咨询' },
        ]
        return (
            <div className={style.tabIntroduce}>
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} onTabClick={this.changeType}>
                    <div style={{ display: 'flex', height: '270px', backgroundColor: '#fff'}}>
                        <ul className={style.tabContent}>
                            <NewsInfo content={this.state.firstNews} onChangeData={val => {this.props.onChangeData(val)}}/>
                        </ul>
                    </div>
                    <div style={{ display: 'flex', height: '270px', backgroundColor: '#fff' }}>
                        <ul className={style.tabContent}>
                            <NewsInfo content={this.state.secondNews} onChangeData={val => {this.props.onChangeData(val)}}/>
                        </ul>
                    </div>
                    <div style={{ display: 'flex', height: '270px', backgroundColor: '#fff' }}>
                        <ul className={style.tabContent}>
                            <NewsInfo content={this.state.thirdNews} onChangeData={val => {this.props.onChangeData(val)}}/>
                        </ul>
                    </div>
                </Tabs>
                <div className={style.check_more}>
                    <a onClick={() => {this.getMoreInfo()}}>{this.state.text}</a>
                </div>
            </div>
        )
    }
}

class NewsList extends Component{
    componentDidMount() {
        this.props.navSet({title: '集团门户'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div className={style.body}>
                <div className={style.newsContent}>
                    <TabChange onChangeData={val => {this.props.history.push(`home-detail/${val}`)}}/>
                </div>
            </div>
        )
    }
}

export default withRouter(connect((state)=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(NewsList))