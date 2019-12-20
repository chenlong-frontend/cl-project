<template>
  <div class="cl-folder">
      <!-- 头部 -->
        <div class="head">
          <div class="but-left">
            <label>当前路径: </label>
            <template v-if="title.length > 4">
              <span>...</span>
              <span class="fa fa-angle-right"></span>
            </template>
            <template v-for="(item, index) in routeText">
              <a @click="routerBack(index)" v-if="index < routeText.length-1" :title="item">{{item}}</a>
              <span :title="item" v-else>{{item}}</span>
              <span class="fa fa-angle-right" v-if="index < routeText.length-1"></span>
            </template>
          </div>
          <div class="butRight">
              <el-button @click="uploadOpen" plain icon="fa fa-cloud-upload" size="small" v-if="file[0]" v-show="model !== 'search'">上传文档</el-button>
              <el-button @click="newFileBtn" plain icon="fa fa-folder" size="small" v-if="file[1]" v-show="model !== 'search'"> 新建文件夹</el-button>
              <div class="tool-btn" v-show="selected.length > 0">
                <el-button @click="deleteFile" plain icon="el-icon-error" v-if="file[2]" size="small">删除</el-button>
                <el-button @click="shareSelect" plain icon="fa fa-share-alt-square" v-if="file[3]" size="small" v-show=false> 分享</el-button>
                <el-button @click="dialogFile=true" plain icon="fa fa-arrows-alt" v-if="file[4]" size="small" v-show="model !== 'search'"> 移动文档/文件夹</el-button>
              </div>
              <el-input size="small" @keyup.enter.native="search" v-model="searchText" placeholder="请输入内容">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </div>
        </div>

        <!-- 数据列表 -->
        <div class="tableBox">
          <el-table stripe size="small" :cell-class-name="addClass" height="400" :header-row-style='headerColor' @cell-click="nameEnterFolder" ref="multipleTable" @cell-dblclick="enterFolder"
                    @row-click="listSelect" :data="fileListData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="45"></el-table-column>
            <el-table-column prop="type" label="类型" width="50">
              <template slot-scope="scope">
                <img class="file-icon" :src="scope.row.file_type_icon" />
              </template>
            </el-table-column>
            <el-table-column prop="file_name" label="文件名" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column prop="file_alias" show-overflow-tooltip label="文件别名"></el-table-column>
            <el-table-column prop="file_size" width="120" align="center" show-overflow-tooltip label="文件大小"></el-table-column>
            <el-table-column prop="file_time" width="150" show-overflow-tooltip label="创建日期"></el-table-column>
            <el-table-column prop="file_emp_name" width="120" show-overflow-tooltip label="从属人"></el-table-column>
            <el-table-column width="200" label="操作">
              <template slot-scope="scope" v-if="scope.row.isfile">
                <el-button plain size="mini" @click="qrCode(scope.row, $event)">二维码</el-button>
                <el-button plain size="mini" @click="download(scope.row, $event)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页器 -->
        <div class="list-page" v-show="totalPage > 100">
          <el-pagination
            layout="prev, pager, next"
            :total="totalPage"
            :page-size="100"
            :current-page.sync ="pageIndex"
            @current-change="pageRequest">
          </el-pagination>
        </div>

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
        <!--**************新建文件夹对话框***************-->
        <el-dialog
          :visible.sync="dialogNewFile"
          title='新建文件夹'
          :append-to-body="true"
          width="400px">
          <div class="add-tree">
            <el-form :model="newFileForm" :rules="rules" ref="newFileForm" label-width="90px">
              <el-form-item label="文件夹名" prop="name">
                <el-input v-model="newFileForm.name" size="small"></el-input>
              </el-form-item>
              <el-form-item label="文件夹类别" prop="file_emp_id">
                <el-radio-group v-model="newFileForm.file_emp_id">
                  <el-radio :label="0">私人文件夹</el-radio>
                  <el-radio :label="-1">公共文件夹</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogNewFile = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addFolder('newFileForm')" size="small">确 定</el-button>
          </span>
        </el-dialog>
        <!--**************选择分享人***************-->
        <el-dialog
          title="选择分享人"
          append-to-body
          :visible.sync="dialogShare"
          width="1060px">
          <div class="shareTo">
            <copy-person ref="copyPerson" :config="config"></copy-person>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogShare=false">确 定</el-button>
              </span>
        </el-dialog>
        <!--二维码弹框-->
        <el-dialog :visible.sync="dialogCode" width="300px" center :modal-append-to-body= false>
          <img :src="imgsrc" style="width: 90%; margin-left: 5%">
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" ><a :href="imgsrc" download class="exportCode">导出二维码</a></el-button>
          </span>
        </el-dialog>
        <!--**************上传文件*****************-->
        <el-dialog
          title="上传文件" append-to-body :visible.sync="dialogUpload" width="600px">
            <div class="form-box cl-file-upload">
              <el-form ref="uploadForm" :model="uploadForm" :rules="uploadRules" label-width="100px" size="small">
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
                    </el-upload>
                  </div>
                  <el-progress v-show="uploadProgress" style="margin-left: 100px;margin-top: 10px;" :stroke-width="6" :percentage="uploadProgress"></el-progress>
                </div>
                <!--************************文档编号*****************************-->
                <el-form-item label="文档编号" prop="doc_num">
                  <el-input v-model="uploadForm.doc_num" disabled placeholder="不填写使用自动生成的文档编号"></el-input>
                </el-form-item>
                <!--************************文档别名*****************************-->
                <el-form-item label="文档别名" prop="file_alias">
                  <el-input v-model="uploadForm.file_alias"></el-input>
                </el-form-item>
                <!--************************文档描述*****************************-->
                <el-form-item label="文档描述" prop="file_desc">
                  <el-input type="textarea" v-model="uploadForm.file_desc"></el-input>
                </el-form-item>
              </el-form>
            </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUpload = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload('uploadForm')">确 定</el-button>
          </span>
        </el-dialog>
        <!--**************文件预览***************-->
        <el-dialog
          title="文件预览"
          append-to-body
          :visible.sync="dialogFileRead"
          width="1060px">
          <iframe class="iframe" :src="iframeSrc"></iframe>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFileRead=false">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>
<script>
import folder from '@/view/workbench/components/file/folderSelect.vue'
import request from '@/api/workbench/file/workFolder.js'
import docNumRequest from '@/api/workbench/file/upload.js'
import copyPerson from '@/view/workbench/components/transferThree.vue'
import { mapState } from 'vuex'
export default {
  props: ['path', 'model'],
  components: {folder, copyPerson},
  mounted () {
    if (this.model === 'list') {
      this.title = this.path.split('/')
      this.getFileList()
    } else if (this.model === 'search') {
      this.title = this.path.split('/')
      this.getSearch(this.path)
    }
  },
  data () {
    let checkName = (rule, value, callback) => {
      let flag = this.tableData.some(t => {
        return t.file_name === value
      })
      if (value.length > 10) {
        callback(new Error('文件夹名过长'))
      } else if (flag) {
        callback(new Error('文件名已存在'))
      } else {
        callback()
      }
    }
    return {
      role: {},
      selected: [],
      newFileForm: {
        name: '',
        file_emp_id: 0
      },
      uploadForm: {
        doc_num: '',
        file_alias: '',
        file_desc: ''
      },
      uploadRules: {
        file_alias: [{ required: true, message: '请输入文档别名', trigger: 'blur' }],
        file_desc: [{ required: true, message: '请输入文档描述', trigger: 'blur' }]
      },
      title: [],
      rules: {
        name: [{ required: true, message: '请输入文件名', trigger: 'blur' },
          {validator: checkName, trigger: 'blur'},
          {validator: this.regExp('illegalWord'), trigger: 'blur'}
        ]
      },
      headerColor: {backgroundColor: '#F7F7F7'},
      tableData: [],
      searchText: '',
      pageIndex: 1,
      imgsrc: '',
      totalPage: 0,
      dialogFile: false,
      dialogNewFile: false,
      dialogShare: false,
      dialogUpload: false,
      dialogCode: false,
      dialogFileRead: false,
      fileName: '请选择文件',
      uploadProgress: 0,
      currentFileId: '-1',
      iframeSrc: '',
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
    routeText () {
      if (this.model === 'search') {
        this.title[0] = '搜索: "' + this.title[0] + '"'
        this.title.unshift('全部文件')
        return this.title
      }
      let arr = this.title
      let len = arr.length
      if (len > 4) {
        arr = arr.slice(len - 4, len)
        arr = arr.map(t => {
          if (t.length > 6) return t.substring(0, 6) + '...'
          return t
        })
      } else {
        arr = arr.map(t => {
          if (t.length > 8) return t.substring(0, 8) + '...'
          return t
        })
      }
      return arr
    },
    fileListData () {
      return this.tableData.map(t => {
        if (!t.isfile) t.file_size = '-'
        if (t.file_emp_id === '-1') t.file_emp_name = '公共文件夹'
        return t
      })
    },
    uploadData () {
      let upData = {
        p_id: this.currentFileId,
        doc_num: this.uploadForm.doc_num,
        file_alias: this.uploadForm.file_alias,
        file_desc: this.uploadForm.file_desc
      }
      return {
        type: 238,
        data: JSON.stringify(upData),
        md5: '123'
      }
    },
    ...mapState('router', ['file'])
  },
  methods: {
    // 二维码查看
    qrCode (val, e) {
      e.stopPropagation()
      let urldata = encodeURIComponent(`{"file_id":${"'" + val.file_id + "'"},"width":400,"height":400}`)
      let httpurl = document.location.origin
      this.imgsrc = httpurl + '/zjsbs/njuapi?type=241&data=' + urldata + '&md5=md'
      console.log(this.imgsrc)
      this.dialogCode = true
    },
    // 下载
    download (val, e) {
      e.stopPropagation()
      request.getFile(val.file_id)
    },
    // 打开上传文件模态框
    uploadOpen () {
      this.dialogUpload = true
      docNumRequest.getFileNum().then(data => {
        this.uploadForm.doc_num = data.doc_num
        this.uploadSelect()
      })
    },
    // 给文件名添加class
    addClass ({columnIndex}) {
      if (columnIndex === 2) return 'file-Name'
    },
    newFileBtn () {
      if (this.title.length > 14) {
        this.$notify({
          title: '错误',
          message: '当前文件夹下不能新建',
          type: 'error'
        })
        return false
      }
      this.dialogNewFile = true
    },
    // **********************点击表头的复选框多选事件*****************//
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => { this.$refs.multipleTable.toggleRowSelection(row) })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // *****************多选事件记录************//
    handleSelectionChange (val) {
      this.selected = val
    },
    // ****************点击分页器事件*********************//
    pageRequest (currentPage) {
      if (this.model === 'list') {
        this.getFileList(currentPage)
      } else if (this.model === 'search') {
        this.getSearch(currentPage)
      }
    },
    // ****************单击表格事件*********************//
    listSelect (data, event) {
      let nodeClass = event.target.classList[0]
      if (nodeClass === 'el-checkbox__original' || nodeClass === 'el-checkbox__inner' || nodeClass === 'el-checkbox') return false
      this.$refs.multipleTable.toggleRowSelection(data, true)
    },
    nameEnterFolder (val, column) {
      if (column.property !== 'file_name') return false
      this.enterFolder(val)
    },
    // ****************双击表格事件*********************//
    enterFolder (val) {
      if (val.isfile) {
        this.iframeSrc = '/zjsbs/' + val.file_access_url
        if (val.file_type_name === 'unknown') {
          this.$notify.error({
            title: '提示',
            message: '暂不支持该类型文件的在线预览，请下载后查看'
          })
          return false
        }
        this.dialogFileRead = true
        return false
      }
      if (this.model === 'list') {
        request.getPath(val.file_id).then(data => {
          this.$router.push({path: `${encodeURIComponent(data.data + '/' + val.file_name)}`})
        })
      } else if (this.model === 'search') {
        request.getPath(val.file_id).then(data => {
          this.$router.push({path: `/file-workFolder/list/${encodeURIComponent(data.data + '/' + val.file_name)}`})
        })
      }
    },
    // *****************搜索事件******************//
    search () {
      if (this.searchText.length === 0 || this.searchText.length > 12) {
        this.$notify.error({
          title: '提示',
          message: '搜索条件为空或者过长'
        })
        return false
      }
      this.$router.push({path: `/file-workFolder/search/${encodeURIComponent(this.searchText)}`})
      this.pageIndex = 1
    },
    // *****************移动文档文件夹******************//
    folderSelect () {
      let folder = this.$refs.folder.getFolder()
      this.dialogFile = false
      if (folder.data.file_id === this.currentFileId || folder.data.length === 0) { return false }
      let param = {
        folderId: this.selected,
        pId: folder.data.file_id
      }
      request.moveFile(param).then(data => {
        if (data.code === 0) {
          this.getFileList()
        }
      })
    },
    // *****************删除文件文件夹******************//
    deleteFile () {
      this.$confirm('确认执行此删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request.removeFile(this.selected).then(t => {
          if (t.code === 0) {
            this.tableData = this.tableData.filter(t => {
              return this.selected.indexOf(t) === -1
            })
          }
        })
      })
    },
    // *****************添加文件夹***************//
    addFolder (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {
            name: this[formName].name,
            file_p_id: this.currentFileId
          }
          if (this[formName].file_emp_id === -1) param.file_emp_id = -1
          request.addFolder(param).then(data => {
            this.pageIndex = 1
            this.getFileList()
            this.dialogNewFile = false
            this.$refs[formName].resetFields()
          })
        }
      })
    },
    // *****************选择抄送人******************//
    shareSelect () {
      this.dialogShare = true
    },
    // *****************点击路由跳转******************//
    routerBack (index) {
      if (this.model === 'list') {
        let len = this.title.length + index - this.routeText.length + 1
        let url = this.title.slice(0, len)
        let path = encodeURIComponent(url.join('/'))
        this.$router.push({path: `${path}`})
      } else if (this.model === 'search') {
        this.pageIndex = 1
        this.$router.push({path: `/file-workFolder/list/%E4%B8%BB%E7%9B%AE%E5%BD%95`})
      }
    },
    // *****************请求文件列表数据******************//
    getFileList (val) {
      let requestData = {
        file_path: this.path,
        page_num: val || 1
      }
      request.getTable(requestData).then(data => {
        this.tableData = data.child_files
        this.totalPage = parseInt(data.page_count)
        this.currentFileId = data.current_file_id
      })
    },
    // *****************请求搜索结果******************//
    getSearch (val) {
      request.getSearch({page: this.pageIndex, result: val}).then(data => {
        this.tableData = data
      })
    },
    // *****************文件上传时进度条动态显示******************//
    handleProgress (e, file, fileList) {
      this.fileName = file.name
      this.uploadProgress = Math.ceil(e.percent)
    },
    // *****************文件上传******************//
    submitUpload (formName) {
      if (this.fileName > 16) {
        this.$notify.error({
          title: '上传失败',
          message: '字数不得超过16字'
        })
        return false
      }
      this.$refs[formName].validate((valid) => {
        let pattern = new RegExp('[`=|{}/[\\]]')
        if (pattern.test(this.fileName)) {
          this.$notify({
            title: '上传失败',
            message: '文件名不能带有特殊字符(`=|\\{})',
            type: 'error'
          })
          return false
        }
        this.$refs.upload.submit()
      })
    },
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
    // *****************上传失败回调******************//
    errorEvent () {
      this.$notify.error({
        title: '提示',
        message: '上传失败，请重新上传'
      })
      this.uploadError = false
    },
    uploadSuccess (res, file) {
      if (res.code === 0) {
        this.getFileList(this.pageIndex)
        this.$notify({
          title: '成功',
          message: file.name + '上传成功',
          type: 'success'
        })
        this.$refs['uploadForm'].resetFields()
        this.dialogUpload = false
      } else {
        this.$notify.error({
          title: '提示',
          message: '上传失败，请重新上传'
        })
      }
    }
  },
  watch: {
    '$route' () {
      this.title = this.path.split('/')
      if (this.model === 'list') {
        this.getFileList()
      } else if (this.model === 'search') {
        this.getSearch(this.path)
      }
    }
  }
}
</script>
<style scoped>
  .head{width:100%;height: 44px;line-height: 44px;background-color: #F2F2F2;border-radius: 5px;position: relative;}
  .but-left {font-size: 12px;margin-left: 10px;}
  .but-left label {font-weight: 600;margin-right: 8px;}
  .but-left a {color: #4287ed;cursor: pointer;}
  .but-left a:hover {text-decoration: underline;}
  .butRight{height:50px;position: absolute;right:10px;top:0;}
  .upload-demo{width:85px;display: inline-block;}
  .tool-btn {display: inline-block;}
  .tableBox{width:100%;height: auto;margin: 10px 0 50px 0;}
  .icon {font-size: 18px;}
  .icon.fa-folder {color: #F6D574;}
  .icon.fa-file-pdf-o {color: #BF0100;}
  .list-page {text-align: center;}
  .file-icon {width: 20px;}
  .shareTo {height: 400px;}

  .input-tips {color: #666666;font-size: 12px;margin-top: 10px;}
  .warning {color: #E64865;margin-right: 10px;}
  .item {margin-bottom: 18px;}
  .item label {width: 100px;line-height: 32px;float: left;color: #5a5e66;font-size: 14px;box-sizing: border-box;vertical-align: middle;text-align: right;padding: 0 12px 0 0;}
  .item::before {display: table;content: "";}
  .item::after {clear: both;}
  .item-right {position: relative;margin-left: 100px;}
  .item-right .cursor-pointer {cursor: pointer;}
  .item-right p{color: #5a5e66;border: 1px solid #d8dce5;border-radius: 4px;font-size: 14px;padding: 0 15px;box-sizing: border-box;}
  .upload-select-box {text-overflow: ellipsis;overflow:hidden;white-space: nowrap;background-color: #EDEDED;font-size: 14px;padding: 0 15px;color: #5a5e66;border-radius: 4px 0 0 4px;width: 350px;line-height: 32px;display: inline-block;}
  .upload {display: inline-block;position: absolute;}
  .exportCode{color: white;text-decoration: none;}
  .iframe {width: 100%;height: 400px;border: none;}
</style>


