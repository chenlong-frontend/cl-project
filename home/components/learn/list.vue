<template>
  <div>
    <div class="list" v-for="item in data" :key="item.time">
      <div class="time">{{item.time}}</div>
      <div class="item" v-for="(child,index) in item.children" :key="index">
        <div class="imgs">
          <div class="img-box" v-for="img in child.imgs" :key="img">
            <img :src="`/img/learn/${img}`" />
          </div>
        </div>
        <div class="text">
          <p v-if="child.text">{{child.text}}</p>
          <pre v-if="child.code">{{child.code}}</pre>
          <div v-for="(a,aIndex) in child.link" :key="aIndex">
            <a target="_blank" :href="a.link">{{a.label}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.time {
  padding: 10px;
  font-size: 16px;
  color: #6d6d6d;
}
.item {
  padding: 10px;
  background: #ffffff;
  margin-bottom: 15px;
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
}
.text {
  font-size: 14px;
}
</style>
