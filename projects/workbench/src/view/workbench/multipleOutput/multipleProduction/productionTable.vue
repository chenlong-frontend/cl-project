<template>
  <table>
    <caption>中江集团施工生产月报表</caption>
    <tr>
      <td colspan="3" class="title">填报单位</td>
      <td colspan="9">{{tableData[0].company}}</td>
      <td colspan="3" class="title">（单位: 万元）</td>
    </tr>
    <tr>
      <td colspan="3" class="title">项目名称</td>
      <td colspan="5">{{tableData[0].pro_name}}</td>
      <td colspan="2" class="title">项目所在地</td>
      <td colspan="5">{{tableData[0].pro_address}}</td>
    </tr>
    <tr>
      <td colspan="3" class="title">建设单位</td>
      <td colspan="5">{{tableData[0].build_co}}</td>
      <td colspan="2" class="title">建设总面积(m²)</td>
      <td colspan="5">{{tableData[0].build_acreage}}</td>
    </tr>

    <tr>
      <td colspan="3" rowspan="2" class="title">工程总价</td>
      <td colspan="2" class="title">合同价</td>
      <td colspan="3">{{tableData[0].contract_price}}</td>
      <td colspan="2" class="title">开工日期</td>
      <td colspan="5">{{tableData[0].start_time}}</td>
    </tr>

    <tr>
      <td colspan="2" class="title">结算价</td>
      <td colspan="3">{{tableData[0].settlement_price}}</td>
      <td colspan="2"class="title">竣工日期</td>
      <td colspan="5">{{tableData[0].end_time}}</td>
    </tr>

    <tr>
      <td colspan="3" rowspan="3" class="title">统计内容</td>
      <td rowspan="3" class="title">总包</td>
      <td colspan="9" class="title">其中</td>
      <td colspan="2" rowspan="3" class="title">设备材料</td>
    </tr>

    <tr>
      <td rowspan="2" class="title">自营</td>
      <td colspan="8" class="title">分包</td>
    </tr>

    <tr>
      <td class="title">土建</td>
      <td class="title">结构</td>
      <td class="title">外装</td>
      <td class="title">内装</td>
      <td class="title">机电</td>
      <td class="title">智能
      <td class="title">外围</td>
      <td class="title">劳务</td>
    </tr>

    <tr>
      <td colspan="3" class="title">本月施工面积(m²)</td>
      <td>{{tableData[0].mon_acreage}}</td>
      <td>{{tableData[1].mon_acreage}}</td>
      <td>{{tableData[2].mon_acreage}}</td>
      <td>{{tableData[3].mon_acreage}}</td>
      <td>{{tableData[4].mon_acreage}}</td>
      <td>{{tableData[5].mon_acreage}}</td>
      <td>{{tableData[6].mon_acreage}}</td>
      <td>{{tableData[7].mon_acreage}}</td>
      <td>{{tableData[8].mon_acreage}}</td>
      <td>{{tableData[9].mon_acreage}}</td>
      <td colspan="2">{{tableData[10].mon_acreage}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">本月施工产值</td>
      <td>{{tableData[0].mon_cons_out_value}}</td>
      <td>{{tableData[1].mon_cons_out_value}}</td>
      <td>{{tableData[2].mon_cons_out_value}}</td>
      <td>{{tableData[3].mon_cons_out_value}}</td>
      <td>{{tableData[4].mon_cons_out_value}}</td>
      <td>{{tableData[5].mon_cons_out_value}}</td>
      <td>{{tableData[6].mon_cons_out_value}}</td>
      <td>{{tableData[7].mon_cons_out_value}}</td>
      <td>{{tableData[8].mon_cons_out_value}}</td>
      <td>{{tableData[9].mon_cons_out_value}}</td>
      <td colspan="2">{{tableData[10].mon_cons_out_value}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">累计产值</td>
      <td>{{tableData[0].acc_out_value}}</td>
      <td>{{tableData[1].acc_out_value}}</td>
      <td>{{tableData[2].acc_out_value}}</td>
      <td>{{tableData[3].acc_out_value}}</td>
      <td>{{tableData[4].acc_out_value}}</td>
      <td>{{tableData[5].acc_out_value}}</td>
      <td>{{tableData[6].acc_out_value}}</td>
      <td>{{tableData[7].acc_out_value}}</td>
      <td>{{tableData[8].acc_out_value}}</td>
      <td>{{tableData[9].acc_out_value}}</td>
      <td colspan="2">{{tableData[10].acc_out_value}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">本月工程款收入</td>
      <td>{{tableData[0].mon_pro_income}}</td>
      <td>{{tableData[1].mon_pro_income}}</td>
      <td>{{tableData[2].mon_pro_income}}</td>
      <td>{{tableData[3].mon_pro_income}}</td>
      <td>{{tableData[4].mon_pro_income}}</td>
      <td>{{tableData[5].mon_pro_income}}</td>
      <td>{{tableData[6].mon_pro_income}}</td>
      <td>{{tableData[7].mon_pro_income}}</td>
      <td>{{tableData[8].mon_pro_income}}</td>
      <td>{{tableData[9].mon_pro_income}}</td>
      <td colspan="2">{{tableData[10].mon_pro_income}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">累计收入</td>
      <td>{{tableData[0].acc_income}}</td>
      <td>{{tableData[1].acc_income}}</td>
      <td>{{tableData[2].acc_income}}</td>
      <td>{{tableData[3].acc_income}}</td>
      <td>{{tableData[4].acc_income}}</td>
      <td>{{tableData[5].acc_income}}</td>
      <td>{{tableData[6].acc_income}}</td>
      <td>{{tableData[7].acc_income}}</td>
      <td>{{tableData[8].acc_income}}</td>
      <td>{{tableData[9].acc_income}}</td>
      <td colspan="2">{{tableData[10].acc_income}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">本月工程款支出</td>
      <td>{{tableData[0].mon_payment}}</td>
      <td>{{tableData[1].mon_payment}}</td>
      <td>{{tableData[2].mon_payment}}</td>
      <td>{{tableData[3].mon_payment}}</td>
      <td>{{tableData[4].mon_payment}}</td>
      <td>{{tableData[5].mon_payment}}</td>
      <td>{{tableData[6].mon_payment}}</td>
      <td>{{tableData[7].mon_payment}}</td>
      <td>{{tableData[8].mon_payment}}</td>
      <td>{{tableData[9].mon_payment}}</td>
      <td colspan="2">{{tableData[10].mon_payment}}</td>
    </tr>

    <tr>
      <td colspan="3" class="title">累计支出</td>
      <td>{{tableData[0].acc_payment}}</td>
      <td>{{tableData[1].acc_payment}}</td>
      <td>{{tableData[2].acc_payment}}</td>
      <td>{{tableData[3].acc_payment}}</td>
      <td>{{tableData[4].acc_payment}}</td>
      <td>{{tableData[5].acc_payment}}</td>
      <td>{{tableData[6].acc_payment}}</td>
      <td>{{tableData[7].acc_payment}}</td>
      <td>{{tableData[8].acc_payment}}</td>
      <td>{{tableData[9].acc_payment}}</td>
      <td colspan="2">{{tableData[10].acc_payment}}</td>
    </tr>

  </table>
</template>

<script>
  export default {
    props: ['tableData'],
    data () {
      return {

      }
    }
  }
</script>

<style scoped>
table{border-collapse: collapse;border: 2px solid #000000;width: 100%;}
table caption {background-color: #00AFF0;font-weight: bold;color: #ffffff;padding: 10px 0;border: 2px solid #000000;border-bottom: none;}
table td {text-align: center;padding: 5px 0;border: 1px solid #000000;font-size: 14px;}
.title {background-color: #F2F2F2;}

</style>
