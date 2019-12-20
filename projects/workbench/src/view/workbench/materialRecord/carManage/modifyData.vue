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
      <el-button type="primary" @click="submitForm1('userForm')">保存</el-button>
      <el-button @click="resetForm('userForm')">取消</el-button>
    </div>
  </el-form>

</template>

<script>
  import request from '@/api/workbench/materialRecord/carManage.js'
  export default {
    props: ['modifyId'],
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
    mounted () {
      this.getInit()
    },
    watch: {
      modifyId: function () {
        this.getInit()
      }
    },
    methods: {
      submitForm1 (userForm) {
        this.$refs[userForm].validate((valid) => {
          if (valid) {
            request.submitData1(this.userForm).then(value => {
              this.$emit('change')
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm () {
        this.$emit('change')
      },
      getInit () {
        request.getTable({'id': this.modifyId}).then(value => {
          this.userForm = value.car[0]
        })
      }
    }
  }
</script>

<style scoped>
  .button {padding-left: 115px;}
</style>
