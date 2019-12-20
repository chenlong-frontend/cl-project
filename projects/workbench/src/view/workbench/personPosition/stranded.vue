<template>
  <div class="tp_stranded">
    <el-container>
      <!-- 左边报表 -->
      <el-aside width="66%">
        <ibox title="人员滞留情况统计">
          <div class="charts-box">
            <div style="height: 40px;">
              <ul >
                <template v-for="(item, index) in datelist" class="listBox">
                  <li :class="{'click_focus':showindex === index}" @click="chooseList(item,index)">{{item}}</li>
                </template>
                <div class="date" @click="showDate">按时间选择</div>
                <!-- 选择日历对话框开始 -->
                <el-dialog
                  title="按时间进行选择"
                  :visible.sync="dataDia"
                  width="30%"
                  :append-to-body="true">
                  <div class="block">
                    <el-date-picker
                      v-model="date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                  </div>
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="readyDate">确 定</el-button>
                  </span>
                </el-dialog>
                <!-- 选择日历对话框结束 -->
              </ul>
            </div>
            <div id="myChart"></div>
            <!--<canvas id="myChart" width="320" height="150" style="margin-top: 30px;margin-bottom: 40px;"></canvas>-->
          </div>
        </ibox>
      </el-aside>
      <!-- 右边 -->
      <el-aside width="34%" class="rightBoxs">
        <!--上下班时间-->
        <el-row>
          <el-col :span="24">
              <ibox title="上下班时间">
                <!--这里的点击事件需要做处理，选完之后重新渲染-->
                <span class="breaktime" @click="settingTimeFlag = true">点击设置上下班时间</span>
                <div class="showcards">
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                  <div class="item-box">
                    <h6>水泥加工区</h6>
                    <h6>09:00--18:00</h6>
                  </div>
                </div>
              </ibox>
          </el-col>
        </el-row>
        <!--滞留情况统计-->
        <el-row  style="margin-top: 30px;">
          <el-col :span="24">
              <ibox title="滞留情况统计">
                <span class="breaktime" @click="checkPersonState = true">点击查看滞留人员情况</span>
                <div class="stateboxs">
                  <div class="state-box">
                    <div>滞留总时长</div>
                    <h3>23.23h</h3>
                  </div>
                  <div class="state-box">
                    <div>滞留人数最多时间段</div>
                    <h3>09:00--18:00</h3>
                  </div>
                  <div class="state-box">
                    <div>人员滞留最高时长</div>
                    <h3>4.3h</h3>
                  </div>
                  <div class="state-box">
                    <div>滞留最高时长人员</div>
                    <h3>张三</h3>
                  </div>
                </div>
              </ibox>
          </el-col>
        </el-row>
      </el-aside>
      <!--设置上下班时间弹框-->
      <el-dialog
        title="提示"
        :modal-append-to-body= false
        :visible.sync="settingTimeFlag"
        width="40%">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          style="margin-left: 20%"
        >
          <el-form-item label="区域选择:">
            <el-select v-model="form.region" placeholder="请选择活动区域" style="width: 60%">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上班时间:">
            <el-time-picker
              placeholder="选择日期"
              v-model="form.date1"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              format="HH:mm"
              style="width: 60%;"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="下班时间:">
            <el-time-picker
              placeholder="选择日期"
              v-model="form.date2"
              :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
              }"
              format="HH:mm"
              style="width: 60%;">
            </el-time-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="settingTimeFlag = false">取 消</el-button>
          <el-button type="primary" @click="settingTimeFlag = false">确 定</el-button>
        </span>
      </el-dialog>
      <!--点击查看滞留情况-->
      <el-dialog
        title="滞留情况"
        :modal-append-to-body= false
        :visible.sync="checkPersonState"
        width="70%"
        style="margin-top: -50px">
        <situation-show></situation-show>
      </el-dialog>
    </el-container>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import situationShow from './strandedComponents/situation.vue'
  import theme from '@/style/theme/walden.json'
  // 引入 ECharts 主模块
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图
  require('echarts/lib/chart/bar')
  // 引入提示框和标题组件
  require('echarts/lib/component/title')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legendScroll')
  echarts.registerTheme('walden', theme)
  export default {
    components: {ibox, situationShow},
    mounted () {
      console.log(this.option)
      let myChart = echarts.init(document.getElementById('myChart'), 'walden')
      myChart.setOption(this.option, true)
    },
    data () {
      return {
        chartObj: '',
        chooseDate: '',
        datelist: ['今日', '近一周', '近一月', '近一季度'],
        option: {
          title: {
            subtext: '（人）'
          },
          legend: {
            data: ['滞留情况']
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['19:00-20:00', '20:00-21:00', '21:00-23:00', '23:00-06:00', '06:00-07:00', '07:00-08:00']
          },
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '滞留情况',
              type: 'bar',
              data: ['50', '43', '34', '22', '16', '32']
            }
          ]
        },
        showindex: 0,   // tab选项卡用
        myChart1: '',  // 获取的charts对象
        settingTimeFlag: false,
        checkPersonState: false,
        dataDia: false,
        date: '',
        // 弹框表单数据
        form: {
          date1: '',
          date2: '',
          region: ''
        }
      }
    },
    methods: {
      // 选择日期
      chooseList (item, index) {
        this.showindex = index
        this.data1Y = ['50', '43', '24', '29', '10', '32']
        // console.log(this.myChart1)
        this.myChart1.data.datasets[0].data = this.data1Y
        this.myChart1.update()
        console.log(item + ',' + index)
      },
      // 选择日历点击事件
      showDate () {
        this.showindex = 4
        this.dataDia = true
      },
      // 日历选择后的确定按钮
      readyDate () {
        this.dataDia = false
        console.log(this.date)
      }
    }
  }
</script>
<style scoped>
  #myChart {
    width: auto;
    height: 500px;
  }
  .el-aside{background: none}
  /* 右边滞留情况统计 */
  .stateboxs{
    text-align: center;
    width: 100%;
    height:220px;
  }

.state-box{
  width: 45%;
  border:1px solid #ddd;
  float: left;
}
  .state-box div{
    margin-top: 25px;
    font-size: 14px;
  }
  /* 右边上下班时间 */
  .showcards{
    width: 100%;
    height: 120px;
    overflow: auto;
  }
  .item-box{
    display: inline-block;
    margin: 2px;
    width: 95px;
    height:95px;
    border: 1px solid #ddd;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
  }
  /* 左边报表样式 */
.rightBoxs{
  float: right;
  margin-left: 30px;
}
.charts-box{
  width: 100%;
  /*高度需要自适应*/
  height:auto;
  border:1px solid #ddd;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
}
.charts-box ul{
  text-align: center;
}
.charts-box ul li.click_focus{
  border-bottom: none;
  color: #3B8CFF;
}
.charts-box ul li, .date{
  float: left;
  border-right:1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  width: 14%;
  cursor: pointer;
  color: #A6A6A6;
  font-weight: bold;
  font-size:14px;
}
.charts-box ul li.timechoose {
  width: auto;
  text-align: right;
  padding-top: 2px;
  padding-right: 10px;
  border-bottom: 1px solid #ddd;
}
  .breaktime{
    color: #1D84C6;
    display: inline-block;
    font-size: 14px;
    position: absolute;
    right:5px;
    top:12px;
    cursor: pointer;
  }

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
