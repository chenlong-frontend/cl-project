<template>
  <div class="green">
      <ibox title="绿色创优概览">
        <div class="box">
          <div class="left">
            <!--***************表格******************-->
            <itable :formData="formData" :time="time"></itable>
          </div>
          <div class="right">
            <calendar @timeChange="timeChange"></calendar>
            <div class="edit">
              <ibtn styleName="el-icon-edit" msg="修改"  @click.native="editClick"></ibtn>
              <ibtn styleName="el-icon-edit-outline" msg="导出" @click.native="editOut"></ibtn>
            </div>
          </div>
        </div>
      </ibox>
      <el-dialog title="修改创优信息" :visible.sync="editVisible" width="720px">
        <!--***************选项卡******************-->
        <tab ref="tabRef" :formData="formData"></tab>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import ibox from '@/components/style/ibox.vue'
import itable from './green/table.vue'
import calendar from './green/calendar.vue'
import tab from './green/tab.vue'
import ibtn from '@/components/style/ibtn.vue'
import request from '@/api/request'
import {format} from 'date-fns'
export default {
  name: 'green',
  components: {ibox, itable, calendar, ibtn, tab},
  created () {
    this.time = format(new Date(), 'YYYY年MM月份')
    this.timeFormat = format(new Date(), 'YYYY-MM')
    this.getData()
  },
  data () {
    return {
      editVisible: false,
      time: '',
      timeFormat: '',
      formData: {
        info: {},
        categorys: {0: [], 1: [], 2: []}
      },
      newAddFlag: true
    }
  },
  methods: {
    editClick () {
      this.editVisible = true
      if (this.$refs.tabRef) this.$refs.tabRef.initForm()
    },
    editOut () {
      request({type: '1525', data: {time: this.timeFormat}}).then(val => {
        console.log(val)
        console.log(window.location)
        val.length !== 0 && window.open(val)
      })
    },
    getData () {
      request({type: '1523', data: {time: this.timeFormat}}).then(val => {
        val.info = val.info[0] || {}
        this.newAddFlag = val.options === 'insert'
        for (let o of Object.keys(val.categorys)) {
          val.categorys[o] = val.categorys[o].map(t => {
            t.desc = t.desc || '/'
            return t
          })
        }
        this.formData = val
      })
    },
    submit () {
      if (!this.$refs.tabRef.formCheck()) return false
      this.editVisible = false
      let formDatas = this.$refs.tabRef.getForm()
      let datas = Object.assign({}, {}, formDatas.basicForm)
      let record = []
      for (let o of Object.keys(formDatas.tabRecordForm)) {
        let obj = {
          record_id: o,
          desc: formDatas.tabRecordForm[o]
        }
        record.push(obj)
      }
      let insertIndex = []
      for (let o of Object.keys(this.formData.categorys)) {
        for (let a of this.formData.categorys[o]) {
          console.log(a)
          if (a.options === 'insert') {
            insertIndex.push(a.id)
          }
        }
      }
      console.log(insertIndex)
      datas.update_record = record.filter(t => {
        return insertIndex.indexOf(t.record_id) === -1
      })
      datas.insert_record = record.filter(t => {
        return insertIndex.indexOf(t.record_id) !== -1
      })
      console.log(insertIndex)
      datas.time = this.timeFormat
      request({type: '1526', data: datas}).then(t => {
        this.getData()
      })
    },
    timeChange ({year, month}) {
      this.time = format(`${year}-${month}`, 'YYYY年MM月份')
      this.timeFormat = format(`${year}-${month}`, 'YYYY-MM')
      this.getData()
    }
  }
}
</script>

<style scoped>
  .box {display: flex;}
  .left {flex: auto;}
  .right {flex: 260px;padding-left: 30px;}
  .edit {margin-top: 20px;}
</style>

