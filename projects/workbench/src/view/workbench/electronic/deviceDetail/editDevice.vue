<template>
  <div>
    <el-form :model="userForm" status-icon :rules="rules" ref="userForm">
      <el-form-item prop="eqpt_type_name">
        <div class="addOne"> <p class="left">设备名称：</p><el-input v-model="userForm.eqpt_type_name" size="mini"></el-input></div>
      </el-form-item>
      <el-form-item prop="eqpt_type_is_gen">
        <div class="addOne"> <p class="left">设备功能：</p>
          <el-select v-model="userForm.eqpt_type_is_gen" placeholder="请选择" size="small" class="diaSel" >
            <el-option
              v-for="item2 in options2"
              :key="item2.value"
              :label="item2.label"
              :value="item2.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item prop="eqpt_type_pow">
        <div class="addOne"> <p class="left">功率：</p><el-input v-model="userForm.eqpt_type_pow" size="mini" class="unit chp-electronic-device"></el-input> </div>
      </el-form-item>
      <el-form-item prop="eqpt_type_dur">
        <div class="addOne"> <p class="left">每日使用时长：</p><el-input v-model="userForm.eqpt_type_dur" size="mini" class="time chp-electronic-device"></el-input></div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" style="display: inline-block;margin-left: 90px;">
              <el-button @click="remove">取 消</el-button>
              <el-button type="primary" @click="confirm('userForm')">确 定</el-button>
    </span>
  </div>
</template>

<script>
  export default {
    props: ['oneDevice1', 'options2'],
    created () {
      this.userForm = this.oneDevice1
    },
    watch: {
      'oneDevice1': function (newVal) {
        this.userForm = newVal
      }
    },
    data () {
      var checkDur = (rule, value, callback) => {
        if (value > 24) {
          callback(new Error('每日使用时长不能超过24小时'))
        } else {
          callback()
        }
      }
      return {
        userForm: {
          eqpt_type_id: '',
          eqpt_name: '',
          eqpt_num: '',
          eqpt_pos: '',
          eqpt_is_gen: ''
        },
        rules: {
          eqpt_type_name: [
            { required: true, message: '请输入设备名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          eqpt_type_pow: [
            { required: true, message: '请输入功率', trigger: 'blur' },
            { validator: this.regExp('number'), trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          eqpt_type_dur: [
            { required: true, message: '请输入时长', trigger: 'blur' },
            { validator: checkDur, trigger: 'blur' },
            { validator: this.regExp('number'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      remove () {
        this.$emit('remove')
      },
      confirm (userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            this.$emit('confirm', this.userForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .el-input{
    width: 250px;
    position: absolute;
    right:20px;
  }
  /* 对话框 */
  .addOne{
    width:100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }
  .addOne p{
    width: 100px;
    text-align: right;
    vertical-align: top;
    position: absolute;
    top:-15px;
  }
  .addOne .diaSel{
    position: absolute;
    right:20px;
    width:250px;
  }
  .addOne .unit:after{
    content: 'kw';
    position: absolute;
    right:10px;
  }
  .addOne .time:after{
    content: 'h';
    position: absolute;
    right:10px;
  }
</style>
