import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'
import style from './css/stateChange.css'
import changeUp from '../../assets/svg/change_up.svg'

// 流程节点展示
class Process extends Component {
    render () {
        return (
            <div className={style.list}>
                 <div className={style.left}>
                     <img className={style.img + ' ' + style.upLoad} src={changeUp} alt={''} />
                     <span className={style.line +  ' ' + style.bottomLine} />
                     <span className={style.line + ' ' + style.topLine} />
                  </div>
                  <div className={style.right}>
                      <div className={style.textTop}>
                          <span className={style.title}>上传记录</span>
                          <span className={style.time}>sdfd</span>
                      </div>
                      <div className={style.textBottom}>
                          <span className={style.type}>dsf</span>
                          <span className={style.name}>sdfs</span>
                      </div>
                  </div>
              </div>
        )
    }
}

class View extends Component {
    componentDidMount() {
        this.props.navSet({title: '流程状态变更'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        return (
            <div>
                <div className={style.box}>
                    <Process/>
                </div>
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