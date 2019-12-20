<template>
  <div class="box" style="overflow: hidden">
    <div class="contractleft" style="width: 35%;background-color:#f3f3f4;float: left">
      <div class="content-height">
        <el-tree
          :data="structure"
          :props="defaultProps"
          node-key="id"
          ref="tree"
          default-expand-all
          @node-click="handleNodeClick"
          style="width: 90%;background-color:#f3f3f4;margin-left: 5%">
        </el-tree>
      </div>
    </div>
    <div class="right-height">
      <el-input
        v-model="input"
        placeholder="请输入搜索内容"
        style="float:right;width:300px;margin-top:0px;margin-bottom: 5px;margin-right: 20px"
        @keyup.enter.native="searchQuery">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchQuery"
        ></el-button>
      </el-input>
      <el-table
        stripe
        ref="operatorTable"
        class="contractright"
        :data="tableData"
        :header-row-style="bgstyle"
        style="float: right;width: 60%;margin-right: 2%">
        <el-table-column
          prop="avatar"
          label="头像"
          width="100">
          <template slot-scope="scope">
            <img :src='scope.row.avatar' style="border:solid;width:20px;height:20px"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="fa fa-phone"></i>
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="80px">
          <template slot-scope="scope">
            <el-button @click="addItem(scope.row)" type="text" size="small">添加</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="allItem"
        small
        :page-size=8
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="float:right;margin-right:20%;margin-top:20px;"
      >
      </el-pagination>
      <div ref="choosed" style="height: 100px;width: 500px;float: left;margin-left:30px ">
      <p>已选择操作人</p>
        <div style="height: 60px;width: 580px;overflow: auto">
        <el-tag
          v-for="tag in multipleSelection"
          :key="tag.emp_id"
          closable
          style="margin-left: 20px;margin-bottom: 5px"
          @close="handleClose(tag)">
          {{tag.name}}
        </el-tag>
        </div>
      </div>
      <div style="float: right;margin-top: 20px;margin-right: 20px">
        <el-button @click="comfirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>


    </div>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/tower/towerInfo/chooseTowerOperator.js'
  export default {
    created () {
      console.log('操作人表格建立')
      for (let i = 0; i < this.into.length; i++) {
        this.multipleSelection[i] = this.into[i]
      }
      this.getTree()
      this.getCurrentPage()
    },
    components: {ibox},
    name: '',
    props: ['into'],
    data () {
      return {
        structure: [{
          id: '',
          label: ''}],
        tableData: [
          {emp_id: '10', avatar: require('@/assets/img/home/build.png'), name: '王小虎', phone: '10010011000'}
        ],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        form: {departmentId: '', input: '', page: 1},
        multipleSelection: [],
        currentPage: 1,
        currentNode: '',
        input: '',
        inputtemp: '',
        allItem: 80,
        rootId: '',
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    methods: {
      getTree () {
        // 获取树，并将树的第一个节点给currentNode
        request.getTree().then(
          data => {
            console.log('hhhh')
            this.structure = data.data.data.tree
            this.rootId = this.structure[0].id
            this.form.departmentId = this.structure[0].id
          },
          error => {
            console.log(error)
          }
        )
      },
      getCurrentPage () {
        // 根据部门节点、页数、搜索框的输入返回相应的表格
        request.getPage(this.form.departmentId, this.form.page, this.form.input).then(
          data => {
            if (this.form.page === 1) {
              this.allItem = parseInt(data.data.data.num)
            }
            this.tableData = data.data.data.contact
          },
          error => {
            console.log(error)
          }
        )
      },
      handleNodeClick (data) {
        console.log('handleNodeClick')
        //  将部门的名称信息发送给后台，由后台返回相应的人员通讯信息
        this.currentPage = 1
        this.form.page = 1
        this.form.departmentId = data.id
        console.log('label:' + data.label + 'id:' + data.id)
        this.getCurrentPage()
      },
      handleCurrentChange (index) {
        this.form.page = index
        this.getCurrentPage()
      },
      handleClose (tag) {
        this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)
      },
      comfirm () {
        this.$emit('addOperator', this.multipleSelection)
        this.multipleSelection = []
      },
      cancel () {
        // 取消前还原zhi原来选项
        this.refresh()
        this.$emit('addOperator', 'undo')
      },
      addItem (row) {
        console.log(this.valid(row))
        if (!this.valid(row)) {
          this.multipleSelection.push(row)
        }
      },
      valid (val) {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (val.emp_id === this.multipleSelection[i].emp_id) {
            this.$message.warning('请不要重复添加')
            return true
          }
        }
        return false
      },
      searchQuery () {
        this.form.input = this.inputtemp
        this.currentPage = 1
        if (this.inputtemp !== '') {
          // 实际查询
          this.form.departmentId = this.rootId
          this.getCurrentPage()
        } else {
          this.$message('请输入查询的值')
        }
      },
      refresh () {
        this.multipleSelection = []
        for (let i = 0; i < this.into.length; i++) {
          this.multipleSelection[i] = this.into[i]
        }
      }
    },
    watch: {
      into (val) {
        this.refresh()
      },
      input: function (msg) {
        this.inputtemp = msg
        if (msg !== '') {
          console.log('搜索框数据变化中' + msg)
        } else {
          this.form.input = msg
          this.currentPage = 1
          // 当搜索框变为空时，自动返回第一页面
          this.getCurrentPage()
          console.log('输入为空的自动加载')
        }
      }
    }
  }
</script>
<style scoped>

  .content-height{
    height:650px;
    overflow: auto;
    margin-top: 30px;
  }
  .contractleft {
    border-radius: 15px;
    overflow: auto;
  }
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
