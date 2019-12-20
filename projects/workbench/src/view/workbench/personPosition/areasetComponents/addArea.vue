<template>
  <div class="tp_addArea">
    <el-form label-width="130px"
             :model="formLabelAlign"
             ref="formLabelAlign"
             class="demo-ruleForm">
      <!--左边-->
      <el-aside width="48%" style="padding-left: 6%;padding-top: 20px">
        <el-form-item label="区域名称：" prop="zone_name">
          <el-input v-model="formLabelAlign.zone_name"  style="width: 58%" ></el-input>
        </el-form-item>
        <el-form-item label="区域负责人：" prop="emp_name">
          <el-input v-model="formLabelAlign.emp_name" @click.native="showChoose" readonly class="inputstyle" placeholder="点击选择区域负责人"></el-input>
        </el-form-item>
        <el-form-item label="负责人联系方式：" prop="emp_phone">
          <el-input v-model="formLabelAlign.emp_phone" readonly class="inputstyle"></el-input>
        </el-form-item>
        <el-form-item label="定位点1经纬度：">
          <span>W：</span><el-input v-model="formLabelAlign.pos_one_lat" readonly class="inputstyle2" ></el-input>
          <span>E：</span><el-input v-model="formLabelAlign.pos_one_lng" readonly class="inputstyle2" ></el-input>
        </el-form-item>
        <el-form-item label="定位点2经纬度：">
          <span>W：</span><el-input v-model="formLabelAlign.pos_two_lat" readonly class="inputstyle2" ></el-input>
          <span>E：</span><el-input v-model="formLabelAlign.pos_two_lng" readonly class="inputstyle2" ></el-input>
        </el-form-item>
      </el-aside>
      <!--右边-->
      <el-aside width="48%" class="rightbox">
        <el-form-item label="区域平面图：" prop="name" style="margin-top: 20px;">
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
            <div class="imgMsg">点击上传图片</div>
          </div>
        </el-form-item>
        <el-form-item label="上传平面图朝向：" prop="pic_direct_name" style="margin-top: 200px" label-width="160px">
          <el-input v-model="formLabelAlign.pic_direct_name" readonly class="inputstyle2" style="width:120px;" ></el-input>
          <!--<el-select v-model="formLabelAlign.region" placeholder="请选择朝向">-->
            <!--<el-option label="东" value="east"></el-option>-->
            <!--<el-option label="西" value="west"></el-option>-->
            <!--<el-option label="南" value="south"></el-option>-->
            <!--<el-option label="北" value="north"></el-option>-->
          <!--</el-select>-->
        </el-form-item>
      </el-aside>
      <div class="line_hr2"></div>
      <el-form-item style="margin-top: 20px;margin-left: 60%">
        <el-button type="primary" @click="submitForm" :loading="formLoading" ><span v-show="!formLoading">确认提交</span><span v-show="formLoading">提交中</span></el-button>
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
  import request from '@/api/workbench/personPosition/areaSet'
  import { mapMutations } from 'vuex'
  export default {
    components: { addPerson },
    data () {
      return {
        formLoading: false,
        formLabelAlign: {
          zone_name: '',
          emp_name: '',
          manager: '',
          pos_one_lng: '',
          pos_one_lat: '',
          pos_two_lat: '',
          pos_two_lng: '',
          pic_direct: '',
          pic_direct_name: '',
          pic: ''
        },
        // 上传图片用
        uploadData: {
          type: 123,
          data: JSON.stringify({flag: 2, tag: 0}),
          md5: '123'
        },
        imageUrl: '',
        editInnerDialog: false
      }
    },
    methods: {
      ...mapMutations('area', ['changeAddAreaFlag']),
      dataInit () {
        this.formLabelAlign = {
          zone_name: '',
          manager: '',
          emp_name: '',
          pos_one_lng: '',
          pos_one_lat: '',
          pos_two_lat: '',
          pos_two_lng: '',
          pic_direct: '',
          pic_direct_name: '',
          pic: ''
        }
        this.formLoading = false
        this.editInnerDialog = false
        this.imageUrl = ''
      },
      editConfirm () {
        this.editInnerDialog = false
        this.$refs.clear.clearAll()
        newitem.getManagerData().then(value => {
          this.formLabelAlign.emp_name = value.managerName
          this.formLabelAlign.manager = value.managerID
          this.formLabelAlign.emp_phone = value.managePhone
        })
        console.log(this.formLabelAlign)
      },
      submitForm () {
        console.log(this.formLabelAlign)
        if (this.formLabelAlign.zone_name === '' || this.formLabelAlign.manager === '' || this.imgUrl === '') {
          this.$notify({
            title: '警告',
            message: '请将信息填写完整',
            type: 'warning'
          })
        } else {
          let item = {
            zone_name: this.formLabelAlign.zone_name,
            manager: this.formLabelAlign.manager,
            pos_one_lng: this.formLabelAlign.pos_one_lng,
            pos_one_lat: this.formLabelAlign.pos_one_lat,
            pos_two_lat: this.formLabelAlign.pos_two_lat,
            pos_two_lng: this.formLabelAlign.pos_two_lng,
            pic_direct: this.formLabelAlign.pic_direct,
            pic: this.formLabelAlign.pic
          }
          this.formLoading = true
          request.addArea(item).then(
            data => {
              if (data.data.code === 0) {
                this.$refs.formLabelAlign.resetFields()
                this.dataInit()
                this.$notify({
                  title: '成功',
                  message: '添加成功！',
                  type: 'success'
                })
                this.changeAddAreaFlag('1')
                this.formLoading = false
              } else {
                this.$notify({
                  title: '警告',
                  message: '上传失败，亲重新尝试',
                  type: 'warning'
                })
              }
              this.formLoading = false
            }
          )
        }
      },
      resetForm (formName) {
        console.log(formName)
        this.$refs[formName].resetFields()
        this.dataInit()
      },
      // ******************图片上传的操作*******************//
      handleAvatarSuccess (res, file) {
        let direc = ['东', '西', '南', '北']
        this.imageUrl = URL.createObjectURL(file.raw)
        // imagUrl是本页面直接显示的图片对象的地址，
        console.log(res)
        // 上传完成后后台将图片地址传给我，然后将地址放入表单中，再点击提交之后传给后台入库 imagAddress是最终上传的地址
        this.formLabelAlign.pic = res.data.pic_url
        this.formLabelAlign.pos_one_lng = res.data.pos_one_lng
        this.formLabelAlign.pos_one_lat = res.data.pos_one_lat
        this.formLabelAlign.pos_two_lat = res.data.pos_two_lat
        this.formLabelAlign.pos_two_lng = res.data.pos_two_lng
        // 这里的图片方向需要做处理
        this.formLabelAlign.pic_direct = res.data.pic_direct
        this.formLabelAlign.pic_direct_name = direc[res.data.pic_direct + 1]
        console.log(this.formLabelAlign.pic)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$notify({
            title: '警告',
            message: '上传图片只能是JPG或PNG格式!',
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
      },
      showChoose () {
        this.editInnerDialog = true
      }
    }
  }
</script>
<style scoped>
  .tp_addArea{
    position: relative;
  }
  .el-aside{
    height: 350px;
  }
  .rightbox{
    position: absolute;
    right:0px;
    top:0px;
  }

  /*区域平面图*/
 .imgUpLoad{
    position: absolute;
  }

.imgBox{
    width: 160px;
    height:160px;
    border:1px solid lightgrey;
  }
 .imgMsg{
    text-align: center;
  }
 .imgUpLoad .avatar-uploader .el-upload {
    width: 160px;
    height:160px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
 .imgUpLoad .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
.imgUpLoad .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 160px;
    text-align: center;
  }
.imgUpLoad .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }

  .line_hr2{
    width: 100%;
    height: 3px;
    border-radius: 2px;
    background-color: #ddd;
    margin-top: 50px;
  }
</style>
