<template>
  <div>
    <div class="drag-area">
      <ul>
        <li v-for="(item, index) in dragItem" @dragstart="itemStart($event, index)" draggable="true">{{item.name}}</li>
      </ul>
    </div>
    <div id="area" @drop="itemDrop($event)" @dragover="itemOver($event)">
      <div v-for="(item, index) in areaItem" class="drag-box" :data-index="index" :data-id="item.id" :id="item.uid" :style="{left: item.left, top: item.top}">
        <svg version="1.1" xmlns="http://www.w3.org/1999/xhtml" width="160" height="70">
          <rect version="1.1" xmlns="http://www.w3.org/1999/xhtml" x="0" y="0" width="160" height="70" class="outer drag-start"></rect>
          <rect version="1.1" xmlns="http://www.w3.org/1999/xhtml" x="10" y="10" width="140" height="50" class="inner"></rect>
          <text version="1.1" xmlns="http://www.w3.org/1999/xhtml" text-anchor="middle" x="75" y="35" dominant-baseline="central">{{item.name}}</text>
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
  import plumb from 'jsplumb'
  let jsPlumb = plumb.jsPlumb
  export default {
    mounted () {
      this.jspInit()
    },
    updated () {
      this.pointChange()
    },
    data () {
      return {
        dragItem: [{name: '连接1', id: '12242'}, {name: '连接2', id: '12535'}, {name: '连接3', id: '122r42'}, {name: '连接4', id: '125r35'}],
        areaItem: [],
        jsp: {},
        jspConf: {
          init: {
            Container: 'area',
            Endpoint: [ 'Rectangle', { width: 25, height: 10 } ],
            PaintStyle: { strokeWidth: 4, stroke: 'rgba(132, 172, 179, 0.5)', fill: 'rgb(217, 217, 217)' },
            Connector: [ 'Flowchart', { stub: 50, cornerRadius: 5 } ],
            Overlays: ['Arrow']
          },
          pointOptions: { isSource: true, isTarget: true },
          sourceOptions: { isSource: true, isTarget: false, anchor: [0.5, 0.9, 0, 0.5], maxConnections: 10, paintStyle: {fill: 'rgba(190, 190, 190, 0.3)'} },
          targetOptions: { isSource: false, isTarget: true, anchor: [0.5, 0.1, 0, 0], maxConnections: 10, paintStyle: {fill: 'rgba(190, 190, 190, 0.3)'} }
        }
      }
    },
    methods: {
      // 拖动开始，拖动对象事件
      itemStart (e, index) {
        e.dataTransfer.setData('text', index)
        console.log('drag start')
      },
      // 拖动结束，拖动源事件
      itemDrop (e) {
        console.log(e.target.className)
        if (e.target.className.indexOf('jtk-') >= 0) { return false }
        e.preventDefault()
        let mx = '' + e.offsetX + 'px'
        let my = '' + e.offsetY + 'px'
        let target = this.dragItem[e.dataTransfer.getData('text')]
        let uid = new Date().getTime() + ''
        this.areaItem.push({name: target.name, uid: uid, id: target.id, left: mx, top: my, target: []})
      },
      // 拖动结束，拖动源事件
      itemOver (e) {
        e.preventDefault()
        console.log('on drag over')
      },
      // 配置初始化
      jspInit () {
        let self = this
        jsPlumb.ready(() => {
          this.jsp = jsPlumb.getInstance(this.jspConf.init)
          this.pointChange()
          // 连接成功事件
          this.jsp.bind('connection', function (info) {
            let target = self.areaItem[info.source.dataset.index].target
            let id = info.target.getAttribute('id')
            if (target.indexOf(id) === -1) { target.push(id) }
            console.log(self.areaItem)
          })
          // 连接删除事件
          this.jsp.bind('connectionDetached', function (info) {
            let target = self.areaItem[info.source.dataset.index].target
            let id = info.target.getAttribute('id')
            if (target.indexOf(id) > -1) { target.splice(target.indexOf(id), 1) }
            console.log(self.areaItem)
          })
        })
      },
      // 更新点
      pointChange () {
        for (let o of this.areaItem) {
          this.jsp.draggable(o.uid)
          this.jsp.addEndpoint(o.uid, this.jspConf.sourceOptions)
          this.jsp.addEndpoint(o.uid, this.jspConf.targetOptions)
        }
      },
      init () {
        jsPlumb.ready(() => {
//            let jsp = jsPlumb.getInstance()
//            let endpointOptions = { isSource: true, isTar}
          // 实例化jsPlumb
//            this.jsp = jsPlumb.getInstance(this.jspConf.init)
//            this.jsp.draggable('drag')
//            this.jsp.draggable('drag01')
//            this.jsp.draggable('target')
//            this.jsp.addEndpoint('drag', this.jspConf.pointOptions)
//            this.jsp.addEndpoint('drag01', this.jspConf.pointOptions)
//            this.jsp.addEndpoint('target', this.jspConf.pointOptions)
//            // 连接成功事件
//            jsp.bind('connection', function (info) { console.log(info) })
//            // 连接删除事件
//            jsp.bind('connectionDetached', function (info) { console.log(info) })
//            // 连接开始事件
//            jsp.bind('connectionDrag', function (connection) { console.log(connection) })
//            // 端点点击事件
//            jsp.bind('click', function (connection) { console.log(connection) })
//            jsp.bind('endpointClick', function (connection) { console.log(connection) })
//            // 连接A和B
//               jsp.connect({source: 'target', target: 'drag01'})
//            // 通过15px粗的黄色线连接A和B
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: {strokeWidth: 15, stroke: 'rgb(243,230,18)'},
//              endpointStyle: {fill: 'rgb(243,229,0)'}
//            })
//            // 通过10px粗的蓝色线连接A和B的中部宽10高8的端点
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: { strokeWidth: 10, stroke: 'rgba(0, 0, 200, 0.5)' },
//              anchors: ['Right', 'Left'],
//              endpoint: [ 'Rectangle', { width: 10, height: 8 } ]
//            })
//            // 通过8px粗的红色线连接A和B的底和顶部的端点
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: { strokeWidth: 8, stroke: 'rgba(189, 11, 11, 0.5)' },
//              anchors: ['Bottom', 'Top'],
//              endpoint: 'Rectangle'
//            })
//            // anchors里的[1, 1, 0, 0]第一个为往右偏移dom宽度，二维往下偏移，
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              anchors: ['Bottom', [0.75, 0, 0, -1]],
//              paintStyle: {strokeWidth: 15, stroke: 'rgb(243,230,18)'},
//              endpointStyle: {fill: 'rgb(243,229,0)'}
//            })
//            // 使用渐变样式
//            let w34Stroke = 'rgba(50, 50, 200, 1)'
//            let w34HlStroke = 'rgba(180, 180, 200, 1)'
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: {strokeWidth: 10, stroke: w34Stroke},
//              anchors: ['RightMiddle', 'LeftMiddle'],
//            //  endpointStyle: { gradient: { stops: [[ 0, w34Stroke ], [ 1, w34HlStroke ]], offset: 17.5, innerRadius: 15 }, radius: 35 }
//              endpointStyle: { gradient: {stops: [[0, w34Stroke], [1, w34HlStroke]], offset: '78%', innerRadius: '73%'}, radius: 35 }
//            })
//            // 使用渐变样式
//            let w23Stroke = 'rgb(189,11,11)'
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: {strokeWidth: 8, stroke: w23Stroke},
//              anchors: [[0.3, 1, 0, 1], 'Top'],
//              endpoint: 'Rectangle',
//              endpointStyles: [{gradient: { stops: [[0, w23Stroke], [1, '#558822']] }}, {gradient: {stops: [[0, w23Stroke], [1, '#882255']]}}]
//            })
//            // 使用透明样式
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              anchors: ['Center', 'Center'],
//              paintStyle: {strokeWidth: 5, stroke: 'rgba(0,255,0,0.5)'},
//              endpointStyle: {radius: 125}
//            })
//            // 通过角落连接
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              paintStyle: { strokeWidth: 10, stroke: 'blue' },
//              anchors: [ 'TopLeft', 'BottomRight' ]
//            })
//            // 添加鼠标悬停样式
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              anchors: [ 'TopLeft', 'BottomRight' ],
//              paintStyle: {strokeWidth: 7, stroke: 'rgb(131,8,135)'},
//              hoverPaintStyle: { stroke: 'rgb(0, 0, 135)' },
//              endpointStyle: { width: 40, height: 40 },
//              endpoint: 'Rectangle',
//              connector: 'Straight'
//            })
//            // 添加鼠标悬停样式
//            jsp.connect({
//              source: 'drag01',
//              target: 'target',
//              dragOptions: {
//                cursor: 'crosshair'
//              }
//            })
        })
      }
    }
  }
</script>

<style scoped>
  .drag-area {margin: 0;padding: 20px 10px;box-sizing: border-box;width: 150px;float: left;text-align: center;height: 550px;background-color: #84acb3;}
  .drag-area ul {width: 100%;padding: 0;}
  .drag-area ul li{background-color: #234b5e;border-radius: 11px;color: #f7ebca;cursor: move;margin-bottom: 15px;margin-left: 6px;padding: 8px;width: 100px;}
  #area {height: 550px;max-height: 700px;box-sizing: border-box;border: 1px solid #CCC;background-color: white;display: flex;overflow: hidden;position: relative;touch-action: none;cursor: move;}
  #area > .drag-box{position: absolute;}
  #area > .drag-box svg {fill: #234b5e;}
  #area > .drag-box text {stroke: none;fill: #f7ebca;font-size: 14px;font-weight: normal;}
  #area .outer {fill: gray;opacity: 0.3;stroke: none;}
  #area > .drag-box:hover .outer {opacity: 0.7;}
</style>
