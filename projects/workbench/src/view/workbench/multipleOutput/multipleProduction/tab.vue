<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <el-form label-width="130px" size="mini" :model="allData.info" :rules="rules" ref="allData.info">
          <el-form-item label="填报单位:">
            <el-input v-model="allData.info.company" style="width:300px" ></el-input>
          </el-form-item>
          <el-form-item label="项目名称:" >
            <el-input v-model="allData.info.pro_name" style="width:300px" ></el-input>
          </el-form-item>
        <el-form-item label="项目所在地:">
          <el-input v-model="allData.info.pro_address" style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="建设单位:" >
          <el-input v-model="allData.info.build_co" style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="建设总面积:" prop="build_acreage">
          <el-input v-model="allData.info.build_acreage" style="width:150px" ></el-input>m²
        </el-form-item>

        <div class="box">
          <div class="left">
            <el-form-item label="工程总价(合同价):" prop="contract_price">
              <el-input v-model="allData.info.contract_price" style="width:150px" ></el-input>万元
            </el-form-item>
            <el-form-item label="开工日期:" >
              <el-date-picker
                v-model= "allData.info.start_time"
                type="date"
                placeholder="选择日期"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:150px">
              </el-date-picker>
            </el-form-item>
          </div>

          <div class="right">
            <el-form-item label="工程总价(结算价):" prop="settlement_price">
              <el-input v-model="allData.info.settlement_price" style="width:150px" ></el-input>万元
            </el-form-item>
            <el-form-item label="竣工日期:" >
              <el-date-picker
                v-model= "allData.info.end_time"
                type="date"
                placeholder="选择日期"
                :editable="false"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:150px">
              </el-date-picker>
            </el-form-item>
          </div>

        </div>

      </el-form>

    </el-tab-pane>

    <el-tab-pane label="详情">
      <el-form label-width="130px" size="mini" style="height: 352px; overflow-y: scroll;">

        <div v-for="(item, index) in allData.detail">
          <div class="title">{{titles[index]}}</div>
          <div class="box">
            <div class="left">
              <el-form-item label="本月施工面积(m²):">
                <el-input style="width:150px" v-model.number="item.mon_acreage" type="number"></el-input>
              </el-form-item>
              <el-form-item label="累计产量:" >
                <el-input style="width:150px" v-model.number="item.acc_out_value" type="number"></el-input>
              </el-form-item>
              <el-form-item label="累计收入:" >
                <el-input style="width:150px"  v-model.number="item.acc_income" type="number"></el-input>
              </el-form-item>
              <el-form-item label="累计支出:" >
                <el-input style="width:150px" v-model.number="item.acc_payment" type="number"></el-input>
              </el-form-item>
            </div>

            <div class="right">
              <el-form-item label="本月施工产值:">
                <el-input style="width:150px" v-model.number="item.mon_cons_out_value" type="number"></el-input>
              </el-form-item>
              <el-form-item label="本月工程款收入:" >
                <el-input style="width:150px" v-model.number="item.mon_pro_income" type="number"></el-input>
              </el-form-item>
              <el-form-item label="本月工程款支出:" >
                <el-input style="width:150px" v-model.number="item.mon_payment" type="number"></el-input>
              </el-form-item>
            </div>
          </div>

        </div>



      </el-form>


    </el-tab-pane>

  </el-tabs>

</template>

<script>
  export default {
    props: ['tableData', 'datas'],
    created () {
      this.getForm()
    },
    data () {
      return {
        rules: {
          build_acreage: [
            { validator: this.regExp('number'), trigger: 'blur' }
          ],
          contract_price: [
            { validator: this.regExp('number'), trigger: 'blur' }
          ],
          settlement_price: [
            { validator: this.regExp('number'), trigger: 'blur' }
          ]
        },
        titles: ['总包', '自营', '土建', '结构', '外装', '内装', '机电', '智能', '外围', '劳务', '设备材料'],
        allData: {
          info: {
            id: '',
            company: '',
            pro_name: '',
            pro_address: '',
            build_co: '',
            build_acreage: '',
            contract_price: '',
            settlement_price: '',
            start_time: '',
            end_time: ''
          },
          detail: [
            {detail_id: '', type: '0', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '1', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '2', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '3', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '4', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '5', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '6', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '7', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '8', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '9', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '10', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
          ],
          isModify: false
        }
      }
    },
    methods: {
      submitData () {
        return this.allData
      },
      getForm () {
        if (this.tableData[0].detail_id) {
          for (let o in this.allData.info) {
            this.allData.info[o] = this.tableData[0][o]
          }
          this.allData.detail = this.datas
          this.allData.isModify = true
        } else {
          this.allData.isModify = false
          this.allData.info = {
            id: '',
            company: '',
            pro_name: '',
            pro_address: '',
            build_co: '',
            build_acreage: '',
            contract_price: '',
            settlement_price: '',
            start_time: '',
            end_time: ''
          }
          this.allData.detail = [
            {detail_id: '', type: '0', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '1', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '2', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '3', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '4', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '5', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '6', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '7', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '8', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '9', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''},
            {detail_id: '', type: '10', mon_acreage: '', mon_cons_out_value: '', acc_out_value: '', mon_pro_income: '', acc_income: '', mon_payment: '', acc_payment: ''}
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .box{display: flex;}
  .left{width: 50%}
  .right{width: 50%}
  table{border-collapse: collapse;border: 2px solid #000000;width: 100%;}
  table td{text-align: center;padding: 5px 0;border: 1px solid #000000;font-size: 14px;}
  .title{font-size: 18px;line-height: 30px;}

</style>
