import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { SearchBar, Flex } from 'antd-mobile'
import style from './searchInput.css'
import all from '../../assets/img/filemanage/file-manage/unknow.png'
import word from "../../assets/img/filemanage/file-manage/doc.png"
import xls from "../../assets/img/filemanage/file-manage/xls.png"
import ppt from "../../assets/img/filemanage/file-manage/ppt.png"
import pdf from "../../assets/img/filemanage/file-manage/pdf.png"
import txt from "../../assets/img/filemanage/file-manage/text.png"
import pic from "../../assets/img/filemanage/file-manage/pic.png"
// import request from '../../api/components/searchInput'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            resultDisplay: false,
            file: [{
                fileImg: all,
                name: '全部',
                value: ' '
            }, {
                fileImg: word,
                name: 'Word',
                value: 'word'
            }, {
                fileImg: xls,
                name: 'Xls',
                value: 'xls'
            }, {
                fileImg: ppt,
                name: 'PPT',
                value: 'ppt'
            }, {
                fileImg: pdf,
                name: 'Pdf',
                value: 'pdf'
            }, {
                fileImg: txt,
                name: 'txt',
                value: 'txt'
            }, {
                fileImg: pic,
                name: '图片',
                value: 'img'
            }]
        }
    }
    // 去对应的详情页
    toDetail(url,index,type) {
        console.log(index, type)
        this.props.history.push(`/filemanage-myup-detail/${index}/${type}/${this.props.name}`)
    }
    render() {
        const Items = (this.state.file).map((mess, index) =>
            <div key={index} className={style.item} onClick={() => this.toDetail(mess.fileImg, index, mess.value)}>
                <img src={mess.fileImg} alt="pdf"/>
                <p style={{marginTop: '8px'}}>{mess.name}</p>
            </div>
        )
        return (
            <div>
                <SearchBar cancelText={'返回'} placeholder={this.props.placeholder}
                    showCancelButton={true}
                    onCancel={(val) => {this.props.onSearchChange();this.setState({resultDisplay: false})}}
                />
                {/* <div className={style.itemBox} >
                    {Items}
                </div> */}
                <div className="flex-container">
                    <Flex style={{backgroundColor: '#fff'}}>
                        <Flex.Item>{Items}</Flex.Item>
                    </Flex>
                </div>
            </div>
        )
    }
}
const SearchInput = withRouter(Search)

export default SearchInput