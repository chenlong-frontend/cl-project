<template>
  <div class="tp_error_page">
    <img src="../../../assets/img/error/error.png">
    <div class="show_msg">对不起，您访问的页面不在当前目录下~</div>
    <el-button
      type="primary"
      style="margin-left:70%;margin-top: 3%;"
      @click="goBack"
    >点击跳转至上页面</el-button>
  </div>
</template>
<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-2)
    }
  }
}
</script>
<style scoped>
.tp_error_page img{
  width: 20%;
  margin-left: 10%;
  margin-top: 4%;
}
.tp_error_page div{
  position: relative;
  left: 45%;
  margin-top: -25%;
  font-size: 26px;
  color: #409EFF;
}
</style>
