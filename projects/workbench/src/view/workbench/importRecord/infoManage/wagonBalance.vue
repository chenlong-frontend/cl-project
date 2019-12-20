<template>
<div class="formBox"  v-loading="formLoading"
     element-loading-text="提交中"
     element-loading-spinner="el-icon-loading"
     element-loading-background="rgba(0, 0, 0, 0)">
  <el-form :model="userForm" :rules="rules" label-width="120px" ref="userForm">
    <div class="wagon">
      <div class="title">地磅基本信息</div>
      <el-form-item label="设备名称:" prop="loado_name">
        <el-input v-model="userForm.loado_name" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="编号:" prop="loado_num">
        <el-input v-model="userForm.loado_num" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="设备位置:" prop="loado_position">
        <el-input v-model="userForm.loado_position" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="设备功能:" prop="loado_function">
        <el-input v-model="userForm.loado_function" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="设备型号:" prop="loado_model">
        <el-input v-model="userForm.loado_model" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="IP地址:" prop="loado_ip">
        <el-input v-model="userForm.loado_ip" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="设备端口:" prop="loado_port">
        <el-input v-model="userForm.loado_port" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="负责人:" prop="loado_linkman">
        <el-input v-model="userForm.loado_linkman" style="width:70%" @click.native="choosePerson = true"  @focus="personChoose"  readonly
                  placeholder="点击选择人员"></el-input>
      </el-form-item>
    </div>

    <!--录像机-->
    <div class="video">
      <div class="title">录像机基本信息</div>
      <el-form-item label="IP地址:" prop="video_ip">
        <el-input v-model="userForm.video_ip" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="端口号:" prop="video_port" >
        <el-input v-model="userForm.video_port" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="userForm.username" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="用户密码:" prop="password">
        <el-input v-model="userForm.password" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="录像机名称:" prop="video_name">
        <el-input v-model="userForm.video_name" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="录像机型号:" prop="video_unit_type">
        <el-input v-model="userForm.video_unit_type" style="width:70%" :disabled="disabled"></el-input>
      </el-form-item>
    </div>

    <!--摄像头-->
    <div class="camera">
      <div class="title">
        <div class="word">摄像头基本信息</div>
        <div class="button1">
          <el-button size="medium" @click="newCamera">新增</el-button>
        </div>
      </div>

      <div class="showCamera">
        <div class="cameraChild" v-for="(item, index) in userForm.camera_list">
          <div class="cameraData">
            <el-form-item label="摄像头型号:" :prop="'camera_list.'+ index + 'camera_unit_type'">
              <el-input v-model="item.camera_unit_type" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="摄像头端口号:" :prop="'camera_list.'+ index + 'camera_port'">
              <el-input v-model="item.camera_port" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="摄像头名称:" :prop="'camera_list.'+ index + 'camera_name'">
              <el-input v-model="item.camera_name" style="width:100%"></el-input>
            </el-form-item>
          </div>
          <div class="deleteButton">
            <el-button size="medium" @click="removeCamera(index)">删除</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="button2">
      <el-button type="primary" @click="resetForm('userForm')">{{leftButton}}</el-button>
      <el-button @click="submitForm('userForm')">{{rightButton}} </el-button>
    </div>

    <el-dialog
      :visible.sync="choosePerson"
      width="860px"
      :append-to-body="true">
      <add-person ref="clear"></add-person>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
    </el-dialog>

  </el-form>
</div>
</template>

<script>
  import request from '@/api/workbench/importRecord/infoManage.js'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import addPerson from '@/view/workbench/components/addPerson.vue'
  export default {
    components: { addPerson },
    props: ['clickId'],
    created () {
      this.getInit()
    },
    computed: {

    },
    watch: {
      clickId: function () {
        this.getInit()
      }
    },
    data () {
      return {
        formLoading: false,
        disabled: false,
        leftButton: '重置',
        rightButton: '提交',
        removeId: [],
//        newData: [],
//        modifyData: [],
        choosePerson: false, //  选人
        userForm: {
          // *****************地磅部分信息********************
          loado_name: '',
          loado_position: '',
          loado_function: '',
          loado_model: '',
          loado_ip: '',
          loado_port: '',
          loado_linkman: '',
          loado_linkman_id: '',
          loado_num: '',
          // **************录像机部分***********
          video_ip: '',
          video_port: '',
          username: '',
          password: '',
          video_name: '',
          video_unit_type: '',
          // ************摄像头部分**********
          camera_list: [
            {camera_unit_type: '', camera_port: '', camera_name: ''}
          ],
          insert_list: [],
          update_list: [],
          delete_list: []
        },
        rules: {

        }
      }
    },
    methods: {
      getInit () {
        if (this.clickId === '0') {
          this.disabled = false
          this.formLoading = false
          this.leftButton = '重置'
          this.rightButton = '提交'
          this.userForm = {
            // *****************地磅部分信息********************
            loado_name: '',
            loado_position: '',
            loado_function: '',
            loado_model: '',
            loado_ip: '',
            loado_port: '',
            loado_linkman: '',
            loado_linkman_id: '',
            loado_num: '',
            // **************录像机部分***********
            video_ip: '',
            video_port: '',
            username: '',
            password: '',
            video_name: '',
            video_unit_type: '',
              // ************摄像头部分**********
            camera_list: [
              {camera_unit_type: '', camera_port: '', camera_name: ''}
            ],
            insert_list: [],
            update_list: [],
            delete_list: []
          }
        } else {
          this.disabled = true
          this.formLoading = false
          this.leftButton = '取消'
          this.rightButton = '保存'
          request.getModifyData({'id': this.clickId}).then(value => {
            this.userForm = value[0]
          })
        }
      },
      // *****************重置按钮*****************
      resetForm (userForm) {
        if (this.clickId === '0') {
          this.$refs[userForm].resetFields()
          this.userForm.camera_list = [{camera_unit_type: '', camera_port: '', camera_name: ''}]
          this.userForm.loado_linkman = ''
        } else {
          this.$emit('change')
        }
      },
      // *******************确认按钮******************
      submitForm (userForm) {
        this.formLoading = true
        if (this.clickId === '0') {
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              request.submitData(this.userForm).then(value => {
                console.log(value.data.data)
                if (value.data.data.code === '6') {
                  this.$notify.error({
                    title: '错误',
                    message: '您输入的编号已重复，请从新输入'
                  })
                } else {
                  this.$refs[userForm].resetFields()
                  this.userForm.camera_list = [{camera_unit_type: '', camera_port: '', camera_name: ''}]
                  this.userForm.loado_linkman = ''
                  this.$emit('change')
                }
                this.formLoading = false
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              this.userForm.insert_list = this.userForm.camera_list.filter(t => {
                if (t.newId === '1') {
                  return t
                }
              })
              this.userForm.update_list = this.userForm.camera_list.filter(m => {
                if (!m.newId) {
                  return m
                }
              })
              this.userForm.delete_list = Array.from(this.removeId)
              console.log(this.userForm.insert_list)
              console.log('***********')
              console.log(this.userForm.update_list)
              console.log('***************')
              console.log(this.userForm.delete_list)
              console.log('*********************')
              console.log(this.removeId)
              request.submitData1(this.userForm).then(value => {
                this.$emit('change')
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      },
      // ***************新建一个摄像头******************
      newCamera () {
        if (this.clickId === '0') {
          this.userForm.camera_list.push({camera_unit_type: '', camera_port: '', camera_name: ''})
        } else {
          this.userForm.camera_list.push({camera_unit_type: '', camera_port: '', camera_name: '', newId: '1'})
        }
      },
      // ****************删除一个摄像头*****************
      removeCamera (val) {
        console.log(val, this.userForm.camera_list[val].camera_id)
        if (this.clickId === '0') {
          this.userForm.camera_list.splice(val, 1)
        } else {
          if (!this.userForm.camera_list[val].newId) {
            this.removeId.push(this.userForm.camera_list[val].camera_id)
          }
          this.userForm.camera_list.splice(val, 1)
          console.log(this.removeId)
        }
      },
      // ************选人*************
      personChoose () {
        this.choosePerson = true
      },
      // *****************确认按钮***************
      confirm () {
        this.choosePerson = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          console.log(value)
          this.userForm.loado_linkman = value.managerName
          this.userForm.loado_linkman_id = value.managerID
        })
      }
    }
  }
</script>

<style scoped>
  .formBox{height: 540px;}
  .title{padding-bottom: 15px;}
 .wagon, .video{width:32%; float:left;height: 450px;}
 .camera{width:35%;float:left;height: 480px;}
  .button2{width:15%;margin-left: 85%;}
  .showCamera{height: 400px;overflow:auto;}
  .showCamera .cameraData{margin-bottom: 30px;display: inline-block;width:79%;}
  .showCamera .deleteButton{display:inline-block;width:20%;}
  .word, .button1{display: inline-block;}
  .word{width:80%;}
</style>
