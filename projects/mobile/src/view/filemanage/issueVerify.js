import React, { Component } from 'react';
import { Accordion } from 'antd-mobile';
import style from './issueVerify.css';
import unknow from '../../assets/img/filemanage/file-manage/unknow.png';
import read from '../../assets/img/filemanage/file-manage/read.png';
import warn from '../../assets/img/filemanage/file-manage/warning.png';
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'

const fileData={doc_num:"20171023160914717",file_name:"timg",file_icon:"../../assets/img/filemanage/file-manage/unknow.png",
    file_alias:"2",file_emp_name:"王彐岳",history_time:"2017-10-23 16:11",file_path:"文荟苑",
    file_desc:"2",file_size:"6.61KB",asg_emp_name:"章雷云",file_tips:"123",rvw_advc:"无审核意见",rvw_emp_name:"章雷云",
    file_real_url:"/usr/local/upload/zjsbs/test/20171023160108337.doc"
};
class Mainmessage extends Component {
    constructor(props) {
        super(props)
        this.preview = this.preview.bind(this)
    }
    preview(url, e) {
        console.log(url)
    }
    render() {
        return (
            <div>
                <div className={style.main}>
                    <div className={style.oneLine}>
                        <div className={style.oneLineLeft}>
                            <img src={unknow} alt="文件"/>
                            <p>{fileData.file_name}</p>
                        </div>
                        <div className={style.oneLineRight}>
                            <img src={read} alt="预览文档"/>
                            <p onClick={this.preview.bind(this, fileData.file_real_url)}>预览文档</p>
                        </div>
                    </div>
                    <div className={style.twoLine}>
                        <Accordion accordion openAnimation={{}} style={{textAlign: 'center',fontSize: '12px'}}>
                            <Accordion.Panel header="文档基本信息" >
                                <div className={style.twoLineCon}>
                                    <div className={style.item}>
                                        <div className={style.left}>文档编号：</div>
                                        <div className={style.right}>{fileData.doc_num}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>文档名：</div>
                                        <div className={style.right}>{fileData.file_name}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>文档别名：</div>
                                        <div className={style.right}>{fileData.file_alias}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>上传人：</div>
                                        <div className={style.right}>{fileData.file_emp_name}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>上传时间：</div>
                                        <div className={style.right}>{fileData.history_time}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>文件位置：</div>
                                        <div className={style.right}>{fileData.file_path}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>文件描述：</div>
                                        <div className={style.right}>{fileData.file_desc}</div>
                                    </div>
                                    <div className={style.item}>
                                        <div className={style.left}>文件大小：</div>
                                        <div className={style.right}>{fileData.file_size}</div>
                                    </div>
                                </div>
                            </Accordion.Panel>
                        </Accordion>
                    </div>
                    <div className={style.threeLine}>
                        <div className={style.thItem}>
                            <div className={style.left}>指定审核人：</div>
                            <div className={style.right}>{fileData.asg_emp_name}</div>
                        </div>
                        <div className={style.thItem}>
                            <div className={style.left}>备注：</div>
                            <div className={style.right}>{fileData.file_tips}</div>
                        </div>
                    </div>
                    <div className={style.threeLine}>
                        <div className={style.thItem}>
                            <div className={style.left}>指定审批人：</div>
                            <div className={style.right}>{fileData.rvw_emp_name}</div>
                        </div>
                        <div className={style.thItem}>
                            <div className={style.left}>备注：</div>
                            <div className={style.right}>{fileData.rvw_advc}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class View extends Component {
    componentDidMount () {
        this.props.issueNavSet({title: '待审核'})
    }
    componentWillUnmount() {
        window.NProgress.start()
    }
    render() {
        return (
            <div>
                <Mainmessage/>
                <div className={style.approval}>
                    <h5>审批流程：</h5>
    
                </div>
                <div className={style.warn}>
                    <img src={warn} alt="警告"/>
                    <p>手机不支持重传，请移步PC端重新上传</p>
                </div>
            </div>
        )
    }
}

export default connect(()=>({}), dispatch => {
    return {
        issueNavSet: (param) => {
            dispatch(NavAction(param))
        }
    }
})(View)