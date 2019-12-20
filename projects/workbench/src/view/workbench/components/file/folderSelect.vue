<template>
  <div>
    <el-tree
      v-show="tips"
      :props="fileProps"
      highlight-current
      accordion
      ref="fileRefs"
      :render-content="fileRenderContent"
      :load="loadFileNode"
      @current-change="folderSelect"
      lazy>
    </el-tree>
    <p v-show="!tips">暂无文件夹可选，请新建文件夹</p>
  </div>

</template>
<script>
  import request from '@/api/workbench/components/file/folderSelect.js'
  export default {
    data () {
      return {
        folder: '',
        folderText: '',
        fileProps: {
          label: 'file_name',
          children: 'zones',
          isLeaf: 'leaf'
        },
        tips: false
      }
    },
    methods: {
      // *****************文件夹选择点击操作******************//
      folderSelect (data, node) {
        this.folder = data
        let arr = [data.file_name]
        function getFolder (trees) {
          let parent = trees.parent
          if (parent.data) {
            arr.push(parent.data.file_name)
            return getFolder(parent)
          }
        }
        getFolder(node)
        this.folderText = arr.reverse().join('>')
      },
      // *****************文件夹选择懒加载******************//
      loadFileNode (node, resolve) {
        if (node.level === 0) {
          request.getLevel0().then(data => {
            if (data.length > 0) { this.tips = true }
            resolve(data)
          })
          return true
        }
        if (node.level > 0) {
          request.getLevel1(node.data.file_id).then(data => {
            resolve(data)
          })
          return true
        }
      },
      fileRenderContent (h, { node, data, store }) {
        return (
          <span style="font-size:16px;"><i style="color:#F6D574;padding:0 10px 0 4px;" class="fa fa-folder"></i>
          <span>{node.label}</span></span>
        )
      },
      // ************父组件调用方法,得到选择文件夹对象和路径************//
      getFolder () {
        return {
          text: this.folderText,
          data: this.folder
        }
      }
    }
  }
</script>

<style>

</style>
