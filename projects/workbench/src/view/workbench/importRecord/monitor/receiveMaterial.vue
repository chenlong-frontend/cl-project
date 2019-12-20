<template>
  <div class="jinm-weight">
<div class="bigBox">
  <div class="boxTitle">{{title[0]}}</div>
  <div class="leftBox">
    <div class="smallBox1">
      <div><span>{{title[1]}} </span><span><el-input type="text" v-model="actual_weight" style="width: 100px; height: 30px;"></el-input>吨</span></div>
      <div><span>{{title[2]}}</span><span>{{target_weight}}</span></div>
    </div>
    <div class="smallBox2">
      <div><span>{{title[3]}}</span><span>{{whole_weight}}</span></div>
      <div><span>车辆净重:</span><span>{{car_weight}}</span></div>
    </div>
    <div class="smallBox3">
      <div><span>进场地磅:</span><span>{{in_name}}</span></div>
      <div><span>进场时间:</span><span>{{inTime}}</span></div>
      <div><span>出场地磅:</span><span>{{out_name}}</span></div>
      <div><span>出场时间:</span><span>{{outTime}}</span></div>
      <div><span>负责人:</span><span>{{carInfos.loado.loado_linkman}}</span></div>
      <div><span>签收人:</span><span><el-input v-model="signName" style="width:100px;height: 30px;" @click.native="choosePerson = true" readonly  placeholder="点击选择人员"></el-input></span></div>
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


  </div>
</template>

<script>
  import addPerson from '@/view/workbench/components/addPerson.vue'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import request from '@/api/workbench/importRecord/monitor.js'
  export default {
    components: { addPerson },
    props: ['title', 'material', 'carInfos', 'test', 'action'],
    created () {
      this.getInit()
    },
    data () {
      return {
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
    watch: {
      'this.test.time': function () {
        this.getInit()
      }
    },
    computed: {
    },
    methods: {
      resetForm () {
        this.$emit('change')
      },
      submitForm () {
        if (this.carInfos.car !== [] && this.action === 'in') {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.test.id, 'time': this.test.time, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {

          })
        }
        if (this.carInfos.car !== [] && this.action === 'out') {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.test.id, 'time': this.test.time, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {

          })
        }
        if (this.carInfos.car === [] && this.carInfos.last_record === []) {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': '', 'whole_weight': this.whole_weight, 'car_weight': '', 'action': this.action, 'loadometer_id': this.test.id, 'time': this.test.time, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {

          })
        }
        if (this.carInfos.car === [] && this.carInfos.last_record !== []) {
          request.submitData({'car_number': this.test.carNum, 'material_num': this.material_num, 'material_name': this.material_name, 'actual_weight': this.actual_weight, 'target_weight': this.target_weight, 'whole_weight': this.whole_weight, 'car_weight': this.car_weight, 'action': this.action, 'loadometer_id': this.test.id, 'time': this.test.time, 'contact_name': this.fuzeName, 'sign_name': this.sign_name, 'memo': this.textarea}).then(value => {

          })
        }
      },
      // *************点击种类***************
      typeClick (val) {
        console.log(typeof val)
        this.colorIndex = val
        this.textarea = this.material[val].memo
        this.material_num = this.material[val].material_num
        this.material_name = this.material[val].material_name
      },
      getInit () {
        if (this.carInfos.car !== [] && this.action === 'in') {
          this.actual_weight = '填写重量'
          this.target_weight = this.test.weight - this.carInfos.car.car_weight
          this.whole_weight = this.test.weight
          this.car_weight = this.carInfos.car.car_weight
          this.inTime = this.test.time
          this.outTime = ''
          this.in_name = this.carInfos.loado.loado_name
          this.out_name = ''
          this.fuzeName = this.carInfos.car.contact_name
        }
        if (this.carInfos.car !== [] && this.action === 'out') {
          this.actual_weight = '填写重量'
          this.target_weight = this.test.weight - this.carInfos.car.car_weight
          this.whole_weight = this.test.weight
          this.car_weight = this.carInfos.car.car_weight
          this.inTime = ''
          this.outTime = this.test.time
          this.in_name = ''
          this.out_name = this.carInfos.loado.loado_name
          this.fuzeName = this.carInfos.car.contact_name
        }
        if (this.carInfos.car === [] && this.carInfos.last_record === []) {
          this.actual_weight = '填写重量'
          this.target_weight = '等待出场称重'
          this.whole_weight = this.test.weight
          this.car_weight = '等待出场称重'
          this.inTime = this.test.time
          this.outTime = '等待出场称重'
          this.in_name = this.carInfos.loado.loado_name
          this.out_name = '等待出场称重'
          this.fuzeName = ''
        }
        if (this.carInfos.car === [] && this.carInfos.last_record !== []) {
          this.actual_weight = this.carInfos.last_record.actual_weight
          this.target_weight = this.carInfos.last_record.target_weight
          this.whole_weight = this.carInfos.last_record.whole_weight
          this.car_weight = this.carInfos.last_record.car_weight
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
      }
    }
  }
</script>

<style scoped>
  .bigBox{width:920px;background: #EDEDED;height: 470px;margin:0 auto;}
  .boxTitle{width: 100%;line-height: 50px; font-size: 16px;color: #101010;padding-left: 20px;}
  .leftBox, .rightBox{background: #F7F7F7;float:left;height: 370px;margin-left: 22px;padding: 15px;font-size:16px;line-height:33px;color:#101010;}
  .leftBox{width:28%;}
  .rightBox{width: 58%;}
  .leftBox .smallBox1{font-weight:bold;height:80px;}
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
