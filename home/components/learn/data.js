const data = [
  {
    time: "",
    children: [
      {
        imgs: [],
        text: ""
      }
    ]
  },
  {
    time: "2016-05-29",
    children: [
      {
        imgs: ["20160529.jpg"],
        text: "每次去图书馆都有新发现😄"
      },
      {
        text: "看完这本书，对bootstrap的实现原理总算是有了初步了解",
        link: [
          {
            label: "HTML5与CSS3设计模式",
            link:
              "https://note.youdao.com/ynoteshare1/mobile.html?id=489b4c183f1acd0cbfdba9d60ce2f07b&type=notebook&from=timeline"
          }
        ]
      }
    ]
  },
  {
    time: "2016-05-26",
    children: [
      {
        text: `转-目前做前端这块的大致有三种人： 
        1. 本来是做后端的，顺带着做一些前端，以 jQuery  为主，能实现大部分简单前端效果。 
        2. 以切图和静态 html 制作为主，加上部分 javascript. 
        3. js 和 html 都做且对 js 有较深入的了解，知道后端工作机制并能很好地进行协作。 
        第一种大部分公司都有，对于不是很复杂的应用基本也够用了，第二种多在一些外包项目型公司，这两种都不算难找。第三类多呆在大公司里面或者一些产品型的公司，近年来的需求旺盛，且把这类型的叫做泛前端，这种前端对掌握技术的广度要求较高，既要专注于前端也要懂后端知识，目前还没有针对性强的学科，多是从学校里出来后自学的，所以就不好找。`
      }
    ]
  },
  {
    time: "2016-05-13",
    children: [
      {
        text:
          "一本看完了，然而并没有学完，一个地理位置，要用到谷歌地图接口，一个webSocket和html5高级应用开发，要用到nodejs。html5的内容真的是不多却难",
        link: [
          {
            label: "html5敏捷实践",
            link:
              "https://note.youdao.com/ynoteshare1/mobile.html?id=8b8e64b9ab8655c389bd8e1f40e466d6&type=notebook&from=timeline"
          }
        ]
      },
      {
        imgs: ["2016051301.jpg", "2016051302.jpg"],
        text:
          "为了提高看书的效率，我只能拿出大招了，记笔记不手打了，用有道云笔记的文档扫描了"
      }
    ]
  },
  {
    time: "2016-05-12",
    children: [
      {
        imgs: [
          "2016051202.jpg",
          "2016051203.jpg",
          "2016051204.jpg",
          "2016051205.jpg"
        ],
        text: "图书馆发现的新书，快速消灭，没时间了"
      },
      {
        imgs: ["2016051201.jpg"],
        text: "果然看原版文档比什么教程都好用"
      },
      {
        text:
          "Mozilla,全称Mozilla基金会，是为支持和领导开源的Mozilla项目而设立的一个非营利组织。。拥有一个称作Mozilla公司的子公司，雇佣了一些Mozilla开发人员并协调Mozilla Firefox网页浏览器以及Mozilla Thunderbird电子邮件客户端的发行版"
      },
      {
        text:
          "一个完整的 JavaScript 实现是由以下 3 个不同部分组成的：核心（ECMAScript）,文档对象模型（DOM）,浏览器对象模型（BOM）.按顺序慢慢学"
      }
    ]
  },
  {
    time: "2016-05-11",
    children: [
      {
        imgs: ["20160511.jpg"],
        text:
          "ECMAScript是一种由Ecma国际通过ECMA-262标准化的脚本程序设计语言。它往往被称为JavaScript或JScript，但实际上后两者是ECMA-262标准的实现和扩展。"
      },
      {
        text:
          "实现js异步编程的四种方式。1.回调函数，2.事件监听器，3.订阅/发布，4.promises对象。专治各种页面假死"
      },
      {
        code: `每日一学，js回调函数，简单的说明
function a(callback) 
{    
   alert("主函数函数a！"); 
   callback(); 
} 
function b(){ 
alert("回调函数b"); 
} 
function test() 
{ 
    a(b); 
}
这里b就是回调函数，js中函数是用function创建的对象，可以作为参数传递`
      }
    ]
  },
  {
    time: "2016-05-10",
    children: [
      {
        text: `jquery中的$("#id")与document.getElementById("id")是有区别的，alert($('#box'))得到的是[object Object] alert(document.getElementByIdx_x('box'))得到的是[object HTMLDivElement] alert($('#box')[0])或alert($('#box').get(0))得到的是[object HTMLDivElement]，因此document.getElementByIdx_x('box')等同于$('#box')[0]或$('#box').get(0)。jqery得到的是一个对象数组`
      },
      {
        text:
          "今日小知识，js闭包，主要特性，1.函数嵌套函数2.函数内部可以引用外部的参数和变量3.参数和变量不会被垃圾回收机制回收"
      },
      {
        imgs: ["20160510.jpg"],
        text:
          "终于完工了，最后一个视频只在下方添加了个字幕，其他效果做起来太费时间了。现在感觉现在我css好强啊，基本掌握响应式布局的技巧了(全班合唱的视频，开口惨不忍睹"
      }
    ]
  },
  {
    time: "2016-05-09",
    children: [
      {
        text:
          "内联元素和其他元素都在一行上，元素的高度、宽度、行高及顶部和底部边距不可设置，元素的宽度就是它包含的文字或图片的宽度，不可改变。(<span>、<a>、<label>、<input>、 <img>、 <strong> 和<em>)    块级元素，每个块级元素都从新的一行开始，并且其后的元素也另起一行。元素的高度、宽度、行高以及顶和底边距都可设置。元素宽度在不设置的情况下，是它本身父容器的100%（和父元素的宽度一致），除非设定一个宽度。(<div>、 <p>、<h1>、<form>、<ul> 和 <li>)"
      },
      {
        text:
          "`inline`内部元素的宽高`+padding`。不单独占一行，其它元素会紧跟其后。而块对象`block`是可以设置宽高的，但是它的实际宽高是本身宽高`+padding`。`block`要单独占一行。inline-block既具有block的宽高特性又具有inline的同行元素特性。"
      },
      {
        imgs: ["20160509.jpg"],
        text: "html5规范·"
      }
    ]
  },
  {
    time: "2016-05-08",
    children: [
      {
        imgs: ["20160508.jpg"],
        text: "第三板块的基调差不多完成"
      }
    ]
  },
  {
    time: "2016-05-05",
    children: [
      {
        imgs: ["2016050502.jpg", "2016050503.jpg"],
        text:
          "canvas功能如此强大，不过就我目前浏览过的网页鲜有使用这项技术的，有点奇怪"
      },
      {
        imgs: ["2016050501.jpg"],
        text: "学了canvas，才知道初中数学是多么的实用"
      }
    ]
  },
  {
    time: "2016-05-03",
    children: [
      {
        imgs: ["20160503.jpg"],
        text: "是时候深入学习一波了"
      }
    ]
  },
  {
    time: "2016-05-02",
    children: [
      {
        imgs: ["20160502.jpg"],
        text: "总算结束了"
      }
    ]
  },
  {
    time: "2016-05-01",
    children: [
      {
        imgs: ["20160501.jpg"]
      }
    ]
  },
  {
    time: "2016-04-30",
    children: [
      {
        imgs: ["2016043001.jpg", "2016043002.jpg"],
        text: "五一假期，然而工作才刚刚开始"
      }
    ]
  },
  {
    time: "2016-04-25",
    children: [
      {
        text:
          "jquery UI 非企业级开发强大的一笔，有了这个我还要bootstrap和layer有何用😂"
      },
      {
        imgs: ["2016042501.jpg", "2016042502.jpg"],
        text:
          "还记的当初学js学的第一个效果就是拖动图片，现在的h5已经将这个效果作为了一个标准接入，亏我当时费那么多时间"
      }
    ]
  },
  {
    time: "2016-04-24",
    children: [
      {
        imgs: ["2016042403.jpg"],
        text: "直播的核心技术好像也不知不觉就学会了，将视频用canvas实时绘制"
      },
      {
        imgs: ["2016042401.jpg", "2016042402.jpg"],
        text: "简易的静态实时弹幕完成"
      }
    ]
  },
  {
    time: "2016-04-21",
    children: [
      {
        text:
          "我用node webkit把html包装了一下，英语课演讲时，老师到现在还以为我是用ppt做的😂"
      }
    ]
  },
  {
    time: "2016-04-18",
    children: [
      {
        text:
          "能把一个纯静态的网页封装成exe文件，自带浏览器引擎运行多好，这样就不怕浏览器兼容问题了"
      }
    ]
  },
  {
    time: "2016-04-14",
    children: [
      {
        text:
          "html5视频这一块我还是一个空白，看来这个周末又是一个不眠之夜，只能恶补一下了"
      },
      {
        imgs: ["20160414.jpg"],
        text: "接活了，要忙起来了"
      },
      {
        text:
          "上次的关于文章和标签的对应问题总算解决了，增加一个关联表，对应文章id和标签id的关系，关于显示文章里已删的的标签，解决方法是删除标签时并不是真删，而是加个在表里加个active，0是失效1是激活，删除将其值改为0。过程中最关键的是多对多表的读取与显示及存储，花了不少时间做这三步。这差不多现阶段最后一次研究php了"
      }
    ]
  },
  {
    time: "2016-04-12",
    children: [{ text: "原本准备学前端的，为何我学了这么多php，看不懂自己啊" }]
  },
  {
    time: "2016-04-11",
    children: [
      {
        imgs: [
          "2016041101.jpg",
          "2016041102.jpg",
          "2016041103.jpg",
          "2016041104.jpg",
          "2016041105.jpg",
          "2016041106.jpg",
          "2016041107.jpg",
          "2016041108.jpg",
          "2016041109.jpg"
        ],
        text:
          "终于将原网站用thinkphp重新做了一遍，几乎是完全将html与php分离开来了，更加规范，而且安全细节基本上都做到位了，现在ajax也玩的开始上道了。结果是文件夹突然变成了5M..."
      }
    ]
  },
  {
    time: "2016-04-08",
    children: [
      {
        imgs: [
          "2016040801.jpg",
          "2016040802.jpg",
          "2016040803.jpg",
          "2016040804.jpg"
        ],
        text: "静态页面已全部导入框架，安心睡个好觉"
      }
    ]
  },
  {
    time: "2016-04-06",
    children: [
      {
        text: "thinkphp框架果然强悍，是时候用起来了"
      }
    ]
  },
  {
    time: "2016-04-03",
    children: [
      {
        imgs: ["2016040304.jpg", "2016040305.jpg", "2016040306.jpg"],
        text:
          "查看，编辑，删除已做完，现在基本功能已经全部完成，可以使用了，下面就是润色了。"
      },
      {
        imgs: ["2016040301.jpg", "2016040302.jpg", "2016040303.jpg"],
        text: "细节做一做，安心解决下个难题"
      },
      {
        text: "http://layer.layui.com/   layer-强到爆炸的弹出层"
      }
    ]
  },
  {
    time: "2016-04-02",
    children: [
      {
        imgs: ["20160402.jpg"],
        text:
          "终于把标签部分全都完成了，这个过程真的是爽的不行，单个标签就用到了不少html,bootstrap,jquery,ajax,php,mysql里的东西，这写代码只能基本靠查手册，混合语言编码确实烦，经常记了这个的忘了那个的"
      }
    ]
  },
  {
    time: "2016-04-01",
    children: [
      {
        imgs: ["20160401.jpg"],
        text:
          "做完这个标签我再也不会认为看上去简单网站容易做了，这个小小的标签折腾死我了"
      }
    ]
  },
  {
    time: "2016-03-31",
    children: [
      {
        text: "做着做着又卡住了，数据库知识出现了短板，我真的想静静"
      }
    ]
  },
  {
    time: "2016-03-29",
    children: [
      {
        imgs: ["2016032902.jpg"],
        text:
          "今天听学长一说，才发现我现在需要的不是各种技术，而是最基本的编码规范！！！现在我要把主要的方向放在怎么写出规范上了"
      },
      {
        text:
          "HTML5通常包含的一些标准: SVG  ,  CSS3  ,  WebGL  ,  Web Workers  ,  Web Storage  ,  Web SQL Database  ,  Web Sockets  ,  Geolocation  ,  Microdata  ,  Device API  ,  File API"
      },
      {
        imgs: ["2016032901.jpg"],
        text:
          "寒假就把ajax挂在嘴上，今天终于用上了，点击 + 后。页面无刷新的将html5提交数据库并在下方显示，用过之后才明白ajax的强大"
      }
    ]
  },
  {
    time: "2016-03-26",
    children: [
      {
        imgs: ["2016032604.jpg"],
        text: "破解版get"
      },
      {
        imgs: ["2016032601.jpg", "2016032602.jpg", "2016032603.jpg"],
        text: "换波书看看"
      }
    ]
  },
  {
    time: "2016-03-25",
    children: [
      {
        imgs: ["2016032502.jpg"],
        text: "又一张，除了添加图片其他功能都完成啦"
      },
      {
        imgs: ["2016032501.jpg"],
        text: "果然第一周的css没白花功夫，就算是动态数据样式也基本没问题了"
      }
    ]
  },
  {
    time: "2016-03-24",
    children: [
      {
        imgs: ["2016032403.jpg"],
        text:
          "第一页的大致功能完成了，不过这样式布局目前还没找到好的方法，php动态输出的数据没法想静态网页任意布局，感觉我又要滚回去学习动站布局了"
      },
      {
        imgs: ["2016032401.jpg", "2016032402.jpg"],
        text: "继续完成我的简陋不安全的记事本"
      }
    ]
  },
  {
    time: "2016-03-18",
    children: [
      {
        imgs: ["2016031801.jpg", "2016031802.jpg", "2016031803.jpg"],
        text: "学会了发送和接收消息，再做记事本基本不成问题了"
      }
    ]
  },
  {
    time: "2016-03-15",
    children: [
      {
        imgs: [
          "2016031501.jpg",
          "2016031502.jpg",
          "2016031503.jpg",
          "2016031504.jpg",
          "2016031505.jpg"
        ],
        text: "从注册到激活，登录，个人中心，分页完成了，然而才学了三分之一"
      }
    ]
  },
  {
    time: "2016-03-11",
    children: [
      {
        imgs: ["2016031101.jpg", "2016031102.jpg", "2016031103.jpg"],
        text: "一星期了，才学到将注册表单写入数据库"
      }
    ]
  },
  {
    time: "2016-03-02",
    children: [
      {
        imgs: ["20160302.jpg"],
        text:
          "实现了ajax输出页面，不过手机排版根本不能看，只能日后为手机专门做一个样式表"
      }
    ]
  },
  {
    time: "2016-02-29",
    children: [
      {
        imgs: ["2016022904.jpg"],
        text: "好像有点感觉了"
      },
      {
        imgs: ["2016022903.jpg"],
        text: "只有点图像的边框才有反应，这游戏好难"
      },
      {
        imgs: ["2016022901.jpg", "2016022902.jpg"],
        text: "同样都是手机浏览器，显示样式怎么就辣么大呢"
      }
    ]
  },
  {
    time: "2016-02-20",
    children: [
      {
        imgs: ["2016022006.jpg"],
        text:
          "做到最后我发现30+行代码就能解决所有问题，根本不需要计算！真不知道是该哭还是笑"
      },
      {
        imgs: [
          "2016022001.jpg",
          "2016022002.jpg",
          "2016022003.jpg",
          "2016022004.jpg",
          "2016022005.jpg"
        ],
        text: "全是数学逻辑的移动导航，脑子要爆炸了（最后一张样图）"
      }
    ]
  },
  {
    time: "2016-02-18",
    children: [
      {
        imgs: ["20160118.jpg"],
        text: "这有毒的五月终于搞定了，要吐血了"
      }
    ]
  },
  {
    time: "2016-02-17",
    children: [
      {
        imgs: ["20160117.jpg"],
        text: "日历功能实现了，不过刚发现手机排版有些问题！简直不科学。"
      }
    ]
  }
];

export default data;
