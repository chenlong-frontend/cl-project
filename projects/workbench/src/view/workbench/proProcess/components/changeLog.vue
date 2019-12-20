<template>
  <div class="tp_changeLog">
    <el-form  label-width="120px" :model="this.changedata">
      <el-form-item label="施工进度：">
        <span>{{formatData(this.changedata.rec_prog)}}%</span>
      </el-form-item>
      <el-form-item label="施工图片：">
        <img :src="this.changedata.rec_pic_url" class="imgstyle">
      </el-form-item>
      <el-form-item label="施工日志：" >
        <el-input type="textarea" v-model="this.changedata.rec_con" size="medium" readonly></el-input>
      </el-form-item>
      <span style="margin-left: 80%">
        <el-button type="primary"  size="small" @click="$emit('close-showLog')">确 定</el-button>
      </span>
    </el-form>
  </div>
</template>
<script>
  import roundMath from 'lodash/round'
  export default {
    props: ['changedata'],
    data () {
      return {
        formLabelAlign: this.changedata
      }
    },
    methods: {
      formatData (value) {
        return roundMath(value, 2)
      }
    }
  }
</script>
<style scoped>
  input[type=range] {
    -webkit-appearance: none;
    width: 200px;
    border-radius: 10px; /*这个属性设置使填充进度条时的图形为圆角*/
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    height: 10px;
    border-radius: 10px; /*将轨道设为圆角的*/
    border: 1px solid #ccc;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    margin-top: -3px; /*使滑块超出轨道部分的偏移量相等*/
    border-radius: 50%; /*外观设置为圆形*/
    background-color: #1C84C6;
    border: solid 0.125em rgba(205, 224, 230, 0.5); /*设置边框*/
  }

  .imgstyle{
    width: 280px;
    height:120px;
    border:1px solid #ccc;
  }

  .showImgBox {
    position: relative;
    width: 280px;
    height: 120px;
    border:1px solid lightgray;
  }
  .showImgBox img{
    width: 280px;
    height:120px;
  }
  .showImgMsg{
    text-align: center;
    position: absolute;
    top: 100%;
    width: 100%;
  }
  .showImg img{
    width: 100%;
  }
  .imgBox{
    width: 280px;
    height:120px;
    border:1px solid lightgrey;
  }
  .imgUpLoad{
    position: absolute;
  }
  .imgUpLoad .avatar-uploader  .el-upload {
    width: 280px;
    height:120px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .imgUpLoad .avatar-uploader  .el-upload:hover {
    border-color: #409EFF;
  }
  .imgUpLoad .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 120px;
    text-align: center;
    margin-left: 120px;
  }
  .imgUpLoad .avatar {
    width: 278px;
    height: 118px;
    display: block;
  }
</style>
