<template>
  <div class="tp_setIndex">
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-left: 20%"
    >
      <el-form-item label="当前首页:">
        <span v-text="form.default_pro"></span>
      </el-form-item>
      <el-form-item label="区域选择:">
        <el-select v-model="form.regain" placeholder="请选择活动区域" style="width: 60%" size="small" @change="changeChoose">
          <template v-for="item in form.other_pro">
            <el-option :label="item.pro_name" :value="item.pro_id"></el-option>
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" style="margin-left: 60%;">
        <el-button size="small" @click="closeSetting">取 消</el-button>
        <el-button type="primary" size="small" @click="settingChange" :disabled="confirmFlag">确 定</el-button>
      </span>
  </div>
</template>
<script>
  import changeRequest from '@/api/comm/changeMsg.js'
  export default {
    mounted () {
      this.ajaxGet()
    },
    data () {
      return {
        form: {
          default_pro: 'index',
          regain: '',
          other_pro: [
            {
              'pro_id': '-1',
              'manage_type': 4,
              'pro_name': '神界'
            }
          ]
        },
        confirmFlag: true
      }
    },
    methods: {
      ajaxGet () {
        changeRequest.settingIndex().then(
          data => {
            this.form = data
          }
        )
      },
      settingChange () {
        if (this.form.regain) {
          changeRequest.sendSettingChange().then(
            data => {
              this.$emit('change-set', data.data.code)
            }
          )
        }
      },
      closeSetting () {
        this.ajaxGet()
        this.confirmFlag = true
        this.$emit('close-set')
      },
      changeChoose (item) {
        console.log(item)
        if (item) {
          this.confirmFlag = false
        }
      }
    }
  }
</script>
<style scoped>

</style>
