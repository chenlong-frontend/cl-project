<template>
  <div>
    <div v-for="item in data" :key="item.time">
      <div class="time">{{item.time}}</div>
      <div class="item" v-for="(child,index) in item.children" :key="index">
        <div class="imgs">
          <div class="img-box" v-for="img in child.imgs" :key="img">
            <img :src="`img/learn/${img}`" />
          </div>
        </div>
        <div class="text">
          <p>{{child.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import data from "./data";
export default {
  data() {
    return {
      data
    };
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
