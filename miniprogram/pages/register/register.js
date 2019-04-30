// pages/register/register.js
let app = getApp();
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
    username: '',
    password1: '',
    password2: '',
    name: '',
    sNumber: '',
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
  tapToLogin: function (e) {
    wx.navigateBack({

    })
  },
  inputUsername: function(e){
    var that = this;
    var flag = false;
    this.setData({
      username: e.detail.value
    })
    //查询用户是否已经注册
    db.collection('user').get({
      success: (res) => {
        let users = res.data;  //获取到的对象数组数据
         console.log(users);
        for (let i = 0; i < users.length; i++) {  //遍历数据库对象集合
          if (e.detail.value == users[i].username) { //用户名存在
            flag = true;
            break;
            console("true");
          }
        }
        if(flag == true){
          that.setData({
            tip: "用户名已存在"
          })
        }else{
          that.setData({
            tip: ""
          })
        }
      }
    })
  },
  inputPassword1: function (e) {
    this.setData({
      password1: e.detail.value
    })
    if (this.data.password2!="" && e.detail.value != this.data.password2) {
      this.setData({
        tip: "两次输入的密码不一致"
      })
    } else {
      this.setData({
        tip: ""
      })
    }
  },
  inputPassword2: function (e) {
    this.setData({
      password2: e.detail.value
    })
    if (e.detail.value != this.data.password1){
      this.setData({
        tip: "两次输入的密码不一致"
      })
    }else{
      this.setData({
        tip: ""
      })
    }
  },
  inputName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },
  inputSNumber: function (e) {
    this.setData({
      sNumber: e.detail.value
    })
  },
  tapRegister: function () {
    if(this.data.tip == ''){
      this.saveuserinfo();
    }
  },
  //注册用户信息
  saveuserinfo() {
    let that = this;
    db.collection('user').add({  //添加数据
      data: {
        username: that.data.username,
        password: that.data.password1,
        name: that.data.name,
        avatarUrl: "../../images/user.png",
        sNumber: that.data.sNumber,
        collectionPosts: [],
        comments: [],
        signUp: [],
        history: []
      }
    }).then(res => {
      console.log('注册成功！')
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 1000
      })
      setTimeout(function(){
        wx.navigateBack({

        })
      },1000)
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