<template>
  <div class="cl-file-workFolder">
    <ibox title="监控列表">
      <router-view></router-view>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import { mapMutations } from 'vuex'
  export default {
    props: ['formid'],
    components: { ibox },
    mounted () {
      this.videoFileSet(this.formid)
    },
    methods: {
      ...mapMutations('router', ['videoFileSet'])
    }
  }
</script>
