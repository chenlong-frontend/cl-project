<template>
  <div class="proDetail">
        <el-select v-model="country" style="width: 23%;" size="mini"  @change="changeCountry(country)">
            <el-option
            v-for="item in area.country"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="province" style="width: 23%;" size="mini"  @change="changeProvince(province)">
            <el-option
            v-for="item in area.province"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="city" style="width: 23%;" size="mini" @change="changeCity(city)">
            <el-option
            v-for="item in area.city"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="time" style="width: 24%;" size="mini" @change="changeDate(time)">
            <el-option
            v-for="item in area.year"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>

        <div class="projectTab">
            <el-table
            :data="tableData"
            @row-dblclick='showDetail'
            size="mini"
            style="width: 100%">
            <el-table-column
                prop="state"
                label="状态"
                :show-overflow-tooltip='true'
                width="60">
                <template slot-scope="scope">
                  <span style="color:#F8AC59;" v-if="scope.row.state === 0">竣工</span>
                  <span style="color:#1C84C6;" v-if="scope.row.state === 1">在建</span>
                  <span style="color:#EF5253;" v-if="scope.row.state === 2">未开工</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :show-overflow-tooltip='true'
                label="项目名">
            </el-table-column>
            <el-table-column
                prop="employee_sum"
                label="人数"
                :show-overflow-tooltip='true'
                width="50">
            </el-table-column>
            <el-table-column
                prop="start_time"
                label="开工时间"
                :show-overflow-tooltip='true'
                width="90">
            </el-table-column>
            <el-table-column label="操作" width="45">
                <template slot-scope="scope">
                <el-button
                    v-if="scope.row.state !== 2"
                    size="mini"
                    type="primary"
                    class="toBtn"
                    @click="to(scope.$index, scope.row)">进入</el-button>
                    <el-button
                    v-if="scope.row.state === 2"
                    size="mini"
                    disabled
                    type="primary"
                    class="toBtn">进入</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import request from '@/api/home/home.js'
export default {
  name: 'projectTable',
  props: ['tabindex'],
  data () {
    return {
      area: {
        country: [],
        province: [],
        city: [],
        year: []
      },
      country: '国家',
      province: '省份',
      city: '城市',
      time: '开工年份',
      requestData: {
        currentPage: '',
        pageSize: '',
        country: '',
        province: '',
        city: '',
        time: ''
      },
      tableData: []
    }
  },
  created: function () {
    if (this.tabindex === '0') {
      this.getSelData()
    } else if (this.tabindex === '1') {
      this.getJoinSelData()
    }
  },
  methods: {
    // 页面刚加载时选择项目中的四个下拉框数据请求
    getSelData () {
      request.sqlChooseData(this.requestData).then((data) => {
        this.tableData = data.data.project
      })
      request.getChooseData().then((data) => {
        this.area.country = data.data.area
        data.data.area.map((item, index) => {
          item.children.map((items, index) => {
            this.area.province.push(items)
            items.children.map((itemss, index) => {
              this.area.city.push(itemss)
            })
          })
        })
      })
      request.getChooseYear().then((data) => {
        data.year.map((item, index) => {
          this.area.year.push({'text': item, 'label': item})
        })
      })
    },
    // 页面刚加载时我参加的项目中的四个下拉框数据请求
    getJoinSelData () {
      request.sqlJoinData(this.requestData).then((data) => {
        this.tableData = data.data.data
      })
      request.getJoinProjectData().then((data) => {
        this.area.country = data.data.area
        data.data.area.map((item, index) => {
          item.children.map((items, index) => {
            this.area.province.push(items)
            items.children.map((itemss, index) => {
              this.area.city.push(itemss)
            })
          })
        })
      })
      request.getJoinProjectYear().then((data) => {
        data.map((item, index) => {
          this.area.year.push({'text': item, 'label': item})
        })
      })
    },
    // 国家变化
    changeCountry (country) {
      this.requestData.country = country
      request.sqlChooseData(this.requestData).then((data) => {
        this.tableData = data.data.data
      })
    },
    // 省份变化
    changeProvince (province) {
      this.requestData.province = province
      request.sqlChooseData(this.requestData).then((data) => {
        this.tableData = data.data.data
      })
    },
    // 城市变化
    changeCity (city) {
      this.requestData.city = city
      request.sqlChooseData(this.requestData).then((data) => {
        this.tableData = data.data.data
      })
    },
    // 开工年份变化
    changeDate (time) {
      this.requestData.time = time
      request.sqlChooseData(this.requestData).then((data) => {
        this.tableData = data.data.data
      })
    },
    // 双击在左侧显示详情
    showDetail (row, event) {
      this.$emit('tableDetail', row)
    },
    // 进入按钮
    to (index, row) {
      console.log(row)
      const userInfo = JSON.parse(sessionStorage.userInfo)
      userInfo.pro_id = row.p_id
      sessionStorage.userInfo = JSON.stringify(userInfo)
      window.location.href = '/workbench/workbench.html'
    }
  }
}
</script>

<style>
.proDetail{width:100%;position: relative;height:210px;}
.proDetail .imgBox{width:65px;height:80px;}
.proDetail .projectIntro{font-size: 12px;position: absolute;top:0px;left:70px;}
.proDetail .projectIntro h4{margin: 0px;line-height: 24px;font-size: 14px;color: #676A6C;}
.proDetail .projectIntro p{margin:0px;line-height: 20px;color: #676A84;}
.projectTab{height: 170px;overflow: auto;margin-top: 4px;}
.toBtn{width:32px;height:24px;}
.el-button--mini, .el-button--mini.is-round{padding: 4px 2px;}
</style>


