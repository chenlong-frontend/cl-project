import React, { Component } from 'react';
// import { withRouter } from 'react-router';
import style from './shareDetail.css';
import file from '../../../assets/img/filemanage/file-manage/pdf.png';
import folder from '../../../assets/img/filemanage/file-manage/folder.png';
import request from '../../../api/filemanage/share.js';
import { connect } from 'react-redux'
import {NavAction} from '../../../store/actions/nav'

class View extends Component{
    constructor(props) {
        super(props)
        this.state = {
            fileDetail: {},
        }
    }
    componentDidMount () {
        this.props.shareDetailNavSet({title: '分享记录'})
        const requestAsync = async () => {
            await   request.toFileDetail(this.props.location.toDetailData.file_id).then((data) => {
                        this.setState({fileDetail: data.data})
                        console.log(data.data)
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
    render() {
        return (
            <div>
                <div className={style.tableLayout}>
                    <h5 className={style.tableTitle}>{this.state.fileDetail.file_emp_name}</h5>
                    <div className={style.tableBox}>
                        <div className={style.tableItem}>
                            <img src={file} alt="文件"/>
                        </div>
                        <div className={style.tableItemLeft} style={{display: 'table-cell'}}>
                            <div className={style.myTable}>
                                <div className={style.Item}>
                                    <div className={style.Left}>上传时间 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_time}</div>
                                </div>
                                <div className={style.Item}>
                                    <div className={style.Left}>上传人 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_emp_name}</div>
                                </div>
                                <div className={style.Item}>
                                    <div className={style.Left}>浏览数 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_src_size}</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.tableItem}>
                            <div className={style.my_table}>
                                <div className={style.Item}>
                                    <div className={style.Left}>文件类型 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_type_name}</div>
                                </div>
                                <div className={style.Item}>
                                    <div className={style.Left}>文件大小 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_type_name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.tableBoxFolder}>
                        <div className={style.tableItem}>
                            <img src={folder} alt="文件夹" />
                        </div>
                        <div className={style.tableItem}>
                            <div className={style.myTable}>
                                <div className={style.Item}>
                                    <div className={style.Left}>文件个数 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_scan_num}</div>
                                </div>
                                <div className={style.Item}>
                                    <div className={style.Left}>文件夹位置 : </div>
                                    <div className={style.Right}>{this.state.fileDetail.file_path}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.process}>
                    <div className={style.Item}>
                        <div className={style.Left}>分享人 : </div>
                        <div className={style.Right}>{this.state.fileDetail.emp_name}</div>
                    </div>
                    <div className={style.Item}>
                        <div className={style.Left}>分享时间 : </div>
                        <div className={style.Right}>{this.state.fileDetail.file_time}</div>
                    </div>
                    <div className={style.Item}>
                        <div className={style.Left}>分享说明 : </div>
                        <div className={style.decoration}>{this.state.fileDetail.file_desc}</div>
                    </div>
                </div>
                <div className={style.buttonBox}>
                    <div className={style.accept}>
                        {
                            this.state.fileDetail.file_scan_num === 0? (
                                <span>查看文件</span>
                            ) : (
                                <span>查看文件夹</span>
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
        shareDetailNavSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)