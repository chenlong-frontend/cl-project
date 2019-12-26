<template>
  <div>
    <div class="list" v-for="item in data" :key="item.time">
      <div class="time">{{ item.time }}</div>
      <div class="item" v-for="(child, index) in item.children" :key="index">
        <div class="imgs">
          <div class="img-box" v-for="img in child.imgs" :key="img">
            <img :src="`/img/learn/${img}`" @click="onImg(child.imgs)" />
          </div>
        </div>
        <div class="text">
          <p v-if="child.text">{{ child.text }}</p>
          <pre v-if="child.code">{{ child.code }}</pre>
          <div v-for="(a, aIndex) in child.link" :key="aIndex">
            <a target="_blank" :href="a.link">{{ a.label }}</a>
          </div>
        </div>
      </div>
    </div>
    <viewer :images="images" @inited="inited" ref="viewer">
      <img v-for="src in images" :src="src" :key="src" />
    </viewer>
  </div>
</template>
<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
  props: ["data"],
  data() {
    return {
      images: []
    };
  },
  methods: {
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    },
    onImg(imgs) {
      this.images = imgs.map(v => `/img/learn/${v}`);
      this.$nextTick(() => {
        this.show();
      });
    }
  }
};
</script>

<style scoped>
.time {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #6d6d6d;
}
.item {
  padding: 10px;
  background: #ffffff;
  margin-bottom: 15px;
  border: 1px solid #dcdee2;
}
.img-box {
  display: inline-block;
  width: 150px;
  height: 100px;
  border-radius: 3px;
  margin-right: 10px;
  overflow: hidden;
  background: #f4f5f6;
}
.imgs img {
  width: 100%;
  height: auto;
  margin-bottom: 10px;
  cursor: pointer;
}
.text {
  font-size: 16px;
  margin: 5px 0;
}
</style>
