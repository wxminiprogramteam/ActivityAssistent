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
    setInterval(this.tapHeader, 5000);

    //获取已喜欢的文章
    // db.collection('user').get({
    //   success(res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     // console.log(res.data);
    //     that.setData({
    //       posts: res.data,
    //     })
    //     setTimeout(function () {
    //       that.setData({
    //         isloading: false
    //       })
    //     }, 1000)
    //     that.data.posts.map(function (currentValue, index, arr) {
    //       // console.log(currentValue);
    //       wx.setStorage({
    //         key: currentValue._id,
    //         data: currentValue
    //       })
    //     })
    //   }
    // })
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