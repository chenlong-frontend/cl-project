<template>
  <div class="tp_contactUs">
    <div>电话：025-123456789</div>
    <div>邮箱：12345678909@123.com</div>
    <div>传真：123456789</div>
    <el-button type="primary" @click="contactBack" style="margin-left: 80%">返回</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    contactBack () {
      this.$emit('close-contact')
    }
  }
}
</script>
<style scoped>
  .tp_contactUs div{
    margin-left: 25%;
    text-align: left;
    font-size: 18px;
    margin-bottom: 10px;
  }
</style>
