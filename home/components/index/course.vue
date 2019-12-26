<template>
  <Timeline>
    <TimelineItem color="green">
      <time>2018年3月</time>
      <div class="content">
        app重构:
        <p>工作项目，中江工地app重构，主导完成</p>
        <div>
          技术栈：
          <Tag color="green">nodejs</Tag>
          <Tag color="green">react</Tag>
          <Tag color="green">webpack</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2018年3月</time>
      <div class="content">
        管理系统:
        <p>工作项目，中江工地管理系统，主导完成</p>
        <div>
          技术栈：
          <Tag color="green">nodejs</Tag>
          <Tag color="green">vue</Tag>
          <Tag color="green">webpack</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年10月</time>
      <div class="content">
        muiapp:
        <a href="http://119.3.107.239:3033/" target="view_window">http://119.3.107.239:3033/</a>
        <p>工作项目，基于mui的套壳app，控制台以手机模式查看，独自完成</p>
        <div>
          技术栈：
          <Tag color="green">jquery</Tag>
          <Tag color="green">mui</Tag>
          <Tag color="green">vue</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年7月</time>
      <div class="content">
        官网:
        <a href="http://119.3.107.239:3032/" target="view_window">http://119.3.107.239:3032/</a>
        <p>应实习单位要求完成的展示型官网，一共只做了3个页面，首页外加新闻动态两个，独自完成</p>
        <div>
          技术栈：
          <Tag color="green">jquery</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年5月</time>
      <div class="content">
        <p>
          2016年1月-2017年5月，一直处于学习阶段。
          <a
            href="http://119.3.107.239:3030/learn"
            target="view_window"
          >学习记录历程。</a>
        </p>
        <p>
          期间完成的部分项目：
          <a href="http://119.3.107.239:3031/chat/" target="view_window">仿微信页面</a>、
          <a href="http://119.3.107.239:3031/note/" target="view_window">记事本</a>
        </p>
      </div>
    </TimelineItem>
    <TimelineItem color="blue">
      <Icon type="logo-javascript" slot="dot" />
      <time>2016年1月</time>
      <div>起点</div>
    </TimelineItem>
  </Timeline>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
time {
  font-size: 16px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
  font-size: 14px;
}
</style>
