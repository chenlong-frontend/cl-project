<template>
  <div class="runBox">
      <ibox title="塔吊信息管理" style="overflow: hidden">
        <el-button type="primary"
                   size="small"
                   plain icon="el-icon-delete"
                   style="float:left;margin-top:-10px;margin-bottom:5px;margin-left: 80px"
                   @click="deleteDialogVisible = true"
                   :disabled="disableddelete"
        >删除</el-button>
        <el-button type="primary"
                   size="small"
                   plain  icon="el-icon-edit"
                   style="float:left;margin-top:-10px;margin-bottom:5px;margin-left: 20px"
                   @click="editInfo('0')"
        >新增</el-button>
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          style="float:right;width:300px;margin-top:-10px;margin-bottom: 5px;"
          @keyup.enter.native="searchQuery">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchQuery"
          ></el-button>
        </el-input>
        <el-table
          stripe
          highlight-current-row
          ref='multipleTable'
          :data='towersInfo'
          tooltip-effect='dark'
          style='width: 100%'
          @selection-change='handleSelectionChange'>
          <!--:header-row-style="bgstyle"-->
          <el-table-column
            type='selection'
            width='55'>
          </el-table-column>
          <el-table-column
            prop='tower_name'
            label='塔吊名称'
            width='150'>
            <!--<template slot-scope='scope'>{{ scope.row.date }}</template>-->
          </el-table-column>
          <el-table-column
            prop='tower_location'
            label='塔吊位置'
            width='150'>
          </el-table-column>
          <el-table-column
            prop='tower_enterprise'
            label='所属单位'
            width='150'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='tower_responsible'
            label='负责人'
            width='120'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop='tower_coordinate'
            label='塔吊所在经纬度'
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="editInfo(scope.row.id)" type="text" size="small">修改塔吊信息</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          layout="prev, pager, next"
          :total="allItem"
          :page-size=10
          :current-page.sync="currentPage"
          @current-change="handleCurrentChange"
          style="float:left;margin-left:30%;margin-top:20px"
        >
        </el-pagination>

        <el-dialog
          title="提示"
          :visible.sync="deleteDialogVisible"
          width="30%"
          center
          :modal-append-to-body= false
        >
          <span style="margin-left:120px;">确认删除这些塔机信息吗？</span>
          <span slot="footer" class="dialog-footer">
    <el-button @click="deleteDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
        </el-dialog>

        <el-dialog title="修改塔吊基本信息"
                   :visible.sync="addDialogVisible"
                   :append-to-body= "true"
                   :before-close="beforeClose"
                   width="1000px">
          <add-tower ref="towerForm" :clickid="this.clickid" @submitFnc="submitFnc"></add-tower>
        </el-dialog>

      </ibox>
  </div>
</template>
<script>
import ibox from '@/components/style/ibox.vue'
import addTower from '@/view/workbench/tower/addTower.vue'
import request from '@/api/workbench/tower/towerInformation.js'
export default {
  created () {
    this.getCurrentPage(1, '')
  },
  components: {ibox, addTower},
  name: '',
  props: [''],
  data () {
    return {
      towersInfo: [
        {id: ' ', tower_name: ' ', tower_location: ' ', tower_enterprise: ' ', tower_responsible: ' ', tower_coordinate: ' '}
      ],
      allItem: 100,
      input: '',
      currentPage: 1,
      deleteDialogVisible: false,
      addDialogVisible: false,
      multipleSelection: [],
      disableddelete: true,
      clickid: '0'
    }
  },
  mounted () {
  },
  computed: {},
  methods: {
    getCurrentPage (page, input) {
      request.getCurrentPage(page, input).then(
        data => {
          this.towersInfo = data.data.data.tower_list
          if (page === 1) {
            this.allItem = parseInt(data.data.data.count)
          }
        },
        error => {
          console.log(error)
        }
      )
    },
    handleSelectionChange (val) {
      // 经测试val在翻页后会自动清空
      this.multipleSelection = []
      for (var k = 0, length = val.length; k < length; k++) {
        this.multipleSelection[k] = val[k].id
      }
      this.disableddelete = (!(val.length > 0))
    },
    deleteItem () {
      request.deleteItem(this.multipleSelection).then(
        data => {
          if (data.data.code === 0) {
            this.$message.success('删除成功')
            this.getCurrentPage(this.currentPage, this.input)
          } else this.$message.error('删除失败')
        },
        error => {
          console.log(error)
        }
      )
      this.deleteDialogVisible = false
    },
    handleCurrentChange (index) {
      this.getCurrentPage(this.currentPage, this.input)
    },
    searchQuery () {
      if (this.input !== '') {
        this.back2one()
      } else {
        this.$message('请输入查询的值')
      }
    },
    beforeClose (done) {
      this.$refs.towerForm.init(this.clickid)
      done()
    },
    editInfo (val) {
      // val是表格该行的对象，传回val.id就可以了
      // 子组件在懒加载，不能再第一次调用它里面的方法，所以讲初始化放到了组件里面，父组件只负责传值
      this.clickid = val
      this.addDialogVisible = true
    },
    submitFnc (val) {
      if (val) {
        this.addDialogVisible = !val
        this.input = ''
        this.back2one()
      }
    },
    back2one () {
      if (this.currentPage === 1) {
        this.getCurrentPage(this.currentPage, this.input)
      } else {
        this.currentPage = 1
      }
    }
  },
  watch: {
    input: function (msg) {
      if (msg !== '') {
        console.log('搜索框数据变化中' + msg)
      } else {
        if (this.currentPage === 1) {
          this.getCurrentPage(this.currentPage, this.input)
        } else {
          this.currentPage = 1
        }
      }
    }
  }
}
</script>
<style scoped>
  ::-webkit-scrollbar {
    width: 6px;
  }/* 滚动条整体宽度 */
  ::-webkit-scrollbar-track{
    background-color: #F3F3F4;
  }/* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb{
    background-color: #DAE4E5;
    border-radius: 3px;
  }/* 滚动条的滑块背景颜色 */
  ::-webkit-scrollbar-corner {
    background-color: #B0AFB0;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
