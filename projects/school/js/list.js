$(function(){
    $(".pageBox").pageFun({
        interFace:"data/page.json",  /*接口*/
        displayCount:7,  /*每页显示总条数*/
        maxPage:5,/*每次最多加载多少页*/
        dataFun:function(data){
            var dataHtml = '<li><a>'+data.title+'<span>'+data.time+'</span></a></li>';
            return dataHtml;
        },
        pageFun:function(i){
            var pageHtml = '<li class="pageNum">'+i+'</li>';
            return pageHtml;
        }

    })
});