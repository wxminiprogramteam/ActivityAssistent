## 工作日志
### 第六周 2019.4.2
- 为post数据添加类型type属性
- 制作分类页，采用顶部选项卡的形式

- 下周工作安排
    + 将讲座简介抽离为一个组件
    + 将数据库api封装成工具函数
    + 添加静默刷新
    + 添加图片预加载



## 页面结构
  "pages/index/index",        首页      
  "pages/classify/classify",  分类页      
  "pages/mine/mine",          我的      
  "pages/post/post",          文章详情页      
  "pages/list/list"           分类列表页      

  底部导航栏分别对应 首页、分类页、我的     
  首页的轮播图以及文章简介是 文章详情页的入口     
  分类页的分类栏目是分类列表页的入口      
  分类列表页类似于首页，不设置轮播图，文章简介是文章详情页的入口      

  。。。。其他页面待添加      

## 数据结构
数据采用json格式存储          
其中云开发自动生成"_id"用于标记这条记录         
数据表：post文章、user用户、collection收藏、up喜欢、comment评论       

### post文章的数据
#### 示例
    {
        "activity_time": "3月20号 19:30-20:30",
        "post_time": "3月18号 18:00",
        "title": "高校小程序大赛讲座",
        "place": "第七教学楼127多功能厅",
        "post_img": "/images/post/post-5.jpg",
        "organizer_img": "/images/avatar/avatar-1.png",
        "content": "本次大赛是基于微信小程序平台的创新应用开发设计竞赛。大赛面向全球高校在校生开放...",
        "organizer": "",
        "detail": "本次大赛是基于微信小程序平台的创新应用开发设计竞赛。大赛面向全球高校在校生开放，旨在通过竞赛的方式提升学生进行Web应用的设计与开发能力，特别是运用微信生态小程序平台开发技术进行创新实践的能力，实现以赛促学、以赛促教、以赛促用，推动微信生态体系的人才培养和产学研用",
        "reading_num": 96,
        "upNum": 22,
        "collection_num": 7,
        "comment_num": 4,
        "collection_status": false,
        "up_status": false,
        "banner": 0
    }
#### 各属性对应的含义
    "activity_time" 活动时间
    "post_time" 文章发布时间
    "title" 活动标题
    "place" 活动地点
    "post_img" 活动宣传图片
    "organizer_img" 组织者头像 
    "content" 活动简介
    "organizer" 组织者名称
    "detail" 文章详细内容
    "reading_num" 阅读数
    "upNum" 喜欢数
    "collection_num" 收藏数
    "comment_num" 评论数
    "collection_status" 是否已收藏
    "up_status" 是否已喜欢
    "banner" 表示是否为轮播图中的内容，如果>=0，则banner的值对应轮播图的位置，如果为-1则不是轮播图


## 思路片段
### 关于用户对文章的喜欢、收藏状态的业务逻辑思路
分别用up和collection两个json格式来存储用户与文章之间的喜欢、收藏关系
在拉取文章之后，通过文章id和用户id去查询喜欢、收藏数据，如果是已喜欢或已收藏，则更改拉取到的文章的up_status和collection_status

### 关于点击文章简介进入文章详细页
点击文章简介通过url传值，传递文章的id。在文章详细页加载时，通过这个id来拉取相应文章的内容。
此处有重复拉取的弊端      
后面的优化目前能想到的有两条路：      
1.在文章列表页拉取数据后进行本地缓存。      
2.直接传递这个item的json。（不清楚小程序支不支持）    



