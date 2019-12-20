## [前端总结(个人)]
### 为什么需要前后端分离
#### 部分概念声明
##### 渲染
网页可以分为静态、动态两种,前者就是一个 HTML 文件,后者可能只是一份模板,在请求时动态的计算出数据,最后拼接成 HTML 格式的字符串,这个过程就被称为渲染。
#### 模式演变
##### 原始时代
开发初始的我们没有任何工具,只能靠蛮力。通过Java的Servlet编写服务端程序,来处理 HTTP 请求和返回,把 HTML文本当做字符串返回。理论上来说,这个时候已经可以开始所有前端开发了,但在这混沌初开的年代,想写出一份可维护的代码恐怕得用上“洪荒之力”。把 UI 和业务逻辑写在一起是一种非常强的耦合,不利于项目日后的拓展。也无法要求每个人同时会写 Java 和前端。
#### 后端 MVC时代
针对逻辑混乱不清的问题,提出了后端MVC的方案

MVC 方案实现：以JSP为例,它经过编译后变成 Servlet。在写 JSP 的时候,我们更加关心页面样式,因此代码看起来就像是 HTML,不过在 <% %> 代码块中可以调用 Java 函数。JSP 相当于 View 层,它从 Model 中获取数据

MVC 的缺点：首先业务逻辑依然没有严格区分,如果没有良好的编码规范,JSP 中就会混入大量业务逻辑。而一个框架存在的作用应该是让没有接受很多培训的新人也能写出合格的代码。此外,前端开发者还需要对后端逻辑有大致的了解,熟悉后端编程语言,因此也存在很多沟通、学习成本。
#### 后端 MVC的改进
为了解决MVC的痛点，一种解决方案是前端开发者只写 Demo,也就是提供静态的 HTML 效果给后端开发者,由后端开发者去完成视图层(比如 JSP)的开发。

实际应用的缺憾：首先后端开发者依赖于前端的 Demo,只有看到 HTML 文件他们才可以开始实现 View 层。而前端又依赖于后端开发者完成整体的开发,才能通过网络访问来检查最终的效果,否则他们无法获取真实的数据。更糟糕的是,一旦需求发生变动,上述流程还需要重新走一遍,前后端的交流依旧无法避免。概况来说就是前后端对接成本太高。开发流程效率极低,难以接受。
#### HTML 模板
其实一定程度上来说,JSP 可以看做 HTML 模板的雏形。HTML 大体上肩负了两个任务: 页面框架和内容描述。所谓的 HTML 模板是指利用一种结构化的语法,表示出 HTML 的框架,同时把具体数据抽离出来。即：数据 + 模板 = HTML 源码。典型的应用者zkoss

回到模板的概念上来,它相对于 JSP 的优势在于,利用工具强行禁止前端开发者在视图层写业务逻辑。前端开发者只需要关心 UI 实现并确定 HTML 中的变量。而后端开发者只要传入参数即可获取 HTML 格式的字符串。模板开发的另一个好处是前后端可以同步开发。双方约定一个数据格式,前端就可以模拟出假数据并用来自测,后端也可以用生成的数据与假数据对比进行测试。
#### 后端 MVC 架构总结
使用后端 MVC 架构加上模板开发是当前比较主流的一种开发模型,但它也不是完美的。由于模板由前端开发者完成,所以要求前端开发者对后端环境(注意这里不是实现细节)有所了解。总的来说,采用服务端 MVC 方案时,HTML 在后端渲染,整体开发流程也全部基于后端环境。因此前端工程师不可避免的需要依赖于后端(虽然使用模板后情况已经大大改善)。

#### AJAX 与前端 MVC
得益于 AJAX 的提出,HTML 在前端渲染变成了可能。我们可以下载一个空壳 HTML 文件和一个 JavaScript 脚本,然后在 JavaScript 脚本中获取数据,为 DOM 添加节点。这时候就出现了很多前端的 MVC 框架,比如 Backbone.js,AngularJS,react,vue。

使用了前端 MVC 框架后,对于单页应用(Single Page Application)来说,前后端各司其职,唯一的联系就变成了 API 调用,前端开发者不再依赖后端环境,HTML 和 JavaScript 都可以放在 CDN 服务器上。这就是我们常说的 前后端分离 的基本概念,即前端负责展现,后端负责数据输出。

前后端分离的缺点：上述前后端分离方案远远逊色于后端 MVC + 模板的开发流程。导致如下问题：
1. 双端 MVC 不统一：前端的 Model 和后端的 Model 结构上高度类似,比如前端用到一个 name 属性,后端也得在 JavaBean 中定义一个 name。有时候为了避免前端对数据做太多逻辑处理从而导致性能下降,后端可能已经做了一些预处理。因此,前后端逻辑上的耦合还是无法完全避免。前端的 Controller 负责页面调度,比如控件的状态管理和样式改变等。而后端的 Controller 负责调用服务,用户鉴权等。两者完全不等价。
2. SEO：一个纯异步的网页,HTML 几乎是空壳子,而偏偏关键的数据都是动态下发的,这就影响了搜索引擎爬虫的工作过程,他们会认为该网页什么都没有,即使记录下来的也是非关键数据。
3. 性能不够：HTML 文件非常小,很快就被打开。但是页面的渲染逻辑直到 JavaScript 文件被下载后才能开始执行,这就会导致一段时间的白屏。在移动网络上,前端渲染 HTML 的性能当然不如后端渲染,频繁发送 HTTP 请求也会影响加载体验,因此依赖于前端渲染的页面,在性能方面还有很大的提高空间。
4. 这种做法适合组件化,我们很容易定义出一个组件并且重用。这种思想对于复杂的 SPA 来说或许适用,但对于并不复杂但有多个页面的网页来说,就显得太重了。引入了 React 这样的框架,以及 MVC 的结构,反而会显得过度设计,增加代码量和复杂度。考虑到之前所说的前后端逻辑不能复用的问题,这就更容易导致性能问题。
#### 前端MVC总结
在上述分离过程中，过度强调物理层上的前后端分离,但是忽略了两者天然就存在一定的耦合。实际上,前端开发者不仅关注 View 的实现,还应该负责一部分 Controller 中的逻辑,后端开发者则应该关心数据获取与处理,以及一些跨终端的业务逻辑。

如果页面渲染在后端实现,会导致前端开发者依赖后端实现和开发环境,后端开发者被迫熟悉前端逻辑。

如果页面渲染全部放在前端,业务逻辑就会太靠前,从而导致不能复用。这种做法似乎有些矫枉过正了。
#### Node.js 分层
Node.js 作为一个中间层,调用上游 Java 服务器提供的服务,获取数据。自身负责处理业务逻辑,路由请求,cookie 读写,页面渲染等。前端则负责应用 CSS 样式和 JavaScript 交互。Node.js 基于事件和异步 I/O 的特性,以及优秀的处理高并发的能力非常适合前后端分离的场景,使用 BigPipe 等技术也足以将分层带来的损耗降到最低。

### 前端linux部署
基于centos的实践
```
// 安装nodejs
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
yum install -y nodejs
// c++编译工具
yum install gcc-c++ make
// 安装git
yum install -y git
// 安装yarn
npm install -g yarn
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
// 克隆项目
git clone “https://github.com/stanJx/jinbo.git”
```

### 通用组件
#### javascript框架及其组件
1. font-awesome(4.7.0)：字体矢量图标库。 文档地址：**http://fontawesome.dashgame.com/**
2. jsplumb(2.5.9)：流程图构建工具。 文档地址：**https://jsplumbtoolkit.com/community/doc/home.html**
3. loadsh(4.17.5)：js实用工具库。 文档地址：**https://www.lodashjs.com/docs/4.17.5.html#chunk**
4. normalize(7.0.0)：浏览器样式重置文件。 文档地址：**https://github.com/necolas/normalize.css**
5. axios(0.17.1)：用于ajax请求。  文档地址：**https://github.com/axios/axios**
6. date-fns(1.29.0)：轻量级的js时间库。  文档地址：**https://date-fns.org/**
7. echart(4.0.4)：百度图表图形库 。 文档地址：**http://echarts.baidu.com/index.html**
#### Nodejs框架及其组件
1. express(4.14.1)： nodejs web框架。 文档地址：**http://www.expressjs.com.cn/4x/api.html**
2. multer(1.3.0)：express文件上传中间件。 文档地址：**https://github.com/expressjs/multer**
3. babel-polyfill(6.26.0)：解决新api的浏览器兼容性问题。文档地址：**http://babeljs.io/docs/usage/polyfill**
4. body-parser(1.18.2)：HTTP请求体解析中间件。文档地址：**https://github.com/expressjs/body-parser**
5. eslint(3.19.0)：可组装的js和JSX检查工具。 文档地址：**http://eslint.cn/**
6. mockjs(1.0.1)：生成随机数据，拦截 Ajax 请求，解决对接问题。文档：**http://mockjs.com/**
7. webpack(3.6.0)：前端资源打包器。文档：**http://www.css88.com/doc/webpack/**
8. yarn(1.5.1)：npm包管理器。文档：**https://yarn.bootcss.com/docs/install.html**
9. babel-eslint(7)：解决eslint错报es7语法错误。文档地址：**https://github.com/babel/babel-eslint**
10. eslint-plugin-import(2.9.0)：模块导入eslint助手插件。**https://github.com/benmosher/eslint-plugin-import**
11. eslint-plugin-jsx-a11y(6.0.3)：无障碍环境配置，目前用来解决eslint报.js文件jsx语法错误。文档地址**https://github.com/evcohen/eslint-plugin-jsx-a11y**
11. eslint-plugin-react(7.7.0)：react语法eslint识别插件。文档：**https://github.com/yannickcr/eslint-plugin-react**
12. babel-plugin-import(1.6.7)：按需加载插件(国人anted团队开发)。文档：**https://github.com/ant-design/babel-plugin-import**
***************************************
### PC端主要框架选用及文档地址
#### javascript框架及其组件
1. vue-cli(2.9.1)：vue脚手架。  文档地址：**https://github.com/vuejs/vue-cli**
2. element-ui(2.2.1)：饿了么ui组件库。 文档地址：**http://element.eleme.io/#/zh-CN/component/installation**
3. vue(2.5.2)：渐进式js框架。 文档地址：**https://cn.vuejs.org/v2/guide/**
4. vue-baidu-map(0.19.0)：百度地图。  文档地址：**https://dafrok.github.io/vue-baidu-map/#/zh/start/usage**
5. vue-router(3.0.1)：vue路由组件。 文档地址：**https://router.vuejs.org/zh-cn/**
6. vuex（3.0.1）：vue状态管理组件。 文档地址：**https://vuex.vuejs.org/zh-cn/**
#### Nodejs框架及其组件
1. babel-plugin-transform-vue-jsx(3.5.0)：vue中jsx语法转义。文档地址：**https://github.com/vuejs/babel-plugin-transform-vue-jsx**
2. http-proxy-middleware(0.17.3)：nodejs代理组件，解决跨域问题。文档：**https://github.com/chimurai/http-proxy-middleware#options**
3. node-sass(4.7.2)：CSS语言拓展。文档：**https://www.sass.hk/**

*********************
### APP端主要框架选用及文档地址
#### javascript框架及其组件
1. react(16.2.0)：函数式js库。文档：**http://www.css88.com/react/docs/hello-world.html**
2. redux(5.0.7)：react状态管理组件。文档：**https://redux.js.org/basics/usage-with-react**
3. react-router-dom(4.2.2)：react路由管理组件。文档：**https://reacttraining.com/react-router/web/guides/philosophy**
4. antd-mobile(2.1.6)：蚂蚁金服开源移动ui组件库。文档：**https://mobile.ant.design/docs/react/introduce-cn**
5. react-fontawesome(1.6.1)：简化fontawesome在react中的使用。文档：**https://www.npmjs.com/package/react-fontawesome**
#### Nodejs框架及其组件
1.  create-react-app(保持最新)：facebook官方react脚手架。文档：**https://github.com/facebook/create-react-app/tree/master**
2. react-app-rewired(1.4.1)：重写create-react-app默认配置。文档：**https://github.com/timarney/react-app-rewired**
**************************
### react native主要框架选用及文档
#### javascript框架及其组件
1. react(16.2.0)：函数式js库。文档：**http://www.css88.com/react/docs/hello-world.html**
2. antd-mobile(2.1.6)：蚂蚁金服开源移动ui组件库。文档：**https://mobile.ant.design/docs/react/introduce-cn**
3. react-native(0.54.2)：跨平台移动应用开发框架。文档：**https://reactnative.cn/docs/0.51/getting-started.html#content**
4. react-native-router-flux(4.0.0)：路由导航。文档：**https://www.jianshu.com/p/37428d579cf6**
5. react-native-gifted-chat(0.4.3)：开源IM组件。文档：**https://github.com/FaridSafi/react-native-gifted-chat**
6. react-native-vector-icons(4.5.0)：开源图标库。文档：**https://github.com/oblador/react-native-vector-icons**
7. react-native-elements(0.19.0)：矢量图标库集。文档：**https://react-native-training.github.io/react-native-elements/docs/0.19.0/button.html**
#### Nodejs框架及其组件
1. eslint-config-airbnb(16.1.0)：添加airbnb标准。文档：**https://www.npmjs.com/package/eslint-config-airbnb**
**************************
### vue服务端渲染
1. nuxt(1.0.0)：基于vuecli的服务端渲染方案。文档：**https://zh.nuxtjs.org/**
**************************
### PC主要文件目录
```
build                            //node打包配置文件夹
    build.js                     //打包执行文件
    dev-server.js                //服务器启动配置文件
    webpack.base.conf.js         //webpack文件入口配置
    webpack.dev.conf.js          //开发环境下webpack入口文件与路径配置
    webpack.prod.conf.js         //生产环境下webpack入口文件与路径配置
config                           //主要配置文件夹
    index,js                     //服务器代理以及路径打包规则配置
mock                             //前端模拟数据文件夹
    download.js                  //下载请求拦截
    index.js                     //ajax请求拦截
    upload.js                    //上传请求拦截
src                              //开发环境
    api                          //公用api存放文件夹
    assets                       //页面静态资源存放文件夹
        img                      //页面图标存放文件夹
    components                   //大型、公用组件存放文件夹
    plugin                       //vue自定义指令、函数存放文件夹
    router                       //vue路由存放文件夹
    store                        //vuex文件夹
    style                        //全局SCSS文件夹
    view                         //页面组件文件夹
        home                     //首页页面
            home.js              //首页入口
        login                    //登录页
            login.js             //登录页入口
        workbench                //系统页面
            workbench.js         //系统页面入口
static                           //服务器静态资源文件夹
.babelrc                         //babelrc转义配置文件
.eslintrc.js                     //eslint配种文件
package.json                     //项目配置文件
```
### app主要文件目录
```
mock                             //前端模拟数据文件夹
    index.js                     //ajax请求拦截
public                           //入口公用页面模板
src                              //开发环境
    api                          //公用api存放文件夹
    assets                       //页面静态资源存放文件夹
        img                      //页面图标存放文件夹
    components                   //大型、公用组件存放文件夹
    router                       //react路由存放文件夹
    store                        //redux文件夹
    style                        //全局css文件夹
    view                         //页面组件文件夹
    index.js                     //页面入口
config-overrides.js              //配置重写文件
package.json                     //项目配置文件
```
### react native主要文件目录
```
android                          //安卓原生文件夹
ios                              //ios原生文件夹
src                              //h5页面文件夹
	api                          //请求接口
	components                   //组件
	img                          //图片
	view                         //页面
package.json                     //nodejs项目配置文件
```
### vue服务端渲染(nuxt)目录
```
api                              //请求接口
assets                           //资源文件
components                       //渲染组件
layouts                          //布局文件
middleware                       //中间件
pages                            //页面组件
plugin                           //插件(element-ui等)
server-mock                      //假数据服务器
static                           //静态文件
store                            //vuex状态管理
vue.config.js                    //vuecli配置重写文件
nuxt.config.js                   //nuxt配置文件
package.json                     //nodejs项目配置文件
```
### 前端端规范(主要)
#### npm管理工具
npm管理工具使用yarn如下方式来安装全局指令和镜像源
  ```
  npm install -g yarn
  yarn config set registry https://registry.npm.taobao.org --global
  yarn config set disturl https://npm.taobao.org/dist --global
  ```
#### 页面文件结构
每个url对应view下每个模块的.vue文件，例如view/workbench/file/upload.vue，其中view含义为视图层，workbench为入口文件夹，file为功能模块，upload.vue为子功能页面。react同理
#### 页面拆分
每个子功能页面的父级组件为数据管理层，处理此页面的所有的数据请求以及分发，其子组件的拆分尽量降低耦合度，子组件尽量做到只作为渲染组件，业务逻辑统一交由父组件处理。一个完整子功能页面的文件结构应当如下：
  ```
  index.vue        //父级组件
  components  //子组件文件夹
  hellpers   //供子父组件调用的功能函数文件夹
  ```
#### CSS
css属性书写顺序：布局定位属性 自身属性 文本属性 其他属性 CSS3属性
  ```
/* 布局定位属性 */
display ； list-style ； position（相应的 top,right,bottom,left） ； float ； clear  ； visibility / overflow
/* 自身属性 */
width ； height ； margin ； padding ； border ； background
/* 文本属性 */
color ； font ； text-decoration ； text-align ； vertical-align ； white- space ； break-word
/* 其他（CSS3）  */
content ； cursor ； border-radius ； box-shadow ； text-shadow ； background:linear-gradient
    ```
重写组件样式全局class命名，以组件的原class辅以__rewrite等修饰符来修改组件原有样式。
css规范参考BEM规范，相关链接：**https://www.w3cplus.com/css/css-architecture-1.html**
命名规范参考链接：**https://www.w3cplus.com/css/css-architecture-2.html**
文件组织结构规范链接：**https://www.w3cplus.com/css/css-architecture-3.html**
#### nodejs拦截ajax请求以及页面资源处理
开发过程中，数据使用nodejs返回的模拟数据，在mockjs下编写模拟数据，注意由后台返回的图片资源不要放到src下的assets下，应当使用mockjs生成模拟的图片，如果后台接口只返回空数据，可不写对应mock文件
#### 前台ajax请求
所有的请求都应当从api下调取相应的函数，如果api不存在组件的复用，应当使用request.js作为请求函数，如果是复用组件的api应当新建一个api文件方便他人调用。
#### 代理调试
vue环境下通过修改config下的index.js中的proxyTable将数据和图片接口代理至正式服务器中调试。react环境下通过修改package.json的proxy来分发代理
#### 数据流强调
所有页面的数据流均应该是由上至下的，即所有的数据和业务逻辑的处理均都应该发生在父组件，而子组件只负责渲染
#### 子组件props
在vue中由子组件的props应当声明数据类型和是否必须
#### 大型框架组件库的引用
在应用大型框架组件库的时候不要全部引入，分模块按需引入，避免打包后文件过大
#### js新api的使用
function xxx(){}用xxx(){}或者箭头函数()=>{}代替。所有的循环使用for of，常用数组处理函数，map，filter，sort。声明局部变量时使用let
#### react无状态组件
在react中，无状态的组件应当用函数表示即可const App = () => {return ()}，需要保存自身状态的用class来声明
#### 图片的引入
在vue或react中引入图片时，通过import导入，并以***Img来命名

### class部分命名规则
    (1)页面结构
    容器: container                      页头：header
    内容：content/container             页面主体：main
    页尾：footer                         导航：nav
    侧栏：sidebar                        栏目：column
    页面外围控制整体布局宽度：wrapper   左右中：left right center
    (2)导航
    导航：nav                           主导航：mainbav
    子导航：subnav                     顶导航：topnav
    边导航：sidebar                     左导航：leftsidebar
    右导航：rightsidebar                          菜单：menu
    子菜单：submenu                             标题: title
    摘要: summary
    (3)功能
    标志：logo                                    广告：banner
    登陆：login                                   登录条：loginbar
    注册：register                                搜索：search
    功能区：shop（如购物车）                     标题：title
    加入：joinus                                  状态：status
    按钮：btn                                     滚动：scroll
    标签页：tab                                   文章列表：list
    提示信息：msg                               当前的: current
    小技巧：tips                                  图标: icon
    注释：note                                   指南：guide
    服务：service                                 热点：hot
    新闻：news                                  下载：download
    投票：vote                                   合作伙伴：partner
    友情链接：link                                版权：copyright
