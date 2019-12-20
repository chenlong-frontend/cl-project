import React, { Component } from 'react'
import { Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {NavAction} from '../../store/actions/nav'
import style from './css/result.css'

// 结果反馈
class Result extends Component {
    render () {
        return (
            <div className={style.resultContent}>
                <img className={style.img} src={this.props.resultType.icon} alt={''} />
                <p className={style.result}>{this.props.resultType.title}</p>
                <p className={style.tip}>{this.props.resultType.text}</p>
            </div>
        )
    }
}

// 跳转按钮
class TurnBtn extends Component {
    render () {
        return (
            <div className={style.bottom}>
                <Button type="primary" onClick={() => {
                    this.props.history.push('/workflow-working')
                }}>确定</Button>
            </div>
        )
    }
}

const TurnBtnWrapper = withRouter(TurnBtn)

class View extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultType: {icon: '', title: '', text: ''}
        }
    }
    componentDidMount() {
        window.NProgress.done()
        this.setState({
            resultType: this.props.resultType
        })
        this.props.navSet({title: '结果页'})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div>
                <Result resultType={this.state.resultType} />
                <TurnBtnWrapper/>
            </div>
        )
    }
}

export default connect((state)=>{
    return {
        resultType: state
    }
}, dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)