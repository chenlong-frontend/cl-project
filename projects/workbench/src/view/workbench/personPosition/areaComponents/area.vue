<template>
  <div class="tp_areaMap">
    <!--搜索框-->
    <el-select v-model="areaValue" placeholder="请选择" size="small"
               style="margin-left: 65%;width: 20%" @change="changeArea">
      <el-option
        v-for="item in areaPptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!--查看人员-->
    <el-button type="primary" size="small" @click="showFindperson">查看人员</el-button>
    <!--下面的热区图-->
    <div class="map_style">
      <img :src="mapimg">
      <!--<person-point-->
        <!--:msg="personPoint"-->
      <!--&gt;</person-point>-->
      <person-point
        v-for="(item, index) in personPoint"
        :item="item"
        :key="index"
      ></person-point>
    </div>
    <!--查看人员-->
    <el-dialog
      title="区域人员列表"
      :visible.sync="flag.findperson"
      width="60%"
      :modal-append-to-body= false
      style="margin-top: -50px;"
    >
      <!--这里需要传入select下拉框改变的值-->
      <find-person></find-person>
    </el-dialog>
  </div>
</template>
<script>
  import findPerson from './findPerson.vue'
  import personPoint from './personPoint.vue'
  export default {
    components: {personPoint, findPerson},
    data () {
      return {
        flag: {
          findperson: false
        },
        areaPptions: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }],
        areaValue: '',
        mapimg: require('../../../../../static/personPosition/map.png'),
        personPoint: [
          {
            left: 30,  // x
            bottom: 120, // y
            msg: {
              id: 1244,
              name: '张三',
              imgsrc: require('../../../../../static/personPosition/map.png'),
              dep: '中江国际/施工部',
              work_type: '水泥加工工检'
            }
          },
          {
            left: 490,
            bottom: 80,
            msg: {
              id: 1245,
              name: '张五',
              imgsrc: require('../../../../../static/personPosition/map.png'),
              dep: '中江国际/施工部',
              work_type: '水泥加工工检'
            }
          },
          {
            left: 250,
            bottom: 310,
            msg: {
              id: 1245,
              name: '张五',
              imgsrc: require('../../../../../static/personPosition/map.png'),
              dep: '中江国际/施工部',
              work_type: '水泥加工工检'
            }
          },
          {
            left: 600,
            bottom: 100,
            msg: {
              id: 1245,
              name: '张五',
              imgsrc: require('../../../../../static/personPosition/map.png'),
              dep: '中江国际/施工部',
              work_type: '水泥加工工检'
            }
          }
        ]
      }
    },
    methods: {
      // 下拉框改变事件
      changeArea (item) {
        console.log(item)
      },
      showFindperson () {
        this.flag.findperson = true
      }
    }
  }
</script>
<style scoped>
.map_style{
  width: 100%;
  height:auto;
  margin-top: 20px;
  position: relative;
}
  .map_style img {
    width: 100%;
    height:100%;
  }

</style >
