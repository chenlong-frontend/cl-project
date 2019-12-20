<template>
  <div id="tp_changePwd">
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="原密码：" prop="prePass">
        <el-input type="text" v-model="ruleForm2.prePass" auto-complete="off" style="width: 90%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" style="width: 90%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" style="width: 90%" size="small"></el-input>
      </el-form-item>
      <el-form-item style="margin-left: 25%">
        <el-button @click="resetForm('ruleForm2')" size="small">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')" size="small" :loading="formLoading" ><span v-show="!formLoading">提交</span><span v-show="formLoading">提交中</span></el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import changeRequest from '@/api/comm/changeMsg.js'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formLoading: false,
        ruleForm2: {
          prePass: '',
          pass: '',
          checkPass: ''
        },
        rules2: {
          prePass: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '不得为空', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '不得为空', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        if (this.formLoading) return false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.formLoading = true
            changeRequest.changePwd(this.ruleForm2).then(
              data => {
                this.formLoading = false
                this.$emit('sent-pwd', data.data.code)
              }
            )
          } else {
            this.$notify({
              title: '警告',
              message: '请将信息填写完整！',
              type: 'warning'
            })
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style scoped>

</style>
