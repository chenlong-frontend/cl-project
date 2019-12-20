var app=app || {};
//工具变量
var tool = tool || {};
//路由变量
var router = router || {};
//组件变量
var component = component || {};
/**
 * ajax请求
 * opt {url,type,data}
 */
tool.ajax=function(opt,backFn){
    var url = opt.url || "/zjsbs/njuapi";
    var request = {
        type: opt.type || undefined,
        data:  JSON.stringify(opt.data || {}),
        md5:"md5"
    };  
    console.log(request);
    $.ajax({
        url: url,
        method:"POST",
        timeout:10000,
        data:request,
        success: function(data) {
            console.log(data);
            if(data.code === 0) {
                if ($.isFunction(backFn))
                {backFn(data);}

            }else {
                mui.alert(data["msg"] || "非法数据！","提示","确认",function () {
                    console.log("错误")
                });
            }
        },
        error: function() {
            mui.alert("网络连接错误！","提示","确认",function () {
                console.log("错误")
            });
        }
    });
};


//页面加载等待
tool.waitLoad=new Vue({
    el:"#wait-load",
    data:{
        display:true,
        bottom:"0px"
    }
});

//cookie的增删查
tool.cookie = (function () {
    //传入cookie名，值，时间(传入时间单位为小时)
    function setCookie(name,value,time) {
        var exp=new Date();
        exp.setTime(exp.getTime() + time*60*60*1000);
        document.cookie=name+ "=" +encodeURIComponent(value)+ ((time===null) ? "" : ";expires="+exp.toGMTString())
    }
    function getCookie(name) {
        var reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        var arr=document.cookie.match(reg);
        return arr?decodeURIComponent(arr[2]):null
    }
    function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=getCookie(name);
        if(cval!==null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
    return {
        set:function (opt) {
            if (opt instanceof Array){
                opt.forEach(function(val) {setCookie(val.name,val.value,val.time);});
            } else {setCookie(opt.name,opt.value,opt.time);}
        },
        get:function (opt) {
            var backValue = {};
            if (opt instanceof Array){
                opt.forEach(function(val) {backValue[val] = getCookie(val)});
            } else {backValue = getCookie(opt)}
            return backValue
        },
        del:delCookie
    }
})();

//数据加载以及操作延迟
tool.wait = (function () {
    var temp = $('<div class="wait-data">\n' +
        '        <div class="box">\n' +
        '            <div class="wait-tips">\n' +
        '                <img src="img/common/wait.gif">\n' +
        '                <span>数据加载中···</span>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>');
    var init = false;
    return {
        show:function () {
            if (init){temp.show();} else {$("body").append(temp);}
        },
        hide:function () {
            temp.hide();
        }
    }
})();

/**
 * @description 获取当前时间
 * @return 返回XXXX-X-X XX:XX格式时间
 */
tool.getTime = function() {
    var myDate=new Date(),time;
    var o = {
        "y": myDate.getFullYear(),
        "M": myDate.getMonth() + 1,
        "d": myDate.getDate(),
        "h": myDate.getHours(),
        "m": myDate.getMinutes()
    };
    o.h<10?o.h="0"+o.h:o.h;
    o.m<10?o.m="0"+o.m:o.m;
    o.M<10?o.M="0"+o.M:o.M;
    time = o.y+"-"+o.M+"-"+o.d+" "+o.h+":"+o.m;
    return time;
};

//判空
tool.emptyCheck = function (opt) {
    var flag = true;
    function check(obj) {
        var lenCheck =obj.data === undefined || obj.data === null || obj.data.length === 0;
        console.log(lenCheck);
        if (lenCheck){mui.toast(obj.tip+'不能为空',{ duration:'short', type:'div' });}
        return !lenCheck
    }
    if (opt instanceof Array){
        flag = opt.every(function (t) {return check(t)});
    } else {
        flag = check(opt)
    }
    return flag
};
/**
 * 徐旨越
 * 判断传入值是否为undefined或null或空字符串或空格
 * @param opt
 * @returns {boolean}
 */
tool.isEmpty = function (opt) {
    var flag = true;
    function check(obj) {
        console.log(obj);
        var lenCheck =obj.data == undefined || obj.data == null || obj.data.length == 0 || obj.data.trim().length<1;
        console.log("isEmpty: "+lenCheck);
        if (lenCheck){mui.toast(obj.tip+'不能为空',{ duration:'short', type:'div' });}
        return !lenCheck
    }
    if (opt instanceof Array){
        flag = opt.every(function (t) {return check(t)});
    } else {
        flag = check(opt)
    }
    return flag
};

//等待加载标识
tool.WaitFlag = function (num) {
    var arr =[],index=0;
    for (var i=0;i< num;i++){arr[i] = false}
    return function () {
        arr[index++] = true;
        return arr.every(function (t) {return t})
    }
};

/**
 * @description 得到网址内指定参数
 */
tool.getUrlParam = function (param){
    var reg = new RegExp("(^|&)"+ param +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!==null)return  decodeURI(r[2]); return null;
};

//sessionStorage数据存取
tool.session = {
    set:function (name,value) {
        sessionStorage[name]=JSON.stringify(value);
    },
    get:function (name) {
        return JSON.parse(sessionStorage[name]);
    }
};

/**
 * 徐旨越
 *  获取ContextPath
 */
tool.getContextPath = function(){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    return pathName.substr(0,index+1);
};

/**
 * 徐旨越
 *  获取ContextPath
 */
tool.getContextPath = function(page){
    var pathName = document.location.pathname;
    var index = pathName.substr(1).indexOf("/");
    return pathName.substr(0,index+1)+"/"+page;
};



