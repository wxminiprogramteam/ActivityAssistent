// pages/login/login.js
//获取云数据库引用
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
    username:'',
    password:'',
    tip: ""
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
  inputUsername: function(e){
    this.setData({
      username: e.detail.value
    })
  },
  inputPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  tapLogin: function () {
    var that = this;
    var flag = true;//为true时表示用户不存在或密码错误
    //查询用户是否已经存在
    db.collection('user').get({
      success: (res) => {
        let users = res.data;  //获取到的对象数组数据
        console.log(users);
        for (let i = 0; i < users.length; i++) {  //遍历数据库对象集合

          if (that.data.username == users[i].username && that.data.password == users[i].password) {
            flag = false;

            //登录成功。将用户信息存入本地缓存中
            wx.setStorage({
              key: 'currentUser',
              data: users[i]
            })

            wx.showToast({
              title: '登录成功！',
              icon: 'success',
              duration: 1000
            })
            setTimeout(function () {
              wx.navigateBack({

              })
            }, 1000)
            break;
          }
        }
        if (flag == true) {
          that.setData({
            tip: "用户名不存在或者密码错误"
          })
        } else {
          that.setData({
            tip: ""
          })
        }
      }
    })
  },
  tapToRegister: function(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setInterval(this.tapHeader, 5000);
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