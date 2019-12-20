<template>
  <div class="item">
    <div class="title">
      {{title}}
      <slot name="head"></slot>
    </div>
    <div class="content">
      <div class="content-box">
        <slot name="content"></slot>
      </div>
    </div>
    <div class="foot">
      <slot name="foot"></slot>
      <!--<a class="bth">全选</a>-->
      <!--<div class="tool-bar">-->
        <!--<a class="fa fa-plus"></a>-->
        <!--<a class="fa fa-trash-o"></a>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  export default {
    props: ['title']
  }
</script>

<style scoped>
  .item {background-color: #F3F3F4;position: relative;border-radius: 6px;}
  .item .title {padding: 15px 20px;color: #6B6B6B;font-size: 14px;font-weight: bold;position: relative;}
  .content {padding: 0 8px;}
  .content-box::-webkit-scrollbar{width: 6px;}
  .content-box::-webkit-scrollbar-thumb{background-color: #989898;}
  .content-box {background: #FFFFFF;border-radius: 2px;overflow: auto;}
  .foot {height: 38px;position: relative;}
  .foot a.btn{display: inline-block;font-size: 14px;}
  .foot .tool-bar {position: absolute;right: 10px;top: 10px;}
  .foot .tool-bar a {cursor: pointer;font-size: 20px;display: inline-block;padding: 0 2px;color: #2E75C5;}
</style>
