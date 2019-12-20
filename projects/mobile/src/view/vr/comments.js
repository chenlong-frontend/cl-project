import React, { Component } from 'react'
import { Modal} from 'antd-mobile';
import style from './comments.css'
import cancelBtn from '../../assets/img/vr/3_cancel.png'
import submitBtn from '../../assets/img/vr/3_submit.png'
import iconPrev from '../../assets/img/vr/3_icon_prev.png'
import iconColor from '../../assets/img/vr/3_icon_color.png'
import request from '../../api/vr/index'
// 跳转路由
import { withRouter } from 'react-router'

// 弹框用到的函数
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

class Section extends Component {
    constructor (props) {
        super(props);
        this.commChoose = this.commChoose.bind(this)
        this.state = {
            id: '',
            commIcon: [false,false,false,false,false],
            remark: '',
            level: 0
        }
    }

    componentDidMount () {
        console.log('获取到的id' + this.props.perId)
        this.setState({
            id : this.props.perId
        })
    }

    commChoose (index) {
        let iconJson = [false,false,false,false,false]
        for (let i = 0; i < index+1; i ++) {
            iconJson[i] = true
        }
        this.setState({
            level: index+1,
            commIcon: iconJson
        })
    }
    toPreInfo () {
        this.props.history.push('/vr-index')
    }
    commitTo () {
        let queJson = {
            'id': this.state.id,
            'remark': this.refs.ques.value,
            'level': this.state.level
        }
        request.addComment(queJson).then(
            data => {
                if (data.code === 0 || data.code === "0") {
                    console.log("发送成功");
                    this.props.history.push('/vr-index')
                } else {
                    console.log("发送失败")
                    this.props.onModelChange({
                        modal1: true
                    })
                }
            }
        )
    }
    render() {
        return (
            <div className={style.article}>
                <div className={style.section}>
                    <div className={style.ques}>
                        <textarea cols="30" rows="10" maxLength="300" placeholder="请输入问题或建议" ref="ques"></textarea>
                    </div>
                    <div className={style.comments}>
                        {this.state.commIcon.map((val, index) => (
                            <img key={index}
                                 src={val ? iconColor : iconPrev}
                                 onClick={() => this.commChoose(index)}
                                 alt="pic"/>
                        ))}
                    </div>
                </div>
                <div className={style.footer}>
                    <div className={style.writecomm}>
                        <img src={cancelBtn} alt="pic" onClick={() => this.toPreInfo()}/>
                    </div>
                    <div className={style.writecomm}>
                        <img src={submitBtn} alt="pic" onClick={() => this.commitTo()}/>
                    </div>
                </div>
            </div>
        )
    }
}

// 注入路由
const MenuWithRouter = withRouter(Section)

class View extends Component {
    constructor (props) {
        super(props)
        this.handleModelChange = this.handleModelChange.bind(this)
        this.state = {
            // 弹框
            errormsg:"提交失败，请重新尝试！",
            modal1: false,
        }
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    // 添加体验记录的状态提升
    handleModelChange (bool) {
        this.setState({
            modal1 : bool.modal1
        })
    }
    render() {
        return (
            <div>
                {/*location获取的是上一个页面传过来的值*/}
                <MenuWithRouter perId={this.props.location.state} onModelChange={this.handleModelChange}/>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    onClose={this.onClose('modal1')}
                    title="提示"
                    footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                <div >
                    {this.state.errormsg}
                </div>
                </Modal>
            </div>
        )
    }
}

export default View