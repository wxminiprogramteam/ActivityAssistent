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
  "pages/catagroy/catagroy",  分类页      
  "pages/mine/mine",          我的      
  "pages/detail/detail",          文章详情页      
   

  底部导航栏分别对应 首页、分类页、我的     
  首页的轮播图以及文章简介是 文章详情页的入口        
  分类页类似于首页，不设置轮播图，文章简介是文章详情页的入口      

  。。。。其他页面待添加      

## 数据结构
数据采用json格式存储          
其中云开发自动生成"_id"用于标记这条记录         
数据表：post文章、user用户       

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

## user用户的数据
{
    "username": "1144096387",
    "password": "123456",
    "name": "金成",
    "sNumber": "17051122",
    "upPosts": [],
    "collectionPosts": [],
    "comments":[
        {
            "post_id":"",
            "content":""
        }
    ],
    "signUp":[
        {
            "post_id":"",
            "time": ""
        }
    ],
    "history":[
        {
            "post_id": "",
            "time": ""
        }
    ]
}

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





### 思路整理

数据有两个集合：文章、用户
文章包括：文章的相关信息，其中包含文章的评论数、评论信息、喜欢数、收藏数、可以考虑加参加人数
用户包括：用户的信息，其中包含用户发表的评论信息、用户喜欢的文章的id、用户收藏的文章的id

这样，当首页和分类页加载时，拉取文章数据。
我的页面里的子页面加载时拉取相应的用户信息

接下来的任务是：
完善我的相关页面：如用户的头像（可以自由选择拍照或相册上传）、我的喜欢、我的收藏、我的评论、报名记录、历史记录，除了我的评论页面想要定制，其他几个都用文章简介的展示方式展示。
完善文章相关页面：文章点赞收藏功能、文章评论功能、活动报名功能、活动签到功能

在已收藏已喜欢直接套用前面的文章简介组件来展示，点击进入详情页。活动的报名和签到入口放在活动详情页里


开发任务流程：
先完善用户头像
然后完善文章的点赞收藏功能
然后完善我的喜欢我的收藏
然后完善搜索功能
然后完善活动报名功能和活动签到功能
然后完善报名记录、历史记录
加分享功能
完善未登录状态下操作的禁止及提示
加下拉刷新和加载更多，以及静默刷新
添加浏览数以及去掉评论

### 总体思路分析与代码结构数据结构优化

#### 程序运行流程
- 未登录状态            

- 登录状态          
#### 组件化 
- 文章简介卡片组件          
抽离出文章简介卡片组件
#### 数据结构优化


## 工作进度
- 完成了用户头像，后期可以考虑添加剪裁功能
- 完成了文章点赞收藏功能
    + 云数据库有一个权限选择功能，但都不支持非创建者写入数据，因此对于文章这一公共数据，需要把修改数据的功能放到云函数中相当于管理员修改。
- 完成了文章简介卡片组件的抽离，接下来准备制作我的喜欢和我的收藏页面
- 完成了我的喜欢和我的收藏页面，后期可以考虑优化
- 完成搜索功能，后续可以添加历史搜索记录
- 完成文章详情页的转发功能
- 去掉了评论，添加了浏览数
- 现在个人工作部分目前计划还差 
    + 加下拉刷新和加载更多，以及静默刷新
    + 将登录改为微信授权登录，然后在个人资料处让用户补充自己的信息

### 关于微信授权和登录
用户授权登录后，在云数据库中创建一个记录
nickname:微信昵称
avatarUrl:微信头像

然后提供个人资料页面让其更改和补充资料
avatarUrl:小程序头像
name: 真实姓名
sNumber: 学号
academy: 学院
major: 专业
phone: 联系方式

{
    "name": "金成",
    "avatarUrl": "",
    "sNumber": "17051122",
    "academy":"",
    "major":"",
    "phone":"",
    "isManager":false,
    "upPosts": [],
    "collectionPosts": [],
    "signUp":[
        {
            "post_id":"",
            "time": ""
        }
    ],
    "history":[
        {
            "post_id": "",
            "time": ""
        }
    ]
}

基本完成用户系统的改版              
接下来需要完善加下拉刷新和加载更多，以及静默刷新        
以及与讲座报名的整合

## 关于加载更多
需要写一个分页的云函数，且让返回数据按时间排序，最新的排在前面

还需要参考老师的教程加入登陆后返回之前的页面

### 今日任务
完成分页和加载更多
完成登录后返回之前的页面
优化代码结构，写一下项目文档