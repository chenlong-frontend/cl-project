<template>
  <div class="jinm-videoManage-screenAlbum">
    <ibox title="截屏相册" class="ibox">
      <!--photo的集合-->
      <div class="photoBox">
        <el-checkbox-group  v-model="checkedPics" @change="handleCheckedPicChange">

        <div v-for="(item, index) in itemGroup.items" :key="index" style="display: inline-block;position: relative;width:14%;padding-left:2.3%">
            <el-checkbox :key="item.album_id" :label="item">
            </el-checkbox>

          <div class="photoItem">
            <div class="imgItem">
              <img :src="item.thumbnail" alt="" @click="clickImage(index)">
            </div>
            <div class="dateItem">
              <span>{{item.time}}</span>
            </div>
          </div>
        </div>

        </el-checkbox-group>

      </div>

      <!--删除按钮-->
      <el-button
        type="primary"
        size="small"
        plain
        icon="el-icon-delete"
        style="display:inline-block;margin-top:20px;margin-left:20px"
        @click="centerDialogVisible = true"
        :disabled="disableddelete"
      >批量删除</el-button>

      <!--分页按钮-->
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="imgCount"
          :page-size=18
          align="center"
          :current-page.sync="itemGroup.currentPage"
          @current-change="handleCurrentChange"
          style="display:inline-block;margin-left:100px;margin-top:20px;margin-right:30px"
        >
        </el-pagination>
      </div>


      <el-dialog
        title="截屏查看"
        :visible.sync="imgClick"
        width="1000px"
        :append-to-body="true">
        <!--轮播图-->
        <shuttle :itemGroup="itemGroup" @callback="changeback"></shuttle>
      </el-dialog>

      <!--删除按钮弹出框-->
      <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
        :modal-append-to-body= false
      >
        <span style="margin-left:120px;">确认删除这些图片吗？</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary"  @click="deleteItem">确 定</el-button>
  </span>
      </el-dialog>
    </ibox>
  </div>
</template>
<script>
  import ibox from '@/components/style/ibox.vue'
  import shuttle from '@/view/workbench/components/shuttleBox.vue'
  import request from '@/api/workbench/videoManage/screenAlbum.js'
  export default {
    components: { ibox, shuttle },
    created () {
      request.getImage(this.itemGroup.currentPage).then(value => {
        this.itemGroup.items = value.albums
        this.imgCount = Number(value.count)
        this.itemGroup.count = Math.ceil(this.imgCount / 18)
      })
    },
    data () {
      return {
        checkedPics: [],
        imgClick: false,
        disableddelete: true,
        centerDialogVisible: false,
        imgCount: 0,
        deletePics: [],
        itemGroup: {
          items: [],
          currentPage: 1,
          index: 0,
          count: 0, // ***********总页数****************
          ilength1: 0
        }
      }
    },
    methods: {
      // ************点击图像按钮********
      clickImage: function (val) {
        this.imgClick = true
        this.itemGroup.index = val
        this.itemGroup.ilength1 = -Math.floor(val / 6) * 600
        console.log(this.itemGroup.index)
      },
      // ************点击选中按钮*************
      deleteItem: function () {
        this.centerDialogVisible = false
        let deleteId = this.deletePics.map(t => {
          return t.album_id
        })
        request.deletePic(deleteId).then(value => {
          this.getInit()
        })
      },
      // *************分页按钮****************
      handleCurrentChange () {
        this.getInit()
      },
      handleCheckedPicChange (value) {
        this.deletePics = value
        if (value.length === 0) {
          this.disableddelete = true
        } else {
          this.disableddelete = false
        }
      },
      // ***********初始化的操作************
      getInit () {
        request.getImage(this.itemGroup.currentPage).then(value => {
          this.itemGroup.items = value.albums
          this.itemGroup.count = Math.ceil(this.imgCount / 18)
        })
      },
      changeback (item) {
        this.itemGroup = item
      }
    }
  }
</script>
<style scoped>
  .ibox{
    position:relative;
  }
  .photoBox{
    margin-top:25px;
    width:100%;
  }
  .photoItem{
    width:100%;
    display: inline-block;
    margin-bottom: 20px;
    border:1px solid red;
  }
  .imgItem{
    width:100%;
  }
  .imgItem img{
    width:100%;
    height:120px;
  }
  .dateItem{
    height:30px;
    font-size:12px;
    line-height:30px;
    text-align: center;
  }
  .block{
    width:400px;
    display:inline-block;
    margin-left: 200px;
  }




</style>

