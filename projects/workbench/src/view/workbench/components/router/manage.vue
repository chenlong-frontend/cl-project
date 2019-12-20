<template>
  <ibox title="">
    <div class="icon-box">
      <ul>
        <li v-for="item in data">
          <a @click="checkMenu(item)" class="box">
            <i :class="item.icon"></i>
            <p>{{item.text}}</p>
          </a>
        </li>
      </ul>
    </div>
    <el-dialog append-to-body :visible.sync="navDialog" width="1100px">
      <component :is="currentView"></component>
      <span slot="footer" class="dialog-footer">
       <el-button @click="navDialog = false">取 消</el-button>
       <el-button type="primary" @click="navDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </ibox>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import routerRequest from '@/api/workbench/components/router/manage.js'
  import permission from '@/view/workbench/permission/manage.vue'
  import report from '@/view/workbench/item/report/takePhone.vue'
  import graph from '@/view/workbench/graph/person.vue'
  import { mapMutations } from 'vuex'
  export default {
    props: ['extra'],
    name: 'routerManage',
    components: {ibox, permission, report, graph},
    mounted () {
      console.log(this.extra)
      routerRequest.getIconList(this.extra).then(data => {
        console.log(data)
        this.data = data
      })
    },
    data () {
      return {
        data: [],
        navDialog: false,
        currentView: ''
      }
    },
    methods: {
      checkMenu (val) {
        console.log(val)
        this.idSet(val.id)
        this.nameSet(val.text)
        this.currentView = val.component
        this.navDialog = true
      },
      ...mapMutations('manage', ['idSet', 'nameSet'])
    },
    watch: {
      extra (val) {
        console.log(this.extra)
        routerRequest.getIconList(this.extra).then(data => {
          console.log(data)
          this.data = data
        })
      }
    }
  }
</script>

<style scoped>
  .icon-box {min-height: 400px;}
  p{margin: 0;}
  ul:after{content: '.';clear: both;width: 0;height: 0;line-height: 9;visibility: hidden;overflow: hidden;display: block;}
  li {padding: 15px;display: inline-block;float: left;width: 128px;}
  ul .box {background-color: #F2F2F2;text-decoration: none;color: #4D4D4D;display: block;height: 70px;cursor: pointer;text-align: center;padding-top: 20px;border-radius: 8px;border: 1px solid #E6E6E6;}
  ul .box i {color: #0071BC;font-size: 30px;margin-bottom: 6px;}
</style>
