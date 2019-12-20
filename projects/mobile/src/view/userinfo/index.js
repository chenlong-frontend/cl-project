import React, { Component } from 'react';
// import { withRouter } from 'react-router'
// import { Icon, NavBar } from 'antd-mobile';
import style from './index.css';
// import userImg from '../../assets/img/userinfo/person_icon.png';
import request from '../../api/userinfo/index';
import { connect } from 'react-redux'
import { NavAction } from '../../store/actions/nav'

// class Nav extends Component {
//     constructor(props) {
//         super(props)
//         this.toEdit = this.toEdit.bind(this)
//     }
//     toEdit () {
//         this.props.history.push('/userinfo-edit')
//     }
//     render() {
//         return (
//             <NavBar
//                 mode="dark"
//                 icon={<Icon type="left" />}
//                 onLeftClick={() => console.log('onLeftClick')}
//                 leftContent={
//                     this.props.name
//                 }
//                 rightContent={
//                     <img src={edit} className={style.edit} alt="编辑" onClick={this.toEdit}/>
//                 }
//             ></NavBar>
//         )   
//     }
// }
// 跳转路由
// const UserInfoRouter = withRouter(Nav)

class View extends Component{
    constructor(props) {
        super(props);
        this.toEdit = this.toEdit.bind(this)
        this.state = {
            message: {}
        }
    }
    toEdit () {
        var path = {
            pathname:'/userinfo-edit',
            data: this.state.message,
        }
        this.props.history.push(path)
    }
    componentDidMount () {
        this.props.userNav({title: '用户信息'})
        const requestAsync = async () => {
            await   request.getUserMessage().then((data) => {
                        this.setState({message: data.data})
                    })
            return true
        }
        requestAsync().then(v => {
            window.NProgress.done()
        }).catch((error) => {
            alert(error)
            window.NProgress.done()
        })
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render() {
        return (
            <div>
                <div className={style.userImg} >
                    <img src={this.state.message.emp_avatar} alt="头像" onClick={this.toEdit}/>
                </div>
                <div className={style.listBox}>
                    <ul className={style.top}>
                        <li>
                            <div className={style.left}><label>姓名</label></div>
                            <div className={style.right}>{this.state.message.emp_name}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>性别</label></div>
                            <div className={style.right}>{this.state.message.sex}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>年龄</label></div>
                            <div className={style.right}>{this.state.message.age}</div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div className={style.left}><label>项目工号</label></div>
                            <div className={style.right}>{this.state.message.emp_num}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>项目部门</label></div>
                            <div className={style.right}>{this.state.message.gro_name}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>项目职务</label></div>
                            <div className={style.right}>{this.state.message.role_name}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>工种</label></div>
                            <div className={style.right}>{this.state.message.work_type}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>手机</label></div>
                            <div className={style.right}>{this.state.message.mobile}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>固定电话</label></div>
                            <div className={style.right}>{this.state.message.emp_num}</div>
                        </li>
                        <li>
                            <div className={style.left}><label>邮箱</label></div>
                            <div className={style.right}>{this.state.message.email}</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        userNav: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)