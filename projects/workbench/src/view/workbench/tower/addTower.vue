<template>
<div style="overflow: hidden">
  <el-form :model="towerForm" :rules="rules" label-width="120px" ref="towerForm">
    <div style="width: 100%;height: 50%">
    <div style="float: left;width: 50%">
      <p>塔吊基本信息</p>
      <el-form-item label="塔吊名称" prop="name">
        <el-input v-model="towerForm.name" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="所在位置" prop="location">
        <el-input v-model="towerForm.location" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="负责人" prop="responsible">
        <el-input v-model="towerForm.responsible.name" style="width:70%" @click.native="responsibleDialogVisible=true"></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="operator">
        <el-input v-model="this.operatornames" style="width:70%" @click.native="operatorDialogVisible=true"></el-input>
      </el-form-item>
      <div>
        <div style="float: left;width: 40%">
      <el-form-item label="经度(E)" prop="JD">
        <el-input v-model="towerForm.JD" style="width:100%"></el-input>
      </el-form-item>
        </div>
        <div style="float: left;width: 40%;margin-left: -40px">
      <el-form-item label="纬度(N)" prop="WD" >
      <el-input v-model="towerForm.WD" style="width:100%"></el-input>
      </el-form-item>
        </div>
      </div>
    </div>

    <div style="float: left;width:50%;height: 100%">
      <p>塔吊配置信息</p>
      <el-form-item label="塔吊型号" prop="type">
        <el-input v-model="towerForm.type" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="安全吊重(吨)" prop="safeWeight">
        <el-input v-model="towerForm.safeWeight" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="最高倍率" prop="topRatio">
        <el-input v-model="towerForm.topRatio" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="安全高度(m)" prop="safeHeight">
        <el-input v-model="towerForm.safeHeight" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="towerForm.remark" style="width:70%"></el-input>
      </el-form-item>
    </div>
    </div>

    <div style="width: 100%;height: 450px">
    <div style="float: left;width:500px;">
      <p>塔吊网络信息配置</p>
      <el-form-item label="塔吊IP地址" prop="IP">
        <el-input v-model="towerForm.IP" style="width:70%"></el-input>
      </el-form-item>
      <el-form-item label="端口号" prop="port">
        <el-input v-model="towerForm.port" style="width:70%"></el-input>
      </el-form-item>
    </div>
      <div style="float: left;width: 450px;margin-right: 300px">
        <p>塔吊视频监控配置 <el-button type="small" style="margin-left: 10%" @click="addCCTV()">新增监控</el-button></p>
        <div style="height: 200px;overflow: auto">
          <div v-for="(cctv,index) in towerForm.CCTVInfo" style="margin-bottom: 10px;overflow: hidden" :key="index">
            <div style="float: left;width: 80%;">
              <el-form-item :prop="'CCTVInfo.'+index+'.camera_name'" label="监控名称" :rules="{required: true, message: '请输入监控名称', trigger: 'blur'}">
                <el-input v-model="cctv.camera_name" style="width:70%"></el-input><br>
              </el-form-item>
              <el-form-item :prop="'CCTVInfo.'+index+'.camera_unit_type'" label="监控型号" :rules="{required: true, message: '请输入监控型号', trigger: 'blur'}">
                <el-input v-model="cctv.camera_unit_type" style="width:70%"></el-input><br>
              </el-form-item>
              <el-form-item :prop="'CCTVInfo.'+index+'.camera_port'" label="端口号" :rules="[
            { required: true, message: '请填写端口号', trigger: 'blur' }
//            { validator: this.regExp('ipPort'), trigger: 'blur' }
          ]">
                <el-input v-model="cctv.camera_port" style="width:70%"></el-input><br>
              </el-form-item>
            </div>
            <div style="float: left;width: 20%;margin-top: 60px">
              <el-button type="small" @click="deleteCCTV(index)">删除</el-button>
            </div>
          </div>
        </div>
      </div>
    <div style="float: left;width:500px;margin-left: 500px;margin-top: -400px" >
      <p>塔吊录像机配置</p>
        <div style="float: left;width: 100%;">
          <el-form-item prop="username" label="用户名" :rules="{required: true, message: '请输入录像机用户名', trigger: 'blur'}">
            <el-input v-model="towerForm.username" style="width:70%" :disabled="isChange"></el-input><br>
          </el-form-item>
          <el-form-item prop="password" label="密码" :rules="{required: true, message: '请输入录像机密码', trigger: 'blur'}">
            <el-input v-model="towerForm.password" style="width:70%" :disabled="isChange"></el-input><br>
          </el-form-item>
          <el-form-item prop="video_unit_type" label="录像机型号" :rules="{required: true, message: '请输入录像机型号', trigger: 'blur'}">
            <el-input v-model="towerForm.video_unit_type" style="width:70%" :disabled="isChange"></el-input>
          </el-form-item>
          <el-form-item prop="video_ip" label="IP地址">
            <el-input v-model="towerForm.video_ip" style="width:70%" :disabled="isChange"></el-input>
          </el-form-item>
          <el-form-item prop="video_port" label="端口号">
            <el-input v-model="towerForm.video_port" style="width:70%" :disabled="isChange"></el-input>
          </el-form-item>
        </div>
    </div>
    </div>
    <div style="float:right;margin-top:0;margin-right: 75px">
      <el-button type="primary" @click="resetForm('towerForm')">重置</el-button>
      <el-button @click="submitForm('towerForm')">确认</el-button>
    </div>
  </el-form>
  <el-dialog title="塔吊负责人"
             :visible.sync="responsibleDialogVisible"
             :append-to-body="true"
             width="1000px">
    <CTR @addResponsible="addResponsible" ref="CTR"></CTR>
  </el-dialog>
  <el-dialog title="塔吊操作人"
             :visible.sync="operatorDialogVisible"
             :append-to-body="true"
             :before-close="CTOClose"
             width="1000px">
    <CTO @addOperator="addOperator" :into="this.towerForm.operator" ref="CTO"></CTO>
  </el-dialog>
</div>
</template>

<script>
  import CTR from '@/view/workbench/tower/towerInfo/chooseTowerResponsible.vue'
  import CTO from '@/view/workbench/tower/towerInfo/chooseTowerOperator.vue'
  import request from '@/api/workbench/tower/addTower.js'
  export default {
    created () {
      console.log('表单建立')
      this.init(this.clickid)
    },
    components: {CTR, CTO},
    name: '',
    props: ['clickid'],
    data () {
      return {
        responsibleDialogVisible: false,
        operatorDialogVisible: false,
        isChange: false,
        towerForm: {
          id: '0',
          name: '一号塔吊',
          location: '西南角2',
          responsible: {emp_id: '1212121', name: '张三'},
          operator: [
            {emp_id: '10', name: '张三1'},
            {emp_id: '11', name: '李四'},
            {emp_id: '12', name: '王二'}],
          JD: '60',
          WD: '120',
          type: '22',
          safeWeight: '120',
          topRatio: '2',
          safeHeight: '30',
          remark: '小心操作',
          IP: '192.168.0.1',
          port: '8888',
          video_id: '111',
          username: '1',
          password: '1',
          video_unit_type: '1',
          video_ip: '1',
          video_port: '1',
          CCTVInfo: [
            {camera_id: '20180118190508853', camera_name: '一号监控', camera_unit_type: '12型', camera_port: '2222'},
            {camera_id: '20180118190508853', camera_name: '二号监控', camera_unit_type: '12型', camera_port: '2222'}
          ],
          deleteCCTVInfo: [],
          addCCTVInfo: [],
          updateCCTVInfo: []
        },
        operatornames: '',
        rules: {
          name: [
            { required: true, message: '请填写姓名', trigger: 'blur' }
          ],
          location: [
            { required: true, message: '请填写位置', trigger: 'blur' }
          ],
//          sex: [
//            { required: true, message: '请选择性别', trigger: 'change' }
//          ],
          JD: [
            { required: true, message: '请填写经度', trigger: 'blur' },
            { validator: this.regExp('jwdNum'), trigger: 'blur' }
          ],
          WD: [
            { required: true, message: '请填写纬度', trigger: 'blur' },
            { validator: this.regExp('jwdNum'), trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请填写型号', trigger: 'blur' }
          ],
          safeWeight: [
            { required: true, message: '请填写安全吊重', trigger: 'blur' }
          ],
          topRatio: [
            { required: true, message: '请填写最高倍率', trigger: 'blur' }
          ],
          safeHeight: [
            { required: true, message: '请填写安全高度', trigger: 'blur' }
          ],
//          remark: [
//            { required: true, message: '请填写手机号码', trigger: 'blur' }
//          ],
          IP: [
            { required: true, message: '请填写IP地址', trigger: 'blur' },
            { validator: this.regExp('ipAddress'), trigger: 'blur' }
          ],
          port: [
            { required: true, message: '请填写端口号', trigger: 'blur' },
            { validator: this.regExp('ipPort'), trigger: 'blur' }
          ],
          video_port: [
            { required: true, message: '请填写端口号', trigger: 'blur' },
            { validator: this.regExp('ipPort'), trigger: 'blur' }
          ],
          video_ip: [
            { required: true, message: '请填写IP地址', trigger: 'blur' },
            { validator: this.regExp('ipAddress'), trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
    },
    computed: {},
    methods: {
      init (val) {
        // 传过来的是塔吊id，如果塔吊id是0，则是新增
        this.isChange = (val !== '0')
        if (val === '0') {
          this.towerForm = {
            id: '0',
            name: '',
            location: '',
            responsible: {},
            operator: [],
            JD: '',
            WD: '',
            type: '',
            safeWeight: '',
            topRatio: '',
            safeHeight: '',
            remark: '',
            IP: '',
            port: '',
            video_id: '0',
            username: '',
            password: '',
            video_unit_type: '',
            video_ip: '',
            video_port: '',
            CCTVInfo: [
            {camera_id: '0', camera_name: '', camera_unit_type: '', camera_port: ''}
            ],
            deleteCCTVInfo: [],
            addCCTVInfo: [],
            updateCCTVInfo: []
          }
        } else {
          request.getForm(this.clickid).then(
            data => {
              this.towerForm = data.data.data
              this.towerForm.JD = '' + this.towerForm.JD
              this.towerForm.WD = '' + this.towerForm.WD
              this.towerForm.deleteCCTVInfo = []
            },
            error => {
              console.log(error)
            }
          )
        }
      },
      deleteCCTV (val) {
        console.log(val)
        if (val !== -1) {
          if (this.towerForm.CCTVInfo[val].camera_id !== '0') {
            this.towerForm.deleteCCTVInfo.push(this.towerForm.CCTVInfo[val].camera_id)
          }
          this.towerForm.CCTVInfo.splice(val, 1)
        }
      },
      addCCTV () {
        this.towerForm.CCTVInfo.push({camera_id: '0', camera_name: '', camera_unit_type: '', camera_port: ''})
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.divideCCTV()
            console.log('========')
            console.log(this.towerForm)
            request.submitForm(this.towerForm).then(
              data => {
                if (data.data.code === 0) {
                  this.$message.success('提交成功')
                  // 成功之后的回调
                  this.$emit('submitFnc', true)
                } else this.$message.error('提交失败')
              },
              error => {
                console.log(error)
              }
            )
            return true
          } else {
            this.$message.warning('表单填写错误')
            return false
          }
        }
        )
      },
      resetForm (towerForm) {
        this.init(this.clickid)
      },
      addResponsible (selection) {
        if (selection.name !== undefined) {
          this.towerForm.responsible = selection
        }
        this.responsibleDialogVisible = false
      },
      addOperator (selections) {
        if (selections !== 'undo') {
          this.towerForm.operator = selections
        }
        this.operatorDialogVisible = false
      },
      setNames () {
        let length = this.towerForm.operator.length
        let names = ''
        for (let i = 0; i < length; i++) {
          names = names + this.towerForm.operator[i].name + ';'
        }
        names = names.substring(0, names.length - 1)
        this.operatornames = names
      },
      divideCCTV () {
        this.towerForm.addCCTVInfo = []
        this.towerForm.updateCCTVInfo = []
        for (let i = 0; i < this.towerForm.CCTVInfo.length; i++) {
          if (this.towerForm.CCTVInfo[i].camera_id === '0') {
            delete this.towerForm.CCTVInfo[i].camera_id
            this.towerForm.addCCTVInfo.push(this.towerForm.CCTVInfo[i])
          } else this.towerForm.updateCCTVInfo.push(this.towerForm.CCTVInfo[i])
        }
        console.log(this.towerForm)
      },
      CTOClose (done) {
        this.$refs.CTO.refresh()
        done()
      }
    },
    // 通过观察父组件传过来的我、clickid去动态调用初始化方法，后面需要在表单确认之后，将该组件的clickid重新置为0
    watch: {
      clickid (val) {
        // 组件会懒加载，所以不能讲clearValidate放到init里面，因为第一次没有表单，这个函数会显示为找不到
        this.$refs.towerForm.clearValidate()
        this.init(val)
      },
      'towerForm.operator' () {
        this.setNames()
      }
    }
  }
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 6px;
  }/* 滚动条整体宽度 */
  ::-webkit-scrollbar-track{
    background-color: #F3F3F4;
  }/* 滚动条的滑轨背景颜色 */
  ::-webkit-scrollbar-thumb{
    background-color: #DAE4E5;
    border-radius: 3px;
  }/* 滚动条的滑块背景颜色 */
  ::-webkit-scrollbar-corner {
    background-color: #B0AFB0;
  } /* 横向滚动条和纵向滚动条相交处尖角的颜色 */
</style>
