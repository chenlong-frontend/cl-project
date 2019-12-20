<template>
  <div class="tp_creatTask">
    <el-form
      label-width="130px"
      :model="formLabelAlign"
      ref="formLabelAlign"
      style="margin-left: 10px;"
      :rules="rules">
      <el-form-item label="任务编号：" size="small" style="width: 300px;" prop="task_num">
        <el-input v-model="formLabelAlign.task_num" :maxlength=25 @blur="testNum(formLabelAlign.task_num)"></el-input>
      </el-form-item>
      <el-form-item label="任务名称：" size="small" style="width: 300px;" prop="task_name">
        <el-input v-model="formLabelAlign.task_name" :maxlength=25></el-input>
      </el-form-item>
      <el-form-item label="设置计划时间："  size="small" prop="chooseTime">
        <el-date-picker
          v-model="formLabelAlign.chooseTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="chooseTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="负责人："
        size="small"  style="width: 300px;"
        prop="manager" class="choosePeople"
        @click.native="choosePeople">
        <el-input v-model="formLabelAlign.manager"  readonly ></el-input>
      </el-form-item>
      <el-form-item label="备注："  size="small" prop="task_note">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="formLabelAlign.task_note"
          :maxlength=500>
        </el-input>
      </el-form-item>
      <el-form-item style="margin-left: 40%">
        <el-button size="small" @click="closeAdd">取 消</el-button>
        <el-button type="primary" @click="submitForm('formLabelAlign')" size="small">确 定</el-button>
      </el-form-item>
    </el-form>
    <!--添加负责人-->
    <el-dialog
      title="添加负责人"
      :visible.sync="addPersonFlag"
      :append-to-body="true"
      width="60%">
      <choose-person ref="chooseDia"></choose-person>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addPersonFlag = false" size="small">取 消</el-button>
        <el-button type="primary" @click="comfirmPerson" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import choosePerson from '../../components/choosePerson/choosePerson.vue'
  import request from '@/api/request'
  import {format} from 'date-fns'
  export default {
    components: {choosePerson},
    props: ['msg'],
    mounted () {
      if (this.msg.task_gmt_start) {
        this.limitTime = [this.msg.task_gmt_start, this.msg.task_gmt_end]
        this.formLabelAlign.task_p_id = this.msg.task_id
      }
    },
    data () {
      return {
        addPersonFlag: false,
        formLabelAlign: {
          task_num: '',
          task_name: '',
          chooseTime: [],
          manager: '',
          task_emp_id_chg: '',
          task_note: '',
          task_gmt_start: '',
          task_gmt_end: '',
          task_p_id: 0
        },
        limitTime: [],
        rules: {
          task_num: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          task_name: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          manager: [
            { required: true, message: '不得为空', trigger: 'change' }
          ],
          task_note: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          chooseTime: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      dataInit () {
        this.formLabelAlign = {
          task_num: '',
          task_name: '',
          chooseTime: [],
          manager: '',
          task_emp_id_chg: '',
          task_note: '',
          task_gmt_start: '',
          task_gmt_end: '',
          task_p_id: 0
        }
      },
      comfirmPerson () {
        let getData = this.$refs.chooseDia.returnMessage()
        // console.log(getData)
        this.formLabelAlign.manager = getData.managerName
        this.formLabelAlign.task_emp_id_chg = getData.managerID
        this.addPersonFlag = false
      },
      choosePeople () {
        this.addPersonFlag = true
      },
      closeAdd () {
        this.$emit('close-add')
      },
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.$emit('add-task', this.formLabelAlign)
          } else {
            this.$notify({
              title: '警告',
              message: '请将信息填写完整！',
              type: 'warning'
            })
          }
        })
      },
      testNum (value) {
        console.log(value)
        if (value !== '') {
          request({type: '1604', data: {task_num: value}}).then(t => {
            console.log(t)
            if (t.is_only) {
              console.log('编号唯一')
            } else {
              this.$notify({
                title: '警告',
                message: '该编号已存在，请重新设置！',
                type: 'warning'
              })
              this.formLabelAlign.task_num = ''
            }
          })
        }
      },
      chooseTime (item) {
        // 自己选的时间  format(new Date(), 'YYYY-MM')
        let startTime1 = format(item[0], 'YYYY-MM-DD 00:00:00')
        let endTime1 = format(item[1], 'YYYY-MM-DD 00:00:00')
        if (this.msg.task_id === 0) {
          this.formLabelAlign.task_gmt_start = startTime1
          this.formLabelAlign.task_gmt_end = endTime1
          this.formLabelAlign.chooseTime = [item[0], item[1]]
        } else {
          // 限制的时间
          let startTime2 = format(this.limitTime[0], 'YYYY-MM-DD 00:00:00')
          let endTime2 = format(this.limitTime[1], 'YYYY-MM-DD 00:00:00')
          console.log(startTime1, endTime1)
          console.log(startTime2, endTime2)
          let changeTime = []
          // 开始时间
          if (startTime1 > startTime2 && startTime1 < endTime2) {
            this.formLabelAlign.task_gmt_start = startTime1
            changeTime[0] = item[0]
          } else {
            this.formLabelAlign.task_gmt_start = startTime2
            changeTime[0] = this.limitTime[0]
          }
          // 结束时间
          if (endTime1 < endTime2 && endTime1 > startTime2) {
            this.formLabelAlign.task_gmt_end = endTime1
            changeTime[1] = item[1]
          } else {
            this.formLabelAlign.task_gmt_end = endTime2
            changeTime[1] = this.limitTime[1]
          }
          if (changeTime[1] !== item[1] || changeTime[0] !== item[0]) {
            this.$notify({
              title: '警告',
              message: '选择的时间范围须在主任务时间限制下，已为您修改',
              type: 'warning'
            })
          }
          this.formLabelAlign.chooseTime = changeTime
        }
        console.log(this.formLabelAlign.task_gmt_start, this.formLabelAlign.task_gmt_end)
      }
    },
    watch: {
      msg: function (msg) {
        console.log('检测到数据变化')
        console.log(msg)
        if (msg.task_gmt_start) {
          this.limitTime = [msg.task_gmt_start, msg.task_gmt_end]
          this.formLabelAlign.task_p_id = msg.task_id
        }
      }
    }
  }
</script>
<style scoped>
</style>
