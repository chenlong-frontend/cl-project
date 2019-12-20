<template>
  <ibox title="综合产值报表">
    <el-tabs type="border-card">
      <el-tab-pane label="统计">
        <static-bar :barData="barData"  @changeData="changeData" @back="back"></static-bar>
      </el-tab-pane>
      <el-tab-pane label="报表">
        <div class="box">
          <div class="left">
            <left-box :tableData="tableData"></left-box>
          </div>
          <div class="right">
            <calendar @timeChange="timeChange"></calendar>
            <div class="edit">
              <ibtn styleName="el-icon-edit" msg="修改"  @click.native="change"></ibtn>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="修改综合产值信息"
      :visible.sync="editVisible"
      width="720px">
      <tab :tableData="tableData" :datas="datas" ref="tabRef"></tab>
      <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
  </ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import staticBar from './multipleProduction/staticBar.vue'
  import leftBox from './multipleProduction/productionTable.vue'
  import calendar from '../green/green/calendar.vue'
  import ibtn from '@/components/style/ibtn.vue'
  import tab from './multipleProduction/tab.vue'
  import request from '@/api/workbench/multipleOutput/multipleProduction.js'

  export default {
    components: {ibox, staticBar, leftBox, calendar, ibtn, tab},
    created () {
      this.getInit()
    },
    data () {
      return {
        datas: [
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
        ],
        editVisible: false,
        datetime: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1 < 10 ? '0' + Number((new Date()).getMonth() + 1) : (new Date()).getMonth() + 1),
        barData: [],
        barFourData: [],
        barEightData: [],
        tableData: [
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
          {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
        ]
      }
    },
    methods: {
      submit () {
        console.log(this.$refs.tabRef.submitData())
        if (this.$refs.tabRef.submitData().isModify) {
          request.modifyForm({'info': this.$refs.tabRef.submitData().info, 'detail': this.$refs.tabRef.submitData().detail, 'create_time': this.datetime}).then(value => {
            if (value.code !== 0) {
              this.$notify.error({
                title: '错误',
                message: '提交失败'
              })
            } else {
              this.getInit()
              this.editVisible = false
            }
          })
        } else {
          request.addForm({'info': this.$refs.tabRef.submitData().info, 'detail': this.$refs.tabRef.submitData().detail, 'create_time': this.datetime}).then(value => {
            if (value.code !== 0) {
              this.$notify.error({
                title: '错误',
                message: '提交失败'
              })
            } else {
              this.getInit()
//              this.editVisible = false
            }
          })
        }
      },
      // 点击修改数据
      change () {
        this.editVisible = true
        if (this.$refs.tabRef) {
          this.$refs.tabRef.getForm()
        }
      },
      changeData () {
        console.log(this.barEightData)
        this.barData = this.barEightData
      },
      back () {
        this.barData = this.barFourData
      },
      getInit () {
        request.getBarData().then(value => {
          let arr = []
          let arr1 = []
          for (var i = 0; i < value.length; i++) {
            if (value[i].name === '总包' || value[i].name === '自营' || value[i].name === '分包' || value[i].name === '设备材料') {
              arr.push(value[i])
            } else {
              arr1.push(value[i])
            }
          }
          this.barFourData = arr
          this.barEightData = arr1
          this.barData = this.barFourData
        })
        request.getTableData(this.datetime).then(value => {
          if (value && value.length > 0) {
            this.tableData = value
            for (var i = 0; i < this.datas.length; i++) {
              for (let o in this.datas[i]) {
                this.datas[i][o] = value[i][o]
              }
            }
          } else {
            this.tableData = [
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {company: '', pro_name: '', pro_address: '', build_co: '', build_acreage: '', contract_price: '', settlement_price: '', start_time: '', end_time: '', detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
            ]
            this.datas = [
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
              {detail_id: '', type: '', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
            ]
          }
        })
      },
      timeChange ({year, month}) {
        if (Number(month) < 10) {
          month = '0' + month
        }
        this.datetime = year + '-' + month
        console.log(this.datetime)
        this.getInit()
      }
    }
  }
</script>


<style scoped>
  .box {display: flex;}
  .left {flex: auto;}
  .right {flex: 260px;padding-left: 30px;}
  .edit {margin-top: 20px;}
</style>
