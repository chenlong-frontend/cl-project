<template>
  <!--流程图-->
  <div class="box">
    <div class="per-item">
      <span class="per-item-text start"><span class="line bottom"></span>开始</span>
    </div>
    <div v-for="(item,index) in data" class="per-item">
        <span class="per-item-text" @click="eventTransmit(child)" v-for="(child,cIndex) in item" :class="[{only:item.length === 1},{active:active === child.node_id},{'item-left':cIndex === 0},{'item-right':cIndex === (item.length-1)}]">
          <span class="line top"></span>
          <span class="line bottom"></span>
          <span class="text">{{child.node_name}}</span>
        </span>
    </div>
    <div class="per-item">
      <span class="per-item-text end"><span class="line top"></span>结束</span>
    </div>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex'
  export default {
    props: ['data'],
    data () {
      return {
        active: '1'
      }
    },
    methods: {
      ...mapMutations('process', ['changeSelect']),
      eventTransmit (val) {
        this.changeSelect(val)
        this.active = val.node_id
        this.$emit('eventListen', val)
      }
    }
  }
</script>

<style scoped>
  .box {width: 100%;background-color: #E6E6E6;}
  .per-item {text-align: center;padding: 20px 0;}
  .per-item .per-item-text {background-color: #ffffff;margin: 0 4px;white-space:nowrap;cursor: pointer;position: relative;padding: 2px 20px;color: #797979;border-radius: 3px;font-size: 14px;}
  .per-item .per-item-text:before {position: absolute;top: -15px;left: -8px;right: 0;height: 1px;content: " ";}
  .per-item .per-item-text:after {position: absolute;bottom: -13px;left: -8px;right: 0;height: 1px;content: " ";}
  .per-item .per-item-text .line{left: 50%;display: inline-block;width: 1px;position: absolute;height: 20px;}
  .per-item .per-item-text .line.top {top: -14px;height: 14px;}
  .per-item .per-item-text .line.bottom {bottom: -13px;height: 12px;}
  .per-item .per-item-text.start:before,.per-item .per-item-text.end:after,.per-item-text.only:after,.per-item-text.only:before,
  .per-item .per-item-text.start:after,.per-item .per-item-text.end:before
  {height: 0;}
  .per-item .per-item-text.item-left:before,.per-item .per-item-text.item-left:after {left: 50%;}
  .per-item .per-item-text.item-right:before,.per-item .per-item-text.item-right:after {right: 50%;}
  .per-item-text.only,.per-item .end,.per-item .start  {width: 180px;display: inline-block;height: 18px;padding-top: 4px;}
  .per-item .end,.per-item .start {background-color: #CCCCCC;color: #949494;}
  .per-item .per-item-text.start .line.bottom {bottom: -17px;height: 16px;}
  .per-item-text.active{background-color: #2681D2;color: #ffffff;}
  .per-item .per-item-text.only .line.top,.per-item .per-item-text.end .line.top {top: -23px;height: 23px;}
  .per-item .per-item-text.only .line.bottom {bottom: -24px;height: 23px}
  .per-item-text.end, .per-item-text.start {cursor: default;}
</style>










