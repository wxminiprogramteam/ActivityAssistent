// pages/mine/up/up.js
var app = getApp();
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //开启欢迎文字动画
    setInterval(this.tapHeader, 5000);

    //获取已喜欢的文章(暂时定为直接从缓存中获取)
    wx.getStorage({
      key: 'currentUser',
      success: function (res) {
        //得到用户已喜欢文章的id数组
        let collectionPosts = res.data.collectionPosts;
        // console.log(JSON.stringify(res.data.upPosts));
        //遍历upPosts数组，根据文章id从缓存中获取文章详细信息
        let posts = [];
        for (let i = 0; i < collectionPosts.length; i++) {
          var post = wx.getStorageSync(collectionPosts[i]);
          posts.push(post);
        }
        that.setData({
          posts: posts,
          isloading: false
        })
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})