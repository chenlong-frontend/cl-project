import React from 'react';
// import { withRouter } from 'react-router';
import style from './edit.css';
import { Picker, List, DatePicker, Modal} from 'antd-mobile';
// import { createForm } from 'rc-form';
import { format } from 'date-fns';
import { connect } from 'react-redux'
import { NavAction } from '../../store/actions/nav'

// class Nav extends Component{
//     constructor(props) {
//         super(props)
//         this.submit = this.submit.bind(this)
//     }
//     submit () {
//         console.log(1111)
//     }
//     infoIndex () {
//         this.props.history.push('/info-index')
//     }
//     render() {
//         return (
//             <NavBar
//                 mode="dark"
//                 icon={<Icon type="left" />}
//                 onLeftClick={() => this.infoIndex()}
//                 leftContent={[
//                     '信息编辑'
//                 ]}
//                 rightContent={
//                     <span onClick={this.submit()}>提交</span>
//                 }
//             ></NavBar> 
//         )
//     }
// }

// const InfoEdit = withRouter(Nav)
const seasons = [
    [
      {
        label: '男',
        value: '男',
      },
      {
        label: '女',
        value: '女',
      },
    ]
];
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const img = [];
const prompt = Modal.prompt;

class View extends React.Component {
    constructor(props) {
        super(props)
        this.edit = this.edit.bind(this)
        this.state = {
            message: {},
            data: [],
            dates: now,
            sValue: ['男'],
            multiple: false,
            time: '',
            sex: '',
            tel: '',
            email: '',
            fax: ''
        }
    }
    componentDidMount () {
        this.props.userNav({title: '编辑信息'})
        this.setState({message: this.props.location.data})
        this.setState({tel: this.props.location.data.emp_num})
        this.setState({email: this.props.location.data.email})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    edit () {
        console.log(this.state.tel)
        console.log(this.state.time)
        console.log(this.state.sex)
        console.log(this.state.email)
        console.log(this.state.fax)
    }
    render() {
        return (
            <div className='userinfo-edit-css'>
                <ul className={style.picker}>
                    <li className={style.one} style={{height: '60px',lineHeight: '60px'}}>
                        <span className={style.left}>头像</span>
                        <div className={style.userImg}>
                            <img src={this.state.message.emp_avatar} alt="头像"/>
                        </div>
                    </li>
                    <li className={style.disable} >
                        <span className={style.left}>姓名</span>
                        <span className={style.right}>{this.state.message.emp_name}</span>
                    </li>
                    <li style={{marginTop: '-16px'}}>
                        <Picker
                            data={seasons}
                            title="选择性别"
                            cascade={false}
                            extra="请选择(可选)"
                            value={this.state.sValue}
                            onChange={v => {if (v === ['男']) {this.setState({sex: 1})} else {this.setState({sex: 0})}}}
                            onOk={v => this.setState({ sValue: v })}
                            >
                            <List.Item arrow="horizontal">性别</List.Item>
                        </Picker>
                    </li>
                    <li style={{marginTop: '1px'}}>
                        <DatePicker
                            mode="date"
                            title="出生年月"
                            extra="Optional"
                            value={this.state.dates}
                            onOk={dates => this.setState({dates})}
                            onChange={v => this.setState({time: format(v,'YYYY-MM-DD')})}
                        >
                        <List.Item arrow="horizontal">出生年月</List.Item>
                        </DatePicker>
                    </li>
                    <li className={style.one} style={{marginTop: '14px'}}>
                        <span className={style.left}>项目工号</span>
                        <span className={style.right}>{this.state.message.emp_num}</span>
                    </li>
                    <li className={style.disable}>
                        <span className={style.left}>项目部门</span>
                        <span className={style.right}>{this.state.message.gro_name}</span>
                    </li>
                    <li className={style.disable}>
                        <span className={style.left}>项目职务</span>
                        <span className={style.right}>{this.state.message.role_name}</span>
                    </li>
                    <li className={style.disable}>
                        <span className={style.left}>工种</span> 
                        <span className={style.right}>{this.state.message.work_type}</span>                   
                    </li>
                    <li className={style.disable}>
                        <span className={style.left}>手机</span> 
                        <span className={style.right}>{this.state.message.mobile}</span>
                    </li>
                    <li className={style.disable} 
                        onClick={() => prompt('固定电话', '', [
                            { text: '取消' },
                            { text: '确认', onPress: value => this.setState({tel: `${value}`})},
                            ])}
                    >
                        <span>固定电话</span> 
                        <span className={style.right}>{this.state.tel}</span>
                    </li>
                    <li className={style.disable}
                        onClick={() => prompt('邮箱', '', [
                            { text: '取消' },
                            { text: '确认', onPress: value => this.setState({email: `${value}`}) },
                            ])}
                    >
                        <span>邮箱</span> 
                        <span className={style.right}>{this.state.email}</span>
                    </li>
                    <li className={style.disable}
                        onClick={() => prompt('备注', '', [
                            { text: '取消' },
                            { text: '确认', onPress: value => this.setState({fax: `${value}`}) },
                            ])}
                    >
                        <span>备注</span> 
                        <span className={style.rightFax}>{this.state.fax}</span>
                    </li>
                </ul> 
                <p onClick={this.edit}>提交</p>
            </div>
        )
    }
}

// const TestWrapper = createForm()(View);

export default connect(()=>({}), dispatch => {
    return {
        userNav: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)