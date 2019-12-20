<template>
  <ibox title="人员通讯录" class="gyw-contractStaffContract">
    <staffin></staffin>
  </ibox>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import staffin from './staffContractIn.vue'
  export default {
    name: '',
    components: {ibox, staffin},
    data () {
      return {}
    },
    props: ['']
  }
</script>

<style scoped>

</style>
