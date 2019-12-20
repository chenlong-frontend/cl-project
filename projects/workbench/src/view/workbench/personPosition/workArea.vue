<template>
  <el-container>
    <!-- 左边定位图纸 -->
    <el-aside width="66%">
      <ibox title="工作区域分布概览">
        <!--<area-map></area-map>-->
        <!--项目下拉框-->
        <span style="color:#255f9e; font-weight:600;">当前项目：</span>
        <el-select v-model="projectstate" placeholder="请选择" size="small"
                   style="width: 20%" @change="changePro">
          <el-option
            v-for="(item, index) in proOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!--区域下拉框-->
        <el-select v-model="areaId" placeholder="请选择" size="small"
                   style="margin-left: 32%;width: 20%" @change="changeArea">
          <el-option
            v-for="(item, index) in areaPptions"
            :key="index"
            :label="item.zone_name"
            :value="item.zone_id"
          >
          </el-option>
        </el-select>
        <!--查看人员-->
        <el-button type="primary" size="small" @click="showFindperson">查看人员</el-button>
        <!--下面的热区图-->
        <div class="map_style">
          <img :src="mapimg">
          <!--<person-point-->
          <!--:msg="personPoint"-->
          <!--&gt;</person-point>-->
          <person-point
            v-for="(item, index) in personPoint"
            :item="item"
            :key="index"
          ></person-point>
        </div>
        <!--查看人员-->
        <el-dialog
          title="区域人员列表"
          :visible.sync="flag.findperson"
          width="60%"
          :modal-append-to-body= false
          style="margin-top: -50px;"
        >
          <!--这里需要传入select下拉框改变的值-->
          <find-person :areaid="areaId"></find-person>
        </el-dialog>
      </ibox>
    </el-aside>
    <!-- 右边 -->
    <el-aside width="34%" class="rightBoxs">
      <el-row>
        <el-col :span="24">
          <ibox title="当前场内安全帽相关统计">
            <div class="recent_count">当前场内在岗人员总数：<span>{{total_num}}人</span></div>
          </ibox>
        </el-col>
      </el-row>

      <!--              后期补充             ----->
      <!--<el-row style="margin-top: 25px;">-->
        <!--<el-col :span="24">-->
          <!--<ibox title="今日滞留情况">-->
            <!--<canvas id="myChart" width="150" height="70" ></canvas>-->
          <!--</ibox>-->
        <!--</el-col>-->
      <!--</el-row>-->

      <el-row style="margin-top: 25px;">
        <el-col :span="24">
          <ibox title="安全帽电量统计">
            <div class="electronic_count">
              电量充足：<span>{{full_power}}人</span>
            </div>
            <div class="electronic_count">
              电量正常：<span>{{normal_power}}人</span>
            </div>
            <div class="electronic_count">
              电量较低：<span>{{low_power}}人</span>
            </div>
            <div class="electronic_count">
              需充电：<span>{{need_power}}人</span>
            </div>
          </ibox>
        </el-col>
      </el-row>
    </el-aside>
  </el-container>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import findPerson from './areaComponents/findPerson.vue'
  import personPoint from './areaComponents/personPoint.vue'
  import request from '@/api/workbench/personPosition/workArea'
  import { mapMutations } from 'vuex'
  export default {
    components: {ibox, findPerson, personPoint},
    created () {
      let sessiondata = JSON.parse(sessionStorage.userInfo)
      this.projectstate = sessiondata.project_name
      this.projectId = sessiondata.pro_id
      this.ajaxGetArea()
    },
    data () {
      return {
        flag: {
          findperson: false
        },
        /* ****获取区域列表信息****** */
        areaPptions: [],
        areaValue: '',
        areaId: '',
        /* ****获取区域列表信息****** */
        // *****选取的项目名和id***** //
        projectstate: '',
        projectId: '',
        proOptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        // *****选取的项目名和id***** //
        total_num: 0,
        full_power: 0,
        normal_power: 0,
        low_power: 0,
        need_power: 0,
        mapimg: require('../../../../static/personPosition/map.png'),
        personPoint: [
          {
            left: '5%',
            bottom: '20%',
            id: '20180123110318000'
          },
          {
            left: '16%',
            bottom: '20%',
            id: '20180123110318001'
          },
          {
            left: '10%',
            bottom: '20%',
            id: '20180123110318001'
          },
          {
            left: '15%',
            bottom: '29%',
            id: '20180123110318000'
          }
        ]
      }
    },
    methods: {
      ...mapMutations('area', ['changeAreaName']),
      // 初始化获取项目列表 ----------需补充-------- //
      // 区域下拉框默认事件
      ajaxGetArea () {
        // 默认获取第一个区域
//        request.getAreaList({'pro_id': this.projectId}).then(
//          data => {
//            this.areaPptions = data.data.data
//            this.areaValue = data.data.data[0].zone_name
//            this.changeAreaName(this.areaValue)
//            console.log('存区域名称：' + this.areaValue)
//            this.areaId = data.data.data[0].zone_id
//            // console.log(this.areaPptions)
//          }
//        )
        request.getAreaList1().then(
          data => {
            this.areaPptions = data.data.data
            this.areaValue = data.data.data[0].zone_name
            this.changeAreaName(this.areaValue)
            console.log('存区域名称：' + this.areaValue)
            this.areaId = data.data.data[0].zone_id
            console.log(this.areaPptions)
            this.ajaxGetRight()
          }
        )
      },
      ajaxGetRight () {
        // 在取得区域之后，分别获取右边和下方定位区域的数据。下方定位数据从王师傅那里获取
        request.getAreaRight({'zone_id': this.areaId}).then(
          data => {
            console.log(data.data.data)
            this.total_num = data.data.data.total_num
            this.full_power = data.data.data.power_num.full_power
            this.normal_power = data.data.data.power_num.normal_power
            this.low_power = data.data.data.power_num.low_power
            this.need_power = data.data.data.power_num.need_power
          }
        )
        // 获取区域点列表  -------------需补充--------------//
      },
      changeArea (value) {
        let obj = {}
        obj = this.areaPptions.find((item) => {
          return item.zone_id === value
        })
        this.areaValue = obj.zone_name
        this.areaId = value
        console.log('区域id:' + this.areaId + ', 区域名称：' + this.areaValue)
        // 改变vuex值
        this.changeAreaName(this.areaValue)
        this.ajaxGetRight()
        this.personPoint = [{
          left: '16%',
          bottom: '20%',
          id: '20180123110318000'
        }, {
          left: '10%',
          bottom: '20%',
          id: '20180123110318001'
        }]
      },
      changePro (item) {
        // 待开发
        console.log(item)
      },
      showFindperson () {
        this.flag.findperson = true
      }
    },
    beforeRouteLeave (to, from, next) {
      console.log('跳出当前页面-----------')
      next()
    }
//    watch: {
//      '$route': function (to, from) {
//        console.log('---------')
//        console.log(to)
//        console.log(from)
//      }
//    }
  }
</script>
<style scoped>
  .el-aside{background: none}
  .map_style{
    width: 100%;
    height:auto;
    margin-top: 20px;
    position: relative;
  }
  .map_style img {
    width: 100%;
    height:100%;
  }

  .rightBoxs{
    float: right;
    margin-left: 30px;
  }
  .recent_count{
    text-align: center;
    background-color: #FAF7FA;
    padding: 15px;
    border-radius: 30px;
  }
  .recent_count span{
    font-size: 20px;
    font-weight: 600;
  }
  .electronic_count{
    display: inline-block;
    width: 42%;
    margin: 10px;
    margin-bottom: 30px;
  }
  .electronic_count span{
    font-size: 20px;
    font-weight: 600;
  }
</style>
