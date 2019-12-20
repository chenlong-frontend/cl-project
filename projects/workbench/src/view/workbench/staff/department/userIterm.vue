<template>
  <div>
    <el-button style="float: left" @click="changeback">返回列表</el-button>
    <div class="StaffIformation">
      <el-form label-width="80px" :rules="rules" :model="UserForm" ref="UserForm" size="mini" v-loading="loading">
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="UserForm.Name" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="Birthday">
          <el-date-picker v-model="UserForm.Birthday" type="month" style="width:200px" placeholder="请点击">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="Sex">
          <el-radio v-model="UserForm.Sex" label="男">男</el-radio>
          <el-radio v-model="UserForm.Sex" label="女">女</el-radio>
          <!--<el-input v-model="UserForm.Sex"></el-input>-->
        </el-form-item>
        <el-form-item label="身份证号" prop="IdCard" >
          <el-input v-model="UserForm.IdCard" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="集团工号" prop="IdInCompany">
          <el-input v-model="UserForm.IdInCompany" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="集团部门" prop="Department">
          <el-input v-model="UserForm.Department" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="集团职务" prop="Title">
          <el-input v-model="UserForm.Title" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="Phone">
          <el-input v-model="UserForm.Phone" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="UserForm.Email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="人员备注" prop="Remark">
          <el-input v-model="UserForm.Remark" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('UserForm')">提交</el-button>
          <el-button @click="resetForm('UserForm')">还原</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    created () {
      this.userId = this.checkoutUsertableId.userTableId
      // todo: 通过userID去后台请求数据，返回该Id的userForm对象
      this.loading = false
      this.$message('模拟向后台请求id为' + this.userId + '的人的数据')
      // 以下是一个模拟
      this.UserForm = {
        Name: '某个名字',
        Birthday: '2017/11',
        Sex: '男',
        IdCard: '320121190001011233',
        IdInCompany: '122222',
        Department: '生产部门',
        Title: '经理',
        Phone: '321211122',
        Email: '212112',
        Remark: '1221212'
      }
    },
    computed: {
      ...mapGetters('department', ['checkoutUsertableId'])
    },
    name: '',
    data () {
      var validateIdCard = (rule, value, callback) => {
        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      }
      return {
        UserForm: {
          Name: '',
          Birthday: '',
          Sex: '',
          IdCard: '',
          IdInCompany: '',
          Department: '',
          Title: '',
          Phone: '',
          Email: '',
          Remark: ''
        },
        imageUrl: '',
        loading: true,
        rules: {
          IdCard: [
            { validator: validateIdCard, trigger: 'blur' }
          ]
        },
        userId: ''
      }
    },
    props: [''],
    methods: {
      changeback: function () {
        this.$emit('changeback1')
      },
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // todo：这里将表单上传到后台
            this.$message('这里将表单上传到后台!')
            this.$emit('changeback1')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (formName) {
        console.log(this.$refs[formName])
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .StaffIformation{ width:50%;margin-left:150px;float:left}
</style>
