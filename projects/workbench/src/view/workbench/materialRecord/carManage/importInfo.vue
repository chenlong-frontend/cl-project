<template>
  <div>
    <div>
      <span style="margin-left: 20px">车辆批量导入：</span>
      <el-upload
        style="padding-top:30px;padding-left: 150px;padding-bottom: 30px;width: 100%;background: white"
        class="upload-demo"
        ref="upload"
        action="/zjsbs/upload"
        name="file"
        :data="uploadData"
        :on-success="sueecssUploadAndPreview"
        :on-error="errInformation"
        :file-list="fileList"
        :limit='1'
        :auto-upload="true">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button size="small" type="primary" style="margin-left: 10px;" @click="downLoadDemo">下载车辆模板</el-button>
        <div slot="tip" class="el-upload__tip">请先下载车辆信息模板，填写完毕后再上传系统（一次最多上传500人）</div>
      </el-upload>
    </div>
    <div class="button">
      <span class="title">批量导入预览：</span>
      <el-button size="small" type="success" @click="finalSubmit">确认上传</el-button>
      <el-button size="small" type="info" @click="cancelSubmit">取消上传</el-button>
    </div>
    <el-table
      ref='multipleTable'
      :data='DepartmentUser'
      tooltip-effect='dark'
      style='width: 100%'>

      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>

      <el-table-column
        prop='n1'
        label='车牌号'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n2'
        label='车辆品牌'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n3'
        label='车辆型号'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n4'
        label='车辆自重'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n5'
        label='长期管理员'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n5'
        label='联系方式'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n5'
        label='所属公司'
        align="center"
        show-overflow-tooltip>
      </el-table-column>

      <el-table-column
        prop='n5'
        label='备注'
        align="center"
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>


</template>

<script>
export default {
  data () {
    return {
      fileList: [],
      DepartmentUser: [],
      multipleSelection: [],
      uploadData: {
        type: 238,
        data: JSON.stringify({isToDb: 0, flag: 4}),
        md5: '123'
      }
    }
  },
  methods: {
    errInformation (err, file, fileList) {
      this.$message.error('上传失败，请核对模板是否正确')
      console.log(err)
    },
    sueecssUploadAndPreview (response, file, fileList) {
      // ******* 提交之后要返回数据的前5条记录回来********//
      console.log('返回文件')
      console.log(response)
      console.log('1')
      console.log(file)
      if (response.code === 0) {
        this.DepartmentUser = response.data.gro_list
      } else {
        this.DepartmentUser = []
        this.$message.error(response.msg)
      }
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    downLoadDemo () {
//      request.downLoadDemo().then(
//        data => {
//          window.open(data.data.data.url)
//        },
//        error => {
//          console.log(error.toString())
//          this.$message.error('模板下载错误')
//        }
//      )
    },
    finalSubmit () {
//        this.$message('这是一个文件确认上传操作')
      // 向后台发送确认信息，使该用户最新上传的一批数据正式加入数据库
//      request.confirm(1).then(
//        data => {
//          if (data.data.code === 0) {
//            this.$message('文件已经成功上传')
//            this.DepartmentUser = []
//          } else this.$message('文件上传失败')
//        }, error => {
//          this.loading = false
//          this.$message.error(error.toString())
//        }
//      )
      console.log('确认之前上传的文件加入数据库')
    },
    cancelSubmit () {
      this.DepartmentUser = []
      // 向后台发送确认信息，使该用户最新上传的一批数据不加入数据库
//      request.confirm(0).then(
//        data => {
//          this.$message('文件已经取消上传')
//        }, error => {
//          this.loading = false
//          this.$message.error(error.toString())
//        }
//      )
    }
  }
}
</script>

<style scoped>
.button{height: 53px;}
  .title{display: inline-block;width:80%;margin-top: 10px;}
  .button .el-button{margin-top: 10px;}
</style>
