<template>
  <div class="tp_addLog">
    <el-form  label-width="120px" :model="formLabelAlign">
      <el-form-item label="施工进度：">
        <!--<el-input v-model="formLabelAlign.name"></el-input>-->
        <input type="range"
               id="processRange"
               @input="changeProcess()"
               :value="formLabelAlign.rec_prog" max="100" min="0" step="1"
               :style="{background: '-webkit-linear-gradient(top, #059CFA, #059CFA) 0% 0% / '+ formLabelAlign.rec_prog +'% 100% no-repeat'}"/>
        <el-input v-model="formLabelAlign.rec_prog" style="width: 55px;" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="施工图片：">
        <div class="imgUpLoad">
          <div class="imgBox">
            <el-upload
              class="avatar-uploader"
              action="/zjsbs/upload"
              name="file"
              :data="uploadData"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus
              avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="施工日志：" style="margin-top: 100px;">
        <el-input type="textarea" v-model="formLabelAlign.rec_con" size="medium"></el-input>
      </el-form-item>
      <div style="margin-left: 70%" >
        <el-button @click="$emit('close-addLog')" size="small">取 消</el-button>
        <el-button type="primary" @click="submitLog" size="small">确 定</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        formLabelAlign: {
          rec_prog: 0,
          rec_con: '',
          rec_pic_url: ''
        },
        uploadData: {
          type: 1614,
          data: JSON.stringify({}),
          md5: '123'
        },
        imageUrl: ''
      }
    },
    methods: {
      formInit () {
        this.formLabelAlign = {
          rec_prog: 0,
          rec_con: '',
          rec_pic_url: ''
        }
        this.imageUrl = ''
      },
      submitLog () {
        if (this.formLabelAlign.rec_prog === '' || this.formLabelAlign.rec_con === '' || this.imageUrl === '') {
          this.$notify({
            title: '提示',
            message: '请将信息填写完整',
            type: 'warning'
          })
        } else {
          this.$emit('add-log', this.formLabelAlign)
        }
      },
      changeProcess () {
        let range = document.getElementById('processRange')
        this.formLabelAlign.rec_prog = range.value
      },
      // ******************图片上传的操作*******************//
      handleAvatarSuccess (res, file) {
        // imagUrl是本页面直接显示的图片对象的地址，
        console.log(res)
        if (res.code !== 0) {
          this.$notify.error({
            title: '失败',
            message: '上传图片失败'
          })
        } else {
          this.imageUrl = URL.createObjectURL(file.raw)
          this.formLabelAlign.rec_pic_url = res.data.rec_pic_url
        }
      },
      beforeAvatarUpload (file) {
//        const isLt2M = file.size / 1024 / 1024 < 2
//        if (!isLt2M) {
//          this.$notify({
//            title: '警告',
//            message: '图片大小不能超过 2MB!',
//            type: 'warning'
//          })
//        }
//        return isLt2M
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

  .el-textarea__inner{
    height: 120px;
  }
  .showImgBox
  {
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
