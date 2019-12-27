<template>
  <Timeline>
    <!-- <TimelineItem color="green">
      <time></time>
      <div class="content">
        <p></p>
        <div>
          技术栈：
          <Tag color="green"></Tag>
        </div>
      </div>
    </TimelineItem>-->
    <TimelineItem color="green">
      <time>2019年4月</time>
      <div class="content">
        <div>
          react-native-app：
          <a
            href="https://github.com/1016482011/react-native-app"
            target="view_window"
          >github地址</a>
        </div>
        <div>
          expo-app：
          <a href="https://github.com/1016482011/expo-app" target="view_window">github地址</a>
        </div>
        <div>
          模型工具：
          <a href="http://119.3.107.239:3035/" target="view_window">点击这里</a>
        </div>
        <div>
          模型浏览器：
          <a href="http://119.3.107.239:3034/" target="view_window">点击这里</a>
        </div>
        <div></div>
        <p>自2018年6月毕业，正式工作的第一年，工作这段时间花了大量时间学习threejs以及react。</p>
        <p>制作的两个基于rn的app由于项目整体原因，并没有推广使用，估在此给出了源码。</p>
        <p>模型浏览器是基于typescript+react+threejs+模型工具完成。</p>
        <p>模型工具的我参与了部分功能调研，项目结构打包等由我完成。项目主要是typescript + threejs</p>
        <div>
          技术栈：
          <Tag color="green">threejs</Tag>
          <Tag color="green">react</Tag>
          <Tag color="green">react-native</Tag>
          <Tag color="green">typescript</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2018年3月</time>
      <div class="content">
        <p>这段时间算是正式实习期，因为没有毕业，实习了一年，主要负责中江工地管理系统、中江工地套壳app</p>
        <div>
          技术栈：
          <Tag color="green">vue</Tag>
          <Tag color="green">react</Tag>
        </div>
      </div>
    </TimelineItem>
    <TimelineItem color="green">
      <time>2017年10月</time>
      <div class="content">
        <div>
          项目预览:
          <a href="http://119.3.107.239:3033/" target="view_window">点击这里</a>
        </div>
        <p>工作项目，基于mui的套壳app，第一次接触了vue，这个算是独自完成的最大的项目之一了</p>
        <div>
          技术栈：
          <Tag color="green">jquery</Tag>
          <Tag color="green">mui</Tag>
          <Tag color="green">vue</Tag>
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
        <div>
          前端技术栈：
          <Tag color="green">jquery</Tag>
        </div>
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
