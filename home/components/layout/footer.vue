<template>
  <footer>
    <img src="~/assets/logo.png" />
    <h4>个人建站</h4>
    <p>声明：个人兴趣建设的网站，无实用性</p>
    <a>首页</a>
  </footer>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style scoped>
  footer{text-align: center;background-color: #F4F5F6;padding-bottom: 50px;}
  footer > h4 {margin: 20px 0;font-size: 18px;}
  footer > p {font-size: 0.6rem;color: #7C7C7C;line-height: 25px;}
  footer > a{font-size: 0.6rem;color: #24AAD0;padding: 0 15px;}
  footer > a:not(:last-child){border-right: 1px solid #DDDDDD;}
</style>
