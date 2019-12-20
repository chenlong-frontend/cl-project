<template>
  <div class="big-box">
    <div class="item-box">
      <div class="nav-tab">
        <div class="nav"><a v-for="(item,index) in tab.data" @click="tab.active=index" :class="{active:index == tab.active}">{{item}}</a></div>

        <div class="content">
          <div class="tree-box" v-show="tab.active === 0">
            <!--树形结构-->
            <el-tree :data="data"
                     :props="defaultProps"
                     @node-click="handleNodeClick"
                     ref="tree"
                     highlight-current>
            </el-tree>
          </div>
          <div class="tree-box" v-show="tab.active === 1">
            <!--树形结构-->
            <el-table
              :data="tableData"
              style="width: 100%"
              highlight-current-row
              size="mini"
              stripe
              :header-cell-style="headCellStyle"
              @row-click="clickOne">
              <el-table-column
                prop="name"
                label="工种"
                width="330"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <div class="behind">
        <div class="header">人员列表</div>
        <div class="content1">
          <el-input
            placeholder="输入关键字"
            v-model.trim="filterText"
            @keyup.enter.native="searchInput">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchInput"></el-button>
          </el-input>
          <div class="list">
            <el-table
              :data="lidata"
              style="width: 100%"
              highlight-current-row
              size="mini"
              stripe
              @row-click="changeColor"
              :header-cell-style="headCellStyle">
              <el-table-column
                prop="emp_name"
                label="姓名"
                width="180"
                align="center">
              </el-table-column>
              <el-table-column
                prop="emp_num"
                label="工号"
                width="180"
                align="center">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="block" v-show="this.tab.active === 0">
          <el-pagination
            layout="prev, pager, next"
            :total="amount"
            :page-size= 8
            align="center"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>

        <div class="block1" v-show="this.tab.active === 1">
          <el-pagination
            layout="prev, pager, next"
            :total="amount1"
            :page-size= 8
            align="center"
            :current-page.sync="currentPage1"
            @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import request from '@/api/workbench/item/management/newItem.js'
  export default {
    props: ['type'],
    mounted () {
      request.getPersonData().then(value => {
        this.data = value
        console.log(value)
      })
      request.getRoleData().then(value => {
        this.tableData = value
      })
    },
    data () {
      return {
        currentPage: 1,
        currentPage1: 1,
        filterText: '',
        isActive: false,
        tab: {
          data: ['部门', '工种'],
          active: 0
        },
        data: [{}],
        data1: [{}],
        lidata: [],
        isActive1: -1,
        headCellStyle: {textAlign: 'center'},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData: [],
        amount: 0,
        amount1: 0,
        publicId: '',
        publicId1: ''
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        this.publicId = data.id
        // this.currentPage === 1 ? this.handleCurrentChange(1) : this.currentPage = 1
        this.filterText = ''
        // ***********返回部门所选信息
        request.getCurrentDep(data).then(value => {
          this.lidata = value.member
          this.amount = value.amount
        })
      },
      changeColor (row, event, column) {
        console.log(row)
        let managerID = row.emp_id
        let managerName = row.emp_name
        let managerNum = row.emp_num
        request.getManagerName({'managerName': managerName, 'managerID': managerID, 'managePhone': row.emp_phone, 'managerNum': managerNum})
      },
      // ************************搜索框搜索
      searchInput () {
        // this.currentPage === 1 ? this.handleCurrentChange(1) : this.currentPage = 1
        if (this.tab.active === 0) {
          request.choosesInput({'text': this.filterText, 'index': this.tab.active, 'currentPage': this.currentPage, 'id': this.publicId}).then(value => {
            this.lidata = value.member
            this.amount = value.amount
          })
        } else {
          request.choosesInput({'text': this.filterText, 'index': this.tab.active, 'currentPage': this.currentPage, 'id': this.publicId1}).then(value => {
            this.lidata = value.member
            this.amount = value.amount
          })
        }
      },
      // *************分页**********************
      handleCurrentChange (val) {
        this.currentPage = val
        request.getPage(val).then(value => {
          console.log(value)
          this.lidata = value.member
          this.amount = value.amount
        })
      },
      handleCurrentChange1 (val) {
        this.currentPage1 = val
        request.getPage1(val).then(value => {
          console.log(value)
          this.lidata = value.member
          this.amount1 = value.amount
        })
      },
      clearAll () {
        this.$refs.tree.getCurrentNode()
        console.log(this.$refs.tree.getCurrentNode())
//        this.$refs.tree.setCurrentNode()
//        this.$refs.tree1.setCurrentNode([])
      },
      // ********单击所选工种的行************
      clickOne (row, event, column) {
        this.filterText = ''
        // this.currentPage === 1 ? this.handleCurrentChange(1) : this.currentPage = 1
        console.log(row)
        this.publicId1 = row.id
        request.getChooseRow(row).then(value => {
          this.lidata = value.member
          this.amount1 = value.amount
        })
      }
    }
  }
</script>

<style scoped>
  .active1{background:#E6E6E6}
  .a {cursor: pointer;}
  .box:after,.left .content:after{content: '.';clear: both;width: 0;height: 0;line-height: 9;visibility: hidden;overflow: hidden;display: block;}
  .box>div {float: left;box-sizing: border-box;}
  .item-box {background-color: #F3F3F4;border-radius: 8px;}
  .content {padding: 1px 5% 87px 5%;position: relative;height: 280px;}
  .tree-box::-webkit-scrollbar,.el-main::-webkit-scrollbar{width: 6px;}
  .tree-box::-webkit-scrollbar-thumb,.el-main::-webkit-scrollbar-thumb{background-color: #989898;}
  .tree-box {padding: 10px;background-color: #FFFFFF;height: 320px;border-radius: 4px;overflow: auto;}
  .el-tree-node .el-tree-node__content {background-color: #F3F3F4;border: 1px solid #E7EAEC;}
  .item-box{width:400px}
  .item-box .nav {position: relative;padding: 15px 5% 0 5%;}
  .item-box .nav a{display: inline-block;color: #666666;font-weight: bold;padding: 8px 0;border-radius: 2px;width: 15%;margin-right: 5px;text-align: center;background-color: #E6E6E6;}
  .item-box .nav a.active {background-color: #ffffff;}
  .behind .el-input{
    float: right;
    width: 220px;
    margin-bottom: 5px;
    position: absolute;
    z-index: 99999;
    right:5%;
    top:-22px;
  }
  .content1 {padding: 1px 5% 55px 5%;position: relative;height: 280px;}
  .behind .el-input__inner{height:30px}
  .behind{
    width:400px;
    display:inline-block;
    position:absolute;
    top:53px;right:0;
    margin-right:20px;
  }
  .behind .header{
    padding: 8px 5% 0 5%;
    font-weight: bold;
    position:static;
    font-size:16px;
  }
  .behind {background-color: #F3F3F4;border-radius: 8px;}
  .behind .content1{
    padding-top:25px;
  }
  .block{
    padding-bottom:10px;
    width:400px
  }
  .block1{
    padding-bottom:10px;
    width:400px
  }
</style>
