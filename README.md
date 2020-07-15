# 一个 node cli ，帮助你更快的开发 vue 项目

### 功能点

1、add-component:增加一个组件 【✅】

2、add-page:增加一个页面，同时添加路由配置 【✅】

3、init: 初始化一个新项目 【X 未完成】

### 安装

```
  npm install -g fc-vue
```

### 使用

请在项目根目录或者./src 目录下使用

```
  # 路由页面
  $fc-vue add-page

  # 组件
  $fc-vue add-component

  #也支持下面这种 (默认是less)
  $fc-vue add-page user/login -s --title=页面标题
  $fc-vue add-page demo --title=页面标题
  $fc-vue add-component top/nav -s

```

### 使用 demo

![alt 图片](./static/demo-show.gif)

![alt 图片](./static/demo-show2.gif)

### 使用帮助（懂的自然懂）

```
 # 整个cli的帮助文档
 $fc-vue

 # add-page 的帮助文档
 $fc-vue help add-page

 # add-component 的帮助文档
 $fc-vue help add-component
```

### 关于项目目录规范

1、路由页面【fc-vue add-page】

路由页面放在./src/views 或者./src/pages 【支持./src/page】下面,
路由文件放在./src/router.js 或者 ./src/router/index.js

路由文件里面的内容必须符合以下规则，【这也是 vue 官方脚手架生成的路由格式】

```
//定义路由数组的变量名必须是routes ,最后 ]; 结束
const routes= [

];
```

2、通用组件【fc-vue add-component】

通用组件放在./src/components 【支持./src/component】
