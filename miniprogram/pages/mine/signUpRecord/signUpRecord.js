// pages/mine/up/up.js
var app = getApp();
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welcomeWords: [
      ['你', '好', '呀', '~'],
      ['天', '天', '开', '心'],
      ['天', '天', '快', '乐'],
      ['要', '常', '来', '哦']
    ],
    currentWelcomeWords: ['你', '好', '呀', '~'],
    isHeaderWordHidden: false,
    isloading: true,
    posts: [],
  },
  tapHeader: function () {
    var that = this;
    var n = Math.floor(Math.random() * 3);
    while (this.data.welcomeWords[n] == this.data.currentWelcomeWords) {
      n = Math.floor(Math.random() * 3);
    }
    var time = this.data.currentWelcomeWords.length * 500;
    this.setData({
      isHeaderWordHidden: !this.data.isHeaderWordHidden,
    })
    setTimeout(function (that) {
      that.setData({
        currentWelcomeWords: that.data.welcomeWords[n],
        isHeaderWordHidden: !that.data.isHeaderWordHidden,
        // currentWelcomeWords: this.data.welcomeWords[n]
      })
    }, time, that)
  },
  onPostTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    // console.log(postId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    })
  },
  onShow: function (options) {
    var that = this;
    //开启欢迎文字动画
    setTimeout(this.tapHeader, 1000);
    timer = setInterval(this.tapHeader, 5000);
    //获取已喜欢的文章(暂时定为直接从缓存中获取)
    wx.getStorage({
      key: 'currentUser',
      success: function (res) {
        //得到用户已喜欢文章的id数组
        let signUp = res.data.signUp;
        console.log(JSON.stringify(res.data.signUp));
        //遍历upPosts数组，根据文章id从缓存中获取文章详细信息
        let posts = [];
        for (let i = 0; i < signUp.length; i++) {
          var post = wx.getStorageSync(signUp[i]);
          posts.push(post);
        }
        that.setData({
          posts: posts,
          isloading: false
        })
      },
    })

  },
  onHide: function () {
    clearInterval(timer);
  }
})