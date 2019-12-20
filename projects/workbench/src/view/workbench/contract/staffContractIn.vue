<template>
    <div class="box">
    <div class="contractleft" style="width: 25%;background-color:#f3f3f4;float: left">
      <p class="structureDescription">组织架构</p>
      <div class="content-height">
        <el-tree
          :data="structure"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          @node-click="handleNodeClick"
          style="width: 90%;background-color:#f3f3f4;margin-left: 5%" >
        </el-tree>
      </div>
    </div>
      <div class="right-height">
        <el-table
          stripe
          class="contractright"
          :data="tableData"
          :header-row-style="bgstyle"
          style="float: right;width: 70%;margin-right: 2%">
          <el-table-column
            prop="avatar"
            label="头像"
            width="60">
            <template slot-scope="scope">
              <img :src='scope.row.avatar' style="border:solid;width:20px;height:20px"/>
              <!--{{scope.row.avatar}}-->
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="title"
            label="工号"
            width="200"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机"
            width="180">
            <template slot-scope="scope">
              <i class="fa fa-phone"></i>
              <span style="margin-left: 10px">{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="mail"
            label="邮箱"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <i class="fa fa-envelope-o fa-fw"></i>
              <span style="margin-left: 10px">{{ scope.row.mail }}</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
        small
        layout="prev, pager, next"
        :total="allItem"
        :page-size=10
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
        style="float:right;margin-right:25%;margin-top:20px;"
      >
      </el-pagination>
      </div>
    </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/contract/staffContract.js'
  export default {
    created () {
      this.getdata()
    },
    components: {ibox},
    name: '',
    data () {
      return {
        structure: [{
          id: null,
          label: null}],
        tableData: [{
          avatar: null,
          name: null,
          title: null,
          phone: null,
          mail: null
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentPage: 1,
        currentNode: '',
        allItem: 10,
        description: '',
        form: { departmentId: null, page: 1 },
        bgstyle: {
          'background': '#FAFAFA'
        }
      }
    },
    methods: {
      getdata () {
        //  从后台获取相关的项目信息，将项目名称赋值给description，并根据项目信息获取项目的部门结构，将项目结构返回给structure
        request.firstGet().then(
          data => {
            this.description = data.data.data.description
            this.structure = data.data.data.tree
            this.form.departmentId = this.structure[0].id
            this.getInfoUtil()
          },
          error => {
            console.log(error.toString())
          }
        )
      },
      handleNodeClick (data) {
        console.log('handleNodeClick')
        //  将部门的名称信息发送给后台，由后台返回相应的人员通讯信息
        this.currentPage = 1
        this.form.page = 1
        this.form.departmentId = data.id
        this.getInfoUtil()
        console.log('label:' + data.label + 'id:' + data.id)
      },
      handleCurrentChange (index) {
        console.log('handleCurrentChange')
//        this.$message('模拟向后台请求该页数的页面')
        this.form.page = index
        //  发送this.form.page 和this.form.department
        this.getInfoUtil()
      },
      getInfoUtil () {
        console.log('getInfoUtil')
        //  传回所选中的部门加上页码数目返回给后台，有后台返回当前页面的信息数目以及总的条目数
        request.getDepartmentInformation(this.form.departmentId, this.form.page).then(
          data => {
            if (this.form.page === 1) {
              this.allItem = parseInt(data.data.data.num)
            }
            this.tableData = data.data.data.contact
          }, error => {
          this.$message.error(error.toString())
        }
        )
//        this.$message('传回信息')
      }
    }
  }
</script>
<style scoped>
  .box{
    border:none;
  }
  .ibox > .ibox-content {
    height: 500px;
  }
  .right-height{
    min-height:400px;
  }
.content-height{
  height:360px;
  overflow: auto;
}
  .structureDescription {
    text-align: left;
    width: 90%;
    height: 41px;
    line-height: 41px;
    background: #dbdbdb;
    margin-left: 5%;
    border-radius: 5px;
    font-size: 14px;
    text-indent: 10px;
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
