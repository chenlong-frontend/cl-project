<template>
  <div>
    <!--********头部导航********-->
    <nav-com :active="1"></nav-com>
    <div class="container">
      <div class="content">
        <list-com></list-com>
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
import listCom from "~/components/learn/list.vue";

export default {
  components: { navCom, footerCom, listCom },
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
  padding: 0 25px;
}
</style>
