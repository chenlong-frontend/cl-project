import React, { Component } from 'react';
import { withRouter } from 'react-router';
import style from './work.css';
import { Modal } from 'antd-mobile';
import more from '../../assets/img/filemanage/file-manage/more.png';
import share from '../../assets/img/filemanage/directive/temp.png';
import build from '../../assets/img/filemanage/file-manage/build.png';
import request from '../../api/filemanage/index.js';

class Company extends Component {
    render() {
        return (
            <div>
                <div className={style.company}>
                    <img src={build} alt="建筑图片"/>
                    <p className={style.name}>{this.props.data.pro_name}</p>
                    {/* <p className={style.address}>{this.props.data.pro_area}</p> */}
                    <span className={style.count}>共{this.props.data.count}条</span>
                </div>
            </div>
        )
    }
}

class View extends Component {
    constructor(props) {
        super(props)
        this.showModal = this.showModal.bind(this)
        this.addRouter = this.addRouter.bind(this)
        this.save = this.save.bind(this)
        this.share = this.share.bind(this)
        this.showSaveSuccess = this.showSaveSuccess.bind(this)
        this.state = {
            work: [{}],
            p_id: '-1',
            page_index: '0',
            passed: '0',
            modal1: false,
            saveSuccess: false,
            modalData: {},
            folderData: [],
            path:[{file_name: "主目录", pro_id:"-1"}]
        }
    }
    componentDidMount () {
        request.getWorkMess().then((data) => {
            this.setState({work: data.data[0]})
            console.log(data.data)
        })
        request.getWorkFile(this.state.p_id, this.state.page_index, this.state.passed).then((data) => {
            this.setState({folderData: data.data.child_files})
        })
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
    // 显示收藏成功模态框
    showSaveSuccess () {
        this.setState({
            saveSuccess: true,
        })
    }
    // 分享
    share (val) {
        console.log(val)
    }
    // 收藏
    save (val) {
        request.saveFile([{'file_clct_file_id': val.file_p_id}]).then((data) => {
            if (data.code === 0) {
                this.onClose('modal1')()
                this.showSaveSuccess()
            }
        })
    }
    // 添加一个路径
    addRouter(index, mess) {
        console.log(mess)
        if (mess.file_type_name === "folder") {
            this.state.path.push(mess)
            this.setState({path: this.state.path})
            request.getWorkFile(mess.file_id, this.state.page_index, this.state.passed).then((data) => {
                this.setState({folderData: data.data.child_files})
            })
        } else {
            var path = {
                pathname:'/filemanage-shareDetail',
                toDetailData: mess,
            }
            this.props.history.push(path)
        }
    }
    // 路径后退
    routerBack(index, e) {
        this.setState({path: this.state.path.slice(0, index + 1)})
    }
    render() {
        return (
            <div>
                <Company data={this.state.work}/>
                <div style={{height: 'auto', backgroundColor: '#E0E0E0', padding: '12px 15px'}}>
                    {
                        this.state.path.map((item,index) => (
                            <a style={{color: '#424242'}} onClick={(e) => this.routerBack(index, e)} key={index}>{item.file_name}  {this.state.path.length - 1 !== index ? (<span>></span>) : ''} </a>
                        ))
                    }
                </div>
                <ul className={style.listBox}>
                    {(this.state.folderData).map((mess, index) =>
                        <li 
                            className={style.lists}
                            key={index}
                            onClick={() => this.addRouter(index, mess, mess.file_type_name)}>
                            <img src={mess.file_type_icon} alt="" className={style.leftImg} />
                            <span className={style.listName}>{mess.file_name}</span>
                            <span className={style.listTime}>{mess.file_time}</span>
                            <img src={more} alt="点点" className={style.rightImg} onClick={this.showModal({a:'modal1', b:mess})}/>
                        </li>
                    )}
                </ul>
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
                            <img src={share} alt="收藏" onClick={() => this.save(this.state.modalData)}/> <p>收藏</p> 
                        </div>
                    </div>
                </Modal>
                <Modal
                        visible={this.state.saveSuccess}
                        transparent
                        maskClosable={false}
                        onClose={this.onClose('saveSuccess')}
                        title='收藏成功'
                        footer={[{ text: '确定', onPress: () => { console.log('ok'); this.onClose('saveSuccess')(); } }]}
                        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                </Modal>
            </div>
        )
    }
}
const Work = withRouter(View)
export default Work
