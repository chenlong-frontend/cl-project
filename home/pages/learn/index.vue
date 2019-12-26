<template>
  <div>
    <!--********头部导航********-->
    <nav-com :active="1"></nav-com>
    <div class="container">
      <BackTop></BackTop>
      <Scroll :height="height" :on-reach-bottom="handleReachBottom" :distance-to-edge="0">
        <div class="content">
          <list-com :data="listData"></list-com>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navCom from "~/components/layout/nav.vue";
import listCom from "~/components/learn/list.vue";
import data from "~/assets/data/learn";

export default {
  components: { navCom, listCom },
  mounted() {
    this.height = document.documentElement.clientHeight - 66;
  },
  data() {
    return {
      height: "600",
      size: 20,
      page: 0
    };
  },
  computed: {
    listData() {
      return data.slice(0, (this.page + 1) * this.size);
    }
  },
  methods: {
    handleReachBottom() {
      if (this.page * this.size > data.length - 1) {
        this.$Message.warning("没有数据了");
        return null;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.page++;
          resolve();
        }, 750);
      });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 65px;
  height: 100vh;
  overflow: hidden;
}
.content {
  width: 768px;
  margin: 0 auto;
  padding: 25px;
}
</style>
