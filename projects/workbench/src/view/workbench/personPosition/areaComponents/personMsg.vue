<template>
  <div class="tp_personmsg">
    <el-aside width="45%">
      <div class="personmsg">
        <div class="p_title">人员基本信息:</div>
        <div class="p_body">
          <img :src="detail.emp_avatar">
          <div class="top_msg">
            <div>
              <i class="fa fa-user "></i>
              <span>姓名：{{detail.emp_name}}</span>
            </div>
            <div>
              <i class="fa fa-tags"></i>
              <span>安全帽编号：{{detail.no}}</span>
            </div>
            <div>
              <i class="fa fa-sitemap"></i>
              <span>所在部门：{{detail.gro_name}}</span>
            </div>
            <div>
              <i class="fa fa-drivers-license "></i>
              <span>工种：{{detail.role_name}}</span>
            </div>
            <div>
              <i class="fa fa-phone "></i>
              <span>联系方式：{{detail.mobile}}</span>
            </div>
          </div>
          <div class="bottom_msg">
            <div>
              <i class="fa fa-map-marker"></i>
              <span>当前所在位置：</span>
              <span class="letterspace">{{currentPos}}</span>
            </div>
            <div>
              <i class="fa fa-clock-o"></i>
              <span>今日出入考勤时间：</span>
              <span class="letterspace">出勤打卡时间：{{attendance[0].time}}</span>
              <span class="letterspace">出门打卡时间：{{attendance[1].time}}</span>
            </div>
          </div>
        </div>
      </div>
    </el-aside>
    <el-aside width="55%" class="rightBox">
      <div class="positionmsg">
        <div class="p_title">
          <span>历史位置详情:</span>
          <el-select v-model="choosedate" placeholder="请选择" size="small"
                     style="width: 20%" @change="changePro">
            <el-option key="7" label="最近一周" value="7"></el-option>
            <el-option key="14" label="最近两周" value="14"></el-option>
            <el-option key="21" label="最近三周" value="21"></el-option>
          </el-select>
          <div>
            <el-table
              :data="formLabelAlign"
              stripe
              height="360"
              style="width: 100%;margin-top: 20px;">
              <el-table-column
                prop="time_interval"
                label="日期"
                width="230">
              </el-table-column>
              <el-table-column
                prop="time_len"
                label="时长"
                width="150">
              </el-table-column>
              <el-table-column
                prop="zone_name"
                label="所在位置"
                show-overflow-tooltip>
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="safe"-->
                <!--label="安全状况">-->
                <!--<template slot-scope="scope">-->
                  <!--<span v-if="scope.row.safe === 1" style="color: red">滞留时间过长</span>-->
                  <!--<span v-if="scope.row.safe === 2" style="color: green;margin-left: 20px">安全</span>-->
                <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <!--分页-->
            <el-pagination
              layout="prev, pager, next"
              :total="allItem"
              :page-size=6
              :current-page.sync="currentPage"
              @current-change="handleCurrentChange"
              style="margin-left: 20%; margin-top: 40px;"
            ><!--
              @current-change="handleCurrentChange"-->
            </el-pagination>
          </div>
        </div>
      </div>
    </el-aside>
  </div>
</template>
<script>
  import request from '@/api/workbench/personPosition/workArea'
  import { mapGetters } from 'vuex'
  export default {
    props: ['personid'],
    created () {
      // 获取到人员id之后就请求个人信息的所有数据
      console.log('初始化获取的id' + this.personid)
      let sessiondata = JSON.parse(sessionStorage.userInfo)
      this.projectstate = sessiondata.project_name
      this.getDataFirst()
    },
    data () {
      return {
        detail: {},
        attendance: [{
          time: ''
        }, {
          time: ''
        }],
        projectstate: '',
        choosedate: '7',
        allItem: 30,
        currentPage: 1,
        formLabelAlign: []
      }
    },
    computed: {
      ...mapGetters('area', ['getAreaName']),
      currentPos: {
        get: function () {
          return this.projectstate + '/' + this.getAreaName
        },
        set: function (newValue) {
          // console.log('computed的set属性：' + newValue)
        }
      }
    },
    methods: {
      changePro (item) {
        this.choosedate = item
        this.currentPage = 1
        this.ajaxGetHistory()
      },
      getDataFirst () {
        this.ajaxGeiClickData()
        this.ajaxGetHistory()
      },
      handleCurrentChange () {
        // console.log(this.currentPage + '------------')
        this.ajaxGetHistory()
      },
      ajaxGeiClickData () {
        request.getPointClickData({'helment_id': this.personid}).then(
          data => {
            // console.log(data.data.data)
            this.detail = data.data.data.detail
            this.attendance = data.data.data.attendance
          }
        )
      },
      ajaxGetHistory () {
        request.getHistoryData(this.personid, this.currentPage, 6, this.choosedate).then(
          data => {
            console.log('获取到的位置详情个数：' + data.data.data.count)
            if (this.currentPage === 1) {
              this.allItem = parseInt(data.data.data.count)
            }
            this.formLabelAlign = data.data.data.record
            console.log(this.formLabelAlign)
          }
        )
      }
    },
    watch: {
      personid: function (msg) {
        console.log('检测到传过来的id变化' + msg)
        this.personid = msg
        this.ajaxGeiClickData()
      }
    }
  }
</script>
<style scoped>
  .tp_personmsg{
    position: relative;
    top:-10px;
  }
  .personmsg{
    width: 95%;
    height:500px;
  }
  .p_title{
    font-size: 18px;
  }
  .p_body{
    width: 100%;
    height:92%;
    margin-top: 10px;
    background-color: #F3F3F4;
    border-radius: 8px;
    position: relative;
  }
  .p_body img {
    display: inline-block;
    width: 140px;
    height:140px;
    margin: 15px;
  }
  .top_msg{
    display: inline-block;
    width: 60%;
    height:auto;
    position: absolute;
    top:15px;
    padding-left: 10px;
  }
  .top_msg div{
    margin-bottom: 8px;
  }
  .bottom_msg{
    width: 90%;
    height: auto;
    padding: 10px;
    margin-left: 5%;
    display: inline-block;
  }
  .bottom_msg span{
    display: inline-block;
  }
  .bottom_msg div{
    margin-bottom: 20px;
  }
  .letterspace{
    display: block;
    width: 90%;
    margin-left: 30px;
  }
  /*右边*/
  .cl-menu .tp_personmsg .rightBox{
    position: absolute;
    right: 0px;
    top:0px;
  }
  .positionmsg{
    width: 99%;
    height:500px;
  }

</style>
