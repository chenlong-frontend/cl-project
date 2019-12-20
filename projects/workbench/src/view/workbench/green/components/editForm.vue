<template>
  <div>
    <el-form ref="form" size="small" :model="form" label-width="120px">
      <el-form-item :label="title">
        <el-select v-model="form.award_id" placeholder="请选择">
          <el-option
            v-for="(item, index) in dataExtra"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划开始时间">
        <el-date-picker
          v-model="form.start_time"
          :editable="false"
          type="date"
          style="width: 200px"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束时间">
        <el-date-picker
          v-model="form.end_time"
          :editable="false"
          type="date"
          style="width: 200px"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="资质/证书">
        <el-upload
          action="/zjsbs/upload"
          list-type="picture-card"
          :file-list="imgList"
          :on-success="uploadSuccess"
          name="file"
          ref="upload"
          :on-remove="handleRemove"
          :data="uploadData"
          :on-preview="handlePictureCardPreview">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>未获得资质/证书可先不上传</p>
      </el-form-item>
    </el-form>
    <el-dialog :append-to-body="true" :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['dataExtra', 'title', 'tableSelect'],
    mounted () {
      this.formInit()
    },
    data () {
      return {
        form: {
          end_time: '',
          start_time: '',
          award_id: '',
          pic: ''
        },
        uploadData: {
          type: 12,
          data: JSON.stringify({flag: 2}),
          md5: '123'
        },
        fileList2: [],
        dialogImageUrl: '',
        dialogVisible: false,
        imgList: []
      }
    },
    methods: {
      formInit () {
        this.form = Object.assign({}, this.form, this.tableSelect)
        if (this.form.pic.length !== 0) {
          this.imgList = this.form.pic.split(';').map(t => {
            return {
              name: 'pic',
              url: t,
              pic_url: t
            }
          })
        }
      },
      handlePictureCardPreview (file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      uploadSuccess (response, file, fileList) {
        this.imgList = fileList
        this.imgList[this.imgList.length - 1].pic_url = response.data.pic_url
      },
      handleRemove (file, fileList) {
        this.imgList = fileList
      },
      getForm () {
        this.form.pic = this.imgList.map(v => {
          return v.pic_url
        }).join(';')
        return this.form
      },
      formReset () {
        for (let o of Object.keys(this.form)) {
          this.form[o] = ''
        }
        this.imgList = []
        this.$refs.upload.clearFiles()
      }
    }
  }
</script>

<style scoped>
</style>
