import React, { Component } from 'react'
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { NavBar, Icon } from 'antd-mobile'
import { connect } from 'react-redux'
import createHistory from "history/createBrowserHistory"
import NProgress from "nprogress"
import FontAwesome from 'react-fontawesome'
import routes from '../router/index'
import sortImg from '../assets/img/workflow/sort.png'

const history = createHistory()

window.NProgress = NProgress

window.NProgress.start()

const RouteConfig = () => (
    <Router>
        <Switch>
            {routes.map((val, i) => (
                <Route path={val.path} key={i} component={val.component} />
            ))}
            <Route path="/" render={()=><Redirect to="/workflow-index"/>}/>
        </Switch>
    </Router>
);

class NavAnt extends Component {
    render () {
       return (
           <div style={{position: 'fixed', top: 0, left: 0, right: 0, height: 45, zIndex: 99}}>
               <NavBar
                   mode="dark"
                   leftContent={<FontAwesome name='angle-left' />}
                   onLeftClick = {()=>{
                       if (this.props.navTitle === '工作台' || this.props.navTitle === '随手拍'
                           || this.props.navTitle === '项目看板' || this.props.navTitle === '我的文件'
                           || this.props.navTitle === '集团门户' || this.props.navTitle === '视频监控'
                           || this.props.navTitle === '用户信息'
                       ) {
                           window.SSInterActvieController.callBackAction();
                       } else {
                           history.goBack()
                       }
                   }}
                   rightContent={[<Icon key="0" type="search"
                                        style={{ display: this.props.navSearch?'block':'none' ,marginRight: '16px' }}
                                        onClick={() => {
                                            typeof this.props.navSearch === 'function' && this.props.navSearch()
                                        }}
                   />,
                       [<img key="1" alt='' src={sortImg}
                             style={{ display: this.props.navSort?'block':'none'}}
                             onClick={() => {
                                 typeof this.props.navSort === 'function' && this.props.navSort()
                             }}
                       />]
                   ]}
               >{this.props.navTitle}</NavBar>
           </div>
       )
    }
}

class Nav extends Component {
    render () {
        return (
            <div>
                {this.props.navTitle === 'index' ||
                 <NavAnt navTitle={this.props.navTitle} navSearch={this.props.navSearch}  navSort={this.props.navSort}/>
                }
                <div style={{marginTop: 45}}>
                    <RouteConfig />
                </div>
            </div>
        )
    }
}

export default connect((state)=> (
    {navTitle: state.navTitle, navSearch: state.navSearch, navSort: state.navSort}
))(Nav)
