import React, { Component } from 'react'
import { Tabs } from 'antd-mobile'
import { withRouter } from 'react-router'
import { UserInfo, TipsRemind } from '../../components/components'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import request from '../../api/request'
import style from './css/index.css'
import location from '../../assets/img/snapshot/location.png'
import shot from '../../assets/img/snapshot/shot.png'

window.NProgress.start()

class Shot extends Component {
    constructor(props){
        super(props)
        this.state={
            location: '无法获取定位'
        }
    }
    componentDidMount() {
        window.__location__ = this
    }
    render () {
        return (
            <div className={style.takePhoto}>
                <div>
                    <div>
                        <img className={style.loactionImg} src={location} alt={''} />
                        <span className={style.location}>当前位置 : {this.state.location} </span>
                    </div>
                    <div className={style.time}>
                    </div>
                    <div className={style.photoBox}>
                        <a>
                            <div onClick={()=>{
                                this.props.onCameraChange()
                            }}
                                className={style.circleBox}>
                                <img src={shot} alt={''} />
                                <span>点击拍照</span>
                            </div>
                        </a>
                    </div>
                    <TipsRemind onRemindChange={()=>{this.props.onRemindChange()}} text={'查看随手拍注意事项'} />
                </div>
            </div>
        )
    }
}

// tab
class TabBottom extends Component {
    constructor(props){
        super(props)
        this.state = {
            userInfo: {}
        }
    }
    componentDidMount() {
        request({type: 2, data: {}}).then(data => {
            this.setState({
                userInfo: data.info
            });
        })
    }
    render () {
        const tabs2 = [
            { title: '主页', sub: '1' },
            { title: '看板', sub: '2' },
        ];
        return (
            <Tabs tabs={tabs2}
                  tabBarPosition="bottom"
                  renderTab={tab => <span>{tab.title}</span>}
            >
                <div>
                    <UserInfo userInfo={this.state.userInfo} />
                    <Shot onCameraChange={() => {this.props.onCameraChange()}} onRemindChange={()=>{this.props.onRemindChange()}} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                    Content of second tab
                </div>
            </Tabs>
        )
    }
}

class View extends Component {
    componentDidMount() {
        this.props.navSet({title: '随手拍'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div>
                <div style={{ position: 'absolute', top: 45, bottom: 0, left: 0, right: 0 }}>
                    <TabBottom onCameraChange={() => {
                        window.__camera__ = this
                        request({type: 8, data: {}}).then(data => {
                            this.props.history.push('/snapshot-issueWrite')
                        })
                    }} onRemindChange={() => {
                        this.props.history.push('/snapshot-illustrate');
                    }} />
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
})(View))