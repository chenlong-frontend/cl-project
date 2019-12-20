import React, { Component } from 'react';
import style from './index.css';
import request from '../../api/home/index.js'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'

window.NProgress.start()

class ImgContent extends Component{
    constructor (props) {
        super (props)
        this.state = {data: {news_img: []}, src: [], head: ''}
    }
    componentDidMount() {
        request.getOneNews(this.props.cameraId).then(value => {
            this.setState({data: value.data[0]})
            const contentChild = value.data[0].news_con.slice(1, -1)
            const content = '<div id="ss">' + contentChild + '</div>'
            const parse = new DOMParser()
            const doc = parse.parseFromString(content, 'text/xml')
            console.log(doc, doc.getElementById('ss'))
            document.getElementById('font').appendChild(doc.getElementById('ss'))

            const imgChild = value.data[0].news_img.slice(1, -1)
            const arr =  imgChild.split(',')
            let srcs = []
            for (let o of arr) {
                srcs.push(o.match(/src=(\S*)/)[1])
            }
            this.setState({src: srcs})
            this.setState({head: value.data[0].news_head.slice(1, -1)})
        })
    }
    render () {
        console.log(this.props)
        return (
            <div className={style.news_box}>
                <span className={style.line}></span>
                <h3 className={style.title}>{this.state.head}</h3>
                <time>{this.state.data.news_time}</time>
                <p className={style.text} id='font'></p>
                {
                    this.state.src.map((item, index) => (
                        <img key={index} src={item}  alt="*"/>
                    ))
                }
            </div>
        )
    }
}


class Detail extends Component{
    componentDidMount() {
        this.props.navSet({title: '集团门户'})
        window.NProgress.done()
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render () {
        console.log(this.props)
        return (
            <div className={style.body}>
                <div>
                    <ImgContent  cameraId={this.props.match.params.id}/>
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
})(Detail))