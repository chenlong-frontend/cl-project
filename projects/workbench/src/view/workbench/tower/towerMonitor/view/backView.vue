<template>
  <div class="backView">
        <div class="row">
            <span class="backView-left">开始时间：</span>
            <el-input v-model="beginTime" class="name" size='small'></el-input>
        </div>
        <div class="row">
            <span class="backView-left">回放时长：</span>
            <el-button  class="backBtn" size='small'>5分钟</el-button>
            <el-button  class="backBtn" size='small'>10分钟</el-button>
            <el-button  class="backBtn" size='small'>30分钟</el-button>
        </div>
  </div>
</template>
<script>
export default {
  name: 'backView',
  data () {
    return {
      beginTime: ''
    }
  }
}
</script>
<style scoped>
.backView{
    width:100%;
    margin: 0 auto;
}
.backView .row{
    height: 40px;
    line-height: 40px;
    margin-bottom:10px;
}
.backView .row .name{
    width:270px;
}
.backView .row .backBtn{
    text-align: center;
    width:80px;
}
</style>


