<template>
  <div class="cl-manage">
    <div class="manage-ibox">
      <div class="ibox-title">
        <span>{{name1}}</span>
      </div>
      <div class="ibox-content">
        <!--流程处理-->
        <iprocess v-on:eventListen="proListen" :data="list"></iprocess>
      </div>
    </div>
    <!--弹出处理层-->
    <el-dialog  class="permissionSnapshot" width = '1050px' :visible.sync="dialogVisible" :append-to-body=true >
      <div class="dialog-content">
        <!--流程加人-->
        <itembox :title="title"  :config="config" ref="clear" :nodeId="nodeId"></itembox>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="leave">退 出</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import iprocess from '@/components/process.vue'
  import itembox from '@/view/workbench/components/transferThree.vue'
  import request from '@/api/workbench/permission/manage.js'
  import requestTransfer from '@/api/workbench/components/transferThree.js'
  import { mapState } from 'vuex'
  export default {
    name: 'permissionManage',
    components: {iprocess, ibox, itembox},
    created () {
      console.log(this.manageId)
      request.getData(this.manageId).then(value => {
        this.list = value.filter((t, index) => {
          return index !== 0 && index !== value.length - 1
        })
      })
      this.name1 = this.manageName
    },
    computed: {
      ...mapState('manage', ['manageId', 'manageName'])
    },
    data () {
      return {
        tableGroup: {
          tableData1: [],
          tableData3: [],
          tableData2: [{}],
          tableData4: [],
          selectPageIndex: 1,
          allPageIndex: 1,
          filterText: '',
          totalNum1: 0,
          totalNum2: 0
        },
        list: [],
        dialogVisible: false,
        title: '',
        nodeId: '',
        config: {
          getData1: 612, // 第一张表的信息
          getData2: 613, // 第二张表的信息
          getData3: 614,
          getData4: 615, // 搜索
          getData5: 610,  // 左移  添加
          getData6: 611   // 右移   删除
        },
        name1: ''
      }
    },
    methods: {
      proListen (val) {
        // 点击流程节点事件
        this.dialogVisible = true
        this.title = val.node_name
        this.nodeId = val.node_id
        console.log(this.nodeId)
        requestTransfer.setRequestData({config: this.config})
      },
      leave () {
        this.dialogVisible = false
        this.$refs.clear.clearAll()
      }
    },
    watch: {
      manageId () {
        console.log('改变了')
        request.getData(this.manageId).then(value => {
          this.list = value.filter((t, index) => {
            console.log(index)
            return index !== 0 && index !== value.length - 1
          })
        })
        this.name1 = this.manageName
      }
    }
  }
</script>

<style lang="scss" scoped type="text/css">
  .manage-ibox {
      border-top: 4px solid #e6e6e6;
      .ibox-title{background-color: #F2F2F2;padding: 0 15px;border-bottom: 1px solid #e7eaec;font-weight: bold;
      span {font-size: 12px;padding: 8px 4px;display: inline-block;color:#676a6c;}
      span.active {color: #1d84c6;}
      .fa {font-size: 20px;vertical-align: -1px}
    }
    .ibox-content {padding: 20px;background-color: #E6E6E6;}
  }
</style>
