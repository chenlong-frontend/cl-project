<template>
  <div>
    <!--********头部导航********-->
    <nav-com :active="1"></nav-com>
    <div class="container">
      <div class="content">
        <!-- <markdown-com :data="markdown"></markdown-com> -->
      </div>
    </div>
    <!--********尾部********-->
    <footer-com></footer-com>
  </div>
</template>
<script>
import axios from "axios";
import navCom from "~/components/layout/nav.vue";
import footerCom from "~/components/layout/footer.vue";
// import markdownCom from "~/components/markdown/index.vue";
export default {
  asyncData() {
    // return axios({
    //   method: 'POST',
    //   url: 'http://a331.info:3333/file/api',
    //   data: {type: 1}
    // }).then((response) => {
    //   return {markdown: response.data.data}
    // })
  },
  components: { navCom, footerCom },
  data() {
    return {};
  }
};
</script>

<style scoped>
.container {
  margin-top: 65px;
  padding: 25px 0;
}
.content {
  width: 768px;
  margin: 0 auto;
  padding: 25px;
  border-radius: 3px;
  background-color: #ffffff;
}
</style>
