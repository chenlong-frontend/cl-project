<template>
  <div class="tranfer cl-manage">
    <!--左边-->
    <div class="tranferLeft">
    <div class="item-box">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div class="content">
        <el-table
          ref="multipleTable"
          :data="tableData1"
          size="mini"
          stripe
          tooltip-effect="dark"
          style="width:245px"
          @selection-change="handleSelectionChange1"
          :header-cell-style="headCellStyle">
          <el-table-column
            type="selection"
            width="45"
            align="center">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="100"
            align="center"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            width="100"
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
          :current-page.sync="selectPageIndex">
        </el-pagination>
      </div>
    </div>
    </div>

    <!--穿梭按钮-->
    <div class="buttonTransfer">
      <div class="leftButton"><img src="../../../assets/img/lib/transfer/left.png" alt="" @click="moveLeft"></div>
      <div class="rightButton"><img src="../../../assets/img/lib/transfer/right.png" alt="" @click="moveRight"></div>
    </div>

      <!--中间-->
      <div class="tranferMiddle">
        <div class="item-box">
          <div class="title2">
            <span>待选</span>
          </div>
          <div class="content">
            <div class="nav-tab">
              <div class="nav"><a v-for="(item,index) in tab.data" @click="tabClick(index)" :class="{active:index == tab.active}">{{item}}</a></div>
              <div class="tree-box" v-show="tab.active === 0">
                <!--树形结构-->
                <el-tree
                  :data="tableData2"
                  show-checkbox
                  node-key="id"
                  ref="tree"
                  @node-click="handleNodeClick"
                  highlight-current
                  :default-expanded-keys="[0]">
                </el-tree>
              </div>
              <div class="tree-box" v-show="tab.active === 1">
                <el-table
                  :data="tableData4"
                  style="width: 100%"
                  highlight-current-row
                  ref="multipleTable2"
                  size="mini"
                  stripe
                  @cell-click="workerClick"
                  @selection-change="handleSelectionChange3"
                  :header-cell-style="headCellStyle">
                  <el-table-column
                    type="selection"
                    width="35">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="全选"
                    width="190"
                    align="center">
                  </el-table-column>
                </el-table>
              </div>
             </div>
            </div>
        </div>
      </div>

    <div class="tranferRight">
      <div class="item-box">
        <div>
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
        </div>
        <div class="content">
          <el-table
            ref="multipleTable1"
            :data="tableData3"
            size="mini"
            stripe
            tooltip-effect="dark"
            style="width:245px"
            @selection-change="handleSelectionChange2"
            :header-cell-style="headCellStyle">
            <el-table-column
              type="selection"
              width="45"
            align="center">
            </el-table-column>
            <el-table-column
              prop="emp_name"
              label="姓名"
              width="100"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="emp_num"
              label="工号"
              width="100"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div class="block1">
        <el-pagination
          small
          layout="prev, pager, next"
          :total="totalNum2"
          @current-change="handleCurrentChange2"
          :page-size= 7
          align="center"
          :current-page.sync="allPageIndex">
        </el-pagination>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import request from '@/api/workbench/components/transferThree.js'
  export default {
    props: ['title', 'config', 'nodeId'],
    mounted () {
      this.getInit1()
    },
    watch: {
      'tab.active': function () {
        this.tableData3 = []
        this.totalNum2 = 0
      },
      nodeId: function () {
        this.selectPageIndex = 1
        this.allPageIndex = 1
        this.filterText = ''
        this.tab.active = 0
        this.getInit1()
      }
    },
    data () {
      return {
        headCellStyle: {textAlign: 'center'},
        tab: {
          data: ['部门', '工种'],
          active: 0
        },
        tableData1: [],
        tableData2: [{}],
        tableData3: [],
        tableData4: [],
        multipleSelection1: [],
        multipleSelection2: [],
        multipleSelection3: [],
        filterText: '',
        data: [],
        totalNum1: 0,
        totalNum2: 0,
        selectPageIndex: 1, // 第一张表分页的页码
        allPageIndex: 1,  // 第二张分页的页码
        gro_ids: '',
        role_ids: ''
      }
    },
    methods: {
      clearAll () {
        // *************清除选中状态**************
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable1.clearSelection()
        this.$refs.tree.setCheckedNodes([])
        this.$refs.multipleTable2.clearSelection()
      },
      // ************获取部门部分的点击数据*****************
      handleNodeClick (data) {
        this.filterText = ''
        this.gro_ids = data.id
        this.role_ids = ''
        this.getTableInfo2()
      },
      // ************获取工种部分的点击数据*****************
      workerClick (row, column) {
        if (column.property === 'name') {
          this.filterText = ''
          this.role_ids = row.id
          console.log(this.role_ids, row.id)
          this.gro_ids = ''
          this.allPageIndex === 1 ? this.handleCurrentChange2(1) : this.allPageIndex = 1
        }
      },
      searchInput () {
        this.allPageIndex === 1 ? this.handleCurrentChange2(1) : this.allPageIndex = 1
      },
      handleSelectionChange1 (val) {
        this.multipleSelection1 = val
        console.log(val)
      },
      handleSelectionChange2 (val) {
        this.multipleSelection2 = val
      },
      handleSelectionChange3 (val) {
        this.multipleSelection3 = val
      },
      handleCurrentChange1 (val) {
        // **************获得第一张表的分页信息
        this.selectPageIndex = val
        this.getTableInfo1(val)
      },
      handleCurrentChange2 (val) {
        // **************获得第二张表的分页信息
        this.allPageIndex = val
        this.getTableInfo2(val)
      },
      getTableInfo1 (val) {
        // ***************第一张表的分页信息**********
        request.getTable1({'currentPage': this.selectPageIndex, 'nodeId': this.nodeId}).then(value => {
          this.tableData1 = value.tableData1
          this.totalNum1 = Number(value.page_count)
        })
      },
      getTableInfo2 (val) {
        // **************获得第三张表的分页内容**********
//        let tabClick = this.tab.active
        request.getTable3({'currentPage': this.allPageIndex, 'nodeId': this.nodeId, 'gro_ids': this.gro_ids, 'role_ids': this.role_ids, 'input': this.filterText}).then(value => {
          this.tableData3 = value.tableData3
          this.totalNum2 = Number(value.page_count)
        })
      },
      moveLeft () {
        // **************获得左移的右边选择的信息*************
        let middleData1 = this.$refs.tree.getCheckedNodes()
        let middleData1Id = middleData1.map(t => {
          return {'gro_id': t.id}
        })
        let middleData2 = this.multipleSelection3
        let middleData2Id = middleData2.map(t => {
          return {'role_id': t.id}
        })
        let rightData = this.multipleSelection2
        let rightDataId = rightData.map(t => {
          return {'emp_id': t.emp_id}
        })
        console.log(middleData1Id, rightDataId)
        let indexValue = this.tab.active
        if (indexValue === 0) {
          request.moveLeft({'index': indexValue, 'middleData1': middleData1Id, 'rightData': rightDataId, 'nodeId': this.nodeId}).then(value => {
            this.getInit1()
          })
        } else {
          request.moveLeft({'index': indexValue, 'middleData2': middleData2Id, 'rightData': rightDataId, 'nodeId': this.nodeId}).then(value => {
            this.getInit1()
          })
        }
      },
      moveRight () {
        // **************获得右移的左边选择的信息*************
        let departmentType = this.multipleSelection1.filter(t => {
          return t.type === '部门'
        })
        let departmentId = departmentType.map(t => {
          return {'gro_id': t.id}
        })
        let workerType = this.multipleSelection1.filter(t => {
          return t.type === '工种'
        })
        let workerId = workerType.map(t => {
          return {'role_id': t.id}
        })
        let person = this.multipleSelection1.filter(t => {
          return t.type !== '工种' && t.type !== '部门'
        })
        let personId = person.map(t => {
          return {'emp_id': t.id}
        })
        request.moveRight({'departmentType': departmentId, 'workerType': workerId, 'person': personId, 'nodeId': this.nodeId}).then(value => {
          this.selectPageIndex === 1 ? this.handleCurrentChange1(1) : this.selectPageIndex = 1
          this.allPageIndex === 1 ? this.handleCurrentChange2(1) : this.allPageIndex = 1
          this.getInit1()
        })
      },
      tabClick (val) {
        this.filterText = ''
        this.gro_ids = ''
        this.role_ids = ''
        console.log(val)
        this.tab.active = val
        if (val === 0) {
          this.$refs.multipleTable2.clearSelection()
        } else {
          this.$refs.tree.setCheckedNodes([])
        }
        this.getTableInfo2()
      },
      // 点击移动按钮发生变化
      getInit1 () {
        // 获取第一张表的信息
        this.getTableInfo1()
        // 获得第二张表的信息
        request.getTable2({'nodeId': this.nodeId}).then(value => {
          this.tableData4 = value.role_list
          this.tableData2 = value.gro_trees
        })
        // 获取第三张表的信息
        this.getTableInfo2()
      }
    }
  }
</script>

<style scoped>
  #d1{border:1px solid black}
  .el-table tr{height:30px}
  .el-dialog{height:550px;}
  .tranferLeft{float:left;position:relative}
  .tranferMiddle{float:left;padding-left:10px;position:relative}
  .tranferMiddle .item-box{border-radius:8px 0 0 8px}
  .tranferRight .item-box{border-radius:0 8px 8px 0}
  .tranferRight{float:left;position:relative}
  .block{position:absolute;bottom:10px;width:100%}
  .block1{position:absolute;bottom:10px;left:5px; width:300px;}
  .title{position:absolute;top:15px;left:15px;font-size: 14px;  font-weight: bold;}
  .nav{position: absolute;left:-16px;top:-2px;font-size: 14px;  font-weight: bold;}
  .title2{position:absolute;top:15px;left:35px;font-size: 14px;  font-weight: bold;}
  .buttonTransfer{float:left;height:550px;padding-left:10px;}
  .buttonTransfer img{width:50px;height:50px;}
  .buttonTransfer .leftButton{padding-top:140px;width:50px;}
  .buttonTransfer .rightButton{padding-top:20px;width:50px;}
  .content {padding: 0px 14px 40px 14px;height: 280px; background:white;}
  .item-box {background-color: #F3F3F4;border-radius: 8px;padding:50px 10px 50px 10px; margin-bottom:10px;}
  .item-box{width:280px}
  .item-box .nav a{display: inline-block;color: #666666;font-weight: bold;background-color: #E6E6E6;padding: 8px 0;border-radius: 2px;width: 15%;margin-right: 5px;text-align: center;}
  .tree-box::-webkit-scrollbar,.el-main::-webkit-scrollbar{width: 6px;}
  .tree-box::-webkit-scrollbar-thumb,.el-main::-webkit-scrollbar-thumb{background-color: #989898;}
  .tree-box {padding:0px 10px 10px 10px;background-color: #FFFFFF;border-radius: 4px;overflow: auto; height:260px;}
  .tree-box{position: absolute;left:20px;width:240px;}
  .el-tree-node .el-tree-node__content {background-color: #F3F3F4;border: 1px solid #E7EAEC;}
  .item-box .nav {position: relative;padding: 5px 5% 0 5%;}
  .item-box .nav a{display: inline-block;color: #666666;font-weight: bold;background-color: #ffffff;padding: 8px 0;border-radius: 2px;width: 25%;margin-right: 5px;text-align: center;}
  .item-box .nav a.active {background-color: #E6E6E6;}



</style>
