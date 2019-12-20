import React, { Component } from 'react';
import style from './css/album.css';
import request from '../../api/monitor/camera.js'

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picData: [{img: [{}]}]
        }
    }
    componentDidMount() {
        request.getAlbumInfo().then(data => {
            const photos = []
            var lastMonth=0,lastYear=0;
            data.albums.forEach(function (val) {
                var photo = {};
                var time = new Date(val.time.replace(/-/g,"/"));
                var year =time.getFullYear(),
                    month = time.getMonth() + 1;
                var times = year + "年" + month + "月";
                if (year !== lastYear || month !== lastMonth){
                    photo.time = times;
                    photo.img = [val];
                    photos.push(photo);
                    lastMonth = month;
                    lastYear = year;
                } else {
                    photos[photos.length - 1].img.push(val);
                }
            })
            this.setState({picData: photos})
        })
    }
    render () {
        return (
            <div className={style.fixed_box}>
                <div className={style.album}>
                    {
                        this.state.picData.map((item, index) => (
                            <div key={index}>
                                <div className={style.picTime}>{item.time}</div>
                                {
                                    item.img.map((photo, index) => (
                                        <img src={photo.thumbnail} key={index} alt="" onClick={() => {this.props.onReturnPhoto(photo)}} />
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Albums