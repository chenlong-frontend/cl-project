<template>
  <div class='quality'>
    <ibox title='项目甘特图'>
      <gantt :data='data'></gantt>
    </ibox>
  </div>
</template>

<script>
  import ibox from '@/components/style/ibox.vue'
  import gantt from '@/components/gantt/index.js'
  import request from '@/api/request'
  export default {
    name: 'quality',
    components: {ibox, gantt},
    created () {
      request({type: '1605', data: {task_p_id: '0'}}).then(t => {
        let data = {}
        data.rows = t.rows
        data.legendHelp = 'dsf'
        this.data = data
        console.log(this.data)
      })
    },
    data () {
      return {
        data: {
          'rows': [
            {
              'name': 'Step 2',
              'values': [
                {
                  'desc': 'Step 2 is overdue',
                  'from': 1519867665000,
                  'to': 1519867665000,
                  'color': '#F9C4E1'
                },
                {
                  'desc': 'Step 2',
                  'from': 1327316149123,
                  'to': 1337770549123,
                  'color': '#D0E4FD'
                }
              ]
            }
          ],
          'legendHelp': 'Help'
        }
      }
    }
  }
</script>

<style scoped>
</style>
