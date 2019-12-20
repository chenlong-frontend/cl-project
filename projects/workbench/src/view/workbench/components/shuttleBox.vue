<template>
  <div class="bigBox">
    <!--左边部分-->
    <div class="shuttle">
      <div class="carousel">
         <div class="banner_box">
           <!--图像-->
            <transition v-bind:name="'carousel-trans-' + direction + '-old'">
              <img v-if="!isShow" :src="itemGroup.items[itemGroup.index].org_pic">
            </transition>
            <transition v-bind:name="'carousel-trans-' + direction ">
              <img v-if="isShow" :src="itemGroup.items[itemGroup.index].org_pic">
            </transition>

           <span class="left_btn" @click="goto(prevIndex)">&lt;</span>
           <span class="right_btn" @click="goto(nextIndex)">&gt;</span>

         </div>

        <div class="imageGroup">
          <div class="smallImg" ref="imgs" :style="{transform: 'translate('+ itemGroup.ilength1 +'px, 0)'}">
            <img :src="item.thumbnail" @click="goto(index)"  v-for="(item, index) in itemGroup.items" :class="{active:index === itemGroup.index}">
          </div>
        </div>
      </div>

    </div>

    <!--右边内容-->
    <div class="rightBox">
      <div class="rightContent">
        <div class="first">截屏来源&nbsp;:&nbsp;{{itemGroup.items[itemGroup.index].name}}</div>
        <div>型号&nbsp;:&nbsp;{{itemGroup.items[itemGroup.index].unit_type}}</div>
        <div>位置&nbsp;:&nbsp;{{itemGroup.items[itemGroup.index].position}}</div>
        <div>日期&nbsp;:&nbsp;{{itemGroup.items[itemGroup.index].time}}</div>
      </div>
      <el-button type="primary" @click="upload">下载<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-button type="primary" icon="el-icon-delete" @click="deleteImg">删除</el-button>
    </div>

  </div>
</template>

<script>
  import request from '@/api/workbench/videoManage/screenAlbum.js'
//  import request from '@/api/workbench/components/shuttleBox.js'
  export default {
    props: ['itemGroup'],
    data () {
      return {
        isShow: true,
        direction: 'toleft',
        timeDelta: 1000
//        pic: this.pic1,
//        num: this.num1,
//        count: this.count1,
//        currentPage: this.currentPage1,
//        ilength1: -Math.floor(this.num1 / 6) * 600
      }
    },
    watch: {
//      num: function () {
//        this.ilength1 = -Math.floor(this.num1 / 6) * 600
//        console.log(this.ilength1)
//      }
    },
    computed: {
//      ilength: function () {
//        if (this.num1 !== this.num) {
//          this.ilength1 = -Math.floor(this.num1 / 6) * 600
//          alert('ok')
//          return this.ilength1
//        }
//      },
      // **********左移************
      prevIndex () {
        this.direction = 'toleft'
        if (this.itemGroup.index <= 0 && this.itemGroup.currentPage !== 1) {
          return this.itemGroup.items.length - 1
        }
        if (this.itemGroup.index <= 0 && this.itemGroup.currentPage === 1) {
          return 0
        }
        if (this.itemGroup.index > 0) {
          return this.itemGroup.index - 1
        }
      },
      // **********右移*************
      nextIndex () {
        this.direction = 'toright'
        if (this.itemGroup.index >= this.itemGroup.items.length - 1 && this.itemGroup.currentPage !== this.itemGroup.count) {
          return 0
        }
        if (this.itemGroup.index >= this.itemGroup.items.length - 1 && this.itemGroup.currentPage === this.itemGroup.count) {
          return this.itemGroup.items.length - 1
        }
        if (this.itemGroup.index < this.itemGroup.items.length - 1) {
          return this.itemGroup.index + 1
        }
      }
    },
    methods: {
      goto (index) {
        if (this.itemGroup.index === 5 && this.direction === 'toright') {
          this.itemGroup.iLength1 = -600
          this.$emit('callback', this.itemGroup)
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
        }
        if (this.itemGroup.index === 6 && this.direction === 'toleft') {
          this.itemGroup.iLength1 = 0
          this.$emit('callback', this.itemGroup)
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
        }
        if (this.itemGroup.index === 11 && this.direction === 'toright') {
          this.itemGroup.iLength1 = -1200
          this.$emit('callback', this.itemGroup)
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
        }
        if (this.itemGroup.index === 12 && this.direction === 'toleft') {
          this.itemGroup.iLength1 = -600
          this.$emit('callback', this.itemGroup)
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
        }
        if (this.itemGroup.index === 17 && this.direction === 'toright' && this.itemGroup.currentPage !== this.itemGroup.count) {
          this.itemGroup.iLength1 = 0
          this.$emit('callback', this.itemGroup)
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
          this.itemGroup.currentPage = this.itemGroup.currentPage + 1
          this.$emit('callback', this.itemGroup)
          request.getImage({'currentPage': this.itemGroup.currentPage}).then(value => {
            this.itemGroup.items = value.albums
            this.$emit('callback', this.itemGroup)
          })
        }
//        if (this.num === 17 && this.direction === 'toright' && this.currentPage === this.count) {
//          iLength = -1200 + 'px'
//          this.$refs.imgs.style.transform = 'translateX(' + iLength + ')'
//        }
        if (this.itemGroup.index === 0 && this.direction === 'toleft' && this.itemGroup.currentPage !== 1) {
          this.itemGroup.iLength1 = -1200
          this.$refs.imgs.style.transform = 'translateX(' + this.itemGroup.iLength1 + 'px)'
          this.itemGroup.currentPage = this.itemGroup.currentPage - 1
          this.$emit('callback', this.itemGroup)
          request.getImage({'currentPage': this.itemGroup.currentPage}).then(value => {
            this.itemGroup.items = value.albums
            this.$emit('callback', this.itemGroup)
          })
        }
//        if (this.num === 0 && this.direction === 'toleft' && this.currentPage === 1) {
//          iLength = 0 + 'px'
//          this.$refs.imgs.style.transform = 'translateX(' + iLength + ')'
//        }
        this.isShow = false
        setTimeout(() => {
          this.isShow = true
          this.itemGroup.index = index
          this.$emit('callback', this.itemGroup)
        }, 10)
      },
      deleteImg () {
        let deleteId = []
        deleteId.push(this.itemGroup.items[this.itemGroup.index].album_id)
        console.log(deleteId)
        request.deletePic(deleteId).then(value => {
          request.getImage(this.itemGroup.currentPage).then(value => {
            this.itemGroup.items = value.albums
            this.$emit('callback', this.itemGroup)
          })
        })
      },
      upload () {
//        console.log(this.itemGroup.items[this.itemGroup.index].org_pic)
        window.open(this.itemGroup.items[this.itemGroup.index].org_pic.replace('getpic', 'download_file'))
      }
    }
  }
</script>

<style>
  .imageGroup .active{border:1px solid red}
  .bigBox{
    height:575px;
    padding:0 40px;
    position:relative;
  }
.shuttle{
  width:600px;
  height:540px;
  position: absolute;
  top:0px;
  left:40px;
}
  .imageGroup{
    width:600px;
    height:95px;
    overflow: hidden;
  }
  .imageGroup .smallImg{
    width:1800px;
  }
.imageGroup img{
  width:80px;
  height:80px;
  margin-top:10px;
  margin-left:19px;
}
.rightBox{
  width:220px;
  height:540px;
  position:absolute;
  top:0px;
  right:40px;
  background: #E6E6E6;
}
  .rightContent{
    width:100%;
    height:500px;
    padding-left:30px;
    color:black;
    line-height:40px;
    /*font-size:14px;*/
  }
  .rightBox .el-button{
    width:110px;
    margin-left: 0;
    border-radius: 0;
    background-color: #F3F3F4;
    color:#333;
    border:1px solid #dddddd;
    float:left;
  }
  .rightBox div{
    width:160px;
  }
  .rightBox .first{
    font-size: 18px;
    padding-top:20px;
  }
  /*!*轮播图*!*/
  .banner_box{ width: 600px; height: 450px;
    border:1px solid red;position: relative;overflow: hidden; }

  .banner_box img{width: 600px; height: 450px; float: left;}
  .banner_box .left_btn, .banner_box .right_btn{
    display: inline-block;width:60px;height: 60px;
    font-size: 40px;background:rgba(0,0,0,0.4); color: white;
    text-align: center;line-height: 60px;
    position: absolute;top: 50%;margin-top: -30px;
    opacity: 0.2;
  }
  .banner_box .left_btn{left: 0;}
  .banner_box .right_btn{right: 0;}

  .banner_box .left_btn:hover, .banner_box .right_btn:hover{
    opacity: 1
  }

  .carousel-trans-toright-enter-active,.carousel-trans-toright-old-leave-active{
    transition:all 0.2s;
  }
  .carousel-trans-toright-enter{
    transform:translateX(600px);
  }
  .carousel-trans-toright-old-leave-active{
    transform:translateX(-600px);
  }
  .carousel-trans-toleft-enter-active,.carousel-trans-toleft-old-leave-active{
    transition:all 0.2s;
  }
  .carousel-trans-toleft-enter{
    transform:translateX(-600px);
  }
  .carousel-trans-toleft-old-leave-active{
    transform:translateX(600px);
  }





</style>
