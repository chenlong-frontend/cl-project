import React, { Component } from 'react'
import {List } from 'antd-mobile'
import style from './myup.css'
import warn from '../../../assets/img/filemanage/file-manage/warning.png'
import FileSearchInput from '../../../components/search/file-searchInput'
import FileList from '../../../components/fileList/fileList'
import request from '../../../api/filemanage/myup'
import { connect } from 'react-redux'
import {NavAction} from '../../../store/actions/nav'

class View extends Component {
    constructor(props) {
        super(props)
        // this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSort = this.handleSort.bind(this)
        this.state = {
            name: 'myup',
            page_count: '0',
            start_index: 0,
            page_size: 20,
            page: '1',
            isfile: '1',
            time_first: '1',
            count: 1,
            upCount: 3,
            upFile: [],
            searchDisplay: false,
            sortType: 'up',
        }
    }
    componentDidMount () {
        this.props.myupNavSet({title: '我的上传',search: ()=>{
            this.setState({searchDisplay: true})
        }, sort: ()=>{
            let sortType = this.state.sortType === 'up'?'down':'up'
            this.handleSort(sortType)
            this.setState({ sortType })
        }})
        const requestAsync = async () => {
            await   request.getNewUp(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.isfile, this.state.time_first).then((data) => {
                        this.setState({upFile: data.data})
                        console.log(data.data)
                    })
            await   request.getNewUpCount(this.state.isfile, this.state.count).then((data) => {
                        this.setState({upCount: data.data.count})
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
    // handleTextChange(text) {
    //     this.setState({text: text});
    // }
    handleSort(val){
        let sortType = val === 'down'?1:-1;
        function sortFn(a, b) {
            return sortType*(Date.parse(a.file_time) - Date.parse(b.file_time))
        }
        let upFile = this.state.upFile.sort(sortFn)
        this.setState({upFile: upFile})
    }
    render() {
        return ( 
          <div className={style.content}>
                {/* <NavRouter sort={this.state.upFile} onTextChange={val => {this.setState({upFile: val})}}/> */}
                <div className={style.warn}>
                        <img src={warn} alt="警告"/>
                        <p>此处只显示已通过审核的文件</p>
                </div>
                <List renderHeader={() => '最近上传文件'} style={{backgroundColor: '#fff'}}>
                    <div className={style.fileBox}>
                        <FileList list={this.state.upFile}/>
                    </div>
                </List>
                <div className={style.footer}>
                    <p>上传的文件{this.state.upCount}个</p>
                </div>
                <div style={{position: 'fixed' , display: (this.state.searchDisplay?'block':'none'),zIndex: 9999, backgroundColor: '#efeff4', top: 0, bottom: 0, right: 0, left: 0}}>
                    <FileSearchInput onSearchChange={() => {this.setState({searchDisplay: false});}} placeholder={"搜索文件名"} name={this.state.name}/>
                </div>
          </div>   
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        myupNavSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)