<template>
  <div class="tp_changemsg">
    <!--查看-->
    <el-form
      v-show="flag.showPage"
      :model="ruleForm2"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名: " prop="emp_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.emp_name"></span>
      </el-form-item>
      <el-form-item label="出生年月: " prop="age" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.age" v-show-no="[ruleForm2.age]"></span>
      </el-form-item>
      <el-form-item label="性别: " prop="sex" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.sex" v-show-no="[ruleForm2.sex]"></span>
      </el-form-item>
      <el-form-item label="身份证: " prop="cid" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.cid" v-show-no="[ruleForm2.cid]"></span>
      </el-form-item>
      <el-form-item label="手机号: " prop="phone" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.phone" v-show-no="[ruleForm2.phone]"></span>
      </el-form-item>
      <el-form-item label="邮箱: " prop="email" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.email" v-show-no="[ruleForm2.email]"></span>
      </el-form-item>
      <el-form-item label="工号: " prop="emp_num" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.emp_num" v-show-no="[ruleForm2.emp_num]"></span>
      </el-form-item>
      <el-form-item label="公司部门: " prop="gro_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.gro_name" v-show-no="[ruleForm2.gro_name]"></span>
      </el-form-item>
      <el-form-item label="职务: " prop="role_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.role_name" v-show-no="[ruleForm2.role_name]"></span>
      </el-form-item>
      <el-form-item label="项目名称: " prop="pro_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.pro_name" v-show-no="[ruleForm2.pro_name]"></span>
      </el-form-item>
      <el-form-item label="工种: " prop="work_type" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.work_type" v-show-no="[ruleForm2.work_type]"></span>
      </el-form-item>
      <el-form-item style="margin-left: 25%">
        <el-button size="small" style="margin-left: 50%" @click="closeMsg">返回</el-button>
        <el-button type="primary" @click="linkToEdit" size="small"> 修改</el-button>
      </el-form-item>
      <div class="showImg">
        <div class="showImgBox">
          <img v-header-load="this.ruleForm2.emp_avatar" >
          <div class="showImgMsg">当前头像</div>
        </div>
      </div>
    </el-form>
    <!--修改-->
    <el-form
      v-show="flag.editPage"
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名: " prop="emp_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span v-text="ruleForm2.emp_name" style="color: #ccc"></span>
      </el-form-item>
      <el-form-item label="出生年月: " prop="age" size="small">
        <el-date-picker
          v-model="ruleForm2.age"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          :default-value="ruleForm2.age"
          style="width: 25%;"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="性别: " prop="sex" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.sex" style="color: #ccc" v-show-no="[ruleForm2.sex]"></span>
      </el-form-item>
      <el-form-item label="身份证: " prop="cid" size="small" >
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.cid" style="color: #ccc" v-show-no="[ruleForm2.cid]"></span>
      </el-form-item>
      <el-form-item label="手机号: " prop="phone" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.phone" style="color: #ccc" v-show-no="[ruleForm2.phone]"></span>
      </el-form-item>
      <el-form-item label="邮箱: " prop="email" size="small">
        <el-input type="text" v-model="ruleForm2.email" auto-complete="off" style="width: 38%"></el-input>
      </el-form-item>
      <el-form-item label="工号: " prop="emp_num" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.emp_num" style="color: #ccc" v-show-no="[ruleForm2.emp_num]"></span>
      </el-form-item>
      <el-form-item label="公司部门: " prop="gro_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.gro_name" style="color: #ccc" v-show-no="[ruleForm2.gro_name]"></span>
      </el-form-item>
      <el-form-item label="职务: " prop="role_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.role_name" style="color: #ccc" v-show-no="[ruleForm2.role_name]"></span>
      </el-form-item>
      <el-form-item label="项目名称: " prop="pro_name" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.pro_name" style="color: #ccc" v-show-no="[ruleForm2.pro_name]"></span>
      </el-form-item>
      <el-form-item label="工种: " prop="work_type" size="small">
        &nbsp;&nbsp;&nbsp;&nbsp;<span v-text="ruleForm2.work_type" style="color: #ccc" v-show-no="[ruleForm2.work_type]"></span>
      </el-form-item>
      <el-form-item style="margin-left: 25%">
        <el-button @click="backToshow" size="small" style="margin-left: 50%">返回</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')" size="small"  :loading="formLoading" ><span v-show="!formLoading">提交</span><span v-show="formLoading">提交中</span></el-button>
      </el-form-item>
      <div class="imgUpLoad">
        <div class="imgBox">
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
        <div class="imgMsg">点击上传头像</div>
      </div>
    </el-form>
  </div>
</template>
<script>
import changeRequest from '@/api/comm/changeMsg.js'
export default {
  created () {
    this.dataInit()
    this.ajaxGet()
  },
  data () {
    return {
      formLoading: false,
      flag: {
        showPage: true,
        editPage: false
      },
      ruleForm2: {
        emp_name: '',  // 姓名
        emp_id: '',   // 员工id
        emp_num: '',  // 工号
        age: '',      // 出生年月
        sex: '',      // 性别
        cid: '',      // 身份证
        phone: '',     // 手机号
        email: '',     // 邮箱
        gro_name: '', // 公司部门
        role_name: '', // 职务
        pro_name: '',  // 项目名称
        work_type: '',  // 工种
        emp_avatar: '',  // 头像地址
        img_address: ''  // 返回的头像地址
      },
      uploadData: {
        type: 12,
        data: JSON.stringify({flag: 2}),
        md5: '123'
      },
      imageUrl: '',
      rules2: {
        age: [
          { required: true, message: '不得为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '不得为空', trigger: 'blur' },
          { validator: this.regExp('email'), trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ajaxGet () {
      changeRequest.getpersonMsg().then(
        data => {
          console.log(data)
          this.ruleForm2 = data
          // this.imageUrl = data.emp_avatar
        }
      )
    },
    dataInit () {
      this.formLoading = false
      this.flag = {
        showPage: true,
        editPage: false
      }
      this.ruleForm2 = {
        emp_name: '',  // 姓名
        emp_id: '',   // 员工id
        emp_num: '',  // 工号
        age: '',      // 出生年月
        sex: '',      // 性别
        cid: '',      // 身份证
        phone: '',     // 手机号
        email: '',     // 邮箱
        gro_name: '', // 公司部门
        role_name: '', // 职务
        pro_name: '',  // 项目名称
        work_type: '',  // 工种
        emp_avatar: '',  // 头像地址
        img_address: ''  // 返回的头像地址
      }
      this.imageUrl = ''
    },
    linkToEdit () {
      this.flag.showPage = false
      this.flag.editPage = true
    },
    backToshow () {
      this.flag.showPage = true
      this.flag.editPage = false
    },
    closeMsg () {
      this.$emit('close-msg')
    },
    submitForm (formName) {
      if (this.formLoading) return false
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm2.img_address) {
            let senditem = {
              'emp_id': this.ruleForm2.emp_id,
              'email': this.ruleForm2.email,
              'emp_avatar': this.ruleForm2.img_address
            }
            console.log(senditem)
            this.formLoading = true
            changeRequest.changePersonMsg(senditem).then(
              data => {
                let sendData = {
                  code: data.data.code,
                  emp_avatar: senditem.emp_avatar
                }
                this.formLoading = false
                this.$emit('change-msg', sendData)
              }
            )
          } else {
            let senditem = {
              'emp_id': this.ruleForm2.emp_id,
              'email': this.ruleForm2.email,
              'emp_avatar': this.ruleForm2.emp_avatar
            }
            console.log(senditem)
            this.formLoading = true
            changeRequest.changePersonMsg(senditem).then(
              data => {
                let sendData = {
                  code: data.data.code,
                  emp_avatar: senditem.emp_avatar
                }
                this.formLoading = false
                this.$emit('change-msg', sendData)
              }
            )
          }
          this.dataInit()
          this.ajaxGet()
        } else {
          this.$notify({
            title: '警告',
            message: '请将信息填写正确！',
            type: 'warning'
          })
        }
      })
    },
    // ******************图片上传的操作*******************//
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      // imagUrl是本页面直接显示的图片对象的地址，
      console.log(res)
      // 上传完成后后台将图片地址传给我，然后将地址放入表单中，再点击提交之后传给后台入库 imagAddress是最终上传的地址
      this.ruleForm2.img_address = res.data.pic_url
      console.log(this.ruleForm2.img_address)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$notify({
          title: '警告',
          message: '上传头像图片只能是JPG 格式!',
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$notify({
          title: '警告',
          message: '上传头像图片大小不能超过 2MB!',
          type: 'warning'
        })
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style scoped>

</style>
