<template>
  <div>
    <el-table
      size="small" :data="data.award" :cell-style="{textAlign: 'center'}"
      :header-cell-style="{textAlign: 'center'}" stripe
      @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="award_name" :label="title" width="75"></el-table-column>
      <el-table-column prop="start_time" label="计划开始时间"></el-table-column>
      <el-table-column prop="end_time" label="计划完成时间"></el-table-column>
      <el-table-column prop="create_time" label="上传时间"></el-table-column>
      <el-table-column prop="pic" label="资质/证书" width="90">
        <template slot-scope="scope">
            <span v-if="scope.row.pic.length === 0">/</span>
            <el-button v-else size="small" @click="picClick(scope.row.pic)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :append-to-body="true" :visible.sync="picVisible" width="600px">
      <img v-for="(item, index) in pic" :key="index" :src="item" width="100%" alt="">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props: ['data', 'title'],
    data () {
      return {
        picVisible: false,
        pic: []
      }
    },
    methods: {
      handleSelectionChange (val) {
        this.$emit('selection', val)
      },
      picClick (pic) {
        this.pic = pic.split(';')
        console.log(this.pic)
        this.picVisible = true
      }
    }
  }
</script>

<style scoped>
</style>
