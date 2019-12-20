<template>
  <div class="newItem">
    <el-form label-width="110px"  :model="userForm" ref="userForm" :rules="rules" size="mini">
      <div class="formLeft">
        <el-form-item label="项目名称:" prop="name">
          <el-input v-model="userForm.name" style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="建设单位:" prop="architecture">
          <el-input v-model="userForm.architecture"  style="width:300px" ></el-input>
        </el-form-item>
        <el-form-item label="施工单位:" prop="construction">
          <!--<el-input v-model="userForm.status" style="width:110px"></el-input>-->
          <el-select v-model="userForm.construction" placeholder="请选择" style="width:200px" >
            <el-option
              v-for="item in company"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目编号:" prop="num" >
          <el-input v-model="userForm.num" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="项目状态:" prop="state">
          <!--<el-input v-model="userForm.status" style="width:110px"></el-input>-->
          <el-select v-model="userForm.state" placeholder="请选择" style="width:200px">
            <el-option
              v-for="work in works"
              :key="work.number"
              :label="work.level"
              :value="work.number">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="建筑总面积:" prop="acreage">
          <el-input v-model="userForm.acreage" placeholder="单行输入" style="width:200px" ></el-input> <span id="meter">m²</span>
        </el-form-item>
        <el-form-item label="总造价:" prop="price">
          <el-input v-model="userForm.price"  placeholder="单行输入" style="width:200px"></el-input><span id="money">万元</span>
        </el-form-item>
        <el-form-item label="项目经理:" prop="manager">
          <!--<el-input v-model="userForm.Phone" style="width:110px"></el-input>-->
          <el-input v-model="manager" style="width:200px" @click.native="dialogVisible = true"  @focus="choosePerson1"  readonly
                    placeholder="点击选择人员"></el-input>
        </el-form-item>
        <el-form-item label="项目管理员:" prop="administrator" >
          <el-input v-model="supervise" style="width:200px" @click.native="dialogVisible = true" @focus="choosePerson2"  readonly
                    placeholder="点击选择人员"></el-input>
        </el-form-item>

        <el-form-item label="超级管理员:" prop="pro_manager" >
          <el-input v-model="userForm.pro_manager" style="width:200px" :disabled="disabled"></el-input>
        </el-form-item>


        <el-form-item label="开工日期:"prop="start_time" >
          <el-date-picker
            v-model="userForm.start_time"
            type="date"
            placeholder="选择日期"
            :editable="false"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:200px">
          </el-date-picker>
        </el-form-item>



        <el-form-item label="竣工日期:" prop="end_time">
          <el-date-picker
            v-model="userForm.end_time"
            type="date"
            placeholder="选择日期"
            :editable="false"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width:200px">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="经度:"label-width="100px" prop="longitude" id="longitude">
          <el-input v-model="userForm.longitude" style="width:130px"   placeholder="单行输入"></el-input>
        </el-form-item>

        <el-form-item label="纬度:" label-width="100px" prop="latitude" id="latitude">
          <el-input v-model="userForm.latitude" style="width:130px"   placeholder="单行输入"></el-input>
        </el-form-item>



        <div class="itemArea">
          <el-form-item label="项目区域:" prop="country">
            <el-select v-model="userForm.country" placeholder="请选择"  @change="chooseCountry">
              <el-option
                v-for="item in countries"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="0px" style="padding-left: 5px"  prop="province">
            <el-select v-model="userForm.province" placeholder="请选择" @change="chooseProvince">
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="0px" style="padding-left: 5px"  prop="city">
            <el-select v-model="userForm.city" placeholder="请选择" @change="chooseCity">
              <el-option
                v-for="item in city"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label-width="0px" style="padding-left: 5px"  prop="district">
            <el-select v-model="userForm.district" placeholder="请选择" @change="chooseDistrict">
              <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>


        <el-form-item label="项目详细地址:" prop="address">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="userForm.address">
          </el-input>
        </el-form-item>

        <el-form-item label="项目简介:" prop="desc">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="userForm.desc">
          </el-input>
        </el-form-item>

        <el-form-item label="项目概括图:" prop="picture">
          <el-upload
            class="avatar-uploader"
            action="/zjsbs/upload"
            :data="uploadData"
            name="file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus .avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>


      </div>
      <div class="line"></div>
      <div class="button">
        <el-button type="primary" @click="submitForm('userForm')" :loading="!flag">{{leftbutton}}</el-button>
        <el-button  @click="resetForm('userForm')">{{rightbutton}}</el-button>
      </div>
    </el-form>

    <el-dialog
      :visible.sync="dialogVisible"
      width="860px"
      :append-to-body="true">
      <add-person :type="type" ref="clear"></add-person>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible1"
      width="860px"
      :append-to-body="true">
      <add-person2 :type="type" ref="clear1"></add-person2>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm1">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import choosePerson from '@/view/workbench/components/choosePerson/choosePerson.vue'
  import addPerson from '@/view/workbench/components/addPerson.vue'
  import addPerson2 from '@/view/workbench/components/addPerson2.vue'
  import newitem from '@/api/workbench/item/management/newItem.js'
  import request from '@/api/workbench/item/management/adminTable.js'
  export default {
    components: { choosePerson, addPerson, addPerson2, newitem, request },
    created () {
      console.log(JSON.parse(sessionStorage.userInfo))
      this.getdata()
      // *********************获取工程状态*******************
      newitem.workStatus().then(value => {
        this.works = value
      })
      // **************获取国家*************************
      newitem.getParams().then(value => {
        console.log(value)
        this.countries = value.country
        this.company = value.company
      })
    },
    computed: {
      ...mapGetters('item', ['checkoutItemId'])
    },
    data () {
      return {
        disabled: false,
        uploadData: {
          type: 12,
          data: JSON.stringify({flag: 2}),
          md5: '123'
        },
        config: {
          dataType: 222
        },
        company: [],
        flag: true,
        userForm: {
          name: '',
          architecture: '',
          construction: '',
          num: '',
          state: '',
          acreage: '',
          price: '',
          manager: '',
          administrator: '',
          pro_manager: '',
          start_time: '',
          end_time: '',
          longitude: '',
          latitude: '',
          country: '',
          countryName: '',
          province: '',
          provinceName: '',
          city: '',
          cityName: '',
          district: '',
          districtName: '',
          address: '',
          desc: '',
          id: '',
          original_pic: ''
        },
        manager: '',
        supervise: '',
        rules: {
          name: [
            { required: true, message: '请输入项目名称', trigger: 'blur' }
          ],
          architecture: [
            { required: true, message: '请输入单位名称', trigger: 'blur' }
          ],
          construction: [
            { required: true, message: '请输入施工单位', trigger: 'change' }
          ],
          num: [
            { required: true, message: '请输入编号', trigger: 'blur' }
          ],
          state: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          acreage: [
             { required: true, message: '请选择建筑面积', trigger: 'blur' },
            { validator: this.regExp('number'), trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请选择价格', trigger: 'blur' },
            { validator: this.regExp('number'), trigger: 'blur' }
          ],
          manager: [
            { required: true, message: '请输入项目经理', trigger: 'change' }
          ],
          administrator: [
            { required: true, message: '请输入项目管理员', trigger: 'change' }
          ],
          pro_manager: [
            { required: true, message: '请输入超级管理员', trigger: 'blur' },
            { validator: this.regExp('common'), trigger: 'blur' }
          ],
          start_time: [
            { required: true, message: '请输入开工日期', trigger: 'change' }
          ],
          end_time: [
            { required: true, message: '请输入竣工日期', trigger: 'change' }
          ],
          longitude: [
            { required: true, message: '请输入经度', trigger: 'blur' }
          ],
          latitude: [
            { required: true, message: '请输入纬度', trigger: 'blur' }
          ],
          country: [
            { required: true, message: '请输入国家', trigger: 'change' }
          ],
          province: [
            { required: true, message: '请输入省份', trigger: 'change' }
          ],
          city: [
            { required: true, message: '请输入城市', trigger: 'change' }
          ],
          district: [
            { required: true, message: '请输入县', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入项目简介', trigger: 'blur' }
          ]
        },
        leftbutton: '提交',
        rightbutton: '重置',
        pickerOptions1: {
          disabledDate (time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        imageUrl: '',
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        value: '',
        works: [],
        countries: [],
        province: [],
        city: [],
        district: [],
        type: [1, 2]
      }
    },
    methods: {
      getdata () {
        if (this.checkoutItemId.itemId === 0) {
          this.supervise = ''
          this.manager = ''
          this.userForm = {
            name: '',
            architecture: '',
            construction: '',
            num: '',
            state: '',
            acreage: '',
            price: '',
            manager: '',
            administrator: '',
            pro_manager: '',
            start_time: '',
            end_time: '',
            longitude: '',
            latitude: '',
            country: '',
            countryName: '',
            province: '',
            provinceName: '',
            city: '',
            cityName: '',
            district: '',
            districtName: '',
            address: '',
            desc: '',
            id: '',
            original_pic: ''
          }
          this.supervise = ''
          this.manager = ''
        } else {
          request.returnModifyData().then(value => {
            console.log(value)
            console.log(typeof (value))
            console.log(typeof (this.userForm))
            for (let o in this.userForm) {
              this.userForm[o] = value[o]
            }
            if (value.state === '未开工') {
              this.userForm.state = '0'
            } else if (value.state === '在建') {
              this.userForm.state = '1'
            } else {
              this.userForm.state = '2'
            }
            this.supervise = value.supervise_name
            this.manager = value.manage_name
            this.userForm.construction = value.p_id
            this.userForm.country = Number(this.userForm.country)
            this.userForm.province = Number(this.userForm.province)
            this.userForm.city = Number(this.userForm.city)
            this.userForm.district = Number(this.userForm.district)
            if (!this.userForm.country) {
              this.userForm.country = ''
            }
            if (!this.userForm.province) {
              this.userForm.province = ''
            }
            if (!this.userForm.city) {
              this.userForm.city = ''
            }
            if (!this.userForm.district) {
              this.userForm.district = ''
            }
//            this.userForm.state = Number(this.userForm.state)
//            this.userForm.imageUrl = value.original_pic
            this.imageUrl = this.userForm.original_pic
            console.log(this.userForm.country)
          })
          request.modify1().then(value => {
            console.log(value)
            this.province = value.province
            console.log(this.province)
            this.city = value.city
            this.district = value.district
          })
          // console.log(this.checkoutItemId.itemId)
          this.changeItemId(this.checkoutItemId.itemId)
//          console.log(this.itemId)
//          this.$message('模拟向后台请求id为' + this.checkoutItemId.itemId + '的人的数据')
          this.leftbutton = '保存'
          this.rightbutton = '取消'
          this.disabled = true
        }
      },
      ...mapMutations('item', ['changeItemId']),
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
        console.log(this.imageUrl)
        console.log(res)
        this.userForm.original_pic = res.data.pic_url
      },
      beforeAvatarUpload (file) {
        // const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

//        if (!isJPG) {
//          this.$message.error('上传头像图片只能是 JPG 格式!')
//        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        // return isJPG && isLt2M
        return isLt2M
      },
      submitForm (userForm) {
        if (this.leftbutton === '保存') {
          if (!this.flag) {
            return false
          }
          this.dialogVisible2 = true
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              // **********获取表单验证过后的内容*******************************************
              this.userForm.state = Number(this.userForm.state)
              console.log(this.userForm.state, typeof (this.userForm.state))
              let formData1 = this.userForm
              console.log(formData1)
              if (Date.parse(this.userForm.start_time) > Date.parse(this.userForm.end_time)) {
                this.$notify.error({
                  title: '错误',
                  message: '开工日期不得早于竣工日期'
                })
              } else {
                this.flag = false
                newitem.updateData(formData1).then(value => {
                  this.flag = true
                  this.leftbutton = '提交'
                  this.rightbutton = '重置'
                  this.disabled = false
                  this.$emit('changeback1')
                  this.$refs[userForm].resetFields()
                  this.supervise = ''
                  this.manager = ''
                  this.imageUrl = ''
                })
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          if (!this.flag) {
            return false
          }
          this.$refs[userForm].validate((valid) => {
            if (valid) {
              // **********获取表单验证过后的内容*******************************************
              this.userForm.state = Number(this.userForm.state)
              console.log(this.userForm.state, typeof (this.userForm.state))
              let formData = this.userForm
              if (Date.parse(this.userForm.start_time) > Date.parse(this.userForm.end_time)) {
                this.$notify.error({
                  title: '错误',
                  message: '开工日期不得早于竣工日期'
                })
              } else {
                this.flag = false
                newitem.submitData(formData).then(value => {
                  console.log(value)
                  this.flag = true
                  if (!value) {
                    this.$notify.error({
                      title: '错误',
                      message: '您输入的超级管理员工号已重复，请从新输入'
                    })
                  } else {
                    this.$emit('changeback1')
                  }
                  this.$refs[userForm].resetFields()
                  this.supervise = ''
                  this.manager = ''
                  this.imageUrl = ''
                })
              }
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      },
      resetForm (userForm) {
        if (this.rightbutton === '取消') {
          this.$refs[userForm].resetFields()
          this.supervise = ''
          this.manager = ''
          this.imageUrl = ''
          this.disabled = false
        }
        if (this.rightbutton === '重置') {
          this.$refs[userForm].resetFields()
          this.manager = ''
          this.supervise = ''
          this.imageUrl = ''
        }
        if (this.checkoutItemId.itemId === 0) {
          console.log(this.$refs[userForm])
          this.$refs[userForm].resetFields()
        } else {
          this.changeItemId(0)
          this.leftbutton = '提交'
          this.rightbutton = '重置'
          this.$emit('changeback1')
        }
      },
      choosePerson1 () {
        this.dialogVisible = true
      },
      choosePerson2 () {
        this.dialogVisible1 = true
      },
      chooseCountry (val) {
        // newitem.submitData(this.userForm.address1).then(value => {
        //   this.PersonData = value
        // })
        // console.log(this.userForm.country)
        // console.log(val)
        this.userForm.countryName = val.name
        let selected1 = this.countries.filter(t => {
          return t.id === val
        })
        console.log(selected1)
        this.userForm.countryName = selected1[0].name
        newitem.getRegion(val).then(value => {
          console.log(value)
          this.province = value.data.region
        })
      },
      chooseProvince (val) {
        console.log('province')
        this.userForm.provinceName = val.name
        let selected2 = this.province.filter(t => {
          return t.id === val
        })
        this.userForm.provinceName = selected2[0].name
        console.log(selected2)
        newitem.getRegion(val).then(value => {
          console.log(value)
          this.city = value.data.region
        })
      },
      chooseCity (val) {
        console.log('city')
        this.userForm.cityName = val.name
        let selected3 = this.city.filter(t => {
          return t.id === val
        })
        this.userForm.cityName = selected3[0].name
        newitem.getRegion(val).then(value => {
          console.log(value)
          this.district = value.data.region
        })
      },
      chooseDistrict (val) {
        this.userForm.districtName = val.name
        let selected4 = this.district.filter(t => {
          return t.id === val
        })
        this.userForm.districtName = selected4[0].name
      },
      confirm () {
        this.dialogVisible = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          console.log(value)
          this.userForm.manager = value.managerID
          this.manager = value.managerName
          // console.log(this.userForm.managerId)
        })
      },
      confirm1 () {
        this.dialogVisible1 = false
        this.$refs.clear1.clearAll()
        newitem.getSuperviseData().then(value => {
          this.userForm.administrator = value.superviseID
          this.supervise = value.superviseName
          // console.log(this.userForm.superviseId)
        })
      }
    }
  }
</script>

<style scope>
  /*日期中的图标*/
  .el-tree-node .el-tree-node__content {height: 30px;margin-bottom: 5px;background-color: #F3F3F4;border: 1px solid #E7EAEC;}
  .el-tree-node__children .el-tree-node {padding-left: 30px;}
  .el-tree-node.is-checked .el-tree-node__content{background-color: #EBEBFF;border: 1px solid #C2DFF0;}
  .el-input__prefix, .el-input__suffix {
    position: absolute;
    top:0
  }
  .formLeft{
    width:500px;
    height:1020px;
    float:left;
    padding-left: 100px;

  }
  #meter{
    color: #5a5e66;
    font-size:14px;
  }
  #money{
    color: #5a5e66;
    font-size:14px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 140px;
    float:left;
  }
  #latitude{
    display:inline-block;
  }
  #longitude {
    display: inline-block;
  }
  .itemArea .el-form-item{
    display: inline-block;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width:150px;
    height:150px;
    line-height: 150px;
  }
  .itemArea .el-input{
    width:90px;
  }
  .el-textarea__inner{
    width:300px;

  }
  .line{
    border:2px solid #E6E6E6;
    width:90%;
    margin-top: 40px;
    margin-left:90px;
    clear:both;
  }
  .button{
    width:300px;
    padding-top:30px;
    margin-left:80px;
    padding-left: 100px;
  }
  .button .disapper{
    width:100px;
  }


</style>
