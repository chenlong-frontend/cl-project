<template>
  <!--公共样式框-->
  <div class="ibox">
    <div class="ibox-title">
      <span>{{title}}</span>
      <i v-show="subtitle" class="fa fa-angle-right"></i>
      <span class="active">{{subtitle}}</span>
    </div>
    <div class="ibox-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    // 参数分别为一级标题，二级标题
    props: ['title', 'subtitle']
  }
</script>

<style lang="scss" scoped type="text/scss">
</style>
