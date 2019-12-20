<template>
    <div class="takePhone">
        <el-select v-model="value1" placeholder="请选择年" v-on:change="getYear()" v-show="vr">
            <el-option
            v-for="item in years"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value2" placeholder="请选择月" v-on:change="getMonth()" v-show="vr">
            <el-option
            v-for="item in months"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="value3" placeholder="请选择月" v-on:change="getDay()" v-show="workCheck">
            <el-option
            v-for="item in day"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <div class="seoBox" v-show="vr">
          <el-input v-model="input" placeholder="请输入内容" class="seo" @keyup.enter.native="seoData(input)"></el-input>
          <el-button type="primary" icon="el-icon-search" v-on:click="seoData(input)"></el-button>
        </div>

        <!-- 表格导航条 -->
        <div class="tableBox">
           <!-- 顶部导航 -->
            <nav v-show="vr">
              <ul>
                <li v-for="(item,index) in navData" class="navList" :class="{ topBlue:changeColor == index}" :key='index' v-on:click="showTable(index)">
                  {{item.tab}}
                </li>
              </ul>
            </nav>
            <el-table
              v-loading="loading"
              :data="tableData.tbody"
              style="width: 100%"
              stripe
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                  v-for="(itemm, index) in tableData.tabTitle"
                  :prop="itemm.prop"
                  :label="itemm.label"
                  sortable
                  :key = "index">
              </el-table-column>
          </el-table>
        </div>

        <button class="topBlue out" v-on:click="outExcel" v-show="vr">导出Excel</button>

        <!-- 分页 -->
        <div class="block">
          <el-pagination
            class="page"
            layout="prev, pager, next"
            :current-page = 'page'
            @current-change ='pageRequest'
            :total='pageNum'>
          </el-pagination>
        </div>
    </div>
</template>

<script>
import request from '@/api/workbench/item/report/takePhone.js'
import { mapState } from 'vuex'
export default {
  props: ['name', 'id'],
  data () {
    return {
      changeColor: 0,
      loading: false,
      workCheck: false,
      vr: true,
    // 年
      years: [],
      value1: '',
    // 月
      months: [],
      value2: '',
    // 日
      day: [],
      value3: [],
    //   表格导航数据
      navData: [],
    //   表格主体数据
      tableData: {
        name: [],
        tabTitle: [],
        tbody: []
      },
      input: '',
      pageNum: 10,
      page: 1
    }
  },
  mounted: function () {
     // 页面加载时获取年份
    request.initYear().then(data => {
      this.years = data
    })
    // 页面加载时获取月份
    request.initMonth().then(data => {
      this.months = data
    })
    // 页面加载时获取月份
    request.initDay().then(data => {
      this.day = data
    })
    // 是否显示day下拉框
    console.log(this.manageId)
    if (this.name === '体验详情' || this.name === '体验点排名') {
      this.vr = false
    }
    if (this.id === '20171023181528009') {
      this.workCheck = true
    }
    // 获取导航数据
    request.getNav(this.manageId).then(data => {
      this.navData = data.data
      // 页面加载时获取表格数据\导航\分页数
      request.getTable(this.manageId).then(data => {
        this.loading = false
        console.log(data.data)
        this.tableData.tbody = data.data.data
        this.pageNum = Number(data.data.count)
        this.tableData.tabTitle = data.data.head
      })
    })
  },
  computed: {
    ...mapState('manage', ['manageId', 'manageName'])
  },
  methods: {
    // 年份发生变化时执行的事件
    getYear: function () {
      request.getYear(this.value1, this.manageId).then(data => {
        this.tableData.tbody = data.data.data
        // this.pageNum = Number(data.data.backData.count)
        this.tableData.tabTitle = data.data.head
      })
    },
    // 月份发生变化时执行的事件
    getMonth: function () {
      if (this.value1) {
        request.getMonth(this.value1, this.value2, this.manageId).then(data => {
          this.tableData.tbody = data.data.data
          // this.pageNum = Number(data.data.backData.count)
          this.tableData.tabTitle = data.data.head
        })
      }
    },
    // 月份发生变化时执行的事件
    getDay: function () {
      request.getDay(this.value1, this.value2, this.value3, this.manageId).then(data => {
        this.tableData.tbody = data.data.data
        // this.pageNum = Number(data.data.backData.count)
        this.tableData.tabTitle = data.data.head
      })
    },
    // 搜索按钮的点击事件
    seoData: function () {
      request.seoData(this.value1, this.value2, this.value3, this.input, this.changeColor, this.manageId).then(data => {
        this.tableData.tbody = data.data.data
        // this.pageNum = Number(data.data.backData.count)
        this.tableData.tabTitle = data.data.head
        if (self.page !== 1) {
          self.page = 1
        }
      })
    },
    // 导航切换表格数据
    showTable: function (index) {
      this.changeColor = index
      var self = this
      request.getTable(index).then(data => {
        self.tableData.tbody = data.data.data
        // self.pageNum = Math.ceil(Number(data.data.backData.count / 10))
        self.tableData.tabTitle = data.data.head
        if (self.page !== 1) {
          self.page = 1
        }
      })
    },
    // 选择分页时执行的事件
    pageRequest: function (currentPage) {
      this.page = currentPage
      var self = this
      request.pageRequest(this.value1, this.value2, this.input, this.changeColor, currentPage, this.manageId).then(data => {
        self.tableData.tbody = data.data.data
        // self.pageNum = Math.ceil(Number(data.data.backData.count / 10))
        self.tableData.tabTitle = data.data.head
      })
    },
    // 导出Excel的点击事件
    outExcel: function () {
      request.outExcel(this.value1, this.value2, this.value3, this.input, this.changeColor, this.manageId).then(data => {
        window.open(data.data.download_url)
        // window.open('http://www.baidu.com')
        console.log(data.data.download_url)
      })
    }
  }
}
</script>

<style scoped>
    .seoBox{
      width:70%;
      position: relative;
      top:-40px;
      left:40%;
    }
    .seo{
      width: 18%;
    }
    .tableBox{
        margin-top: -5px;
        padding: 5px 10px;
        box-sizing: border-box;
        background-color: #F2F2F2;
    }
    .el-input{
      width:30%;
      height:40px;
    }
    .el-input--suffix{
      width:100%;
      height: 40px;
    }
    .yearBlock,.monthBlock{
        width: 200px;
        display: inline-block;
    }
    .el-tabs__active-bar{
        display: none;
    }
    .navList{
        padding:0 22px;
        margin: 10px 4px;
        display: inline-block;
        box-sizing: border-box;
        font-weight: bold;
        font-size:16px;
        width:auto;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
        background-color: #CCCCCC;
    }
    .topBlue{
        padding:0 22px;
        margin: 10px 4px;
        box-sizing: border-box;
        font-size:16px;
        width:auto;
        height: 36px;
        display: inline-block;
        line-height: 36px;
        text-align: center;
        border-radius: 5px;
        background-color: #1D84C6;
        color: #fff;
        font-weight: bold;
    }
    /* 表格 */
    .el-table th{
        background-color:#E6E6E6;
    }
    .el-table tr:first-child{
        background-color: #E6E6E6;
        color:#6B6B7F;
    }
    .el-table tr:nth-child(odd){
        background-color: #F2F2F2;
        color:#6B6B7F;
    }
    .out{
      width:140px;
      border:none;
      outline: none;
      background-color: #85CE61;
    }
    /* 分页 */
    .el-pagination{
        width:200px;
        margin-left:35%;
    }
    .block{
      width:600px;
      margin-left:200px;
      text-align: center;
    }
</style>
