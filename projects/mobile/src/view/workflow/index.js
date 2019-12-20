import React, { Component } from 'react'
import { Carousel, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import style from './css/index.css'
import request from '../../api/request'
import logo from '../../assets/img/workflow/logo.png'
import msg_grey from '../../assets/img/workflow/msg_grey.png'
import { withRouter } from 'react-router'

// 头部
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            proName: '未知'
        }
    }
    componentDidMount() {
        request({type: 425, data: {}}).then((data) => {
            this.setState({
                proName: data.pro_name,
            });
        })
    }
    render () {
        return (
            <header className={style.header}>
                <img className={style.logo} src={logo} alt='pic' />
                <div className={style.title}>
                    <p className="company">中江国际集团有限公司</p>
                    <p className="department">{this.state.proName}</p>
                </div>
                <a className={style.icon}>
                    <img src={msg_grey} alt='pic' />
                </a>
            </header>
        )
    }
}

// 新闻
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            imgHeight: 220,
            slideIndex: 0,
        }
    }
    componentDidMount() {
        window.NProgress.done()
        request({type: 902, data: {}}).then((data) => {
            let arr = data.map(val => {
                return val.news_home_pic
            })
            this.setState({
                data: arr
            });
        })
    }
    render() {
        return (
            <Carousel autoplay={false} infinite>
                {this.state.data.map(val => (
                    <a key={val}
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                        <img src={val}
                             alt=''
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                            }}
                        />
                    </a>
                ))}
            </Carousel>
        );
    }
}

// 菜单
class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{title: '', menu: []}]
        }
    }
    componentDidMount () {
        request({type: 406, data: {}}).then((data) => {
            this.setState({
                data: data.map(val => {
                    for (let o of val.child) {o['text'] = o['name']}
                    return val
                }),
            });
        })
    }
    render () {
        return (
            <div>
                {this.state.data.map((val, index) => (
                    <div key={index} className={index !==this.state.data.length - 1 ? style['meun-line'] : null}>
                        <div className={style.subTitle} key={'title' + index}>{val.name}</div>
                        <Grid data={val.child} hasLine={false} onClick={el => {
                            let href = window.location.href
                            window.SSInterActvieController.openNewAction(`${href.slice(0, href.indexOf('#'))}#${el.mobile_url}`)
                          //  window.location.href = `${href.slice(0, href.indexOf('#'))}#${el.mobile_url}`
                        }}
                              className='workflow-index-icon'
                              square={false} key={'menu' + index} />
                    </div>
                ))}
            </div>
        )
    }
}

// 注入路由
const MenuWithRouter = withRouter(Menu)

class View extends Component {
    componentDidMount() {
        this.props.navSet({title: 'index'})
    }
    render() {
        return (
            <div className='workflow'>
                <Header/>
                <div style={{ position: 'fixed', top: 45, bottom: 0, left: 0, right: 0, overflowX: 'auto' }}>
                    <News/>
                    <MenuWithRouter/>
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