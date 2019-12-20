import React, { Component } from 'react'
import style from './photo-snapshot.css'

// 拍摄照片
class Photo extends Component {
    render() {
        return (
            <div className={style.photoBox}>
                <p>违章记录照片 : </p>
                <div className={style.imgBox}>
                    <img className={style.photoInfo} src={this.props.img} alt=""  />
                </div>
            </div>
        )
    }
}

export default Photo