import React, { Component } from 'react'
import { List } from 'antd-mobile'
import style from './share.css'
import FileList from '../../../components/fileList/fileList'
import FileSearchInput from '../../../components/search/file-searchInput'
import warn from '../../../assets/img/filemanage/file-manage/warning.png'
import request from '../../../api/filemanage/share'
import { connect } from 'react-redux'
import {NavAction} from '../../../store/actions/nav'

class View extends Component {
    constructor(props) {
        super(props)
        this.handleSort = this.handleSort.bind(this)
        this.state = {
            page_count: '0',
            start_index: 0,
            page_size: 20,
            page: '1',
            to: '1',
            shareFile: [],
            deleteState: false,
            shareCount: 0,
            name: 'share',
            searchDisplay: false,
            sortType: 'up',
        }
    }
    componentDidMount () {
        this.props.shareNavSet({title: '我的分享',search: ()=>{
            this.setState({searchDisplay: true})
        }, sort: ()=>{
            let sortType = this.state.sortType === 'up'?'down':'up'
            this.handleSort(sortType)
            this.setState({ sortType })
        }});
        const requestAsync = async () => {
            await   request.getNewShare(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.to).then((data) => {
                        this.setState({shareFile: data.data})
                        console.log(data.data)
                    })
            await   request.getShareCount(this.state.to, this.state.count).then((data) => {
                        this.setState({shareCount: data.count})
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
    handleSort(val){
        let sortType = val === 'down'?1:-1;
        function sortFn(a, b) {
            return sortType*(Date.parse(a.file_time) - Date.parse(b.file_time))
        }
        let shareFile = this.state.shareFile.sort(sortFn)
        this.setState({shareFile: shareFile})
    }
    render() {
        return(
            <div>
                <div>
                   {/* <NavRouter onTextChange={val => {this.setState({upFile: val})}} sort={this.state.shareFile}/> */}
                </div>
                <div className={style.content}>
                    <div className={style.warn}>
                        <img src={warn} alt="警告"/>
                        <p>分享记录删除后不可恢复</p>
                    </div>
                    <List renderHeader={() => '最近收到的分享文件'} style={{backgroundColor: '#fff'}}>
                        <div className={style.fileBox}>
                            <FileList list={this.state.shareFile} onSingle={this.state.name}/>
                        </div>
                    </List>
                    <div className={style.footer}>
                        收到的文件分享{this.state.shareCount}个
                    </div>
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
        shareNavSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)