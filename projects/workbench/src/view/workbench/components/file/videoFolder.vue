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
            <el-button @click="newAddressBtn" plain icon="fa fa-home" size="small" v-show="model !== 'search'"> 添加区域</el-button>
            <el-button @click="newCameraBtn" plain icon="fa fa-video-camera" size="small" v-show="model !== 'search' && path !=='主目录'"> 添加摄像头</el-button>
              <div class="tool-btn" v-show="selected.length > 0">
                <el-button @click="deleteFile" plain icon="el-icon-error" size="small">删除</el-button>
                <el-button @click="editBtn" plain icon="fa fa-share-alt-square" size="small" v-show="selected.length === 1">  编辑</el-button>
              </div>
              <el-input size="small" @keyup.enter.native="search" v-model="searchText" placeholder="请输入内容">
                <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
              </el-input>
          </div>
        </div>

        <!-- 数据列表 -->
        <div class="tableBox">
          <el-table stripe size="small" :cell-class-name="addClass" height="400" @cell-click="nameEnterFolder" ref="multipleTable" @cell-dblclick="enterFolder"
                    @row-click="listSelect" :data="fileListData" @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="45"></el-table-column>
            <el-table-column label="类型" width="50">
              <template slot-scope="scope">
                <img class="file-icon" :src="scope.row.file_type_icon" />
              </template>
            </el-table-column>
            <el-table-column prop="file_name" label="名称" show-overflow-tooltip width="200"></el-table-column>
            <el-table-column prop="file_alias" show-overflow-tooltip label="位置"></el-table-column>
            <el-table-column prop="file_time" width="150" show-overflow-tooltip label="设备数量"></el-table-column>
            <el-table-column prop="file_size" width="120" align="center" show-overflow-tooltip label="型号"></el-table-column>
            <el-table-column width="200" label="执行选项">
              <template slot-scope="scope" v-if="scope.row.isfile">
                <el-button plain size="mini" @click="checkVideo(scope.row.file_name)">实时查看</el-button>
                <el-button plain size="mini" @click="callBackVideo">录像回放</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!--*********************添加区域对话框*******************-->
        <el-dialog title="区域" :visible.sync="addressDialog" append-to-body width="400px" :before-close="addressResetForm">
          <el-form :model="addressForm" :rules="addressRules" ref="addressForm" label-width="80px">
            <el-form-item label="区域名称" prop="name">
              <el-input v-model="addressForm.name" size="small"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addressDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitAddress('addressForm')">确 定</el-button>
          </span>
        </el-dialog>
        <!--*********************添加区域对话框*******************-->
        <el-dialog title="摄像头" :visible.sync="cameraDialog" append-to-body width="400px" :before-close="cameraResetForm">
          <el-form :model="cameraForm" :rules="cameraRules" ref="cameraForm" label-width="80px">
            <el-form-item label="名称" prop="camera_name">
              <el-input v-model="cameraForm.camera_name" size="small"></el-input>
            </el-form-item>
            <el-form-item label="型号" prop="unit_type">
              <el-input v-model="cameraForm.unit_type" size="small"></el-input>
            </el-form-item>
            <el-form-item label="录像机" prop="video_id">
              <el-select size="small" v-model="cameraForm.video_id" placeholder="请选择录像机">
                <el-option v-for="(item, index) in cameraData" :key="index" :label="item.video_name" :value="item.video_id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逻辑端口" prop="port">
              <el-input v-model="cameraForm.port" size="small"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cameraDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitCamera('cameraForm')">确 定</el-button>
          </span>
        </el-dialog>

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
  </div>
</template>
<script>
import request from '@/api/workbench/videoManage/monitorList.js'
import { mapState } from 'vuex'
export default {
  props: ['path', 'model'],
  mounted () {
    if (this.model === 'list') {
      this.title = this.path.split('/')
      this.getFileList()
    } else if (this.model === 'search') {
      this.title = this.path.split('/')
      this.getSearch(this.path)
    }
    request.getCamera().then(data => {
      this.cameraData = data.data
    })
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
      selected: [],
      title: [],
      addressForm: {
        name: ''
      },
      addressRules: {
        name: [{required: true, message: '请输入区域名', trigger: 'blur'},
          {validator: checkName, trigger: 'blur'},
          {validator: this.regExp('illegalWord'), trigger: 'blur'}
        ]
      },
      cameraForm: {
        type: 1,
        position: '',
        camera_name: '',
        unit_type: '',
        video_id: '',
        port: ''
      },
      cameraRules: {
        camera_name: [{required: true, message: '请输入摄像头名称', trigger: 'blur'},
          {validator: checkName, trigger: 'blur'},
          {validator: this.regExp('illegalWord'), trigger: 'blur'}
        ],
        unit_type: {required: true, message: '请输入型号', trigger: 'blur'},
        port: [{required: true, message: '请输入端口号', trigger: 'blur'},
          {validator: this.regExp('ipPort'), trigger: 'blur'}],
        video_id: {required: true, message: '请输入端口号', trigger: 'blur'}
      },
      cameraData: [],
      tableData: [],
      searchText: '',
      pageIndex: 1,
      totalPage: 0,
      addressDialog: false,
      videoDiaTitle: '',
      cameraDialog: false
    }
  },
  computed: {
    routeText () {
      if (this.model === 'search') {
        this.title[0] = '搜索: "' + this.title[0] + '"'
        this.title.unshift('主目录')
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
        return t
      })
    },
    ...mapState('router', ['videoFile'])
  },
  methods: {
    checkVideo (val) {
      this.$notify.info({
        title: '提示',
        message: '功能暂不可用，请移步移动端'
      })
    },
    callBackVideo () {
      this.$notify.info({
        title: '提示',
        message: '功能暂不可用，请移步移动端'
      })
    },
    editBtn () {
      if (this.selected[0].isfile) {
        request.setCamera(118)
        request.getCameraInfo({id: this.selected[0].file_id}).then(data => {
          if (data.code === 0) {
            for (let key of Object.keys(data.data.camera_detail)) {
              this.cameraForm[key] = data.data.camera_detail[key]
            }
            this.cameraDialog = true
          }
        })
      } else {
        request.setArea(118)
        this.addressForm.name = this.selected[0].file_name
        this.addressDialog = true
      }
    },
    // 表单重置
    addressResetForm (done) {
      if (this.$refs.addressForm) {
        this.$refs.addressForm.resetFields()
      }
      done()
    },
    cameraResetForm (done) {
      if (this.$refs.cameraForm) {
        this.$refs.cameraForm.resetFields()
      }
      done()
    },
    // 给文件名添加class
    addClass ({columnIndex}) {
      if (columnIndex === 2) return 'file-Name'
    },
    // 新增区域
    newAddressBtn () {
      if (this.title.length > 14) {
        this.$notify({
          title: '错误',
          message: '当前区域已达最大层级',
          type: 'error'
        })
        return false
      }
      request.setArea(109)
      this.addressDialog = true
    },
    // 新增区域表单提交
    submitAddress (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = {path: this.path, val: this.addressForm.name, file_id: this.selected[0]}
          if (this.selected[0]) { param.file_id = this.selected[0].file_id }
          request.addArea(param).then(data => {
            if (data.code === 0) {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
              this.getFileList()
              this.$refs[formName].resetFields()
              this.addressDialog = false
            } else {
              this.$notify({
                title: '错误',
                message: '操作失败',
                type: 'error'
              })
            }
          })
        }
      })
    },
    newCameraBtn () {
      request.setCamera(109)
      this.cameraDialog = true
    },
    submitCamera (formName) {
      console.log(this[formName])
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this[formName].position = this.path
          request.addCamera(this[formName]).then(data => {
            if (data.code === 0) {
              this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
              })
              this.getFileList()
              this.$refs[formName].resetFields()
              this.cameraDialog = false
            } else {
              this.$notify({
                title: '错误',
                message: '操作失败',
                type: 'error'
              })
            }
          })
        }
      })
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
      if (val.isfile) return false
      if (this.model === 'list') {
        this.$router.push({path: `${encodeURIComponent(val.file_path + '/' + val.file_name)}`})
      } else if (this.model === 'search') {
        this.$router.push({path: `/monitorList/video-workFolder/list/${encodeURIComponent(val.file_path + '/' + val.file_name)}`})
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
      this.$router.push({path: `/monitorList/video-workFolder/search/${encodeURIComponent(this.searchText)}`})
      this.pageIndex = 1
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
    // *****************点击路由跳转******************//
    routerBack (index) {
      if (this.model === 'list') {
        let len = this.title.length + index - this.routeText.length + 1
        let url = this.title.slice(0, len)
        let path = encodeURIComponent(url.join('/'))
        this.$router.push({path: `${path}`})
      } else if (this.model === 'search') {
        this.pageIndex = 1
        this.$router.push({path: `/monitorList/video-workFolder/list/%E4%B8%BB%E7%9B%AE%E5%BD%95`})
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
        this.totalPage = parseInt(data.count)
      })
    },
    // *****************请求搜索结果******************//
    getSearch (val) {
      request.getSearch({page: this.pageIndex, result: val}).then(data => {
        this.tableData = data.child_files
        this.totalPage = parseInt(data.count)
      })
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
</style>


