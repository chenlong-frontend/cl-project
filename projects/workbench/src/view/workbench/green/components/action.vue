<template>
  <div>
    <div>
      <el-row>
        <el-col :span="16">
          <el-form ref="formDataRef" :inline="true" size="small" :model="formData" label-width="0">
            <el-form-item style="width: 150px">
              <el-select @change="$emit('typeChange', formData.typeSelect)" v-model="formData.typeSelect" placeholder="请选择类型">
                <el-option v-for="(item, index) in dataExtra" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 150px">
              <el-select @change="$emit('proChange', formData.pro_id)" v-model="formData.pro_id" placeholder="请选择项目">
                <el-option v-for="(item, index) in proData" :key="index" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: 150px;">
              <el-date-picker v-model="formData.time" @change="$emit('timeChange', formData.time)" :editable="false"
                              value-format="yyyy-MM" type="month" placeholder="选择计划开始时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="8">
          <div class="search-box">
            <el-input size="small" @keyup.native.enter="$emit('searchClick')" @change="$emit('searchChange', formData.search)" placeholder="请输入内容" v-model="formData.search">
              <template slot="append">
                <el-button @click="$emit('searchClick')" slot="append" icon="el-icon-search"></el-button>
              </template>
            </el-input>
          </div>
        </el-col>
      </el-row>
    </div>
    <slot></slot>
    <div class="bottom-box">
      <div>
        <el-button type="primary" size="small" icon="el-icon-plus" plain  @click="$emit('addClick')">新增</el-button>
        <el-button type="primary" :disabled="tableSelectLen !== 1"
                   size="small" icon="el-icon-edit" plain  @click="$emit('editClick')">修改</el-button>
        <el-button type="primary" :disabled="tableSelectLen === 0"
                   size="small" icon="el-icon-delete" plain  @click="$emit('deleteClick')">删除</el-button>
      </div>
      <div class="bottom-page">
        <el-pagination
          layout="prev, pager, next"
          :page-size="8"
          :current-page.sync = "page"
          @current-change="$emit('pageChange', (page - 1))"
          :total="count">
        </el-pagination>
      </div>
      <div>
        <ibtn styleName="el-icon-edit" msg="管理奖项记录表" @click.native="$emit('manageClick')"></ibtn>
      </div>
    </div>
  </div>
</template>
<script>
  import ibtn from '@/components/style/ibtn.vue'
  export default {
    props: ['count', 'dataExtra', 'tableSelectLen', 'proData'],
    components: {ibtn},
    data () {
      return {
        formData: {
          typeSelect: '',
          time: '',
          search: '',
          pro_id: ''
        },
        page: 0
      }
    },
    methods: {
      setPage (param) {
        this.page = param
      }
    }
  }
</script>

<style scoped>
  .search-box {width: 300px;float: right;}
  .bottom-box {margin: 20px 0;display: flex;}
  .bottom-page {flex: auto;text-align: center;}
</style>
