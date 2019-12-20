<template>
    <div class="viewConfigueDia">
        <div class="viewConfigue" v-for="(item, index) in viewData" :key="index">
            <div class="row">
                <span class="viewConfigue-left">监控名称：</span>
                <el-input v-model="item.name" placeholder="单行输入" class="name" size='small'></el-input>
            </div>
            <div class="row">
                <span class="viewConfigue-left">IP  地  址：</span>
                <el-input v-model="item.IP" placeholder="单行输入" class="name" size='small'></el-input>
            </div>
            <div class="row">
                <span class="viewConfigue-left">端  口  号：</span>
                <el-input v-model="item.port" placeholder="单行输入" class="name" size='small'></el-input>
            </div>
            <div class="delete" @click="deletePro(index)">
                <i class="el-icon-minus"></i><p >删除</p>
            </div>
        </div>

        <div class="addPro" @click="addHonour">
            <i class="el-icon-plus"></i> <span>添加一个新项目成果/荣誉</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'viewConfigueDia',
  data () {
    return {
      viewData: [{
        name: '',
        IP: '',
        port: ''
      }]
    }
  },
  methods: {
    addHonour () {
      this.viewData.push({'name': '', 'IP': '', 'port': ''})
      console.log(this.viewData)
    },
    deletePro (index) {
      this.viewData.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.viewConfigueDia{
    width:90%;
    height: auto;
    margin: 0 auto;
}
.viewConfigue{
    width:100%;
    display: inline-block;
    margin-top: 10px;
    background-color: #F5F5F5;
    position: relative;
}
.viewConfigue .row{
    margin-bottom: 20px;
    height:40px;
    line-height: 40px;
}
.viewConfigue .row .name{
    width:200px;
}
.viewConfigue .delete{
    width:70px;
    height:180px;
    display:inline-block;
    text-align: center;
    padding-top: 60px;
    box-sizing: border-box;
    background: #E6E6E6;
    color:#666666;
    position: absolute;
    top:0px;
    right:0px;
    cursor: pointer;
}
.addPro{
    width:100%;
    height: 40px;
    margin:0 auto;
    line-height: 40px;
    background: #F5F5F5;
    text-align: center;
    margin-top: 20px;
}
</style>


