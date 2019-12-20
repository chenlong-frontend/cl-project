<template>
  <table>
    <caption>建筑工程项目创优工作进展情况报表({{time}})</caption>
    <tbody>
      <tr>
        <td class="title"><strong>创优单位</strong></td>
        <td colspan="4">{{formData.info.company}}</td>
      </tr>
      <tr>
        <td class="title"><strong>创优项目名称</strong></td>
        <td colspan="4">{{formData.info.project}}</td>
      </tr>
      <tr>
        <td class="title"><strong>创优目标</strong></td>
        <td colspan="4">{{formData.info.target}}</td>
      </tr>
      <tr>
        <td class="title"><strong>合同额(万元)</strong></td>
        <td>{{formData.info.contract}}</td>
        <td class="title" colspan="2"><strong>体量(平方米)</strong></td>
        <td>{{formData.info.amount}}</td>
      </tr>
      <tr>
        <td class="title"><strong>开工日期</strong></td>
        <td>{{formData.info.start_time}}</td>
        <td class="title" colspan="2"><strong>竣工日期</strong></td>
        <td>{{formData.info.end_time}}</td>
      </tr>
      <tr>
        <td class="title"><strong>创优负责人</strong></td>
        <td>{{formData.info.charge}}</td>
        <td class="title" colspan="2"><strong>手机</strong></td>
        <td>{{formData.info.mobile}}</td>
      </tr>
      <tr>
        <td class="title"><strong>分类</strong></td>
        <td class="title"><strong>奖项/类型</strong></td>
        <td class="title"><strong>计划开始时间</strong></td>
        <td class="title"><strong>计划完成时间</strong></td>
        <td class="title"><strong>本月进展状态</strong></td>
      </tr>
      <tr v-for="(item, index) in formData.categorys[0]" v-if = "formData.categorys[0].length !== 0" >
        <td v-if="index===0" :rowspan="formData.categorys[0].length"><strong>工程质量</strong></td>
        <td>{{item.award_name}}</td>
        <td>{{item.start_time}}</td>
        <td>{{item.end_time}}</td>
        <td>{{item.desc}}</td>
      </tr>
      <tr v-if="formData.categorys[0].length === 0"><td><strong>工程质量</strong></td><td colspan="4">暂无数据</td></tr>
      <tr v-for="(item, index) in formData.categorys[1]" v-if = "formData.categorys[1].length !== 0" >
        <td v-if="index===0" :rowspan="formData.categorys[1].length"><strong>科技创新</strong></td>
        <td>{{item.award_name}}</td>
        <td>{{item.start_time}}</td>
        <td>{{item.end_time}}</td>
        <td>{{item.desc}}</td>
      </tr>
      <tr v-if="formData.categorys[1].length === 0"><td><strong>科技创新</strong></td><td colspan="4">暂无数据</td></tr>
      <tr v-for="(item, index) in formData.categorys[2]" v-if = "formData.categorys[2].length !== 0" >
        <td v-if="index===0" :rowspan="formData.categorys[2].length"><strong>标准化文明示范工地</strong></td>
        <td>{{item.award_name}}</td>
        <td>{{item.start_time}}</td>
        <td>{{item.end_time}}</td>
        <td>{{item.desc}}</td>
      </tr>
      <tr v-if="formData.categorys[2].length === 0"><td><strong>标准化文明示范工地</strong></td><td colspan="4">暂无数据</td></tr>
      <tr class="text" style="height: 150px;">
        <td><strong>说明</strong></td>
        <td colspan="4" style="text-align: left;vertical-align: top;padding: 10px;">{{formData.info.desc}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  export default {
    props: ['time', 'formData'],
    data () {
      return {
        newAdd: true
      }
    }
  }
</script>

<style scoped>
  table {border-collapse: collapse;border: 2px solid #000000;width: 100%;}
  table caption {background-color: #00AFF0;font-weight: bold;color: #ffffff;padding: 10px 0;border: 2px solid #000000;border-bottom: none;}
  table td {width: 20%;text-align: center;padding: 5px 0;border: 1px solid #000000;font-size: 14px;}
  table tr td:first-child {width: 15%;}
  table tr td:last-child {width: 25%;}
  .title {background-color: #F2F2F2;}
</style>
