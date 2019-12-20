<template>
  <div class="tp_addHelmet">
    <el-form label-width="130px"
             :model="formLabelAlign"
             ref="formLabelAlign"
             class="demo-ruleForm"
             :rules="rules"
             style="width: 50%;margin-left: 10%;margin-top: 20px;">
      <el-form-item label="安全帽编号：" prop="helmet_num">
        <el-input v-model="formLabelAlign.helmet_num"  style="width: 58%" ></el-input>
      </el-form-item>
      <el-form-item label="持有者姓名：" prop="emp_name">
        <el-input v-model="formLabelAlign.emp_name" @click.native="showChoose" readonly class="inputstyle" placeholder="点击选择持有者"></el-input>
        <span class="warn_msg">(若暂无持有者，可不填)</span>
      </el-form-item>
      <el-form-item label="持有者工号：" prop="emp_num">
        <el-input v-model="formLabelAlign.emp_num" readonly class="inputstyle"></el-input>
      </el-form-item>
      <el-form-item label="持有者手机号：" prop="emp_phone">
        <el-input v-model="formLabelAlign.emp_phone" readonly class="inputstyle"></el-input>
      </el-form-item>
      <div class="line_hr"></div>
      <el-form-item style="margin-top: 20px;margin-left: 30%">
        <el-button type="primary" @click="submitForm('formLabelAlign')" :loading="formLoading" ><span v-show="!formLoading">确认提交</span><span v-show="formLoading">提交中</span></el-button>
        <el-button @click="resetForm('formLabelAlign')">重置</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      width="60%"
      :visible.sync="editInnerDialog"
      append-to-body>
      <add-person  ref="clear"></add-person>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import addPerson from '@/view/workbench/components/addPerson.vue'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import request from '@/api/workbench/personPosition/entryInfo'
  import { mapMutations } from 'vuex'
  export default {
    components: { addPerson },
    data () {
      return {
        formLoading: false,
        formLabelAlign: {
          helmet_num: '',
          emp_name: '',
          emp_id: '',
          emp_phone: '',
          emp_num: ''
        },
        editInnerDialog: false,
        rules: {
          helmet_num: [
            { required: true, message: '不得为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      ...mapMutations('area', ['changeAddHelmetFlag']),
      editConfirm () {
        this.editInnerDialog = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          this.formLabelAlign.emp_name = value.managerName
          this.formLabelAlign.emp_phone = value.managePhone
          this.formLabelAlign.emp_id = value.managerID
          this.formLabelAlign.emp_num = value.managerNum
        })
        console.log(this.formLabelAlign)
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.formLabelAlign)
            if (this.formLabelAlign.emp_name === '') {
              this.$notify({
                title: '警告',
                message: '请将信息填写完整',
                type: 'warning'
              })
            } else {
              let subitem = {
                'no': this.formLabelAlign.helmet_num,
                'emp_id': this.formLabelAlign.emp_id
              }
              this.formLoading = true
              request.addHelemt(subitem).then(
                data => {
                  if (data.data.code === 0) {
                    this.$refs.formLabelAlign.resetFields()
                    this.$notify({
                      title: '成功',
                      message: '添加成功！',
                      type: 'success'
                    })
                    this.formLoading = false
                    this.changeAddHelmetFlag('1')
                  } else {
                    this.$notify({
                      title: '警告',
                      message: data.data.msg,
                      type: 'warning'
                    })
                  }
                  this.formLoading = false
                }
              )
            }
          }
        })
      },
      resetForm (formName) {
        console.log(formName)
        this.$refs[formName].resetFields()
      },
      showChoose () {
        this.editInnerDialog = true
      }
    }
  }
</script>
<style scoped>
  .warn_msg{
    position: absolute;
    left: 62%;
    top:0;
    color: gray;
  }
  .inputstyle .el-input__inner{
    background-color: lightgray;
  }
</style>
