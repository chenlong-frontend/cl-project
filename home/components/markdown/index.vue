<template>
    <div class="markdown-body">
      <div v-html="toHtml"></div>
    </div>
</template>
<script>
  import marked from 'marked'
  export default {
    props: {
      data: {
        require: true,
        type: String
      }
    },
    data() {
        return {}
    },
    computed: {
      toHtml() {
        return marked(this.data)
      }
    }
  }
</script>

<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
