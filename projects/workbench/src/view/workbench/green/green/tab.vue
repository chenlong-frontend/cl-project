<template>
  <el-tabs type="border-card">
    <el-tab-pane label="基本信息">
      <div style="padding: 0 20px;box-sizing: border-box;">
        <el-form ref="basicForm" :model="basicForm" :rules="basicFormRules" size="small" label-width="100px">
          <el-form-item label="创优单位" prop="company">
            <el-input v-model="basicForm.company"></el-input>
          </el-form-item>
          <el-form-item label="创优项目名称">
            <el-input v-model="basicForm.project"></el-input>
          </el-form-item>
          <el-form-item label="创优目标">
            <el-input v-model="basicForm.target"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="合同额(万元)">
                <el-input v-model="basicForm.contract"></el-input>
              </el-form-item>
              <el-form-item label="开工日期">
                <el-date-picker
                  v-model="basicForm.start_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="创优负责人">
                <el-input v-model="basicForm.charge"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="体量">
                <el-input v-model="basicForm.amount"></el-input>
              </el-form-item>
              <el-form-item label="竣工日期">
                <el-date-picker
                  v-model="basicForm.end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  style="width: 100%"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="手机">
                <el-input v-model="basicForm.mobile"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </el-tab-pane>
    <el-tab-pane label="工程质量">
      <el-form ref="tabRecord" v-if="formData.categorys[0].length !== 0" size="small" :model="tabRecordForm" label-width="100px">
        <el-form-item v-for="item in formData.categorys[0]" :key="item.id" :label="item.award_name">
          <el-input v-model="tabRecordForm[item.id]"></el-input>
        </el-form-item>
      </el-form>
      <p v-else>暂无数据</p>
    </el-tab-pane>
    <el-tab-pane label="科技创新">
      <el-form v-if="formData.categorys[1].length !== 0" ref="tabRecord" size="small" :model="tabRecordForm" label-width="100px">
        <el-form-item v-for="item in formData.categorys[1]" :key="item.id" :label="item.award_name">
          <el-input v-model="tabRecordForm[item.id]"></el-input>
        </el-form-item>
      </el-form>
      <p v-else>暂无数据</p>
    </el-tab-pane>
    <el-tab-pane label="标准化文明示范工地">
      <el-form v-if="formData.categorys[2].length !== 0" ref="tabRecord" size="small" :model="tabRecordForm" label-width="100px">
        <el-form-item v-for="item in formData.categorys[2]" :key="item.id" :label="item.award_name">
          <el-input v-model="tabRecordForm[item.id]"></el-input>
        </el-form-item>
      </el-form>
      <p v-else>暂无数据</p>
    </el-tab-pane>
    <el-tab-pane label="说明">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10}"
            placeholder="请输入内容"
            v-model="basicForm.desc">
          </el-input>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    props: ['formData'],
    beforeMount () {
      this.initForm()
    },
    data () {
      return {
        basicForm: {
          company: '',
          project: '',
          target: '',
          contract: '',
          charge: '',
          amount: '',
          start_time: '',
          end_time: '',
          mobile: '',
          desc: ''
        },
        tabRecordForm: {
        },
        basicFormRules: {
          company: [{ required: true, message: '请输入单位名称', trigger: 'blur' }]
        }
      }
    },
    methods: {
      initForm () {
        for (let o of Object.keys(this.formData.categorys)) {
          for (let a of this.formData.categorys[o]) {
            this.tabRecordForm[a.id] = a.desc
          }
        }
        this.basicForm = Object.assign({}, this.basicForm, this.formData.info)
      },
      getForm () {
        return {
          basicForm: this.basicForm,
          tabRecordForm: this.tabRecordForm
        }
      },
      formCheck () {
        let validCheck = false
        this.$refs.basicForm.validate((valid) => {
          console.log(valid)
          validCheck = valid
        })
        return validCheck
      }
    }
  }
</script>

<style scoped>

</style>
