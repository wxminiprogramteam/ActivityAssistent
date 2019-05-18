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
  //后期要优化onLoad和onShow
  onLoad: function (options) {

   


    //注意： 在下面获取数据库数据的api的回调函数中，this会变，因此要在此处将当前的this保存下来
    var that = this;


    //获取轮播图数据
    db.collection('post').where({
      banner: _.gt(-1)
    })
    .get({
      success(res) {
        console.log(res.data);
        that.setData({
          banners: res.data
        })
      }
    })
    // //获取所有的文章
    // db.collection('post').get({
    //   success(res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     // console.log(res.data);
    //     that.setData({
    //       posts: res.data,
    //     })
    //     setTimeout(function(){
    //       that.setData({
    //         isloading: false
    //       })
    //     },1000)
    //     that.data.posts.map(function (currentValue, index, arr) {
    //       // console.log(currentValue);
    //       wx.setStorage({
    //         key: currentValue._id,
    //         data: currentValue
    //       })
    //     })
    //   }
    // })
    wx.cloud.callFunction({
      name: "pagination",
      data: {
        dbName: "post",
        pageIndex: 0,
        pageSize: 5
      }
    }).then(res => {
      console.log(res.result.data);
      that.setData({
        posts: res.result.data,
      })
      setTimeout(function () {
        that.setData({
          isloading: false
        })
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

  onPostTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    // console.log(postId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    })
  },

  // target 和currentTarget
  // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
  // target这里指的是image，而currentTarget指的是swiper
  onSwiperTapToDetail: function (event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + postId
    })
  },
  tapToSearch: function(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载

    //获取所有的文章
    db.collection('post').get({
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        // console.log(res.data);
        that.setData({
          posts: res.data,
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
        
      }
    })
  },

  onReachBottom: function(){
    if(!this.data.hasMore){
      return;
    }
    console.log("加载更多");
    this.setData({
      isHideLoadMore: false
    })
    var currentPageIndex = this.data.currentPageIndex;
    currentPageIndex ++;
    this.setData({
      currentPageIndex: currentPageIndex
    })
    //test: 云函数pagination
    wx.cloud.callFunction({
      name: "pagination",
      data: {
        dbName: "post",
        pageIndex: currentPageIndex,
        pageSize: 5
      }
    }).then(res => {
      console.log(res);
      var posts = this.data.posts;
      posts = posts.concat(res.result.data); 
      this.setData({
        isHideLoadMore: true,
        posts: posts,
        hasMore: res.result.hasMore
      })
    })
  }
})
