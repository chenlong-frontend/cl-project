import React, { Component } from 'react'
import style from './css/working.css'
import { Flex, WhiteSpace, Badge, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import request from '../../api/request'
import cc from '../../assets/img/workflow/cc.png'
import launch from '../../assets/img/workflow/launch.png'
import todo from '../../assets/img/workflow/work_toDo.png'

// 待办事项
class Working extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dealCount: 0,
            startCount: 0,
            ccCount: 0
        }
    }
    componentDidMount () {
        request({type: 413, data: {}}).then((data) => {
            this.setState({
                dealCount: data[0].count
            });
        })
    }
    render () {
        return (
            <Flex className={style.flexContainer}>
                <Flex.Item>
                    <Link to='/workflow-deal'>
                        <div className={style.flexItem}>
                            <img className={style.img} alt='' src={todo} />
                            <p>处理事项</p>
                            <Badge className={style.count} style={{top: '18px'}} text={this.state.dealCount} overflowCount={99} />
                        </div>
                    </Link>
                </Flex.Item>
                <Flex.Item>
                    <Link to='/workflow-launch'>
                        <div className={style.flexItem}>
                            <img className={style.img} alt='' src={launch} />
                            <p>我发起的</p>
                            <Badge className={style.count} style={{top: '16px'}} text={this.state.startCount} overflowCount={99} />
                        </div>
                    </Link>
                </Flex.Item>
                <Flex.Item>
                    <Link to='/workflow-start'>
                        <div className={style.flexItem}>
                            <img className={style.img} alt='' src={cc} />
                            <p>抄送我的</p>
                            <Badge className={style.count} style={{top: '13px'}} text={this.state.ccCount} overflowCount={99} />
                        </div>
                    </Link>
                </Flex.Item>
            </Flex>
        )
    }
}

// 快捷菜单
class Menu extends Component {
    render () {
        return (
            <div>
                <div className={style['menu-line']}>
                    <div className={style.subTitle}>{this.props.title}</div>
                    <Grid data={this.props.menu} hasLine={false} square={false} className='workflow-working-icon'
                          onClick={el => {this.props.onMenuChange(el)}}
                    />
                </div>
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '发起新待办',
            menu: []
        }
    }
    componentDidMount() {
        this.props.navSet({title: '工作台'})
        const requestAsync = async () => {
            await request({type: 405, data: {}}).then((data) => {
                this.setState({
                    menu: data.map(val => {
                        val.text = val.alias
                        return val
                    })
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
    render() {
        return (
            <div>
                <Working/>
                <WhiteSpace/>
                <Menu onMenuChange={val => {
                    this.props.history.push(val.url)
                }} menu={this.state.menu} title={this.state.title} />
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
