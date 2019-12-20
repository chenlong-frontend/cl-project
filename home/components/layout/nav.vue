<template>
  <nav>
    <div class="nav-pc">
      <img src="~/assets/logo.png" />
      <ul class="nav-ul">
        <li v-for="(item, index) in nav" :key="index">
          <a :href="item.url" :class="{'nav-ul-active': index === active}">{{item.text}}</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    active: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      nav: [
        { text: "首页", url: "/" },
        { text: "学习历程", url: "/translate" },
        { text: "项目收集", url: "/translate/datefns" }
      ]
    };
  }
};
</script>

<style scoped>
nav {
  position: fixed;
  width: 100%;
  border-bottom: 1px solid #ededed;
  top: 0;
  background-color: #ffffff;
  z-index: 99;
}
.nav-mobile > span {
  font-size: 1.2rem;
  padding: 17px 25px;
  color: #d9dde1;
  cursor: pointer;
}
.nav-pc > img {
  height: 55px;
  position: absolute;
  top: 2px;
  left: 20px;
}
.nav-ul {
  width: 500px;
  list-style: none;
  margin: 0;
  overflow: hidden;
}
.nav-ul > li {
  float: left;
  font-size: 0.7rem;
  text-align: center;
  cursor: pointer;
}
.nav-ul > li:first-child {
  margin-left: 100px;
}
.nav-ul > li {
  font-weight: 400;
  height: 64px;
}
.nav-ul > li > a {
  vertical-align: -22px;
  padding: 27px 20px;
  color: #9aa6af;
}
.nav-ul > li > .nav-ul-active {
  background-color: #24aad0;
  color: #ffffff;
}
.nav-ul > li > a:hover {
  background-color: #92d5e8;
  color: #ffffff;
}
</style>
