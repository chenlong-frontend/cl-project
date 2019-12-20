<template>
  <div class="cl-file-workFolder">
    <ibox title="工作区文件夹">
      <router-view></router-view>
    </ibox>
  </div>
</template>
<script>
import ibox from '@/components/style/ibox.vue'
import request from '@/api/workbench/file/workFolder.js'
import { mapMutations } from 'vuex'
export default {
  props: ['formid'],
  components: {ibox},
  mounted () {
    request.getRole(this.formid).then(data => {
      this.fileSet(data.data)
    })
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations('router', ['fileSet'])
  }
}
</script>


