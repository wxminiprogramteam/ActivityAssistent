//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
const _ = db.command;
Page({
  data: {
    isloading: true,
    posts: [],
    banners: [],
    isHideLoadMore: true,
    currentPageIndex: 0,
    hasMore: true
  },
  onLoad: function (options) {
    //注意： 在下面获取数据库数据的api的回调函数中，this会变，因此要在此处将当前的this保存下来
    var that = this;
    //获取轮播图数据
    db.collection('post').where({
      banner: _.gt(-1)
    })
    .get({
      success(res) {
        that.setData({
          banners: res.data
        })
      }
    })

    //获取第一页的文章数据
    wx.cloud.callFunction({
      name: "pagination",
      data: {
        dbName: "post",
        pageIndex: 0,
        pageSize: 5
      }
    }).then(res => {
      that.setData({
        posts: res.result.data,
      })
      setTimeout(function () {
        that.setData({
          isloading: false
        })
      }, 1000)
      //将文章数据保存到本地缓存中
      that.data.posts.map(function (currentValue, index, arr) {
        // console.log(currentValue);
        wx.setStorage({
          key: currentValue._id,
          data: currentValue
        })
      })
    })


  },
  //点击文章简介卡片进入文章详情页
  onPostTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    // console.log(postId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    })
  },
  //点击轮播图进入文章详情页
  onSwiperTapToDetail: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + postId
    })
  },
  //点击顶部导航栏进入搜索页
  tapToSearch: function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //获取第一页的文章数据
    wx.cloud.callFunction({
      name: "pagination",
      data: {
        dbName: "post",
        pageIndex: 0,
        pageSize: 5
      }
    }).then(res => {
      that.setData({
        posts: res.result.data,
      })
      setTimeout(function () {
        that.setData({
          isloading: false
        })
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1000)
      that.data.posts.map(function (currentValue, index, arr) {
        // console.log(currentValue);
        wx.setStorage({
          key: currentValue._id,
          data: currentValue
        })
      })
    })
   
  },
  //触底加载更多
  onReachBottom: function(){
    var that = this;
    if(!this.data.hasMore){
      return;
    }
    this.setData({
      isHideLoadMore: false
    })
    var currentPageIndex = this.data.currentPageIndex;
    currentPageIndex ++;
    this.setData({
      currentPageIndex: currentPageIndex
    })
    // 云函数pagination
    wx.cloud.callFunction({
      name: "pagination",
      data: {
        dbName: "post",
        pageIndex: currentPageIndex,
        pageSize: 5
      }
    }).then(res => {
      var posts = this.data.posts;
      posts = posts.concat(res.result.data); 
      this.setData({
        isHideLoadMore: true,
        posts: posts,
        hasMore: res.result.hasMore
      })
      //将文章数据保存到本地缓存中
      that.data.posts.map(function (currentValue, index, arr) {
        wx.setStorage({
          key: currentValue._id,
          data: currentValue
        })
      })
    })
  }
})
