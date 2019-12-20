<template>
  <div class="jinm-weight">
    <ibox title="地磅监控">
      <div>地磅名称 :</div>
      <div class="monitorBox">
        <div class="monitor1">
          <!--<div class="title1" @click="img">实时地磅称重:</div>-->

          <div class="weight">
            <div class="detailInfo"><span>地磅称重:</span><span><el-input type="text" v-model="test.weight" size="large" style="width: 120px;"></el-input></span><span>吨</span></div>
            <div class="detailInfo"><span>地磅编号:</span><span><el-input type="text" v-model="test.id" style="width: 120px;"></el-input></span></div>
          </div>
        </div>
        <div class="monitor2">
          <div class="button" @click="receive">
            <div class="img">
              <img src="../../../assets/img/importRecord/receive.png" alt="">
            </div>
            <div class="imgTitle">收料</div>
          </div>
          <div class="button" @click="send">
            <div class="img">
              <img src="../../../assets/img/importRecord/send.png" alt="">
            </div>
            <div class="imgTitle">发料</div>
          </div>
        </div>

        <div class="monitor3">
          <div class="title2">车辆识别信息:</div>
          <div class="recognition">
            <div class="detailInfo"><span>车牌号:</span><span><el-input type="text" v-model="test.carNum" style="width: 120px;" @change="sendCarNum"></el-input></span></div>
            <div class="detailInfo"><span>车辆自重:</span><span>{{carInfos.car.car_weight}}</span></div>
            <div class="detailInfo"><span>车辆型号:</span><span>{{carInfos.car.car_brand}}</span></div>
            <div class="detailInfo"><span>负责人:</span><span>{{carInfos.car.contact_name}}</span></div>
            <div class="detailInfo"><span>联系方式:</span><span>{{carInfos.car.contact_phone}}</span></div>
            <div class="detailInfo"><span>所属公司:</span><span>{{carInfos.car.belong_to}}</span></div>
          </div>
        </div>
        <div class="monitor4">
          <div class="title3">实时视屏监控:</div>
          <div class="videoMontor">
            <el-carousel :interval="4000" indicator-position="none">
              <el-carousel-item v-for="item in carInfos.pic_list" :key="item.camera_id">
                <div class="imgBox">
                  <img :src="item.thumbnail" alt="">
                  <div class="imgTitle">{{item.camera_name}}</div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>

        <el-dialog :visible.sync="receiveDialog"
                   :append-to-body= "true"
                   width="1000px" height="610px">
          <!--<receive :title="title" :material='material' :carInfos="carInfos" :test="test" :action="action" @change="callback"></receive>-->
          <div class="bigBox">
            <div class="boxTitle">{{title[0]}}</div>
            <div class="leftBox">
              <div class="smallBox1">
                <div><span>{{title[1]}} </span><span><el-input type="text" v-model="target_weight" size="small" style="width: 120px;"></el-input>吨</span></div>
                <div><span>{{title[2]}}</span><span><el-input type="text" v-model="actual_weight" size="small" style="width: 120px;"></el-input></span></div>
              </div>
              <div class="smallBox2">
                <div><span>{{title[3]}}</span><span><el-input type="text" v-model="whole_weight" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>车辆净重:</span><span><el-input type="text" v-model="car_weight" size="small" style="width: 120px;"></el-input></span></div>
              </div>
              <div class="smallBox3">
                <div><span>进场地磅:</span><span><el-input type="text" v-model="in_name" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>进场时间:</span><span><el-input type="text" v-model="inTime" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>出场地磅:</span><span><el-input type="text" v-model="out_name" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>出场时间:</span><span><el-input type="text" v-model="outTime" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>负责人:</span><span><el-input type="text" v-model="carInfos.loado.loado_linkman" size="small" style="width: 120px;"></el-input></span></div>
                <div><span>签收人:</span><span><el-input v-model="signName" style="width:120px;" size="small" @click.native="choosePerson = true" readonly  placeholder="点击选择人员"></el-input></span></div>
              </div>
            </div>

            <div class="rightBox">
              <div class="typeTitle">收料种类:</div>
              <div class="typeBox">
                <div v-for="(item, index) in material" :class="{type: isType, active: colorIndex === index}" @click="typeClick(index)">{{item.material_name}}</div>
              </div>

              <div class="otherType">
                <el-input
                  type="textarea"
                  :row="3"
                  placeholder="填写收料备注"
                  v-model="textarea">
                </el-input>
              </div>
            </div>
          </div>

          <div class="button2">
            <el-button type="primary" @click="resetForm()">取消</el-button>
            <el-button @click="submitForm()">提交 </el-button>
          </div>

          <el-dialog
            :visible.sync="choosePerson"
            width="860px"
            :append-to-body="true">
            <add-person ref="clear"></add-person>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
          </el-dialog>

        </el-dialog>

      </div>
    </ibox>

  </div>

</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/importRecord/monitor.js'
  import receive from '@/view/workbench/importRecord/monitor/receiveMaterial.vue'
  import addPerson from '@/view/workbench/components/addPerson.vue'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import Vue from 'vue'
  window.weightData = {weight: '', carNum: '', id: '', time: '', count: 0}
  window.carInfos = []
  window.weightManageFn = function (a, b, c, d) {
    window.weightData.weight = a
    window.weightData.carNum = b
    window.weightData.id = c
    window.weightData.time = d
  }
  window.weightManageFn = function (a, b, c, d) {
    var count = window.weightData.count + 1
    console.log(count, '************************************')
    console.log(window.weightData.count, window.weightData)
    Vue.set(window.weightData, 'weight', a)
    Vue.set(window.weightData, 'carNum', b)
    Vue.set(window.weightData, 'id', c)
    Vue.set(window.weightData, 'time', d)
    Vue.set(window.weightData, 'count', count)
  }
  export default {
    components: { ibox, receive, addPerson, newitem },
    created () {
//      request.getCarInfo().then(value => {
//        this.items = value[0]
//      })
//      this.getInit()
    },
    computed: {
    },
    watch: {
      'test.count': function () {
        if (this.test.count !== 0) {
          this.getLoadoData()
        } else {
          this.carInfos.pic_list = [{}]
        }
      }
    },
    data () {
      return {
        kind: false,
        items: [],
        title: [], // *******收料出料的小标题******
        receiveDialog: false, // 收料单页面
        start_time: '',
        endTime: '',
        weight: '',
        id: '',
        carNum: '',
        time: '',
        test: window.weightData,
        count: '',
        action: '', // ***判断收料还是发料****
        carInfos: {
          car: {
            car_brand: '', // **********车辆型号
            contact_name: '', // ******负责人********
            contact_phone: '', // *******联系方式**********
            belong_to: '', // ***********所属公司*******
            car_weight: ''
          },
          loado: {
            loado_name: '', // ***********地磅名称**********
            loado_ip: '',
            loado_port: '',
            loado_linkman: '', // ********操作员**********
            loadometer_id: '',
            loado_model: '',
            loado_position: '',
            loado_num: '',
            loado_function: '',
            loado_linkman_id: ''
          },
          pic_list: [{}],
//          pic_list: [{thumbnail: '', original: '', camera_id: '', camera_name: ''},
//                      {thumbnail: '', original: '', camera_id: '', camera_name: ''},
//                      {thumbnail: '', original: '', camera_id: '', camera_name: ''}],
          last_record: {
            actual_weight: '',
            name: '',
            target_weight: '',
            whole_weight: '',
            time: '',
            car_weight: ''
          }
        },
        material: [], // *******首发料的种类
        // ****
        textarea: '',
        isActive: false,
        colorIndex: -1,
        isType: true,
        inTime: '',
        outTime: '',
        actual_weight: '', // 应收重量
        target_weight: '', // 实收重量
        whole_weight: '', // 毛重
        car_weight: '', // 车重
        in_name: '', // 进场地磅名称
        out_name: '', // 出场地磅名称
        choosePerson: false,
        fuzeName: '', // ***负责人****
        signName: '', // 签收人
        sign_name: '', // 签收人id
        material_num: '', // 材料id
        material_name: '' // 材料名称
      }
    },
    methods: {
      sendCarNum () {
        if (this.test.id === '') {
          const h = this.$createElement
          this.$notify({
            title: '提示',
            message: h('i', {style: 'color: teal'}, '请先填写地磅编号')
          })
          this.test.carNum = ''
        } else {
          this.getLoadoData()
          this.kind = true
        }
      },
      // ********************收料*******************
      receive () {
        this.receiveDialog = true
        this.action = 'in'
        this.title = ['收料信息:', '应收重量:', '实收重量:', '收料毛重:']
        if (this.test.count > 0 || this.kind) {
          request.dealMaterial('in').then(value => {
            this.material = value.material
          })
        }
        this.getInit()
      },
      // ******************发料****************
      send () {
        this.action = 'out'
        this.receiveDialog = true
        this.title = ['发料信息:', '应发重量:', '实发重量:', '发料毛重:']
        if (this.test.count > 0 || this.kind) {
          request.dealMaterial('out').then(value => {
            this.material = value.material
          })
        }
        this.getInit()
      },
      img () {
        window.weightManageFn('1', '2', '3', '4')
        alert(this.test.count)
      },
//      callback () {
//        this.receiveDialog = false
//      },
      // **************
      // *************点击种类***************
      typeClick (val) {
        console.log(typeof val)
        this.colorIndex = val
        this.textarea = this.material[val].memo
        this.material_num = this.material[val].material_num
        this.material_name = this.material[val].material_name
      },
      getLoadoData () {
        request.getCarInfo({'carNum': this.test.carNum, 'id': this.test.id}).then(value => {
          if (value.car[0]) {
            this.carInfos.car = value.car[0]
            this.carInfos.loado = value.loado[0]
            if (!value.pic_list) {
              this.carInfos.pic_list[0].thumbnail = ''
              this.carInfos.pic_list[0].original = ''
              this.carInfos.pic_list[0].camera_id = ''
              this.carInfos.pic_list[0].camera_name = ''
            } else {
              this.carInfos.pic_list = value.pic_list
            }
            console.log(this.carInfos.last_record)
          }
          if (!value.car[0] && !value.last_record[0]) {
            this.carInfos.car.car_model = ''
            this.carInfos.car.contact_name = ''
            this.carInfos.car.pro_id = ''
            this.carInfos.car.contact_phone = ''
            this.carInfos.car.car_number = ''
            this.carInfos.car.car_brand = ''
            this.carInfos.car.belong_to = ''
            this.carInfos.car.momo = ''
            this.carInfos.car.id = ''
            this.carInfos.car.tag = ''
            this.carInfos.car.car_weight = ''
            this.carInfos.last_record.actual_weight = ''
            this.carInfos.last_record.name = ''
            this.carInfos.last_record.target_weight = ''
            this.carInfos.last_record.whole_weight = ''
            this.carInfos.last_record.car_weight = ''
            this.carInfos.loado = value.loado[0]
            if (!value.pic_list) {
              this.carInfos.pic_list[0].thumbnail = ''
              this.carInfos.pic_list[0].original = ''
              this.carInfos.pic_list[0].camera_id = ''
              this.carInfos.pic_list[0].camera_name = ''
            } else {
              this.carInfos.pic_list = value.pic_list
            }
          }
          if (!value.car[0] && value.last_record[0]) {
            this.carInfos.car.car_model = ''
            this.carInfos.car.contact_name = ''
            this.carInfos.car.pro_id = ''
            this.carInfos.car.contact_phone = ''
            this.carInfos.car.car_number = ''
            this.carInfos.car.car_brand = ''
            this.carInfos.car.belong_to = ''
            this.carInfos.car.momo = ''
            this.carInfos.car.id = ''
            this.carInfos.car.tag = ''
            this.carInfos.loado = value.loado[0]
            this.carInfos.last_record = value.last_record[0]
            if (!value.pic_list) {
              this.carInfos.pic_list[0].thumbnail = ''
              this.carInfos.pic_list[0].original = ''
              this.carInfos.pic_list[0].camera_id = ''
              this.carInfos.pic_list[0].camera_name = ''
            } else {
              this.carInfos.pic_list = value.pic_list
            }
          }
        })
      },
      getInit () {
        if (this.carInfos.car.car_number && this.action === 'in') {
          this.target_weight = ''
          this.actual_weight = this.test.weight - this.carInfos.car.car_weight
          this.whole_weight = this.test.weight
          this.car_weight = this.carInfos.car.car_weight
          this.inTime = this.test.time
          this.outTime = ''
          this.in_name = this.carInfos.loado.loado_name
          this.out_name = ''
          this.fuzeName = this.carInfos.car.contact_name
        }
        if (this.carInfos.car.car_number && this.action === 'out') {
          this.target_weight = ''
          this.actual_weight = this.test.weight - this.carInfos.car.car_weight
          this.whole_weight = this.test.weight
          this.car_weight = this.carInfos.car.car_weight
          this.inTime = ''
          this.outTime = this.test.time
          this.in_name = ''
          this.out_name = this.carInfos.loado.loado_name
          this.fuzeName = this.carInfos.car.contact_name
        }
        if (!this.carInfos.car.car_number && !this.carInfos.last_record.time) {
          this.target_weight = ''
          this.actual_weight = ''
          this.whole_weight = this.test.weight
          this.car_weight = ''
          this.inTime = this.test.time
          this.outTime = ''
          this.in_name = this.carInfos.loado.loado_name
          this.out_name = ''
          this.fuzeName = ''
        }
        if (!this.carInfos.car.car_number && this.carInfos.last_record.time) {
          this.target_weight = ''
          this.actual_weight = this.carInfos.last_record.whole_weight - this.test.weight
          this.whole_weight = this.test.weight
          this.car_weight = this.test.weight
          this.inTime = this.carInfos.last_record.time
          this.outTime = this.test.time
          this.in_name = this.carInfos.last_record.name
          this.out_name = this.carInfos.loado.loado_name
          this.fuzeName = ''
        }
      },
      // *****************确认按钮***************
      confirm () {
        this.choosePerson = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          console.log(value)
          this.signName = value.managerName
          this.sign_name = value.managerID
        })
      },
      submitForm () {
        if (this.carInfos.car.car_number && this.action === 'in') {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.carInfos.loado.loadometer_id, loado_num: this.carInfos.loado.loado_num, 'time': this.inTime, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {
            this.receiveDialog = false
          })
        }
        if (this.carInfos.car.car_number && this.action === 'out') {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.carInfos.loado.loadometer_id, loado_num: this.carInfos.loado.loado_num, 'time': this.outTime, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {
            this.receiveDialog = false
          })
        }
        if (!this.carInfos.car.car_number && !this.carInfos.last_record.time) {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': '', 'whole_weight': this.whole_weight, 'car_weight': '', 'action': this.action, 'loadometer_id': this.carInfos.loado.loadometer_id, loado_num: this.carInfos.loado.loado_num, 'time': this.inTime, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {
            this.receiveDialog = false
          })
        }
        if (!this.carInfos.car.car_number && this.carInfos.last_record.time) {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.carInfos.loado.loadometer_id, loado_num: this.carInfos.loado.loado_num, 'time': this.outTime, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {
            this.receiveDialog = false
          })
        }
      },
      resetForm () {
        this.receiveDialog = false
        this.target_weight = ''
        this.signName = ''
        this.colorIndex = -1
        this.textarea = ''
      }
    }
  }
</script>

<style scoped>
  .monitorBox{margin-top:20px; height:550px;max-width: 1400px;}
  .monitor1, .monitor2, .monitor3, .monitor4{background: #F3F3F4;float: left;}
  .monitor1{width:36%; height: 160px;margin:0 2% 30px 1%;}
  .monitor2{width:60%; height: 160px;margin-bottom:30px;}
  .monitor3{width:36%; height: 350px;margin-right:2%;margin-left:1%;}
  .monitor4{width:60%; height:350px;}
  .monitor1 .title1{line-height: 30px;margin-left:4%;width: 80%;}
  .monitor1 .weightChange{padding-top: 5px;}
  .monitor1 .title1, .monitor1 .weightChange{display: inline-block;}
  /*.monitor1 .weight{margin:10px 4%; background: white;width:92%;height:100px;align-items: center;display: flex;display: -webkit-flex; !*在webkit内核的浏览器上使用要加前缀*! }*/
  .monitor1 .weight{margin:16px 4%; background: white;width:92%;height:130px; /*在webkit内核的浏览器上使用要加前缀*/ }
  .monitor1 .weight .dun{text-align: center;width: 100%;font-size: 28px;font-weight: bolder;}
  .monitor1 .weight div{line-height: 65px;}
  .monitor1 .weight .dun span:first-child{color: #3F51B5}
  .monitor1 .weight .dun span:nth-child(2){color: #808080}
  .monitor3 .title2{line-height: 30px;margin-left:4%;}
  .monitor3 .recognition{margin:10px 4%; background: white;width:92%;height:290px;}
  .monitor4 .title3{line-height: 30px;margin-left:4%;}
  .monitor4 .videoMontor{margin:10px 15%; background: white;width:70%;height:290px;}
  .detailInfo{line-height: 45px; margin-left: 30px;}
  .detailInfo span:first-child{display: inline-block;width:70px;text-align: right;}
  .detailInfo span:nth-child(2){display: inline-block;padding-left: 30px;}
  .monitor3  div:nth-child(1) span:nth-child(2){color:red;}
  .button{width:35%;height: 70px; border:1px solid #909ff0;background: #D1ECFF;border-radius: 5px;color:#909ff0; display: inline-block;margin-top:43px;margin-left: 70px;}
  .button .img{margin-left: 20px;height: 70px;width:110px;float:left;}
  .button .img img{padding-top: 12px;}
  .button .imgTitle{float:left;font-weight: bolder;font-size: 30px;line-height: 70px;}
  .imgBox{width:100%;height: 290px;}
  .imgBox img{width: 100%;height: 260px;}
  .imgBox .imgTitle{text-align: center;line-height: 30px;}
  /**************/
  .bigBox{width:920px;background: #EDEDED;height: 470px;margin:0 auto;}
  .boxTitle{width: 100%;line-height: 50px; font-size: 16px;color: #101010;padding-left: 20px;}
  .leftBox, .rightBox{background: #F7F7F7;float:left;height: 370px;margin-left: 22px;padding: 15px;font-size:16px;line-height:33px;color:#101010;}
  .leftBox{width:28%;}
  .rightBox{width: 58%;}
  .leftBox .smallBox1{height:80px;}
  .leftBox .smallBox2{height: 80px;}
  .leftBox .smallBox3{height: 200px;}
  .rightBox .typeTitle{margin-bottom: 10px;}
  .rightBox .typeBox{height: 250px;overflow: auto;}
  .active{background:#1D84C6;}
  .type{display: inline-block;height: 60px;margin:25px;margin-top:10px; margin-bottom:10px;border-radius:5px;border:1px solid #b3b3b3;color: #878787;font-size: 28px;text-align: center;line-height: 60px;padding-left: 20px;padding-right:20px;width:fit-content;width:-moz-fit-content;}
  .rightBox .otherType{margin-top: 20px;}
  .button2{width:20%;margin-left: 80%;margin-top:10px;}
  .smallBox1 span:first-child,.smallBox2 span:first-child,.smallBox3 span:first-child{display: inline-block;width:70px; text-align: right}
  .smallBox1 span:nth-child(2),.smallBox2 span:nth-child(2),.smallBox3 span:nth-child(2){display: inline-block; padding-left: 20px;}

</style>
