<template>
  <el-form label-width="110px"  :model="userForm" ref="userForm" :rules="rules" class="demo-ruleForm">

    <el-form-item label="车牌号:" prop="car_number">
      <el-input v-model="userForm.car_number" style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="车牌品牌:" prop="car_brand">
      <el-input v-model="userForm.car_brand"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="车牌型号:" prop="car_model">
      <el-input v-model="userForm.car_model"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="车辆自重:" prop="car_weight">
      <el-input v-model="userForm.car_weight"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="联系人:" prop="contact_name">
      <el-input v-model="userForm.contact_name"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="联系方式:" prop="contact_phone">
      <el-input v-model="userForm.contact_phone"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="所属公司:" prop="belong_to">
      <el-input v-model="userForm.belong_to"  style="width:250px" ></el-input>
    </el-form-item>
    <el-form-item label="备注:" prop="memo">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="userForm.memo"
        style="width:300px" >
      </el-input>
    </el-form-item>

    <div class="button">
      <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
      <el-button @click="resetForm('userForm')">重置</el-button>
    </div>
  </el-form>

</template>

<script>
  import request from '@/api/workbench/materialRecord/carManage.js'
  export default {
    data () {
      return {
        userForm: {
          car_number: '',
          car_brand: '',
          car_model: '',
          car_weight: '',
          contact_name: '',
          contact_phone: '',
          belong_to: '',
          memo: ''
        },
        rules: {

        }
      }
    },
    methods: {
      submitForm (userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            request.submitData(this.userForm).then(value => {
              this.$emit('changeContent')
              this.$refs[userForm].resetFields()
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm (userForm) {
        this.$refs[userForm].resetFields()
      }
    }
  }
</script>

<style scoped>
  .button {padding-left: 115px;}
</style>
