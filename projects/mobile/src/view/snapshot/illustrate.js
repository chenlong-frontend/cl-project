import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import help from '../../assets/svg/help.svg'

class View extends Component {
    componentDidMount() {
        this.props.navSet({title: '违章事项处理流程'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div>
                <img alt={''} src={help} />
            </div>
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        navSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)