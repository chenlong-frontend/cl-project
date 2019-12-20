import React, { Component } from 'react';
import { withRouter } from 'react-router';
import style from './fileList.css';

class File extends Component {
    render() {
        return (
            <div>
                <li className={style.list} onClick={()=>{
                                    if (this.props.onSingle === 'share') {
                                        var path = {
                                            pathname:'/filemanage-shareDetail',
                                            toDetailData: this.props.data,
                                        }
                                        this.props.history.push(path)
                                    }
                                }}>
                                {
                                    this.props.data.file_icon ? (
                                        <img src={this.props.data.file_icon} alt="文件图片" className={style.leftImg}/>
                                    ) : (
                                        <img src={this.props.data.type_icon} alt="文件图片" className={style.leftImg}/>
                                    )
                                }
                    <p>{this.props.data.file_name}</p>
                    <span className={style.store}>{this.props.data.file_size}</span><span className={style.date}>{this.props.data.file_time}</span>
                </li>
            </div>
        )
    }
}

const FileRouter = withRouter(File)

class FileList extends Component {
    render() {
        return (
            <div className={style.listBox}>
                <ul>
                    {this.props.list.map((val, index) => (
                        <FileRouter data={val} key={index} onSingle={this.props.onSingle} />
                    ))}
                </ul>
            </div>
        )
    }
}

export  default FileList