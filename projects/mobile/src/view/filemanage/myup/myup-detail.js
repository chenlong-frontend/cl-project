import React, { Component } from 'react';
import style from './myup-detail.css';
import { Tabs, Modal } from 'antd-mobile';
import more from '../../../assets/img/filemanage/file-manage/more.png';
import share from '../../../assets/img/filemanage/directive/temp.png';
import request from '../../../api/filemanage/collection';
import { connect } from 'react-redux'
import {NavAction} from '../../../store/actions/nav'

class View extends Component {
    constructor(props) {
        super(props)
        this.ChangeType = this.ChangeType.bind()
        this.state = {
            page_count: '5',
            start_index: 0,
            page_size: 20,
            page: '1',
            time_first: '1',
            isfile: '1',
            type_alias: this.props.match.params.type,
            count: '0',
            collectioncount: 0,
            serchCount: 0,
            tabs: [
                { title: '全部'},
                { title: 'Word' },
                { title: 'Xls' },
                { title: 'PPT' },
                { title: 'Pdf' },
                { title: 'txt' },
                { title: '图片' }],
            initialPage: Number(this.props.match.params.index),
            fileList: [],
            modalData: {},
            searchDisplay: false,
            sortType: 'up',
        }
    }
    // 关闭模态框
    onClose = key => () => {
        this.setState({
          [key]: false,
        })
    }
    // 显示模态框
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
          [key.a]: true,
          modalData: key.b          
        })
    }
    // 收藏成功事件
    showSaveSuccess () {
        this.setState({
            saveSuccess: true,
        })
    }
    // 分享
    share (val) {
        console.log(val)
    }
    // 删除
    delete (val) {
        request.deleteFile([{'file_clct_file_id': val.file_id}]).then((data) => {
            if (data.code === 0) {
                this.onClose('modal1')()    
                this.showSaveSuccess()
            }
        })
    }
    // 页面刚加载
    componentDidMount () {
        console.log(this.props)
        if (this.props.match.params.from === 'myup') {
            this.props.myupDetailNavSet({title: '上传文件',sort: ()=>{
                let sortType = this.state.sortType === 'up'?'down':'up'
                this.handleSort(sortType)
                this.setState({ sortType })
            }})
            const requestAsync = async () => {
                await   request.getDataMyup(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.time_first, this.state.isfile, this.state.type_alias).then((data) => {
                            this.setState({fileList: data.data})
                        })
                await   request.getCountMyup(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.time_first, this.state.isfile, this.state.type_alias).then((data) => {
                            this.setState({collectioncount: data.data})
                        })
                return true
            }
            requestAsync().then(v => {
                window.NProgress.done()
            }).catch((error) => {
                alert(error)
                window.NProgress.done()
            })
        } else if (this.props.match.params.from === 'share') {
            this.props.myupDetailNavSet({title: '分享文件',sort: ()=>{
                let sortType = this.state.sortType === 'up'?'down':'up'
                this.handleSort(sortType)
                this.setState({ sortType })
            }})
            const requestAsync = async () => {
                await   request.getDataShare(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.time_first, this.state.isfile, this.state.type_alias).then((data) => {
                            this.setState({fileList: data.data})
                        })
                await   request.getCountShare(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.time_first, this.state.isfile, this.state.type_alias).then((data) => {
                            this.setState({collectioncount: data.data})
                        })
                return true
            }
            requestAsync().then(v => {
                window.NProgress.done()
            }).catch((error) => {
                alert(error)
                window.NProgress.done()
            })
        } else {
            this.props.myupDetailNavSet({title: '收藏文件',sort: ()=>{
                let sortType = this.state.sortType === 'up'?'down':'up'
                this.handleSort(sortType)
                this.setState({ sortType })
            }})
            const requestAsync = async () => {
                await   request.getNewCollection(this.state.page_count, this.state.start_index, this.state.page_size, this.state.page, this.state.time_first).then((data) => {
                            this.setState({fileList: data.data})
                        })
                await   request.getNewCollectionCount(this.state.count).then((data) => {
                            this.setState({collectioncount: data.data})
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
    }
    // 排序
    handleSort(val){
        let sortType = val === 'down'?1:-1;
        function sortFn(a, b) {
            return sortType*(Date.parse(a.file_time) - Date.parse(b.file_time))
        }
        let fileList = this.state.fileList.sort(sortFn)
        this.setState({fileList: fileList})
    }
    ChangeType(tab, index) {
        console.log(index)
    }
    render() {
        return (
            <div>
                {/* <NavRouter url={this.props.location.imgUrl} from={this.props.location.from} index={this.props.location.index} sort={this.state.fileList} onTextChange={val => {this.setState({fileList: val})}}/> */}
                <div className={style.content}>
                    <Tabs tabs={this.state.tabs}
                            initialPage={this.state.initialPage}
                            renderTab={tab => <span>{tab.title}</span>}
                            onTabClick={this.ChangeType}
                        >
                        <ul className={style.listBox}>
                            {(this.state.fileList).map((mess, index) =>
                                <li 
                                    className={style.lists}
                                    key={index}>
                                    <img src={mess.type_icon} alt="" className={style.leftImg} />
                                    <span className={style.listName}>{mess.file_name}</span>
                                    <span className={style.listStore}>{mess.file_size}</span><span className={style.listTime}>{mess.file_time}</span>
                                    <img src={more} alt="点点" className={style.rightImg} onClick={this.showModal({a:'modal1', b:mess})}/>
                                </li>
                            )}
                        </ul>
                    </Tabs>
                    <Modal
                        visible={this.state.modal1}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('modal1')}
                        title={this.state.modalData.file_name}
                        className={style.modalTop}
                        footer={[{ text: '取消', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                        <div className={style.modal}>
                            <div>
                                <img src={share} alt="分享" onClick={() => this.share(this.state.modalData)}/> <p>分享</p> 
                            </div>
                            <div>
                                <img src={share} alt="删除" onClick={() => this.delete(this.state.modalData)}/> <p>删除</p> 
                            </div>
                        </div>
                    </Modal>
                    <Modal
                        visible={this.state.saveSuccess}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('saveSuccess')}
                        title='取消收藏成功'
                        footer={[{ text: '确认', onPress: () => { console.log('ok'); this.onClose('saveSuccess')(); } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                    </Modal>
                    <div className={style.footer}>
                    {
                        this.props.location.name === 'collect'? (
                            <p>共收藏{this.state.collectioncount}个</p>
                        ) : (
                            <p>检索结果共{this.state.serchCount}个</p>
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        myupDetailNavSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)