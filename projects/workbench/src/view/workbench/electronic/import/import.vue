<template>
  <div>
    <div>
      <span style="margin-left: 20px;margin-bottom: 5px;">批量导入：</span>
      <div class="tp-file-upload">
        <!--上传文件的名字-->
        <div class="upload-select-box">{{fileName}}</div>
        <el-upload
          style="padding-top:30px;padding-left: 150px;padding-bottom: 30px;width: 100%;background: white;margin-top: 10px;"
          class="upload-demo upload"
          ref="upload"
          action="/zjsbs/upload"
          name="file"
          :data="uploadData"
          :on-change="handleChange"
          :on-progress="handleProgress"
          :on-success="sueecssUploadAndPreview"
          :on-error="errInformation"
          :file-list="fileList"
          :show-file-list="false"
          :limit='500'
          :auto-upload="true">
          <el-button slot="trigger" size="small" type="primary" @click="uploadSelect" style="margin-left: 230px">选取文件</el-button>
          <el-button size="small" type="primary" style="margin-left: 10px;" @click="downLoadDemo">下载模板</el-button>
          <el-progress v-show="uploadProgress" class="upload-progress" :stroke-width="6" :percentage="uploadProgress"></el-progress>
        </el-upload>
      </div>
    </div>
    <div style="margin-bottom: 20px;">
      <span style="margin-left: 20px;">批量导入预览：</span>
      <el-button size="small" type="success" style="margin-left: 78%;margin-top: 10px;" @click="finalSubmit">确认提交</el-button>    </div>
    <el-table
      ref='multipleTable'
      :data='DepartmentUser'
      tooltip-effect='dark'
      style='width: 100%'>
      <el-table-column
        prop='eqpt_name'
        label='设备名称'>
      </el-table-column>
      <el-table-column
        prop='eqpt_num'
        label='设备编号'>
      </el-table-column>
      <el-table-column
        prop='eqpt_pos'
        label='设备位置'>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import request from '@/api/workbench/electronic/import.js'
  export default {
    props: ['gen', 'id'],
    created () {
      // 初始化时向后台请求数据
      console.log(this.gen, this.id)
    },
    data () {
      return {
        fileName: '请选择文件',
        uploadProgress: 0,   //  上传的进度条
        uploadError: true,    //  上传失败的标志
        fileList: [],
        DepartmentUser: [],
        multipleSelection: [],
        table_name: '',
        uploadData: {
          type: 1112,
          data: JSON.stringify({type_id: this.id, is_gen: this.gen}),
          md5: '123'
        }
      }
    },
    methods: {
      // *****************文件上传时进度条动态显示******************//
      handleProgress (e, file, fileList) {
        this.fileName = file.name
        this.uploadProgress = Math.ceil(e.percent)
      },
      /* ***************点击上传按钮*************** */
      uploadSelect () {
        this.$refs.upload.clearFiles()
        this.fileName = '请选择文件'
        this.uploadProgress = 0
      },
      handleChange (file) {
        this.fileName = file.name
        if (!this.uploadError) {
          this.uploadSelect()
          this.uploadError = true
        }
      },
      errInformation () {
        this.$notify.error({
          title: '提示',
          message: '上传失败，请核对模板是否正确'
        })
        this.uploadError = false
      },
      sueecssUploadAndPreview (response, file, fileList) {
        // ******* 提交之后要返回数据的前5条记录回来********//
        console.log('返回文件')
        console.log(response)
        if (response.code === 0) {
        //   request.up(this.gen, this.id).then(data => {
        //     console.log(data.data)
        //     this.DepartmentUser = data.data.result_list
        //     this.table_name = data.data.table_name
        //   })
          this.DepartmentUser = response.data.result_list
          this.table_name = response.data.table_name
        } else {
          this.DepartmentUser = []
          this.$message.error(response.msg)
        }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
    //   导入摸板
      downLoadDemo () {
        // request.goOut().then(
        //   data => {
        //     window.open(data.data.data.url)
        //   },
        //   error => {
        //     console.log(error.toString())
        //     this.$message.error('模板下载错误')
        //   }
        // )
        request.goOut()
      },
      finalSubmit () {
//        this.$message('这是一个文件确认上传操作')
        // 向后台发送确认信息，使该用户最新上传的一批数据正式加入数据库
        request.sub(this.table_name).then(
          data => {
            if (data.code === 0) {
              this.$message('文件已经成功上传')
              this.DepartmentUser = []
              this.uploadProgress = 0
              this.loading = false
              this.$emit('finalSubmit', 'ok')
            } else {
              this.$message('文件上传失败')
              this.uploadProgress = 0
              this.loading = false
            }
          }, error => {
          this.loading = false
          this.$message.error(error.toString())
        }
        )
        console.log('确认之前上传的文件加入数据库')
      }
    }
  }
</script>

<style scoped>
.tp-file-upload{
    position: relative;
}
.upload-select-box {
    text-overflow: ellipsis;
    overflow:hidden;
    white-space: nowrap;
    background-color: #EDEDED;
    font-size: 14px;
    padding: 0 15px;
    color: #5a5e66;
    border-radius: 4px 0 0 4px;
    width: 300px;
    margin-left: 50px;
    line-height: 32px;
    display: inline-block;
    position: absolute;
    top:33%;
}
.upload-progress{
    width: 50%;
    position: absolute;
    left: 50px;
}
.el-upload__tip{
    margin-top: 25px;
}
</style>
