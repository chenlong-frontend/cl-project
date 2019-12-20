<template>
  <div>
  <div class="StaffIformation">
<el-form label-width="80px" :rules="rules" :model="userForm" ref="userForm" size="mini">
  <el-form-item label="姓名" prop="name">
    <el-input v-model="userForm.name" style="width:40%"></el-input>
  </el-form-item>
  <el-form-item label="身份证号" prop="cid" >
    <el-input v-model="userForm.cid" style="width:58%"></el-input>
  </el-form-item>
  <el-form-item label="手机" prop="mobile">
    <el-input v-model="userForm.mobile" style="width:58%"></el-input><el-button style="margin-left:5px" @click="addDomain">新增备用</el-button>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in userForm.otherPhones"
    :key="index"
    :label="'备用' + (index+1)"
    :prop="'otherPhones.' + index + '.value'"
    :rules="{required: true, message: '备用号码不能为空', trigger: 'blur'}"
  >
    <el-input v-model="domain.value" style="width:58%"></el-input><el-button style="margin-left:5px" @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
  <el-form-item label="出生日期" prop="birthday">
    <!--<el-date-picker v-model="userForm.birthday" type="month" style="width:200px" placeholder="请点击">-->
    <!--</el-date-picker>-->
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
    <!--<el-input v-model="userForm.Sex"></el-input>-->
  </el-form-item>
  <!--所属公司只起到展示的作用-->
  <el-form-item label="所属公司" >
    <el-input v-model="companyName" style="width:58%" disabled></el-input>
  </el-form-item>

  <el-form-item label="工号"  prop="emp_num">
    <el-input v-model="userForm.emp_num" style="width:58%"></el-input>
  </el-form-item>
  <el-form-item :label="this.companyLevel+'部门'" prop="department" style="width:58%">
    <!--<el-select v-model="userForm.department" placeholder="请选择">-->
      <!--<el-option-->
        <!--v-for="item in departmentLists"-->
        <!--:key="item.gro_id"-->
        <!--:label="item.gro_name"-->
        <!--:value="item.gro_id">-->
      <!--</el-option>-->
    <!--</el-select>-->
    <!--@change="handleSeleChan"-->
    <el-cascader
      :options="departmentLists"
      v-model="userForm.department"
      change-on-select
      :props="props"
      :show-all-levels="false"
      :disabled="detailedDisabled"
    @change="handleSeleChan">
    </el-cascader>
  </el-form-item>
  <el-form-item :label="this.companyLevel+'职务'" prop="emp_post">
    <el-input v-model="userForm.emp_post" style="width:58%" :disabled="detailedDisabled"></el-input>
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
  <el-form-item label="一卡通ID" prop="oneCardID">
    <el-input v-model="userForm.oneCardID" placeholder="请输入一卡通ID" style="width:58%" :disabled="false"></el-input>
  </el-form-item>

  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="userForm.pass" auto-complete="off" style="width:58%"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="userForm.checkPass" auto-complete="off" style="width:58%" ></el-input>
  </el-form-item>
  <p style="font-family:Microsoft YaHei;font-size: 12px;color: #949494; margin-left: 13%">若密码设置为空，则默认为原密码（初始密码为888888）</p>
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
  import { mapGetters, mapMutations } from 'vuex'
  import request from '@/api/workbench/staff/department/staffIncrement.js'
  export default {
    created () {
      console.log('staff初始化')
      console.log(this.companyLevel1)
      this.getdata()
    },
    computed: {
      ...mapGetters('department', ['checkoutUsertableId', 'isChanged'])
    },
    data () {
//      var validateIdCard = (rule, value, callback) => {
//        if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
//          callback(new Error('请输入正确的身份证号'))
//        } else {
//          callback()
//        }
//        if (!value || !/^\d{6}(1[89]|2[01])\d{2}(0[1-9]|1[012])(0[1-9]|[012]\d|3[01])\d{3}(\d|X|x)$/i.test(value)) {
//          callback(new Error('请输入正确的身份证号'))
//        } else {
//          callback()
//        }
//      }
      var validatePass = (rule, value, callback) => {
//        if (value === '' && this.userForm.checkPass === '') {
        this.$refs.userForm.validateField('checkPass')
        callback()
//        } else {
//        this.$refs.userForm.validateField('checkPass')
//        }
//        callback()
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
        userFormOrigin: {},
        userForm: {
          id: '',
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
          oneCardID: '',
          imageAddress: '',
          pass: '',
          checkPass: '',
          otherPhones: []
        },
        uploadData: {
          type: 237,
          data: JSON.stringify({flag: 2}),
          md5: '123'
        },
        flag: false,
        detailedDisabled: false,
        department: [],
        props: {
          value: 'id',
          label: 'label',
          children: 'children'
        },
        imageUrl: '',
        rules: {
          cid: [
            { required: true, message: '请填写身份证号', trigger: 'blur' },
            { validator: this.regExp('identity'), trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
//          sex: [
//            { required: true, message: '请选择性别', trigger: 'change' }
//          ],
          name: [
            { required: true, message: '请填写姓名', trigger: 'blur' },
            { validator: this.regExp('managerLimit'), trigger: 'blur' }
          ],
          emp_post: [
            { required: true, message: '请填写职务', trigger: 'blur' }
          ],
          birthday: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          emp_num: [
            { required: true, message: '请填写集团工号', trigger: 'blur' },
            { validator: this.regExp('common'), trigger: 'blur' }
          ],
          department: [
            { type: 'array', required: true, message: '请选择部门', trigger: 'change' }
          ],
          mobile: [
            { required: true, message: '请填写手机号码', trigger: 'blur' },
            { validator: this.regExp('mobile'), trigger: 'blur' }
          ],
          telephone: [
            { required: true, message: '请填写电话号码', trigger: 'blur' },
            { validator: this.regExp('telephone'), trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请填写邮箱', trigger: 'blur' },
            { validator: this.regExp('email'), trigger: 'blur' }
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
    props: ['companyLevel', 'companyName'],
    methods: {
      // *****************用于加载初始数据使用******************//
      getdata () {
        this.datainit()
        this.userForm.id = this.checkoutUsertableId.userTableId
        if (this.checkoutUsertableId.userTableId === '0') {
          console.log('走了0这条路')
          this.getdataUtil1()
        } else {
          //  向后台请求用户数据 用户id：this.checkoutUsertableId.userTableId
          this.getdataUtil1()
          this.leftbutton = '保存'
          this.rightbutton = '取消'
          this.detailedDisabled = true
        }
      },
      // ***************vuex的一些方法***************//
      ...mapMutations('department', ['changeUserTableId', 'changeFlag', 'changeUpdate']),
      // ******************图片上传的操作*******************//
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        // imagUrl是本页面直接显示的图片对象的地址，
        console.log(res)
        // 上传完成后后台将图片地址传给我，然后将地址放入表单中，再点击提交之后传给后台入库 imagAddress是最终上传的地址
        this.userForm.imageAddress = res.data.pic_url
        console.log(this.userForm.imageAddress)
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
      // ******************提交或者保存功能的统合***************//
      submitForm (formName) {
        console.log(this.userForm)
        if (this.checkoutUsertableId.userTableId === '0') {
          console.log('tongguo')
          this.$refs[formName].validate((valid) => {
            console.log('tongguo2')
            if (valid) {
              // 这里将人员表单上传到后台,需要加一个判断，Id为0则是新增，不然则是修改
              let success = this.getdataUtil2()
              if (success === 0) {
              // 新增人员点击保存之后需要重置表单 0表示成功
                this.$refs[formName].resetFields()
                this.imageUrl = ''
                this.changeUpdate(true)
                for (let o in this.userForm) {
                  this.userFormOrigin[o] = this.userForm[o]
                }
              } else this.$message.error('提交失败，请稍后再试')
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let success = this.getdataUtil2()
              if (success === 0) {
                this.changeUpdate(true)
                this.changeUserTableId('0')
                this.imageUrl = ''
//              this.$message('这里将表单上传到后台!')
                this.$emit('changeback1')
              } else this.$message.error('保存失败')
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      },
      // ***************重置或者取消功能的统合**************//
      resetForm (formName) {
        if (this.checkoutUsertableId.userTableId === '0') {
          console.log(this.$refs[formName])
          this.$refs[formName].resetFields()
          console.log(this.userForm)
          console.log(this.userFormOrigin)
          // 这里的重新赋值不能去掉，虽然看起来不需要，但是由于watch的原因，
          for (let o in this.userForm) {
            this.userFormOrigin[o] = this.userForm[o]
          }
        } else {
          this.changeUserTableId('0')
          this.$emit('changeback1')
        }
      },
      formatDate (val) {
        console.log(val)
        this.userForm.birthday = val
      },
      // ************根据用户id向后台请求用户信息，id=0表示是新增用户，否则是查看某个用户************//
      getdataUtil1 () {
        request.getdataUtil1(this.userForm.id).then(
          data => {
            console.log(data.data.data)
            this.departmentLists = data.data.data.gro_list
            if (this.userForm.id !== '0') {
              // 这里面department给gro_idid
              this.userForm = data.data.data.emp_detail
              this.imageUrl = this.userForm.imageAddress
            }
            for (let o in this.userForm) {
              this.userFormOrigin[o] = this.userForm[o]
            }
          }, error => {
          for (let o in this.userForm) {
            this.userFormOrigin[o] = this.userForm[o]
          }
          this.loading = false
          this.$message.error(error.toString())
        }
        )
      },
      // **********提交表单信息，无论该表单是保存还是修改，根据id是否为0去判断**************//
      getdataUtil2 () {
        let success = 0
        request.getdataUtil2(this.userForm).then(
          data => {
            console.log(data.data.code)
            success = data.data.code
          }, error => {
          this.$message.error(error.toString())
          success = 1
        }
        )
        return success
      },
      // *************被父组件调用去判断是否有数据改变，有则返回true，没有则false**********//
      jumpValid () {
        for (let i in this.userForm) {
          let length = this.userForm[i].length
          if (this.userForm[i] !== this.userFormOrigin[i] && (i !== 'department')) {
            this.changeFlag(true)
            return true
          } else if (i === 'department') {
            // 这里的array：department被重写了，全部被绑定了observer对象，所以无法直接判定两个数组的数值是否相等，需要比较数组前n-1个
            for (let j = 0; j < length; j++) {
              if (this.userForm[i][j] !== this.userFormOrigin[i][j]) {
                console.log(this.userForm[i] + '::' + this.userForm[i][j])
                console.log(this.userFormOrigin[i] + '::' + this.userFormOrigin[i][j])
                this.changeFlag(true)
                return true
              }
            }
          }
        }
        this.changeFlag(false)
        return false
      },
      // ***********部门选择触发的钩子函数********************//
      handleSeleChan (value) {
        console.log('change事件传入的值:' + value)
        console.log(this.jumpValid())
      },
      // *****************获取cookie********************//
      getCookie: function (cname) {
        var name = cname + '='
        console.log(document.cookie)
        var ca = document.cookie.split(';')
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) === ' ') c = c.substring(1)
          if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
        }
        return ''
      },
      // ***********用于数据重新加载前先将数据变回实例创建时期*******//
      datainit () {
        this.userForm = {
          id: '',
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
          oneCardID: '',
          imageAddress: '',
          pass: '',
          checkPass: '',
          otherPhones: []
        }
        this.detailedDisabled = false
        this.imageUrl = ''
        this.userFormOrigin = {}
        this.leftbutton = '提交'
        this.rightbutton = '重置'
        this.departmentLists = []
      }
    },
    watch: {
      'userForm.cid': function (msg) {
        if (/^\d{6}(1[89]|2[01])\d{2}(0[1-9]|1[012])(0[1-9]|[012]\d|3[01])\d{3}(\d|X|x)$/i.test(msg)) {
          this.userForm.birthday = msg.substring(6, 10) + '-' + msg.substring(10, 12) + '-' + msg.substring(12, 14)
          console.log(msg.substring(15, 16))
          if (msg.substring(16, 17) % 2 === 0) {
            this.userForm.sex = '女'
          } else {
            this.userForm.sex = '男'
          }
        }
      }
    }
  }
</script>

<style scoped>
.StaffIformation{ width:50%;margin-left:150px;float:left}
.FileUpLoad{
  float: left;  }
.avatar-uploader .el-upload {
  border: 1px dashed lightgrey;
  /*border:1px solid lightgrey;*/
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
