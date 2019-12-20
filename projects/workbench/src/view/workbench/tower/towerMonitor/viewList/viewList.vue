<template>
  <div class="viewList">
      <div class="listItem" v-for="(item, index) in ViewArrayy" :key="index">
          <div class="imgBox">
            <img src="" alt="塔吊视频图"/>
            <i class="fa fa-star star" aria-hidden="true"  v-if="starIndex === index" ></i>
            <el-tooltip class="tooltip" effect="dark" content="设为默认监控视频" placement="top">
               <i class="fa fa-star-o star" aria-hidden="true" v-if="starIndex !== index" @click="otherStar(index)" ></i> 
            </el-tooltip>
          </div>
          <p>{{item.position}}</p>
          <p class="nowBackView" @click="nowCheck()">实时查看录像回放</p>
      </div>
  </div>
</template>
<script>
export default {
  name: 'viewList',
  data () {
    return {
      starIndex: -1,
      ViewArrayy: [
        {
          imgUrl: '',
          position: '塔吊尾部视频'
        },
        {
          imgUrl: '',
          position: '塔吊尾左部视频'
        },
        {
          imgUrl: '',
          position: '塔吊尾左部视频'
        },
        {
          imgUrl: '',
          position: '塔吊头部视频'
        },
        {
          imgUrl: '',
          position: '塔吊右部视频'
        }
      ]
    }
  },
  methods: {
    otherStar (index) {
      this.starIndex = index
    }
  }
}
</script>
<style scoped>
.viewList{
    width:550px;
    height:300px;
    margin:0 auto;
    overflow: auto;
    border:1px solid;
}
.listItem{
    width:118px;
    height:128px;
    border:1px solid;
    display: inline-block;
    margin:8px;
}
.listItem .imgBox{
    width:100%;
    height:60%;
    border:1px solid red;
    position: relative;
}
.listItem .imgBox .star{
    position: absolute;
    top:0px;
    right:0px;
}
.listItem  p{
    margin:0px;
    padding:0px;
}
.listItem .nowBackView{
    width:90%;
    height:20px;
    line-height: 20px;
    margin:0 auto;
    text-align: center;
    background-color: #BCE0FF;
    color:#909FF0;
    font-size: 12px;
}
  ::-webkit-scrollbar {
    width: 6px;
  }/* 滚动条整体宽度 */
  ::-webkit-scrollbar-track{
    background-color: #F3F3F4;
  }/* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb{
    background-color: #DAE4E5;
    border-radius: 3px;
  }/* 滚动条的滑块背景颜色 */
  ::-webkit-scrollbar-corner {
    background-color: #B0AFB0;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>


