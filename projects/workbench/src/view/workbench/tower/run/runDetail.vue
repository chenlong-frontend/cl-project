<template>
  <div class="warningDetail">
    <p class="list name">塔吊名称：<span>{{detailData.name}}</span> </p>
    <P class="list person">操作人：<span>{{detailData.person}}</span> (<span>联系方式：{{detailData.tel}}</span>) </P>
    <p class="list time">运行时间：<span>{{detailData.time}}</span> </p>
    <p class="list detail">运行期内报警详情：</p>
    <div class="table">
      <el-table
        :data="tableData"
        border
        stripe
        style="width:100%;">
        <el-table-column
          prop="time"
          label="报警时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="reason"
          label="报警原因"
          align="center">
        </el-table-column>
        <el-table-column
          prop="project"
          label="报警后解决方案"
          align="center">
        </el-table-column>
        <el-table-column
          prop="yes"
          label="问题是否解决"
          align="center">
        </el-table-column>
        <el-table-column
          prop="other"
          label="备注（其他）"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from '@/api/workbench/tower/run/runDetail.js'
export default {
  name: 'warningDetail',
  props: ['runInfoID'],
  created () {
  },
  mounted () {
    this.getRunDetail()
  },
  data () {
    return {
      detailData: {name: '', person: '', tel: '', time: ''},
      tableData: [{time: '', reason: '', project: '', yes: '', other: ''}]
    }
  },
  computed: {},
  methods: {
    getRunDetail () {
      request.getRunDetail(this.runInfoID).then(
        data => {
          if (data.data.code === 0) {
            this.detailData = data.data.data.detailData
            this.tableData = data.data.data.tableData
          } else this.$message.error('获取失败')
        },
        error => {
          console.log(error)
        }
      )
    }
  }
}
</script>

<style scoped>
.warningDetail{
  margin-top: -20px;
  padding-left: 50px;
}
.list{
  color:#ACAEAF;
  font-size: 16px;
}
.name{
  color:#999999;
}
.table{
  height: 350px;
  overflow: auto;
  margin-top: 10px;
  /* border: 1px solid; */
  padding:10px;
  text-align: center;
  background-color: #F3F3F4;
}
/* 塔吊运行统计次数结束 */
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
