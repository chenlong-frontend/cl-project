import React, { Component } from 'react';
import { withRouter } from 'react-router';
import style from './index.css';
import { TabBar , List } from 'antd-mobile';
import up from '../../assets/img/filemanage/file-manage/myup.png';
import share from '../../assets/img/filemanage/file-manage/share.png';
import collection from '../../assets/img/filemanage/file-manage/collection.png';
import clear from '../../assets/img/filemanage/file-manage/clear.png';
import FileList from '../../components/fileList/fileList';
import Work from './work';
import request from '../../api/filemanage/index';
import { connect } from 'react-redux'
import {NavAction} from '../../store/actions/nav'

window.NProgress.start()

class ThreeType extends Component {
    constructor(props) {
        super (props)
        this.myUp = this.myUp.bind(this)
        this.myShare = this.myShare.bind(this)
        this.myCollection = this.myCollection.bind(this)
    }
    myUp () {
        this.props.history.push('/filemanage-myup')
    }
    myShare () {
        this.props.history.push('/filemanage-share')
    }
    myCollection () {
        console.log(this.props.index)
        this.props.history.push(`/filemanage-myup-detail/${this.props.index}/${this.props.type}/${this.props.from}`)
    }
    render() {
        return (
            <div className={style.fileBox1}>
                <div className={style.item} onClick={this.myUp}>
                    <img src={up} alt="上传"/>
                    <p>我上传的</p>
                 </div>
                 <div className={style.item} onClick={this.myShare} style={{width: '38%', borderLeft: '1px solid #F5F5F5', borderRight: '1px solid #F5F5F5'}}>
                    <img src={share} alt="分享"/>
                    <p>收到的分享</p>
                 </div>
                 <div className={style.item} onClick={this.myCollection}>
                    <img src={collection} alt="收藏"/>
                    <p>我的收藏</p>
                 </div>
            </div>
        )
    }
}
const FileIndex = withRouter(ThreeType)

class ThreeTypeDetail extends Component {
    render() {
        return (
            <div>
                <div className={style.scanFile} >
                    {
                        this.props.fileList.length === 0? (
                            <List renderHeader={() => '最近浏览文件'} >
                                <div className={style.fileBox}>
                                    <div className={style.toolBar} >
                                        <p className={style.noData}>暂无浏览数据</p>
                                    </div>
                                </div>
                            </List>
                        ) : (
                            <List renderHeader={() => '最近浏览文件'} >
                                <div className={style.fileBox}>
                                    <FileList list={this.props.fileList}/>
                                    <div className={style.toolBar} onClick={() => {this.props.onTextChange()}}>
                                        <img src={clear} alt="清除"/>
                                        <p className={style.clearData}>删除浏览记录</p>
                                    </div>
                                </div>
                            </List>
                        )
                    }
                </div>
            </div>
        )
    }
}

class View extends Component{
    constructor(props) {
        super(props)
        this.getWorkData = this.getWorkData.bind(this)
        this.state = {
            selectedTab: 'redTab',
            hidden: false,
            fullScreen: false,
            page_index: '0',
            time_first: '1',
            fileList: [],
            name: 'collect',
            type: ' ',
            index: 0
        }
    }
    componentDidMount () {
        this.props.navSet({title: '我的文件'})
        const requestAsync = async () => {
            await   request.getScanFile(this.state.page_index, this.state.time_first).then((data) => {
                        this.setState({
                            fileList: data.data
                        })
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
    // 获取工作区内容
    getWorkData () {
        // console.log('333')
    }
    renderContent(pageText) {
        if (pageText === 'file') {
            return (
                <div className={style.fileItem}>
                    <FileIndex index={this.state.index} type={this.state.type} from={this.state.name}/>
                    <ThreeTypeDetail fileList={this.state.fileList} onTextChange={() => {this.setState({fileList: []})}}/>
                </div>
            );
        } else if (pageText === 'work') {
            return (
                <div className={style.tabItem} onClick={this.getWorkData}>
                    <Work/>
                </div>
            );
        } else if (pageText === 'qrcode') {
            return (
                <div style={{ backgroundColor: 'white' }}>
                   11111111
                </div>
            );
        }
      }
    render() {
        return (
            <div style={this.state.fullScreen ? { } : { height: '94%', position: 'fixed', bottom: '0px', left: '0px', right: '0px', top: '45px'}}>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.state.hidden}
                    >
                    <TabBar.Item
                        title="我的文件"
                        key="file"
                        icon={<div className={style.fileGrey}/>}
                        selectedIcon={<div className={style.fileIcon}/>}
                        selected={this.state.selectedTab === 'redTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'redTab',
                            });
                        }}
                        data-seed="logId"
                        >
                        {this.renderContent('file')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className={style.workGrey}/>}
                        selectedIcon={<div className={style.workIcon}/>}
                        title="工作区"
                        key="work"
                        selected={this.state.selectedTab === 'blueTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'blueTab',
                            });
                            }}
                            data-seed="logId1"
                        >
                        {this.renderContent('work')}
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<div className={style.qrcodeGrey}/>}
                        selectedIcon={<div className={style.qrcodeIcon}/>}
                        title="扫码查看"
                        key="qrcode"
                        selected={this.state.selectedTab === 'greenTab'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'greenTab',
                            });
                        }}
                        >
                        {this.renderContent('qrcode')}
                        </TabBar.Item>
                    </TabBar>
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