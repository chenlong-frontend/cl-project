<template>
  <div class="tp_findPerson">
    <!--搜索框-->
    <el-input
      placeholder="请输入要搜索的人名"
      size="mini"
      v-model="input"
      style="float:right;width:250px;margin-top: -60px;margin-right: 5%"
      @keyup.enter.native="searchQuery"
    >
      <el-button
        slot="append"
        icon="el-icon-search"
        @click="searchQuery"
      >搜索</el-button>
    </el-input>
    <!--下方人员列表-->
    <div class="personlist">
      <template v-for="item in DepartmentUser">
        <div class="person-item">
          <img :src="item.emp_avatar">
          <div>姓名：{{item.emp_name}}</div>
          <div>工号：{{item.emp_num}}</div>
          <div>手机号：{{item.mobile}}</div>
        </div>
      </template>
    </div>
    <el-pagination
      layout="prev, pager, next"
      :total="allItem"
      :page-size=15
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      style="margin-left:35%;"
    >
      <!-- @current-change="handleCurrentChange"-->
    </el-pagination>
  </div>
</template>
<script>
  import request from '@/api/workbench/personPosition/workArea'
  export default {
    props: ['areaid'],
    mounted () {
      console.log('查看全部人员初始化id：' + this.areaid)
      this.getDataFirst()
    },
    data () {
      return {
        form: {index: '', input: '', multipleSelection: []},
        // 下面的input用于v-model和监听，无法监听from里面的input
        input: '',
        inputtemp: '',
        currentPage: 1,
        allItem: 50,
        DepartmentUser: []
      }
    },
    methods: {
      getDataFirst () {
        this.datainit()
        this.ajaxGetAllPerson()
      },
      ajaxGetAllPerson () {
        request.getAllPersonData(this.areaid, this.currentPage, 10, this.form.input).then(
          data => {
            console.log(data.data.data)
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.data.count)
            }
            this.DepartmentUser = data.data.data.emp_list
          }
        )
      },
      handleCurrentChange (index) {
        // this.$message('模拟向后台请求该页数的页面')
        this.form.index = index
        console.log(this.form.input)
        // 实际 发送this.form.index 还需要返回this.form.input 去观察是否是查询经过页面的换页，重设departmentUser
        this.ajaxGetAllPerson()
        console.log('页面改变的加载')
      },
      searchQuery () {
        this.form.input = this.inputtemp
        this.currentPage = 1
        if (this.inputtemp !== '') {
          // 实际查询
          this.ajaxGetAllPerson()
          console.log('搜索加载')
        } else {
          this.$message('请输入查询的值')
        }
      },
      datainit () {
        this.DepartmentUser = []
        this.form = {index: '', input: '', multipleSelection: []}
        // 下面的input用于v-moel和监听，无法监听from里面的input
        this.input = ''
        this.inputtemp = ''
        this.currentPage = 1
        this.allItem = 100
      }
    },
    watch: {
      areaid: function (msg) {
        console.log('检测到id变化：' + msg)
        this.getDataFirst()
      },
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
      }
    }
  }
</script>
<style scoped>
  .personlist {
    width: 100%;
    height:430px;
    overflow: auto;
  }
  .person-item{
    width: 240px;
    height:auto;
    border:1px solid #ddd;
    position: relative;
    display: inline-block;
    margin: 5px;
  }
  .person-item img{
    width: 70px;
    height: 70px;
    margin: 10px;
    position: absolute;
  }
  .person-item div:nth-child(2){
    margin-top: 5px;
  }
  .person-item div{
    display: inline-block;
    font-size: 12px;
    margin-left: 100px;
    margin-bottom: 5px;
  }

/*混动条样式*/
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
