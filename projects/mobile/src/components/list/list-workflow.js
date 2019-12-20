import React, { Component } from 'react'
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux'
// import { IssueAction } from '../../store/actions/snapshot/index'
// import request from '../../api/request'
import style from './list-workflow.css'

function Item(props) {
    return (
        <li onClick={()=> {
                props.onItemchanage(props.data)
            }}
            className={style.listItem}>
            <div className={style.img}>
                <img src={props.data.icon} alt='' />
            </div>
            <div className={style.text}>
                <p>{props.data.flow_name}<span className={style.badge} style={{backgroundColor: props.data.alias_css}}>{props.data.alias}</span></p>
                <p style={{fontSize: '12px',color: '#7F7F7F',marginBottom: '2px', display: (props.data.up?'block':'none')}}
                >上传人 : <span>{props.data.start_emp_name}</span></p></div>
            <div className={style.right}>
                <p>操作人 : {props.data.last_emp_name}</p>
                <p>{props.data.history_time}</p>
            </div>
        </li>
    )
}

class ListWork extends Component {
    constructor(props) {
        super(props)
        this.state={
            up: true
        }
    }
    componentDidMount() {
        console.log(this.props.type)
        this.setState({
            up: this.props.up
        })
    }
    render() {
        return (
            <ul className={style.itemBox}>
                {this.props.list.map((val, index) => (
                    <Item onItemchanage={(data) => {
                        let param = Object.assign({}, data, {is_edit: this.props.type === 0?'0':'1'})
                        this.props.onItemChanage(param)
                    //     let param = Object.assign({}, data, {is_edit: this.props.type === 0?0:1})
                    //     request({type: 404, data: param}).then(val => {
                    //         console.log(val)
                    //         this.props.setIssue(val)
                    //         this.props.history.push(val.form_url)
                    // })
                    }} data={val} key = {index} />
                ))}
            </ul>
        )
    }
}

export default ListWork
// export default withRouter(connect(()=>({}),
//     dispatch=>{
//         return {
//             setIssue: param => {
//                 dispatch(IssueAction(param))
//             }
//         }})(ListWork))