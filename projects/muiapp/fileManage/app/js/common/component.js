Vue.component('modal-bottom', {
    props:['title'],
    template: '<div v-show="displayActive"><div class="my-mask" @click="hide"></div>\n' +
    '<div class="c-modal-bottom">\n' +
    '    <div class="title">{{title}}</div>\n' +
    '    <div class="content">\n' +
            '<slot></slot>'+
    '    </div>\n' +
    '    <div class="foot"  @click="hide">取消</div>\n' +
    '</div></div>',
    data: function () {
        return {
            displayActive: false
        }
    },
    methods:{
        hide:function () {
            this.$emit('hide')
        }
    }
})
