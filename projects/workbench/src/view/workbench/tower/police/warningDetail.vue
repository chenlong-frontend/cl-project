<template>
  <div class="warningDetail">
    <p class="list name">塔吊名称：<span>{{detailData.name}}</span> </p>
    <p class="list position">塔吊所在位置经纬度：<span>{{detailData.position}}</span> </p>
    <P class="list person">操作人：<span>{{detailData.person}}</span> (<span>联系方式：{{detailData.tel}}</span>) </P>
    <p class="list time">报警时间：<span>{{detailData.time}}</span> </p>
    <p class="list reason">报警原因： <span v-for="(item1, index) in detailData.reason" :key="index">{{item1}};</span> </p>
    <p class="list project">报警后解决方案：<span v-for="(item2, index) in detailData.project" :key="index">{{item2}}</span> </p>
    <p class="list phone">报警时多角度拍摄照片:</p>
    <div class="image">
      <img class="imageBox" v-for="img in detailData.imgs" :src="img.src"></img>
    </div>
  </div>
</template>

<script>
import request from '@/api/workbench/tower/police/warningDetail.js'
export default {
  name: 'warningDetail',
  props: ['warningInfoID'],
  created () {
  },
  data () {
    return {
      detailData: {
        name: 'TD0001',
        position: 'E:113.2243 ; N:23.1260',
        person: 'xxxx001',
        tel: '13328070340',
        time: '2017/11/20     12:00',
        reason: ['碰撞值预警', '塔机承重超过最大值', '风速大于6级'],
        project: ['调整塔机碰撞值', '调整塔机承受的重物重量', '等待风速变小'],
        imgs: [{src: '/static/home/art (3).jpeg'}, {src: '/static/home/art (3).jpeg'}]
      }
    }
  },
  mounted () {
    this.getWarnDetail()
  },
  computed: {},
  methods: {
    getWarnDetail () {
      request.getWarnDetail(this.warningInfoID).then(
        data => {
          if (data.data.code === 0) {
            this.detailData = data.data.data.detailData
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    }
  },
  watch: {
    warningInfoID (val) {
      console.log('clickid:' + val)
      this.getWarnDetail()
    }
  }
}
</script>

<style scoped>
.warningDetail{
  margin-top: -20px;
  padding-left: 50px;
}
.list{
  color:#ACAEAF;
  font-size: 16px;
}
.name{
  color:#999999;
}
.image{
  border:1px solid;
  width:90%;
  padding:6px;
  box-sizing: border-box;
  overflow: auto;
}
.imageBox{
  width:100px;
  height:100px;
  border:1px solid;
  margin-right: 5px;
}
</style>
