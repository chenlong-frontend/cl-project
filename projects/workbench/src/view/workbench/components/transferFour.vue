<template>
  <div class="jinm-reportEdit">

  <el-row>
    <el-col :span="7">
      <div class="transfer1">
        <el-tabs type="border-card" @tab-click="tabClick">
          <el-tab-pane label="部门">
            <div class="tree-box">
              <el-tree
                :data="tableData1"
                :props="defaultProps"
                node-key="id"
                ref="tree"
                @node-click="handleNodeClick1"
                highlight-current
                :default-expanded-keys="[1]">
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工种">
            <div class="tree-box">
              <el-tree
                :data="tableData2"
                :props="defaultProps"
                node-key="id"
                ref="tree"
                @node-click="handleNodeClick2"
                highlight-current
                :default-expanded-keys="[0]">
              </el-tree>
            </div>
          </el-tab-pane>
          <el-tab-pane label="人员">
            <el-input
              placeholder="输入关键字"
              v-model.trim="filterText"
              @keyup.enter.native="searchInput"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchInput"></el-button>
            </el-input>
            <div class="content">
            <el-table
              ref="multipleTable"
              :data="tableData3"
              size="mini"
              stripe
              tooltip-effect="dark"
              @current-change="workerClick"
              :header-cell-style="headCellStyle">
              <el-table-column
                prop="emp_name"
                :label="title[0]"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="emp_num"
                :label="title[1]"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            </div>
            <div class="block">
              <el-pagination
                layout="prev, pager, next"
                :total="totalNum1"
                small
                :page-size= 7
                align="center"
                @current-change="handleCurrentChange1"
                :current-page.sync="currentPage1">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
      <!--左边-->
    <el-col :span="8">
      <div class="transfer2">
        <div class="item-box">
          <div class="title">
            <span>{{title[2]}}</span>
          </div>
          <div class="content">
            <el-table
              ref="multipleTable"
              :data="tableData4"
              size="mini"
              stripe
              tooltip-effect="dark"
              @selection-change="handleSelectionChange2"
              :header-cell-style="headCellStyle">
              <el-table-column
                type="selection"
                width="45"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="title[4]"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="totalNum2"
              small
              :page-size= 7
              align="center"
              @current-change="handleCurrentChange2"
              :current-page.sync="currentPage2">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-col>

      <!--穿梭按钮-->
    <el-col :span="2">
      <div class="buttonTransfer">
        <div class="leftButton"><img src="../../../assets/img/lib/transfer/left.png" alt="" @click="moveLeft"></div>
        <div class="rightButton"><img src="../../../assets/img/lib/transfer/right.png" alt="" @click="moveRight"></div>
      </div>
    </el-col>

    <el-col :span="7">
      <div class="transfer3">
        <div class="item-box">
          <div class="title">
            <span>{{title[3]}}</span>
          </div>
          <div class="searchInput">
            <el-input
              placeholder="输入关键字"
              v-model.trim="filterText1"
              @keyup.enter.native="searchInput1"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchInput1"></el-button>
            </el-input>
          </div>
          <div class="content">
            <el-table
              ref="multipleTable"
              :data="tableData5"
              size="mini"
              stripe
              tooltip-effect="dark"
              @selection-change="handleSelectionChange3"
              :header-cell-style="headCellStyle">
              <el-table-column
                type="selection"
                width="45"
                align="center">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="title[4]"
                align="center"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </div>
          <div class="block">
            <el-pagination
              layout="prev, pager, next"
              :total="totalNum3"
              small
              :page-size= 7
              align="center"
              @current-change="handleCurrentChange3"
              :current-page.sync="currentPage3">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>

  </div>
</template>

<script>
  import request from '@/api/workbench/components/transferFour.js'
  export default {
    props: ['title'],
    created () {
      this.getTable1()
      this.getTable2()
      this.getTable3()
    },
    data () {
      return {
        headCellStyle: {textAlign: 'center'},
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        tableData5: [],
        totalNum1: 0,
        totalNum2: 0,
        totalNum3: 0,
        filterText: '',
        filterText1: '',
        currentPage1: 1,
        currentPage2: 1,
        currentPage3: 1,
        ids: '',  // ********第一张表的所选Id
        multipleSelection1: [],
        multipleSelection2: [],
        index: '0'
//        member_ids: [], // ***********第二张表的勾选Id
//        left_form_ids: []  // ***********第三张表的勾选Id
      }
    },
    methods: {
      tabClick (val) {
        console.log(val.index, typeof val.index)
        this.index = val.index
        this.tableData4 = []
        this.tableData5 = []
      },
      getTable1 () {
        request.getTable1().then(value => {
          this.tableData1 = value
        })
      },
      getTable2 () {
        request.getTable2().then(value => {
          this.tableData2 = value
        })
      },
      getTable3 () {
        request.getTable3({'currentPage': this.currentPage1, 'text': this.filterText}).then(value => {
          this.tableData3 = value.emp_list
          this.totalNum1 = value.num
        })
      },
      getTable4 () {
        request.getTable4({index: this.index, 'id': this.ids, 'currentPage': this.currentPage2 - 1}).then(value => {
          this.tableData4 = value.member
          this.totalNum2 = Number(value.member_count[0].member_count)
        })
      },
      getTable5 () {
        request.getTable5({index: this.index, 'id': this.ids, 'currentPage': this.currentPage3 - 1, 'text': this.filterText1}).then(value => {
          this.tableData5 = value.left_form
          this.totalNum3 = Number(value.left_form_count[0].left_form_count)
        })
      },
      // ************第一颗树的所选方法***************
      handleNodeClick1 (val) {
        this.ids = val.id
        this.getTable4()
        this.getTable5()
      },
      // ************第二颗树的所选方法***************
      handleNodeClick2 (val) {
        this.ids = val.id
        this.getTable4()
        this.getTable5()
      },
      // ************第一张表的tab3所选内容**************
      workerClick (val) {
        console.log(val.Id)
        console.log('ok')
        console.log(this.totalNum2)
        this.ids = val.Id
        this.getTable4()
        this.getTable5()
      },
      // ****************第一张表的tab3中的内容
      handleCurrentChange1 () {
        this.getTable3()
      },
      // ********************第一张表tab3中的搜索框********
      searchInput () {
        this.currentPage1 === 1 ? this.handleCurrentChange1() : this.currentPage1 = 1
      },
      // ************第二张表的所选内容**********
      handleSelectionChange2 (val) {
        this.multipleSelection1 = val
      },
      // *********第二张表的分页**************
      handleCurrentChange2 () {
        this.getTable4()
      },
      // *************左移**************
      moveLeft () {
        let reportIds = this.multipleSelection2.map(t => {
          return t.id
        })
        console.log(reportIds)
        request.moveLeft({'index': this.index, 'choose_id': this.ids, 'id': reportIds}).then(value => {
          this.currentPage2 === 1 ? this.handleCurrentChange2() : this.currentPage2 = 1
          this.currentPage3 === 1 ? this.handleCurrentChange3() : this.currentPage3 = 1
        })
      },
      // ***********右移***********************
      moveRight () {
        let memberIds = this.multipleSelection1.map(t => {
          return t.id
        })
        console.log(memberIds)
        request.moveRight({'index': this.index, 'choose_id': this.ids, 'id': memberIds}).then(value => {
          this.currentPage2 === 1 ? this.handleCurrentChange2() : this.currentPage2 = 1
          this.currentPage3 === 1 ? this.handleCurrentChange3() : this.currentPage3 = 1
        })
      },
      // *****搜索框**********
      searchInput1 () {
        this.currentPage3 === 1 ? this.handleCurrentChange3() : this.currentPage3 = 1
      },
      // ********第三张表的所选内容********
      handleSelectionChange3 (val) {
        this.multipleSelection2 = val
      },
      // **********第三张表的分页内容**********
      handleCurrentChange3 () {
        this.getTable5()
      }
    }
  }
</script>

<style scoped>
  .transfer2{padding-left: 4%;}
  .transfer1, .transfer2, .transfer3{float:left;width:100%}
  .content {padding: 0px 14px 40px 14px;height: 280px;background: white;}
  .title{font-size: 14px;  font-weight: bold;height:40px;line-height: 40px;width:30%;display: inline-block;color:#666;}
  .searchInput{display: inline-block; width:66%;height:30px;}
  .item-box {background-color: #F3F3F4;border-radius: 8px;padding:10px 10px 50px 10px; margin-bottom:10px;}
  /*.item-box{width:280px}*/
  .item-box .nav a{display: inline-block;color: #666666;font-weight: bold;background-color: #E6E6E6;padding: 8px 0;border-radius: 2px;width: 15%;margin-right: 5px;text-align: center;}
  .tree-box::-webkit-scrollbar,.el-main::-webkit-scrollbar{width: 6px;}
  .tree-box::-webkit-scrollbar-thumb,.el-main::-webkit-scrollbar-thumb{background-color: #989898;}
  .tree-box {padding:0px 10px 10px 10px;background-color: #FFFFFF;border-radius: 4px;overflow: auto; height:260px;}
  /*.tree-box{height:300px;border:1px solid red;}*/
  .el-tree-node .el-tree-node__content {background-color: #F3F3F4;border: 1px solid #E7EAEC;}
  .item-box .nav {position: relative;padding: 5px 5% 0 5%;}
  .item-box .nav a{display: inline-block;color: #666666;font-weight: bold;background-color: #ffffff;padding: 8px 0;border-radius: 2px;margin-right: 5px;text-align: center;}
  .item-box .nav a.active {background-color: #E6E6E6;}
  .buttonTransfer{height:400px;float:left;width:100%}
  .buttonTransfer img{display:block;width:50%;height:50%;}
  .buttonTransfer .leftButton{padding-top:140px;padding-left: 35%;width: 100%;}
  .buttonTransfer .rightButton{padding-top:20px;padding-left:35%;width:100%;}

</style>
