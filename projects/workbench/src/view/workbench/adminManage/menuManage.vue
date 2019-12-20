<template>
  <ibox title="权限配置">
    <div class="cl-adminManage-menuManage"></div>
    <el-row :gutter="20" class="cl-menu-manage">
      <el-col :span="7">
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="部门" name="first">
            <el-tree v-loading="loading.dep" @current-change="onDepartment" :default-expanded-keys="[1]" :data="department" :props="defaultProps" highlight-current node-key="id"></el-tree>
          </el-tab-pane>
          <el-tab-pane label="工种" name="second">
            <el-tree v-loading="loading.type" :data="workType" @current-change="onWorkType" :default-expanded-keys="[1]" :props="defaultProps" highlight-current node-key="id"></el-tree>
          </el-tab-pane>
          <el-tab-pane label="人员"  name="third">
            <el-input placeholder="请输入内容" size="mini" v-model="searchText">
              <el-button slot="append" @click="seachPerson" icon="el-icon-search"></el-button>
            </el-input>
            <el-table v-loading="loading.person" :data="personData" @current-change="onPerson" highlight-current-row size="mini" style="width: 100%">
              <el-table-column prop="emp_name" label="姓名"></el-table-column>
              <el-table-column prop="emp_num" label="工号"></el-table-column>
            </el-table>
            <div class="page-box" v-show="pageTotal > 0">
              <el-pagination small layout="prev, pager, next" :current-page.sync="pageIndex" @current-change="pageChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <el-row :gutter="10">
          <el-col :span="10">
            <ibox class="cl-menu-config cl-ibox-dark" title="现有功能">
              <el-tree v-loading="loading.menu" show-checkbox ref="selectRef" :data="menuSelect" :default-expanded-keys="[1]" :props="defaultProps" highlight-current node-key="id"></el-tree>
            </ibox>
          </el-col>
          <el-col :span="3">
            <div class="tool-box">
              <div @click="addMenu" class="middle-left"><img src="../../../assets/img/lib/transfer/left.png" /></div>
              <div @click="removeMenu" class="middle-right"><img src="../../../assets/img/lib/transfer/right.png" /></div>
            </div>
          </el-col>
          <el-col :span="11">
            <ibox title="待配置功能" class="cl-menu-config cl-ibox-dark">
              <el-tree v-loading="loading.menu" show-checkbox :data="menuAll" ref="allRef" :default-expanded-keys="[1]" :props="defaultProps" highlight-current node-key="id"></el-tree>
            </ibox>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </ibox>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import request from '@/api/workbench/adminManage/menuManage.js'
  export default {
    components: {ibox},
    mounted () {
      this.getDepartment()
      this.getWorkType()
      this.getPerson()
    },
    data () {
      return {
        loading: {
          dep: true,
          type: true,
          person: true,
          menu: false
        },
        activeName2: 'first',
        searchText: '',
        department: [],
        workType: [],
        personData: [],
        menuSelect: [],
        menuAll: [],
        pageTotal: 0,
        pageSize: 6,
        pageIndex: 1,
        defaultProps: {
          label: 'name'
        },
        tabActive: 0,
        activeId: '',
        tabId: ['gro_id', 'role_id', 'emp_id']
      }
    },
    computed: {
      getActive () {
        let id = {}
        id[this.tabId[this.tabActive]] = this.activeId
        return id
      }
    },
    methods: {
      onDepartment (node) {
        this.activeId = node.id
        this.getMenu({gro_id: node.id})
      },
      onWorkType (node) {
        this.activeId = node.id
        this.getMenu({role_id: node.id})
      },
      onPerson (node) {
        console.log(node)
        this.activeId = node.Id
        this.getMenu({emp_id: node.Id})
      },
      pageChange () {
        this.getPerson()
      },
      seachPerson () {
        this.pageIndex = 1
        this.getPerson()
      },
      // ******************请求数据操作******************//
      addMenu () {
        if (this.activeId.length === 0) return false
        let select = this.$refs.allRef.getCheckedNodes().map(t => {
          return t.id
        })
        let activeTab = {}
        for (let o in this.getActive) {
          activeTab[o] = this.getActive[o]
        }
        activeTab.id = select
        request.addMenu(activeTab).then(data => {
          this.getMenu(this.getActive)
        })
      },
      removeMenu () {
        if (this.activeId.length === 0) return false
        let select = this.$refs.selectRef.getCheckedNodes().map(t => {
          return t.id
        })
        let activeTab = {}
        for (let o in this.getActive) {
          activeTab[o] = this.getActive[o]
        }
        activeTab.id = select
        request.removeMenu(activeTab).then(data => {
          this.getMenu(this.getActive)
        })
      },
      getDepartment () {
        request.getDepartment().then(data => {
          this.department = data
          this.loading.dep = false
        })
      },
      getWorkType () {
        request.getWorkType().then(data => {
          this.workType = data
          this.loading.type = false
        })
      },
      getPerson () {
        request.getPerson({search_key: this.searchText, page_index: this.pageIndex, page_size: this.pageSize}).then(data => {
          this.personData = data.emp_list
          this.pageTotal = parseInt(data.num)
          this.loading.person = false
        })
      },
      getMenu (param) {
        this.loading.menu = true
        request.getMenu(param).then(data => {
          this.menuSelect = data.member
          this.menuAll = data.left_form
          this.loading.menu = false
        })
      },
      handleClick (tab) {
        this.tabActive = tab.index
      }
    },
    watch: {
      searchText (val) {
        if (val.length === 0) {
          this.pageIndex = 1
          this.getPerson()
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-box {text-align: center;margin-top: 20px;}
  .tool-box {box-sizing: border-box;position: relative;padding: 20px 10px;height: 434px;}
  .tool-box img{width: 100%;cursor: pointer;}
  .tool-box .middle-left{margin: 115px 0 20px 0;}
  .el-tabs--border-card {height: 400px;box-shadow: none;}
</style>
