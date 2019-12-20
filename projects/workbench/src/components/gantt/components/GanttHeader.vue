<template>
  <div class="vue-gantt-header">
    <div class="gantt-row" v-for="(row, idx) in selectRows" :key="idx">
      <div class="row-item" :title="obj.title" @click="$emit('header-click', obj)" v-for="(obj, idx) in row" :key="idx" :style="{ width: obj.width + 'px' }">
        {{ obj.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Array,
      required: true
    }
  },
// Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  computed: {
    selectRows () {
      return this.rows.map(v => {
        for (let m of v) {
          switch (m.label) {
            case 'Jan':
              m.label = '一月'
              break
            case 'Feb':
              m.label = '二月'
              break
            case 'Mar':
              m.label = '三月'
              break
            case 'Apr':
              m.label = '四月'
              break
            case 'May':
              m.label = '五月'
              break
            case 'Jun':
              m.label = '六月'
              break
            case 'Jul':
              m.label = '七月'
              break
            case 'Aug':
              m.label = '八月'
              break
            case 'Sep':
              m.label = '九月'
              break
            case 'Oct':
              m.label = '十月'
              break
            case 'Nov':
              m.label = '十一月'
              break
            case 'Dec':
              m.label = '十二月'
              break
          }
        }
        return v
      })
    }
  }
}
</script>

<style>
.vue-gantt-header {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.vue-gantt-header .gantt-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  height: 24px;
}

.vue-gantt-header .gantt-row .row-item {
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6f6f6;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
</style>
