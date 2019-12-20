<template>
  <div class="genertalGrap" ref="graph">
    <img :src="bgImg" ref="bgImg" alt="底部工程图" style="width:780px;height:780px" >
    <towerRound v-for="round in towerRounds"
                :roundInfo="round"
                :bgSize='bgSize'
    :key="round.id">
    </towerRound>
  </div>
</template>

<script>
  import towerRound from '@/view/workbench/tower/generalCondition/towerRound.vue'
  import request from '@/api/workbench/tower/generalCondition/generalGraph.js'
  export default {
    components: {towerRound},
    name: 'genertalGrap',
    props: [''],
    mounted () {
      console.log('gaokuang')
      console.log(this.$refs.bgImg.style.width)
      this.init()
    },
    data () {
      return {
        bgImg: require('@/assets/img/tower/bgMap.jpg'),
        // 给的工地图片给正方形，给悬臂的长度，塔吊离地图底边和左边的长度，地图的边长
        towerRounds: [{id: '', diameter: 0.1, leftPrecent: 0.1, bottomPrecent: 0.4, degs: 70, info: {Img: '', num: '', position: '', work: ''}}],
        bgSize: '780px'
      }
    },
    computed: {
    },
    methods: {
      init () {
        this.getTowerRound()
      },
      getTowerRound () {
        request.getTowerRound().then(
          data => {
            if (data.data.code === 0) {
              console.log('....')
              this.towerRounds = data.data.data.towerRounds
            } else this.$message.error('模块获取失败')
          },
          error => {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<style scoped>
.genertalGrap{
  width:100%;
  height:780px;
  /*overflow: auto;*/
  background-color: #FAFAFA;
  position: relative;
}
.genertalGrap img{
  width:600px;
  height:700px;
}
::-webkit-scrollbar {
    width: 6px;
}/* 滚动条整体宽度 */
::-webkit-scrollbar-track{
    background-color: #F3F3F4;
}/* 滚动条的滑轨背景颜色 */
::-webkit-scrollbar-thumb{
    background-color: #DAE4E5;
    border-radius: 3px;
}/* 滚动条的滑块背景颜色 */
::-webkit-scrollbar-corner {
    background-color: #B0AFB0;
} /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
