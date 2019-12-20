<template>
    <div class="edit">
        <!-- 修改信息的内容 -->
        <div class="editBox">
            {{tab}}
            <el-form :model="form" status-icon :rules="rules" ref="form" class="demo-ruleForm" label-width="150px" :label-position="labelPosition">
                <el-form-item label="公司/机构名称" prop="name" class="row">
                    <el-input v-model="form.name" class="name" size='small' placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="公司/机构别名" prop="alias" class="row">
                    <el-input  v-model="form.alias" placeholder="请输入内容" class="name" size='small'></el-input>
                </el-form-item>
                <el-form-item label="公司/机构简介" prop="desc" class="row">
                    <el-input v-model="form.desc" type="textarea" :rows="4" resize="none" placeholder="请输入内容" class="desc" size='small'></el-input>
                </el-form-item>
                <el-form-item label="领导班子" class="row" v-show="!showSub">
                    <el-input v-model="form.leaders"  placeholder="点击选择人员" class="addPer" size='small' @focus="addPerson"></el-input>
                </el-form-item>
                <el-form-item label="领导班子"class="row" v-show="showSub">
                    <el-input v-model="form.leaders"  placeholder="点击选择人员" class="addPer" size='small' @focus="addPerson"></el-input>
                </el-form-item>
                <el-form-item label="超级管理员" class="row">
                    <el-input v-model="form.super_manager" @blur="outFocus(form.super_manager)" placeholder="请输入超级管理员" class="name" size='small'></el-input>
                </el-form-item>
                <el-dialog
                    :visible.sync="addPer"
                    width="860px"
                    :append-to-body="true">
                    <leader :type="type" ref="clear"></leader>
                    <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirm">确 定</el-button>
                    </span>
                </el-dialog>
                <el-form-item label="电话" class="row" prop="phone">
                     <el-input v-model.number="form.phone" placeholder="请输入内容" class="name" size='small'></el-input>
                </el-form-item>
                <el-form-item label="邮箱" class="row" prop="email">
                    <el-input v-model="form.email" placeholder="请输入内容" class="email" size='small'></el-input>
                </el-form-item>
                <el-form-item label="传真" class="row" prop="fax">
                    <el-input v-model.number="form.fax" placeholder="请输入内容" class="name" size='small'></el-input>
                </el-form-item>
                <el-form-item label="地址" class="row" prop="address">
                    <el-input v-model="form.address" type="textarea" resize="none" :rows="4" placeholder="请输入内容" class="desc" size='small'></el-input>
                </el-form-item>
                <el-form-item label="公司备注" class="row" prop="remark">
                    <el-input v-model="form.remark" type="textarea" resize="none" :rows="4" placeholder="请输入内容" class="desc" size='small'></el-input>
                </el-form-item>
            <div id="hBigBox" class="hBigBox">
                <div class="honourBox"  v-show="!showSub">
                    <span class="left">项目成果/荣誉：</span>
                    <div class="honour" v-for="(itemm,index) in form.pro_success" :key="index">
                        <div class="row">
                            <span class="honour-left">项目名称：</span>
                            <el-input  placeholder="请输入内容" class="name" size='small' v-model="itemm.name"></el-input>
                        </div>
                        <div class="row">
                            <span class="honour-left">项目图片：</span>
                            <el-upload
                                class="avatar-uploader"
                                :data="uploadData"
                                name="file"
                                action="/zjsbs/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="itemm.pic_url !== ''" :src="itemm.imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon" @click="addImg(index)"></i>
                            </el-upload>
                        </div>
                        <div class="delete" @click="deletePro">
                            <i class="el-icon-minus"></i><p >删除</p>
                        </div>
                    </div>
                </div>
                <span class="left" v-show="showSub">项目成果/荣誉：</span>
                <template  v-for="(item,index) in form.pro_success" >
                    <div class="houBox" :key="index" v-show="showSub">
                        <div class="honour" >
                            <div class="row">
                                <span class="honour-left">项目名称：</span>
                                <el-input v-model="item.name" placeholder="请输入内容" class="name" size='small'></el-input>
                            </div>
                            <div class="row">
                                <span class="honour-left">项目图片：</span>

                                <el-upload
                                    class="avatar-uploader"
                                    :data="uploadData"
                                    name="file"
                                    action="/zjsbs/upload"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <img  v-if="item.imageUrl" :src="item.imageUrl" class="avatar" alt="已上传的项目图片">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" @click="addImg(index)"></i>
                                </el-upload>
                            </div>
                            <div class="delete" @click="deletePro(index)">
                                <i class="el-icon-minus"></i><p >删除</p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="addPro" @click="addHonour">
                <i class="el-icon-plus"></i> <span>添加一个新项目成果/荣誉</span>
            </div>
            <el-button type="primary" class="submit" @click="save('form')" v-show="!showSub" :loading="ban">确认提交</el-button>
            <el-button type="primary" class="submit"  @click="saveEdit('form')" v-show="showSub" :loading="ban">提交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
import request from '@/api/workbench/subCompany/messageList.js'
import newitem from '@/api/workbench/item/management/newItem.js'
import leader from '@/view/workbench/components/addPerson'
export default {
  props: ['formData', 'tab'],
  components: {leader},
  data () {
    var validateTab = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('内容不能全是空格'))
      } else {
        callback()
      }
    }
    return {
      uploadData: {
        type: 12,
        data: JSON.stringify({flag: 2}),
        md5: '123'
      },
      labelPosition: 'right',
      form: {},
      imageUrl: '',
      addPer: false,
      showSub: false,
      ban: false,
      managerState: '',
      type: [1, 2],
      index1: -1,
      rules: {
        name: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: validateTab, trigger: 'blur' }],
        alias: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: validateTab, trigger: 'blur' }],
        desc: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: validateTab, trigger: 'blur' }],
        leader: [{ required: true, message: '不得为空', trigger: 'blur' }],
        phone: [{ required: true, message: '不得为空' },
                { validator: this.regExp('mobile'), trigger: 'blur' }],
        email: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: this.regExp('email'), trigger: 'blur' }],
        fax: [{ required: true, message: '不得为空' },
                { validator: this.regExp('fax'), trigger: 'blur' }],
        address: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: validateTab, trigger: 'blur' }],
        remark: [{ required: true, message: '不得为空', trigger: 'blur' },
                { validator: validateTab, trigger: 'blur' }]
      }
    }
  },
  created () {
    console.log(this.formData)
    this.form = this.formData
    this.id = this.form.id
    if (this.form.id) {
      this.showSub = true
    }
    for (var i = 0; i < this.form.pro_success.length; i++) {
      if (this.form.pro_success[i].pic_url) {
        this.form.pro_success[i].imageUrl = this.form.pro_success[i].pic_url
      }
    }
  },
  methods: {
    addImg (index) {
      this.index1 = index
    },
    //   上传图片成功
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.form.pro_success[this.index1].imageUrl = this.imageUrl
      this.noImg = true
      this.form.pro_success[this.index1].pic_url = res.data.pic_url
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 向后台校验超级管理员
    outFocus (manager) {
      request.validateManager(manager).then(data => {
        this.managerState = data.data
        if (this.managerState === false) {
          this.$notify({
            title: '提示',
            message: '此工号已重复'
          })
        } else {
          this.$notify({
            title: '提示',
            message: '通过'
          })
        }
      })
    },
    //   删除一个项目
    deletePro (index) {
      this.form.pro_success.splice(index, 1)
    },
    // 添加一个新的项目
    addHonour () {
      this.form.pro_success.push({name: '', pic_url: ''})
    },
    // 提交
    saveEdit (form) {
    //   this.form.phone1 = this.form.phone.toString()
    //   this.form.fax1 = this.form.fax.toString()
    //   this.form.pro_success = JSON.stringify(this.form.pro_success)
    //   request.saveEditData(this.form).then(data => {
    //     this.form.pro_success = JSON.parse(this.form.pro_success)
    //     this.ban = true
    //     this.$refs[form].resetFields()
    //     this.$emit('tabRefresh', 'messageList')
    //     this.$emit('refresh', '1')
    //     if (data.code === 0) {
    //     }
    //   })
      this.$refs[form].validate((valid) => {
        if (valid && this.managerState === true) {
          this.form.phone1 = this.form.phone.toString()
          this.form.fax1 = this.form.fax.toString()
          this.form.pro_success = JSON.stringify(this.form.pro_success)
          request.saveEditData(this.form).then(data => {
            this.ban = true
            if (data.code === 0) {
              this.ban = false
              this.form.pro_success = JSON.parse(this.form.pro_success)
              this.$refs[form].resetFields()
              this.$emit('tabRefresh', 'messageList')
              this.$emit('refresh', '1')
            }
          })
        } else {
          this.$refs[form].resetFields()
          this.$message('提交失败')
          return false
        }
      })
    },
    // 确认提交
    save (form) {
      let self = this
      this.$refs[form].validate((valid) => {
        if (valid && this.managerState === true) {
          this.form.phone1 = this.form.phone.toString()
          this.form.fax1 = this.form.fax.toString()
          this.form.pro_success = JSON.stringify(this.form.pro_success)
          request.saveNewData(this.form).then(data => {
            this.ban = true
            if (data.code === 0) {
              this.ban = false
              self.form.pro_success = JSON.parse(this.form.pro_success)
              self.$refs[form].resetFields()
              this.$emit('tabRefresh', 'messageList')
              this.$emit('refresh', '1')
            }
          })
        } else {
          this.$refs[form].resetFields()
          this.$message('提交失败')
          return false
        }
      })
    },
    // 添加人员那里
    addPerson () {
      this.addPer = true
    },
    confirm () {
      this.addPer = false
      newitem.getManagerData().then(data => {
        console.log(data)
        this.form.leaders = data.managerName
      })
    }
  }
}
</script>

<style scoped>
    .edit{
        width:96.3%;
        height: auto;
        margin: 0 auto;
        overflow: auto;
        padding: 20px;
        background: #F3F3F4;
    }
    .editBox{
        margin-left: 50px;
        color:#666666;
    }
    .left{
        display:inline-block;
        width:150px;
        text-align: right;
        margin-right: 50px;
        vertical-align: top;
        font-size: 14px;
    }
    .row{
        margin-bottom: 20px;
    }
    .name{
        width: 200px;
    }
    .addPer{
        width: 200px;
    }
    .email{
        width: 300px;
    }
    .desc{
        width:500px;
    }
    .hBigBox{
        width:724px;
        height: auto;
    }
    .avatar-uploader, .el-upload {
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        width: 200px;
        height: 100px;
        cursor: pointer;
        margin-left: 102px;
        margin-top: -16px;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
    .avatar {
        width: 100%;
        height: 100px;
        display: block;
    }
    .honour{
        /* border:1px solid; */
        width:426px;
        height:197px;
        background: #fff;
        padding:20px 20px 0px 20px;
        box-sizing: border-box;
        display: inline-block;
        margin-left: 154px;
        margin-top: 10px;
        position: relative;
        font-size: 14px;
    }
    .noHour{
        font-size: 20px;
        margin-left: 350px;
        margin-top: 60px;
    }
    .honour-left{
        width:150px;
        vertical-align: top;
        margin-right: 20px;
    }
    .delete{
        width:70px;
        height:197px;
        display:inline-block;
        text-align: center;
        padding-top: 60px;
        box-sizing: border-box;
        background: #E6E6E6;
        color:#666666;
        position: absolute;
        top:0px;
        left:426px;
    }
    .addPro{
        width:500px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        text-align: center;
        margin-left: 154px;
        margin-top: 10px;
        font-size: 14px;
    }
    .submit{
        margin-left: 154px;
        margin-top: 20px;
    }
</style>



