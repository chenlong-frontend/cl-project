// 搜索
Vue.component('file-manage-search', {
    props: ['isShow'],
    template: '<div class="file-manage-search" v-show="isShow">' +
                    '<header class="mui-bar mui-bar-nav">' +
                        '<a @click="cancel" class="mui-icon mui-icon-left-nav mui-pull-left"></a>' +
                        '<h1 class="mui-title ">' +
                            '<input v-model="form.search" placeholder="搜索文件名" >' +
                            '<i class="mui-icon mui-icon-search" @click="search(undefined)"></i>' +
                        '</h1>' +
                    '</header>' +
                    '<div class="mui-content">' +
                        '<ul class="mui-table-view mui-grid-view mui-grid-9">' +
                            '<li @click="search(item)" v-for="item in display.type" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a>' +
                               '<span class="mui-icon"><img :src="item.icon" /></span>' +
                                '<div class="mui-media-body">{{item.text}}</div></a>' +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                    '<div  @click="cancel" class="search-cancel"></div>' +
                '</div>',
    created:function () {
        var self = this;
    },
    data:function () {
        return {
            display:{
                type:[{icon:'img/filemanage/doc.png',text:'Word'},{icon:'img/filemanage/xls.png',text:'Xls'},
                    {icon:'img/filemanage/ppt.png',text:'PPT'},{icon:'img/filemanage/pdf.png',text:'Pdf'},
                    {icon:'img/filemanage/text.png',text:'txt'},{icon:'img/filemanage/ppt.png',text:'图片'}]
            },
            form:{
                search:''
            }
        }
    },
    methods:{
        search: function (type) {
            if (type === undefined){
                type = {icon : 'img/filemanage/unknow.png',text : 'all'}
            }
            this.$emit('filesearch',{type:type,search:this.form.search})
        },
        cancel: function () {
            this.$emit('update:isShow', false)
        }
    }
});