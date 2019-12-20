<template>
  <div>
    <!--********头部导航********-->
    <nav-com :active="2"></nav-com>
    <div class="container">
      <div class="content"></div>
    </div>
    <!--********尾部********-->
    <footer-com></footer-com>
  </div>
</template>
<script>
import axios from "axios";
import navCom from "~/components/layout/nav.vue";
import footerCom from "~/components/layout/footer.vue";
export default {
  asyncData() {},
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
