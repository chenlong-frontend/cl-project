<template>
  <div>
    <div class="tp-file-upload">
    <span style="margin-left: 20px">人员批量导入：</span>
    <div class="upload-select-box">{{fileName}}</div>
    <el-upload
      style="padding-top:30px;padding-left: 150px;padding-bottom: 30px;width: 100%;background: white"
      class="upload-demo"
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
      :limit='1'
      :auto-upload="true">
      <el-button slot="trigger" size="small" @click="uploadSelect" type="primary" style="margin-left: 230px">选取文件</el-button>
      <!--<el-button size="small" type="primary" style="margin-left: 10px;" @click="submitUpload">预览</el-button>-->
      <el-button size="small" type="primary" style="margin-left: 10px;" @click="downLoadDemo">下载模板</el-button>
      <el-progress v-show="uploadProgress"  class="upload-progress" :stroke-width="6" :percentage="uploadProgress"></el-progress>
      <div slot="tip" class="el-upload__tip">请先下载人员信息模板，填写完毕后再上传系统（一次最多上传500人）</div>
    </el-upload>
    </div>
    <div style="margin-bottom: 20px;">
    <span style="margin-left: 20px;">批量导入预览：</span>
    <el-button size="small" type="success" style="margin-left: 65%;margin-top: 10px;" @click="finalSubmit">确认上传</el-button>
      <el-button size="small" type="info" style="margin-left: 20px;margin-top: 10px;" @click="cancelSubmit">取消上传</el-button>
    </div>
    <el-table
      ref='multipleTable'
      :data='DepartmentUser'
      tooltip-effect='dark'
      style='width: 100%'>
      <!--<el-table-column-->
        <!--type='selection'-->
        <!--width='55'>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='emp_name'
        label='姓名'
        width='80'>
        <!--<template slot-scope='scope'>{{ scope.row.date }}</template>-->
      </el-table-column>
      <el-table-column
        prop='emp_sex'
        label='性别'
        width='50'>
      </el-table-column>
      <el-table-column
        prop='age'
        label='生日'
        width='120'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='pro_id'
        label='员工工号'
        width='120'
        show-overflow-tooltip>
      </el-table-column>
      <!--<el-table-column-->
      <!--prop='dep_name'-->
      <!--label='项目部门'-->
      <!--width='100'-->
      <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
      <!--prop='emp_post'-->
      <!--label='项目职务'-->
      <!--width='100'-->
      <!--show-overflow-tooltip>-->
      <!--</el-table-column>-->
      <el-table-column
        prop='ic_card'
        label='IC卡号'
        width='100'
        show-overflow-tooltip>
        </el-table-column>
      <!--<el-table-column-->
        <!--prop='emp_role'-->
        <!--label='工种'-->
        <!--width='100'-->
        <!--show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column
        prop='emp_mobile'
        label='手机'

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='emp_phone'
        label='固定电话'

        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='emp_email'
        label='邮箱'
        show-overflow-tooltip>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
  import request from '@/api/workbench/staff/department/multipleImport.js'
  export default {
    created () {
      // 初始化时向后台请求数据
    },
    data () {
      return {
        fileName: '请选择文件',
        uploadProgress: 0,   //  上传的进度条
        uploadError: true,    //  上传失败的标志
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
      /* ***************点击上传按钮*************** */
      uploadSelect () {
        this.$refs.upload.clearFiles()
        this.fileName = '请选择文件'
        this.uploadProgress = 0
      },
      handleChange (file) {
        this.fileName = file.name
        console.log(this.fileName)
        if (!this.uploadError) {
          this.uploadSelect()
          this.uploadError = true
        }
      },
      // *****************文件上传时进度条动态显示******************//
      handleProgress (e, file, fileList) {
        this.fileName = file.name
        console.log(e.percent)
        this.uploadProgress = Math.ceil(e.percent)
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
          this.DepartmentUser = response.data.gro_list
        } else {
          this.DepartmentUser = []
          this.$notify.error({
            title: '提示',
            message: response.msg
          })
        }
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      downLoadDemo () {
        request.downLoadDemo().then(
          data => {
            window.open(data.data.data.url)
          },
          error => {
            console.log(error.toString())
            this.$message.error('模板下载错误')
          }
        )
      },
      finalSubmit () {
//        this.$message('这是一个文件确认上传操作')
        // 向后台发送确认信息，使该用户最新上传的一批数据正式加入数据库
        request.confirm(1).then(
          data => {
            if (data.data.code === 0) {
              this.$notify({
                title: '成功',
                message: '文件已经成功上传！',
                type: 'success'
              })
              this.DepartmentUser = []
              this.uploadSelect()
            } else {
              this.$notify.error({
                title: '错误',
                message: '文件上传失败'
              })
            }
          }, error => {
          this.loading = false
          this.$notify.error({
            title: '错误',
            message: error.toString()
          })
        }
        )
        console.log('确认之前上传的文件加入数据库')
      },
      cancelSubmit () {
        this.DepartmentUser = []
        // 向后台发送确认信息，使该用户最新上传的一批数据不加入数据库
        request.confirm(0).then(
          data => {
            this.$notify({
              title: '警告',
              message: '文件已经取消上传',
              type: 'warning'
            })
          }, error => {
          this.loading = false
          this.$notify.error({
            title: '错误',
            message: error.toString()
          })
        }
        )
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
    overflow: hidden;
    white-space: nowrap;
    background-color: #EDEDED;
    font-size: 14px;
    padding: 0 15px;
    color: #5a5e66;
    border-radius: 4px 0 0 4px;
    width: 300px;
    margin-left: -82px;
    line-height: 32px;
    display: inline-block;
    position: absolute;
    top: 32.8%;
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
