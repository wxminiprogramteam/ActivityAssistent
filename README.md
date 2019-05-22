



## 项目文档
### pages页面
#### index首页
##### 页面结构
- 顶部搜索栏
- 轮播图
- 若干个文章简介卡片
##### 页面功能
- 顶部搜索栏是search搜索页的入口
- 轮播图和若干个文章简介卡片是文章详情页的入口
- 下拉刷新
- 触底加载更多

#### catagroy分类页
##### 页面结构
- 顶部搜索栏和分类栏
- 若干个文章简介卡片
##### 页面功能
- 顶部搜索栏是search搜索页的入口
- 若干个文章简介卡片是文章详情页的入口
- 若干个文章简介卡片由swiper包裹，可通过滑动或者分类栏类目的点击显示对应的swiper-item以及包含的若干文章简介卡片

#### mine我的
##### 页面结构
- 顶部欢迎栏
- 头部信息
    + 未登录状态：默认头像图片、点击登录按钮
    + 登录状态：用户头像、微信昵称、学号
- 若干页面入口栏：个人资料、我的喜欢、我的收藏、报名记录、发布活动（管理员专属）
- 退出登录按钮（登录状态）
##### 页面功能
- 顶部欢迎栏呈现欢迎词动画
- 点击登录按钮 点击后请求用户授权，授权成功后获取用户信息并登录
- 登录状态的用户头像可以点击修改头像
- 若干页面入口栏是对应页面的入口,未登录状态下点击会出现登录提示
- 退出登录按钮 退出登录状态

#### mine/personInfo个人资料
##### 页面结构
- 顶部欢迎栏
- 头部信息：用户头像、微信昵称、学号
- 用户信息列表
    + 浏览状态：以文本的形式显示用户信息
    + 编辑状态：出现输入框供用户输入数据进行修改
- 修改资料按钮（浏览状态）
- 确定修改按钮（编辑状态）
##### 页面功能
- 顶部欢迎栏呈现欢迎词动画
- 修改资料按钮 点击后进入编辑状态
- 确定修改按钮 点击后进入浏览状态并提交修改的信息

#### mine/up我的喜欢
##### 页面结构
- 顶部欢迎栏
- 若干文章简介卡片
##### 页面功能
- 顶部欢迎栏呈现欢迎词动画
- 若干文章简介卡片 显示用户已喜欢的文章

#### mine/collection我的收藏
##### 页面结构
- 顶部欢迎栏
- 若干文章简介卡片
##### 页面功能
- 顶部欢迎栏呈现欢迎词动画
- 若干文章简介卡片 显示用户已收藏的文章

#### detail文章详情页
##### 页面结构
- 文章信息
- 按钮组
    + 喜欢按钮
    + 收藏按钮
    + 报名按钮
    + 分享按钮
##### 页面功能
- 文章信息显示
- 喜欢按钮和收藏按钮 点击后修改对应的数据
- 报名按钮 点击后进入报名页面
- 分享按钮 点击后弹出分享功能
- 点击小程序顶部的“三点”按钮也能进行分享


#### search搜索页
##### 页面结构
- 顶部搜索栏 
- 讲座简易信息列表
##### 页面功能
- 顶部搜索栏提供模糊查询，当输入的数据能通过模糊查询在云数据库中找到时就会出现对应的讲座简易信息列表


### components组件
#### 文章简介卡片
传入文章数据进行渲染



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
