<template>
  <div>
    <div class="StaffIformation">
      <el-form label-width="80px" :rules="rules" :model="userForm" ref="userForm" size="mini">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name" style="width:40%"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="userForm.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            @change="formatDate"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="userForm.sex" label='男'>男</el-radio>
          <el-radio v-model="userForm.sex" label='女'>女</el-radio>
        </el-form-item>
        <el-form-item label="身份证号" prop="cid" >
          <el-input v-model="userForm.cid" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="集团工号" prop="emp_num">
          <el-input v-model="userForm.emp_num" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="集团部门" prop="department" style="width:58%">
          <el-cascader
            :options="departmentLists"
            v-model="userForm.department"
            change-on-select
            :props="props"
            :show-all-levels="false"
            @change="handleSeleChan">
          </el-cascader>
        </el-form-item>
        <el-form-item label="集团职务" prop="emp_post">
          <el-input v-model="userForm.emp_post" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="userForm.mobile" style="width:58%"></el-input><el-button style="margin-left:5px" @click="addDomain">新增备用</el-button>
        </el-form-item>
        <el-form-item
          v-for="(domain, index) in userForm.otherPhones"
          :key="index"
          :label="'备用' + (index+1)"
          :prop="'otherPhones.' + index + '.value'"
          :rules="{
      required: true, message: '备用号码不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="domain.value" style="width:58%"></el-input><el-button style="margin-left:5px" @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item label="电话" prop="telephone">
          <el-input v-model="userForm.telephone" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="人员备注" prop="remark">
          <el-input v-model="userForm.remark" style="width:58%"></el-input>
        </el-form-item>
        <p style="font-family:Microsoft YaHei;font-size: 12px;color: #949494; margin-left: 13%">若密码设置为空，则默认为原密码（初始密码为888888）</p>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="userForm.pass" auto-complete="off" style="width:58%"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="userForm.checkPass" auto-complete="off" style="width:58%" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('userForm')">{{leftbutton}}</el-button>
          <el-button @click="resetForm('userForm')">{{rightbutton}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="FileUpLoad">
      <div style="border:1px solid lightgrey;">
        <el-upload
          class="avatar-uploader"
          action="/zjsbs/upload"
          name="file"
          :data="uploadData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus
      avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <span  style="color: #6f7180;margin-left:50px" >请选择头像</span>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import request from '@/api/workbench/staff/department/staffIncrement.js'
  export default {
    created () {
      this.getdata()
    },
    computed: {
      ...mapGetters('department', ['checkoutUsertableId', 'isChanged'])
    },
    data () {
      var validateIdCard = (rule, value, callback) => {
        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
          callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '' && this.userForm.checkPass === '') {
          callback()
        } else this.$refs.userForm.validateField('checkPass')
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '' && this.userForm.pass === '') {
          callback()
        } else if (value !== '' && value !== this.userForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else if (value === '' && value !== this.userForm.pass) {
          callback(new Error('请再次输入密码!'))
        } else {
          callback()
        }
      }
      return {
        userForm: {
          name: '',
          birthday: '',
          sex: '',
          cid: '',
          emp_num: '',
          department: [],
          emp_post: '',
          mobile: '',
          telephone: '',
          email: '',
          remark: '',
          imageAddress: '',
          pass: '',
          checkPass: '',
          otherPhones: []
        },
        uploadData: {
          type: 237,
          data: JSON.stringify(null),
          md5: '123'
        },
        flag: false,
        props: {
          value: 'id',
          label: 'label',
          children: 'children'
        },
        imageUrl: '',
        rules: {
          cid: [
            { validator: validateIdCard, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请填写姓名', trigger: 'blur' }
          ],
          emp_post: [
            { required: true, message: '请填写职务', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          emp_num: [
            { required: true, message: '请填写集团工号', trigger: 'blur' }
          ],
          department: [
            { type: 'array', required: true, message: '请选择部门', trigger: 'change' }
          ],
          mobile: [
            { required: true, message: '请填写手机号码', trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请填写电话号码', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请填写备注', trigger: 'blur' }
          ]
        },
        leftbutton: '提交',
        rightbutton: '重置',
        departmentLists: []
      }
    },
    methods: {
      // *****************用于加载初始数据使用******************//
      getdata () {
        // 请在这里把id给它
        this.getdataUtil1()
      },
      // ******************图片上传的操作*******************//
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        // imagUrl是本页面直接显示的图片
        // 上传完成后后台将图片地址传给我，然后将地址放入表单中，再点击提交之后传给后台入库 imagAddress是最终上传的地址
        this.userForm.imageAddress = res.data.data.pic_url
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
      // ***************对备用电话号码的操作*********************//
      removeDomain (item) {
        var index = this.userForm.otherPhones.indexOf(item)
        if (index !== -1) {
          this.userForm.otherPhones.splice(index, 1)
        }
      },
      addDomain () {
        this.userForm.otherPhones.push({
          value: ''
        })
      },
      // ******************提交保存功能***************//
      submitForm (formName) {
        console.log(this.userForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 这里将人员表单上传到后台,需要加一个判断，Id为0则是新增，不然则是修改
            let success = this.getdataUtil2()
            if (success === 0) {
              // 新增人员点击保存之后需要重置表单 0表示成功
              this.$refs[formName].resetFields()
              this.imageUrl = ''
              this.$emit('submitDone')
            } else this.$message.error('提交失败，请稍后再试')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // ***************重置或者取消功能的统合**************//
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      // *********将日起数据格式化*********//
      formatDate (val) {
        this.userForm.birthday = val
      },
      // ************需要向后台请求该项目下面的部门信息************//
      getdataUtil1 () {
        request.getdataUtil1(this.userForm.id).then(
          data => {
            this.departmentLists = data.data.data.gro_list
          },
          error => {
            this.$message.error(error.toString())
          }
        )
      },
      // **********提交表单信息，无论该表单是保存还是修改，根据id是否为0去判断**************//
      getdataUtil2 () {
        let success = 0
        request.getdataUtil2(this.userForm).then(
          data => {
            success = data.data.code
          },
          error => {
            this.$message.error(error.toString())
            success = 1
          }
        )
        return success
      },
      // ***********部门选择触发的钩子函数********************//
      handleSeleChan (value) {
        console.log('change事件传入的值:' + value)
      }
    }
  }
</script>

<style scoped>
  .StaffIformation{ width:80%;margin: 0 auto;}
  .FileUpLoad{position: absolute;top: 50px;right: 60px;}
  .avatar-uploader .el-upload {
    border: 1px dashed lightgrey;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
