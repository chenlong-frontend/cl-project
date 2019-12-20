<template>
  <Timeline>
    <!--<TimelineItem color="green">-->
      <!--<time>2018年4月</time>-->
      <!--<div class="content">-->
        <!--<p>本页面</p>-->
        <!--<p>技术栈：<Tag color="green">nodejs</Tag><Tag color="green">vue</Tag><Tag color="green">nuxt</Tag></p>-->
      <!--</div>-->
    <!--</TimelineItem>-->
    <TimelineItem color="green">
      <time>2018年4月</time>
      <div class="content">
        管理系统:  <a href="http://a331.info:3333/literature/#/" target="view_window">http://a331.info:3333/literature/#/</a>
        <p>试用期作品，言士3天试用作品，独自完成</p>
        <div>技术栈：<Tag color="green">nodejs</Tag><Tag color="green">vue</Tag><Tag color="green">webpack</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2018年3月</time>
      <div class="content">
        app重构:  <a href="http://a331.info:3333/mobile/#/workflow-index" target="view_window">http://a331.info:3333/mobile/#/workflow-index</a>
        <p>工作项目，中江工地app重构，主导完成</p>
        <div>技术栈：<Tag color="green">nodejs</Tag><Tag color="green">react</Tag><Tag color="green">webpack</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2018年3月</time>
      <div class="content">
        管理系统:  <a href="http://a331.info:3333/workbench/login.html" target="view_window">http://a331.info:3333/workbench/login.html</a>
        <p>工作项目，中江工地管理系统，主导完成</p>
        <div>技术栈：<Tag color="green">nodejs</Tag><Tag color="green">vue</Tag><Tag color="green">webpack</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年10月</time>
      <div class="content">
        muiapp:  <a href="http://a331.info:3333/muiapp/" target="view_window">http://a331.info:3333/muiapp/</a>
        <p>工作项目，基于mui的套壳app，控制台以手机模式查看，独自完成</p>
        <div>技术栈：<Tag color="green">jquery</Tag><Tag color="green">mui</Tag><Tag color="green">vue</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年7月</time>
      <div class="content">
        官网:  <a href="http://a331.info:3333/school/index.html" target="view_window">http://a331.info:3333/school/index.html</a>
        <p>应实习单位要求完成的展示型官网，一共只做了3个页面，首页外加新闻动态两个，独自完成</p>
        <div>技术栈：<Tag color="green">jquery</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年5月</time>
      <div class="content">
        个人网站:  <a href="https://a.a331.info/" target="view_window">https://a.a331.info/</a>
        <p>综合平时的作品做成一个网站，主要包括仿微信聊天、仿Diaro记事本、仿看云阅读界面，独自完成</p>
        <div>技术栈：<Tag color="green">jquery</Tag><Tag color="green">thinkphp</Tag><Tag color="green">mysql</Tag></div>
      </div>
    </TimelineItem>
    <TimelineItem color="blue">
      <Icon type="social-javascript" slot="dot"></Icon>
      <time>2016年1月</time>
      <p>第一次接触JavaScript，学习的起点。</p>
    </TimelineItem>
  </Timeline>
</template>
<script>
  export default {
      data() {
          return {
          }
      }
  }
</script>

<style scoped>
  time{
    font-size: 16px;
    font-weight: bold;
  }
  .content{
    padding-left: 5px;
    font-size: 14px;
  }
</style>
