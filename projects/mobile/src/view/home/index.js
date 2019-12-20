import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import request from '../../api/home/index.js'
import style from './index.css';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import { Link } from 'react-router-dom'
import mask from '../../assets/img/home/mask.png';
import logo from '../../assets/img/home/logo.png';
import tree from '../../assets/img/home/tree.jpg';

window.NProgress.start()

function Nav (props) {
    return (
        <div className={style.head_log}>
            <div className={style.banner}>
                <img src={mask} alt='*' />
            </div>
            <div className={style.slogan}>
                <img src={logo} alt='*' />
                <h3 className={style.title}>中国江苏国际经济技术合作集团有限公司</h3>
            </div>
        </div>
    )
}

function Introduce(props) {
    return (
        <div className={style.introduce}>
            <div className={style.news_box}>
                <span className={style.line}></span>
                <div className={style.title}>集团简介</div>
                <p className={style.introduceText}>中国江苏国际经济技术合作公司（简称“中江国际”）是直属江苏省政府的国有独资企业，于1980年12月经国务院批准成立，集国际国内工程承包、工程咨询服务、房地产开发、进出口贸易、对外劳务合作为一体的综合性跨国公司。</p>
            </div>
        </div>
    )
}

class NewsBox extends Component {
    render () {
        return (
            this.props.newsContent.filter(t => {
                return t.class === this.props.class
            }).map((item, index) => (
                <li key={index} onClick={() => {this.props.onTextChange(`home-detail/${item.news_id}`)}}>
                    <div className={style.title}>{item.title}</div>
                </li>
            ))
        )
    }
}

class TabChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsContent: []
        }
    }
    componentDidMount() {
        request.getNewsInfo({group: '30', co: '31', other: 77, start_index: 0, page_size: 5}).then(value => {
            console.log(value.data)
            this.setState({newsContent: value.data})
        })
    }
    render () {
        const tabs = [
            { title: '集团要闻' },
            { title: '企业动态' },
            { title: '其他咨询' },
        ];
        return (
            <div className={style.tabIntroduce}>
                <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
                    <div style={{ display: 'flex', height: '170px', backgroundColor: '#fff' }}>
                        <ul className={style.tabContent}>
                            <NewsBox  onTextChange={(val) => {this.props.onTextChange(val)}} newsContent={this.state.newsContent} class={'30'}/>
                        </ul>
                    </div>
                    <div style={{ display: 'flex', height: '170px', backgroundColor: '#fff' }}>
                        <ul className={style.tabContent}>
                            <NewsBox  onTextChange={(val) => {this.props.onTextChange(val)}} newsContent={this.state.newsContent} class={'31'}/>
                        </ul>
                    </div>
                    <div style={{ display: 'flex', height: '170px', backgroundColor: '#fff' }}>
                        <ul className={style.tabContent}>
                            <NewsBox  onTextChange={(val) => {this.props.onTextChange(val)}} newsContent={this.state.newsContent} class={'77'}/>
                        </ul>
                    </div>
                </Tabs>
                <div className={style.check_more}>
                    <Link to='/home-news'>查看更多集团要闻</Link>
                </div>
            </div>
        )
    }
}

function OrganizePic() {
    return (
        <div className={style.introduce}>
            <div className={style.news_box}>
                <div className={style.title}>集团组织架构</div>
                <span className={style.line}></span>
                <div>
                    <img src={tree} alt='*' />
                </div>
            </div>
        </div>
    )
}

class UserImg extends Component{
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
                <div className={style.content}>
                    <Nav />
                    <Introduce />
                    <TabChange onTextChange={(val) => {this.props.history.push(val)}} />
                    <OrganizePic />
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
})(UserImg))
