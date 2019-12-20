<template>
<div>
  <baidu-map class="map" style="display: flex; flex-direction: column" :center="center" :zoom="zoom" @ready="handler">
     <bm-view style="width: 100%; height:100px; flex: 1"></bm-view>
      <!-- 缩放控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <!-- 定位 -->
      <bml-marker-clusterer :averageCenter="true">
        <bm-marker class="descBox" v-for="(point, index) of points" :position="{lng: point.lng, lat: point.lat}" :key="index" @click="toPro(point.id)" @mouseout="leave" @mouseover="show(point)">
          <bm-overlay
            v-if="active"
            pane="labelPane"
            class="sample"
            @initialize="initialize"
            >
            <div >{{desc}}</div>
          </bm-overlay>
        </bm-marker>
      </bml-marker-clusterer>
  </baidu-map>
</div>
</template>

<script>
import request from '@/api/home/home.js'
import {BmlMarkerClusterer} from 'vue-baidu-map'
export default {
  name: 'baidumap',
  components: { BmlMarkerClusterer },
  data () {
    return {
      center: {lng: 105.000, lat: 38.000},
      zoom: 4,
      points: [],
      active: false,
      proData: [],
      requestData: {
        currentPage: '',
        pageSize: '',
        country: '',
        province: '',
        city: '',
        time: ''
      },
      desc: ''
    }
  },
  created () {
    request.sqlChooseData(this.requestData).then((data) => {
      this.proData = data.data.project
      for (var i = 0; i < this.proData.length; i++) {
        const item = this.proData[i]
        const position = {lng: item.latitude, lat: item.longitude, desc: item.desc, id: item.id}
        this.points.push(position)
      }
    })
  },
  methods: {
    handler ({BMap, map}) {
      // console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      map.enableScrollWheelZoom(true) // 滚轮缩放大小
    },
    // 去项目页面
    toPro (id, lat, lng) {
      const userInfo = JSON.parse(sessionStorage.userInfo)
      userInfo.pro_id = id
      sessionStorage.userInfo = JSON.stringify(userInfo)
      window.location.href = '/workbench/workbench.html'
    },
    // 初始化覆盖物
    initialize ({el, BMap, map}) {
      console.log(map.gf.lng)
      const pixel = map.pointToOverlayPixel(new BMap.Point(map.gf.lat, map.gf.lng))
      console.log(pixel)
      el.style.left = pixel.x + 'px'
      el.style.top = pixel.y + 'px'
    },
    show (point) {
      this.active = true
      this.desc = point.desc
    },
    leave () {
      this.active = false
    }
  }
}
</script>


<style scoped>
  .descBox{position: relative;border: 1px solid;}
  .descP{border: 1px solid;position: absolute;}
  .sample {width: 120px;height: 40px;line-height: 40px;background: rgba(0,0,0,0.5);overflow: hidden;box-shadow: 0 0 5px #000;color: #fff;text-align: center;padding: 10px;position: absolute;}
  .sample.active {background: rgba(0,0,0,0.75);color: #fff;}
</style>
