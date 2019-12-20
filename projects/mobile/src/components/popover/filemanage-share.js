import React, { Component } from 'react';
import { Popover } from 'antd-mobile';
import sort from '../../assets/img/filemanage/file-manage/sort.png';

const Item = Popover.Item;
class Sort extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            selected: '',
        }
    }
    onSelect = (opt) => {
        console.log(opt.props.value)
        if (opt.props.value === 'time') {
            if (this.props.sort.length > 0){
                const afterSort = this.props.sort.sort(function (a,b) {
                    return (new Date(b.scan_time)).getTime() - (new Date(a.scan_time)).getTime()
                })
                this.props.onTextChange(afterSort)
            }
        } else if (opt.props.value === 'name') {
            if (this.props.sort.length > 0){
                const afterSort = this.props.sort.sort(function (a,b) {
                    return a.file_name.localeCompare(b.file_name,'zh-Hans-CN', {sensitivity: 'accent'})
                })
                this.props.onTextChange(afterSort)
            }
        } else if (opt.props.value === 'store') {
            if (this.props.sort.length > 0){
                console.log('33')
                const afterSort = this.props.sort.sort(function (a,b) {
                    return a.file_size - b.file_size
                })
                this.props.onTextChange(afterSort)
            }
        }
        console.log(this.props.sort)
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };
    handleVisibleChange = (visible) => {
        this.setState({
            visible,
        });
    };
    render() {
        return (
            <div>
                <Popover 
                    mask
                    overlayClassName="fortest"
                    overlayStyle={{ color: 'currentColor' }}
                    visible={this.state.visible}
                    overlay={[
                        (<Item key="4" value="name" data-seed="logId">按名称排序</Item>),
                        (<Item key="5" value="time" >按时间排序</Item>),
                        (<Item key="6" value="store">按文件大小排序</Item>),
                    ]}
                    align={{
                        overflow: { adjustY: 0, adjustX: 0 },
                        offset: [-10, 0],
                    }}
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                >   
                <img src={sort} alt=""/>
            </Popover>
            </div>
        )
    }
}

export default Sort