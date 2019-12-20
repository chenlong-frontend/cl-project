<template>
<div>
  <div class="tranfer cl-manage ">
    <!--左边-->
    <div class="tranferLeft">
      <div class="item-box">
        <div class="title">
          <span>已选</span>
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
              prop="address"
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
            :total="80"
            samll
            @current-change="handleCurrentChange1">
          </el-pagination>
        </div>
      </div>
    </div>

    <!--穿梭按钮-->
    <div class="button">
      <div class="leftButton"><img src="../../../assets/img/lib/transfer/left.png" alt="" @click="moveLeft"></div>
      <div class="rightButton"><img src="../../../assets/img/lib/transfer/right.png" alt="" @click="moveRight"></div>
    </div>

    <div class="tranferMiddle">
      <div class="item-box">
        <div class="title2">
          <span>待选</span>
        </div>
        <div class="content">
          <div class="nav-tab">
            <div class="nav"><a v-for="(item,index) in tab.data" @click="tab.active=index" :class="{active:index == tab.active}">{{item}}</a></div>
            <div class="tree-box" v-show="tab.active === 0">
              <!--树形结构-->
              <el-tree
                :data="tableData2"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree"
                @current-change="handleNodeClick"
                highlight-current>
              </el-tree>
            </div>
            <div class="tree-box" v-show="tab.active === 1">
              <!--树形结构-->
              <el-tree
                :data="tableData4"
                show-checkbox
                default-expand-all
                node-key="id"
                ref="tree1"
                @current-change="handleNodeClick"
                highlight-current>
              </el-tree>
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
              prop="name"
              label="姓名"
              width="100"
              align="center"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="address"
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
            :total="50"
            @current-change="handleCurrentChange2">
          </el-pagination>
        </div>
      </div>
    </div>


  </div>
</div>
</template>

<script>
  import request from '@/api/workbench/components/copyPersonTransfer.js'
  export default {
    props: [],
    mounted () {
      // 请求第二张表部门部分的数据
      request.getTable2().then(value => {
        this.tableData2 = value
      })
      // 请求第二张表工种部分的数据
      request.getTable4().then(value => {
        this.tableData4 = value
      })
      // 请求第三张表的数据
      request.getTable3().then(value => {
        this.tableData3 = value
      })
    },
    data () {
      return {
        headCellStyle: {textAlign: 'center'},
        tab: {
          data: ['部门', '工种'],
          active: 0
        },
        tableData1: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        multipleSelection1: [],
        multipleSelection2: [],
        filterText: '',
        data: []
      }
    },
    methods: {
      handleSelectionChange1 (val) {
        this.multipleSelection1 = val
        console.log(this.multipleSelection1)
      },
      handleSelectionChange2 (val) {
        this.multipleSelection2 = val
      },
      handleCurrentChange1 (val) {
        // **************获得第一张表的分页信息
        console.log(val)
      },
      handleCurrentChange2 (val) {
        // **************获得第一张表的分页信息
      },
      moveLeft () {
        // ***
        if (this.tab.active === 0) {
          let array = this.$refs.tree.getCheckedNodes().filter(item => {
            let flag = true
            for (let value of this.tableData1) {
              console.log(value.id)
              console.log(item.id)
              if (value.id === item.id) {
                flag = false
                break
              }
            }
            console.log(flag)
            return flag
          })
          let test = array.map(value => {
            value.name = '部门'
            value.address = value.label
            return value
          })
          console.log(test)
          this.tableData1.push(...test)
        } else {
          let array1 = this.$refs.tree1.getCheckedNodes().filter(item => {
            let flag1 = true
            for (let value of this.tableData1) {
              console.log(value.id)
              console.log(item.id)
              if (value.id === item.id) {
                flag1 = false
                break
              }
            }
            console.log(flag1)
            return flag1
          })
          let test1 = array1.map(value => {
            value.name = '工种'
            value.address = value.label
            return value
          })
          console.log(test1)
          this.tableData1.push(...test1)
        }
        for (var i = 0; i < this.multipleSelection2.length; i++) {
          this.tableData1.push(this.multipleSelection2[i])
        }
        var set = new Set(this.tableData1)
        this.tableData1 = Array.from(set)
//        this.departData = this.departData.filter(item => {
//          return this.tableData1.indexOf(item)
//        })
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable1.clearSelection()
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree1.setCheckedNodes([])
      },
      moveRight () {
       // *********删除抄送信息***********
//        for (var i = 0; i < this.multipleSelection1.length; i++) {
//          this.tableData1.pop(this.multipleSelection1[i])
//        }
        this.tableData1 = this.tableData1.filter(t => {
          return this.multipleSelection1.indexOf(t) === -1
        })
      },
      handleNodeClick (data) {
        // ******
        console.log(data)
      },
      searchInput () {
        // ****************获取搜索框的内容**********
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
  .block{position:absolute;bottom:10px;right:6px;}
  .block1{position:absolute;bottom:10px;left:83px;}
  .title{position:absolute;top:15px;left:15px;font-size: 14px;  font-weight: bold;}
  .nav{position: absolute;left:-16px;top:-2px;font-size: 14px;  font-weight: bold;}
  .title2{position:absolute;top:15px;left:35px;font-size: 14px;  font-weight: bold;}
  .button{float:left;height:550px;padding-left:10px;}
  .button img{width:50px;height:50px;}
  .button .leftButton{padding-top:140px;}
  .button .rightButton{padding-top:20px;}
  .content {padding: 0px 14px 40px 14px;height: 280px; background:white;}
  .item-box {background-color: #F3F3F4;border-radius: 8px;padding:50px 10px 50px 10px}
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
