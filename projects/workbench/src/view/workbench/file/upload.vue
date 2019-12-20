<template>
  <div class="cl-file-upload">
    <ibox title="上传新文档">
      <p class="tips">你可以上传任意格式文件，但仅支持Word、Excl、PPT、图片、Pdf、txt文件的在线预览</p>
      <div class="form-box cl-file-upload">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
          <!--************************选择文件夹*****************************-->
          <div class="item">
            <label>选择文件夹</label>
            <div class="item-right">
              <p @click="dialogFile = true" class="cursor-pointer">{{folderText}}<span v-show="folderText.length === 0">当前未选择文件夹</span></p>
              <div class="input-tips">
                <span class="warning">*</span>上传文件之前请先选择文件夹
              </div>
            </div>
          </div>
          <div class="item">
            <!--************************上传文件*****************************-->
            <label>文件上传</label>
            <div class="item-right">
              <div class="upload-select-box">{{fileName}}</div>
              <el-upload
                class="upload" ref="upload" name = "file"
                :data="uploadData" action="/zjsbs/upload"
                :on-progress="handleProgress" :on-change="handleChange"
                :on-success="uploadSuccess" :multiple="false" :limit=1 :on-error="errorEvent"
                :show-file-list="false" :auto-upload="false">
                <el-button slot="trigger" size="small" @click="uploadSelect" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
              </el-upload>
            </div>
            <el-progress v-show="uploadProgress" style="margin-left: 100px;margin-top: 10px;" :stroke-width="6" :percentage="uploadProgress"></el-progress>
          </div>
          <!--************************文档编号*****************************-->
          <el-form-item label="文档编号" prop="doc_num">
            <el-input v-model="form.doc_num" disabled placeholder="不填写使用自动生成的文档编号"></el-input>
          </el-form-item>
          <!--************************文档别名*****************************-->
          <el-form-item label="文档别名" prop="file_alias">
            <el-input v-model="form.file_alias"></el-input>
          </el-form-item>
          <!--************************文档描述*****************************-->
          <el-form-item label="文档描述" prop="file_desc">
            <el-input type="textarea" v-model="form.file_desc"></el-input>
          </el-form-item>
          <!--************************选择抄送人*****************************-->
          <div class="item" v-show=false>
            <label>抄送给</label>
            <div class="item-right cc-to">
              <p>
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  type="info">
                  {{tag.name}}
                </el-tag>
              </p>
              <div class="input-tips">
                <span class="warning">*</span>抄送文档即拥有此文档的查阅权限
                <a class="cc-add" @click="dialogPerson=true">+ 添加新抄送人员</a>
              </div>
            </div>
          </div>
          <!--************************选择审核人*****************************-->
          <el-form-item label="选择审核人">
            <el-select v-model="form.asg_emp_id" placeholder="选择审核人" prop="asg_emp_id">
              <el-option v-for="item in asg_emp_id" :label="item.name" :value="item.emp_id" :key="item.emp_id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <hr class="line" />
      <el-button class="submit" type="primary" :loading="formLoading" @click="submit('form')"><span v-show="!formLoading">提交</span><span v-show="formLoading">提交中</span></el-button>

      <!--**************选择文件夹对话框***************-->
      <el-dialog
        title="文件夹选择"
        append-to-body
        :visible.sync="dialogFile"
        width="600px">
        <div>
          <folder ref="folder"></folder>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="folderSelect">确 定</el-button>
      </span>
      </el-dialog>
      <el-dialog
        title="人员选择"
        append-to-body
        :visible.sync="dialogPerson"
         width="1050px">
        <div>
          <copy-person ref="copyPerson" :config="config"></copy-person>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
      </el-dialog>
    </ibox>
  </div>

</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import folder from '@/view/workbench/components/file/folderSelect.vue'
  import request from '@/api/workbench/file/upload.js'
  import copyPerson from '@/view/workbench/components/transferThree.vue'
  export default {
    name: 'fileupload',
    components: {ibox, folder, copyPerson},
    mounted () {
      request.getFileNum().then(data => {
        this.form.doc_num = data.doc_num
        this.fileNum = data.doc_num
        this.asg_emp_id = data.rvw_emps
      })
    },
    data () {
      return {
        form: {
          file_p_id: '',
          file_desc: '',
          doc_num: '',
          file_alias: '',
          asg_emp_id: '',
          copy_emps: [],
          // 上传结束之后后台返回值
          file_id: '',
          file_ser_id: '',
          file_flag: true
        },
        rules: {
          file_alias: [{ required: true, message: '请输入文档别名', trigger: 'blur' }],
          file_desc: [{ required: true, message: '请输入文档描述', trigger: 'blur' }]
        },
        formLoading: false,
        fileNum: '',
        uploadProgress: 0,
        folderText: '',
        fileName: '请选择文件',
        tags: [],
        asg_emp_id: [],
        dialogFile: false,
        dialogPerson: false,
        uploadError: true,
        config: {
          getData1: 612, // 第一张表的信息
          getData2: 613, // 第二张表的信息
          getData3: 614,
          getData4: 615, // 搜索
          getData5: 610,  // 左移
          getData6: 611   // 右移
        }
      }
    },
    computed: {
      uploadData () {
        let upData = {
          file_id: this.form.file_id,
          p_id: this.form.file_p_id
        }
        return {
          type: 237,
          data: JSON.stringify(upData),
          md5: '123'
        }
      }
    },
    methods: {
      // *****************表单提交******************//
      submit (formName) {
        console.log(this.form)
        if (this.formLoading) return false
        if (this.fileName > 16) {
          this.$notify.error({
            title: '上传失败',
            message: '字数不得超过16字'
          })
          return false
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.uploadProgress < 100) {
              this.$notify.error({
                title: '提交错误',
                message: '请等待文件上传完成'
              })
              return false
            } else if (this.form.asg_emp_id.length === 0) {
              this.$notify.error({
                title: '提交错误',
                message: '请选择审核人'
              })
              return false
            }
            this.form.copy_emps = this.tags.map(t => { return t.id })
            if (this.form.doc_num.length === 0) this.form.doc_num = this.fileNum
            // 提交表单
            this.formLoading = true
            request.submit(this.form).then(data => {
              this.$notify({
                title: '提交成功',
                message: '表单已成功提交',
                type: 'success'
              })
              this.formLoading = false
              request.getFileNum().then(data => {
                this.form.doc_num = data.doc_num
                this.fileNum = data.doc_num
                this.asg_emp_id = data.rvw_emps
              })
              this.uploadSelect()
              this.$refs[formName].resetFields()
            })
          }
        })
      },
      // *****************文件上传******************//
      submitUpload () {
        if (this.form.file_p_id.length === 0) {
          this.$refs.upload.clearFiles()
          this.fileName = '请先选择文件夹'
          this.$notify.error({
            title: '上传错误',
            message: '请先选择文件夹'
          })
          return false
        }
        if (!/^[^%&',;*!@|[\]=?/$\x22]+$/.test(this.fileName)) {
          this.$notify({
            title: '上传失败',
            message: '文件名不能带有特殊字符',
            type: 'error'
          })
          return false
        }
        this.$refs.upload.submit()
      },
      // *****************上传失败回调******************//
      errorEvent () {
        this.$notify.error({
          title: '提示',
          message: '上传失败，请重新上传'
        })
        this.uploadError = false
      },
      // *****************文件上传时进度条动态显示******************//
      handleProgress (e, file, fileList) {
        this.fileName = file.name
        this.uploadProgress = Math.ceil(e.percent)
      },
      // *****************fileinput状态改变显示选中文件文件名******************//
      handleChange (file) {
        this.fileName = file.name
        if (!this.uploadError) {
          this.uploadSelect()
          this.uploadError = true
        }
      },
      uploadSelect () {
        this.$refs.upload.clearFiles()
        this.fileName = '请选择文件'
        this.uploadProgress = 0
      },
      uploadSuccess (res, file) {
        if (res.code !== 0) {
          this.$notify.error({
            title: '提示',
            message: '上传失败，请重新上传'
          })
          this.uploadError = false
        } else {
          this.$notify({
            title: '成功',
            message: file.name + '上传成功',
            type: 'success'
          })
          this.form.file_id = res.data.file_id
          this.form.file_ser_id = res.data.file_ser_id
        }
      },
      // *****************文件夹选择******************//
      folderSelect () {
        let folder = this.$refs.folder.getFolder()
        console.log(folder)
        this.form.file_p_id = folder.data.file_id
        this.folderText = folder.text
        this.dialogFile = false
      },
      confirm () {
        this.tags = this.$refs.copyPerson.getPerson()
        this.dialogPerson = false
      }
    }
  }
</script>

<style scoped>
  p {margin: 0;line-height: 32px;}
  .tips {background-color: #FCF8E3;width: 70%;border: 1px solid #FAEBCC;margin-bottom: 15px;color: #8A6D3B;font-size: 14px;padding: 8px 10px;}
  .form-box {width: 550px;}
  .input-tips {color: #666666;font-size: 12px;margin-top: 10px;}
  .warning {color: #E64865;margin-right: 10px;}
  .item {margin-bottom: 18px;}
  .item label {width: 100px;line-height: 32px;float: left;color: #5a5e66;font-size: 14px;box-sizing: border-box;vertical-align: middle;text-align: right;padding: 0 12px 0 0;}
  .item::before {display: table;content: "";}
  .item::after {clear: both;}
  .item-right {position: relative;margin-left: 100px;}
  .item-right .cursor-pointer {cursor: pointer;}
  .item-right p{color: #5a5e66;border: 1px solid #d8dce5;border-radius: 4px;font-size: 14px;padding: 0 15px;box-sizing: border-box;}
  .upload-select-box {text-overflow: ellipsis;overflow:hidden;white-space: nowrap;background-color: #EDEDED;font-size: 14px;padding: 0 14px;color: #5a5e66;border-radius: 4px 0 0 4px;width: 265px;line-height: 32px;display: inline-block;}
  .upload {display: inline-block;position: absolute;}
  .cc-to p{padding: 10px;min-height: 32px;}
  .cc-to p span{margin: 3px;}
  .cc-add {float: right;color: #3F51B5;cursor: pointer;}
  .line {height:1px;border:none;border-top:1px solid #EDEDED;margin: 5px 0 0 10px;}
  .submit {margin: 20px 10px 50px 10px;width: 150px;}
</style>
