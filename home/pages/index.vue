<template>
  <div>
    <!--********头部导航********-->
    <nav-com></nav-com>
    <div class="container">
      <div class="content">
        <div class="title">历程</div>
        <course-com></course-com>
      </div>
    </div>
    <!--********尾部********-->
    <footer-com></footer-com>
  </div>
</template>

<script>
  import navCom from '~/components/layout/nav.vue'
  import footerCom from '~/components/layout/footer.vue'
  import courseCom from '~/components/index/course.vue'
  export default {
    components: { navCom, footerCom, courseCom }
  }
</script>

<style scoped>
  .container {margin-top: 65px;padding: 25px 0;}
  .content {width: 768px;margin: 0 auto;padding: 25px;border-radius: 3px;background-color: #ffffff;}
  .title {font-size: 20px;color: #7C7C7C;margin-bottom: 20px;}
</style>
