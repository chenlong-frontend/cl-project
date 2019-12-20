<template>
<div class="dialog">
    <p v-if="company.build">集团在建项目统计：<span>{{count}}</span>个 </p>
    <p v-if="company.not">集团未开工项目统计：<span>{{count}}</span>个 </p>
    <p v-if="company.done">集团竣工项目统计：<span>{{count}}</span>个 </p>
    <p v-if="subCompany.build">分公司在建项目统计：<span>{{count}}</span>个 </p>
    <p v-if="subCompany.not">分公司未开工项目统计：<span>{{count}}</span>个 </p>
    <p v-if="subCompany.done">分公司竣工项目统计：<span>{{count}}</span>个 </p>
    <div class="companySelect" v-if="company.sel">
      <el-select v-model="company.date" size="mini" @change="changeYate(company.date)">
            <el-option
            v-for="item in comSel.year"
            :key="item.label"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="company.chooseSubcompany" size="mini" @change="changeSubcompany(company.chooseSubcompany)">
            <el-option
            v-for="item in comSel.companys"
            :key="item.label"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="subCompanySelect" v-if="subCompany.sel">
      <el-select v-model="subCompany.country" style="width:120px" size="mini"  @change="changeCountry(subCompany.country)">
            <el-option
            v-for="item in area.country"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="subCompany.province" style="width:120px" size="mini"  @change="changeProvince(subCompany.province)">
            <el-option
            v-for="item in area.province"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="subCompany.city" style="width:120px" size="mini" @change="changeCity(subCompany.city)">
            <el-option
            v-for="item in area.city"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
        <el-select v-model="subCompany.time" style="width:120px" size="mini" @change="changeTime(subCompany.time)">
            <el-option
            v-for="item in area.year"
            :key="item.value"
            :label="item.text"
            :value="item.text">
            </el-option>
        </el-select>
    </div>

  <div class="bgBox">
      <el-row>
        <el-col :span="6" v-for="(item,index) in prosDetails" :key="index"  @click="toPro(item.pro_id,item.pro_name)">
          <div class="grid-content bg-purple-dark">
            <div class="proBoxs">
              <div class="proBox">
                <div class="imgBox">
                  <img :src='item.original_pic' alt="项目图片" v-if="item.original_pic">
                  <img :src='item.preview_pic' alt="项目图片"  v-if="item.preview_pic">
                </div>
                <div class="pro-intro">
                  <h4 v-if="item.name">{{item.name}}</h4>
                  <h4 v-if="item.pro_name">{{item.pro_name}}</h4>
                  <p><span class="left">开工日期：</span><span class="manager">{{item.start_time}}</span></p>
                  <p><span class="left">项目经理：</span><span class="manager">{{item.manager}}</span></p>
                  <p><span class="left">地址：</span><span class="manager">{{item.address}}</span></p>
                </div>
                <img src="../../assets/img/home/proDetailBg.png" alt="" class="proDetailPic">
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    <div class="block" v-if="comPage">
      <el-pagination
        @current-change ='pageRequest1'
        :current-page.sync="twoSel.currentPage"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
    <div class="block" v-if="subPage">
      <el-pagination
        @current-change ='pageRequest2'
        :current-page.sync="requestData.currentPage"
        layout="prev, pager, next"
        :total="count">
      </el-pagination>
    </div>
  </div>
</div>
</template>

<script>
import request from '@/api/home/home.js'
export default {
  name: 'detail',
  props: ['toDialog'],
  data () {
    return {
      prosDetails: [],
      company: {
        sel: false,
        build: false,
        not: false,
        done: false,
        date: '按年份选择',
        chooseSubcompany: '筛选分公司'
      },
      twoSel: {
        currentPage: 1,
        pageSize: 10,
        searchKey: ''
      },
      comSel: {
        year: [],
        companys: []
      },
      comRequest: {
        currentPage: 1,
        pageSize: 10,
        state: -1,
        year: '',
        id: ''
      },
      subCompany: {
        sel: false,
        build: false,
        not: false,
        done: false,
        country: '国家',
        province: '省份',
        city: '城市',
        time: '开工年份'
      },
      area: {
        country: [],
        province: [],
        city: [],
        year: []
      },
      requestData: {
        currentPage: 1,
        pageSize: 10,
        country: '',
        province: '',
        city: '',
        time: ''
      },
      count: 67,
      comPage: false,
      subPage: false
    }
  },
  created: function () {
    console.log(this.toDialog)
    if (this.toDialog.state === 'build') {
      this.comRequest.state = 1
      this.company.build = true
      this.company.sel = true
      this.comPage = true
      this.getComSel()
    } else if (this.toDialog.state === 'not') {
      this.comRequest.state = 0
      this.company.not = true
      this.company.sel = true
      this.comPage = true
      this.getComSel()
    } else if (this.toDialog.state === 'done') {
      this.comRequest.state = 2
      this.company.done = true
      this.company.sel = true
      this.comPage = true
      this.getComSel()
    } else if (this.toDialog.state === 'subbuild') {
      this.requestData.state = 1
      this.subCompany.build = true
      this.subCompany.sel = true
      this.subPage = true
      this.getSelData()
    } else if (this.toDialog.state === 'subnot') {
      this.requestData.state = 0
      this.subCompany.not = true
      this.subCompany.sel = true
      this.subPage = true
      this.getSelData()
    } else if (this.toDialog.state === 'subdone') {
      this.requestData.state = 2
      this.subCompany.done = true
      this.subCompany.sel = true
      this.subPage = true
      this.getSelData()
    } else {
      request.prosDetails(this.toDialog).then((data) => {
        this.prosDetails = data.data
      })
    }
  },
  methods: {
    // 集团下两个select框的数据请求
    getComSel () {
      request.getComDialogSel(this.twoSel).then((data) => {
        data.data.years.map((item, index) => {
          this.comSel.year.push({value: item, label: item})
        })
        data.data.company_list.map((item, index) => {
          this.comSel.companys.push({value: item.id, label: item.name})
        })
      })
      // 集团\分公司下根据year、子公司筛选项目
      request.getComDialogData(this.comRequest).then((data) => {
        this.prosDetails = data.data.pro_list
        this.count = data.data.count
      })
    },
    // 分公司下选择项目中的四个下拉框以及主体数据请求
    getSelData () {
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
        this.count = data.data.count
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
        console.log(data)
        data.year.map((item, index) => {
          this.area.year.push({'text': item, 'label': item})
        })
      })
    },
    // 国家变化
    changeCountry (country) {
      this.requestData.country = country
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
        this.count = data.data.count
      })
    },
    // 省份变化
    changeProvince (province) {
      this.requestData.province = province
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
        this.count = data.data.count
      })
    },
    // 城市变化
    changeCity (city) {
      this.requestData.city = city
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
        this.count = data.data.count
      })
    },
    // 开工年份变化
    changeTime (time) {
      this.requestData.time = time
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
        this.count = data.data.count
      })
    },
    // 选年份select框
    changeYate (year) {
      this.comRequest.year = String(year)
      request.getComDialogData(this.comRequest).then((data) => {
        this.prosDetails = data.data.pro_list
      })
    },
    // 选子公司select框
    changeSubcompany (subcompany) {
      this.comRequest.id = String(subcompany)
      request.getComDialogData(this.comRequest).then((data) => {
        this.prosDetails = data.data.pro_list
      })
    },
    // 页数发生变化时数据请求
    pageRequest1 (currentPage) {
      this.comRequest.currentPage = currentPage
      request.getComDialogData(this.comRequest).then((data) => {
        this.prosDetails = data.data.pro_list
      })
    },
    pageRequest2 (currentPage) {
      this.requestData.currentPage = currentPage
      request.sqlChooseData(this.requestData).then((data) => {
        this.prosDetails = data.data.project
      })
    },
    // 进入项目管理
    toPro (id, name) {
      request.passId(id).then((data) => {
        window.location.href = '/workbench/workbench.html#/item-management'
      })
      let depName = JSON.parse(sessionStorage.userInfo)
      depName.dep_name = name
      if (JSON.parse(sessionStorage.userInfo).index === 'company') {
        depName.manage_name = JSON.parse(sessionStorage.userInfo).project_name
      } else if (JSON.parse(sessionStorage.userInfo).index === 'subCompany') {
        depName.manage_name = JSON.parse(sessionStorage.userInfo).project_name
      } else if (JSON.parse(sessionStorage.userInfo).index === 'sky') {
        depName.manage_name = JSON.parse(sessionStorage.userInfo).project_name
      } else if (JSON.parse(sessionStorage.userInfo).index === 'project') {
        depName.manage_name = JSON.parse(sessionStorage.userInfo).project_name
      }
      sessionStorage.userInfo = JSON.stringify(depName)
    }
  }
}
</script>


<style>
  .dialog{position: relative;}
  .companySelect{position: absolute;right:0px;top:0px;}
  .subCompanySelect{position: absolute;right:0px;top:0px;}
  .bgBox{width:100%;height:430px;overflow: auto;margin:0 auto;background:#F2F2F2;padding:20px;box-sizing: border-box;}
  .proBoxs{width:98%;display: inline-block;margin:10px 10px 0px 0px;}
  .proBox{width:100%;height:100%;padding:10px;background:#fff;position:relative;box-sizing: border-box;}
  .proBox .imgBox{width: 80px;height: 100px;border: 1px solid;}
  .proBox .imgBox img{width:100%;height:100%;}
  .pro-intro{width: 60%;position: absolute;left:100px;top:-14px;color:#686874;z-index: 1;}
  .proDetailPic{height:120px;position: absolute;right:0px;top:0px;z-index: 0;}
  .pro-intro h4{margin-bottom: 0px;font-weight: bold;font-size: 16px;}
  .pro-intro .manager{display: inline-block;width: 80px;float: left; overflow: hidden;text-overflow:ellipsis;white-space:nowrap;}
  .pro-intro .left{display: inline-block;float:left;}
  .pro-intro p{height: 24px;line-height: 24px;margin: 0px;font-size: 12px;}
  .block{position: absolute;bottom:0px;left:50%;margin-left: -130px;}
</style>

