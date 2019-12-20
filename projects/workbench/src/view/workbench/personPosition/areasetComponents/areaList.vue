<template>
  <div>
    <!--搜索框-->
    <el-input
      v-model="input"
      placeholder="请输入搜索内容"
      style="float:right;width:300px;margin-top:-15px;margin-bottom: 5px;"
      @keyup.enter.native="searchQuery">
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      ></el-button>
    </el-input>
    <!--表格数据-->
    <el-table
      v-loading="loading"
      stripe
      highlight-current-row
      ref='multipleTable'
      :data='DepartmentUser'
      tooltip-effect='dark'
      style='width: 100%'
      :header-row-style="bgstyle"
      @selection-change='handleSelectionChange'>
      <el-table-column
        type='selection'
        width='55'>
      </el-table-column>
      <el-table-column
        prop='zone_name'
        label='区域名称'
        width='180'>
      </el-table-column>
      <el-table-column
        prop='emp_name'
        label='区域负责人'
        width='150'>
      </el-table-column>
      <el-table-column
        prop='mobile'
        label='负责人联系方式'
        width='180'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='pos1'
        label='区域经纬度位置1'
        width='200'
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop='pos2'
        label='区域经纬度位置2'
        show-overflow-tooltip>
      </el-table-column>
    </el-table>

    <el-button type="primary"
               size="small"
               plain icon="el-icon-delete"
               style="float:left;margin-top:20px;margin-left:20px"
               @click="centerDialogVisible = true"
               :disabled="disableddelete"
    >删除</el-button>
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=10
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      style="float:left;margin-left:100px;margin-top:20px"
    >
    </el-pagination>

    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      center
      :modal-append-to-body= false
    >
      <span style="margin-left:120px;">确认删除这些人员信息吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import request from '@/api/workbench/personPosition/areaSet'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'helmetTable',
    mounted () {
      this.getDataFirst()
    },
    data () {
      return {
        DepartmentUser: [],
        form: {index: '', input: '', multipleSelection: []},
        // 下面的input用于v-model和监听，无法监听from里面的input
        input: '',
        inputtemp: '',
        currentPage: 1,
        centerDialogVisible: false,
        allItem: 100,
        loading: false,
        disableddelete: true,
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    computed: {
      ...mapGetters('area', ['getAreaFlag'])
    },
    methods: {
      ...mapMutations('area', ['changeAddAreaFlag']),
      getDataFirst () {
        this.datainit()
        this.ajaxGet()
      },
      ajaxGet () {
        // 请求后台数据
        request.getAreaList(this.currentPage, 10, this.form.input).then(
          data => {
            this.loading = false
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.count)
            }
            console.log(data.data.zone_list)
            this.DepartmentUser = []
            let zoneList = data.data.zone_list
            for (let i = 0; i < zoneList.length; i++) {
              let perItem = {
                'id': zoneList[i].id,
                'zone_name': zoneList[i].zone_name,
                'emp_name': zoneList[i].emp_name,
                'mobile': zoneList[i].mobile,
                'pos1': 'W:' + zoneList[i].pos_one_lat + '; S:' + zoneList[i].pos_one_lng,
                'pos2': 'W:' + zoneList[i].pos_two_lat + '; S:' + zoneList[i].pos_two_lng
              }
              this.DepartmentUser.push(perItem)
            }
          },
          error => {
            this.error = error.toString()
          }
        )
      },
      clearselection () {
        this.$refs.multipleTable.clearSelection()
      },
      handleSelectionChange (val) {
        // 经测试val在翻页后会自动清空
        this.form.multipleSelection = []
        for (var k = 0, length = val.length; k < length; k++) {
          this.form.multipleSelection[k] = val[k].id
        }
        console.log(this.form.multipleSelection)
        this.disableddelete = (!(val.length > 0))
      },
      searchQuery () {
        this.form.input = this.inputtemp
        this.currentPage = 1
        if (this.inputtemp !== '') {
          // 实际查询
          this.ajaxGet()
          console.log('搜索加载')
        } else {
          this.$message('请输入查询的值')
        }
      },
      deleteItem () {
        this.centerDialogVisible = false
        // 删除之后要从后台删除数据并重新加载------------
        request.deleteItem(this.form.multipleSelection).then(
          data => {
            console.log(data)
            if (data.data.code === 0) {
              // 实际从后台请求回的数据
              this.getDataFirst()
            } else {
              alert('删除失败')
            }
          }, error => {
          this.loading = false
          this.error = error.toString()
        }
        )
      },
      handleCurrentChange (index) {
        this.form.index = index
        console.log(this.form.input)
        // 实际 发送this.form.index 还需要返回this.form.input 去观察是否是查询经过页面的换页，重设departmentUser
        this.ajaxGet()
        console.log('页面改变的加载')
      },
      datainit () {
        this.DepartmentUser = []
        this.form = {index: '', input: '', multipleSelection: []}
        // 下面的input用于v-moel和监听，无法监听from里面的input
        this.input = ''
        this.inputtemp = ''
        this.currentPage = 1
        this.centerDialogVisible = false
        this.allItem = 0
        this.loading = false
        this.disableddelete = true
        this.clearselection()
      }
    },
    watch: {
      input: function (msg) {
        this.inputtemp = msg
        if (msg !== '') {
          console.log('搜索框数据变化中' + msg)
        } else {
          this.form.input = msg
          this.currentPage = 1
          // 当搜索框变为空时，自动返回第一页面
          this.getDataFirst()
          console.log('输入为空的自动加载')
        }
      },
      getAreaFlag: function (msg) {
        console.log('检测到区域添加' + msg)
        this.getDataFirst()
        this.changeAddAreaFlag('0')
      }
    }
  }
</script>

<style scoped>
  /*#department {float: left;width:30%}*/
  #user {float:left;width:100%}
  .el-table td, .el-table th.is-leaf{background:#FAFAFA}
  /*#queryArea {position:absolute;left:500px;top:0px }*/
  .el-input{
    float: right;
    width: 250px;
    margin-bottom: 5px;
    position: absolute;
    z-index: 10;
    right:58px;
    top:105px;
  }
</style>

