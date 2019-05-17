// pages/mine/mine.js
var app = getApp();
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isManager: false,
    isEdit: false,
    userInfo: null,
    welcomeWords: [
      ['你', '好', '呀', '~'],
      ['天', '天', '开', '心'],
      ['天', '天', '快', '乐'],
      ['要', '常', '来', '哦']
    ],
    currentWelcomeWords: ['你', '好', '呀', '~'],
    isHeaderWordHidden: false,
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
  tapEditInfo: function(){
    this.setData({
      isEdit: true
    })
  },
  tapChangeInfo: function(){
    //todo: 更新云数据库的用户信息，本地缓存，全局变量的用户信息
    var userInfo = this.data.userInfo;
    db.collection('user').doc(userInfo._id).update({
      // data 传入需要局部更新的数据
      data: {
        sNumber: userInfo.sNumber,
        name: userInfo.name,
        academy: userInfo.academy,
        major: userInfo.major,
        phone: userInfo.phone
      },
      success(res) {
        console.log(res)
      },
      fail(err){
        console.log(err);
      }
    })

    wx.setStorage({
      key: 'currentUser',
      data: userInfo,
    })
    app.globalData.userInfo = userInfo;
    this.setData({
      isEdit: false
    })
  },
  changeAvatar: function () {
    var that = this;
    console.log("changeAvatar");
    //如果是登录状态
    if (app.globalData.isLogin == true) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['camera', 'album'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths[0];
          //先删除原来的头像图片
          wx.cloud.deleteFile({
            fileList: [that.data.userInfo.avatarUrl],
            success: res => {
              // handle success
              console.log(res.fileList)
            },
            fail: err => {
              // handle error
            }
          })
          wx.cloud.uploadFile({
            //加时间戳，使下面的setData能刷新图片
            cloudPath: 'userAvatar/' + that.data.userInfo.username + Date.parse(new Date()) + ".png", // 上传至云端的路径
            filePath: tempFilePaths, // 小程序临时文件路径
            success: res => {
              // 返回文件 ID
              console.log(res.fileID);
              //修改本页面的数据
              var userInfo = that.data.userInfo;
              userInfo["avatarUrl"] = res.fileID;
              that.setData({
                userInfo: userInfo
              })
              console.log("修改本页面数据" + that.data.userInfo.avatarUrl);
              //修改缓存
              wx.setStorage({
                key: 'currentUser',
                data: userInfo,
              })
              console.log("修改缓存数据" + JSON.stringify(userInfo));
              //修改云数据库数据
              console.log(userInfo._id);
              db.collection('user').doc(userInfo._id).update({
                // data 传入需要局部更新的数据
                data: {
                  avatarUrl: userInfo.avatarUrl
                },
                success(res) {
                  console.log("修改云数据库数据" + res.data);
                }
              })
              console.log(userInfo._id);
            },
            fail: console.error
          })
        }
      })
    }

  },
  //获取输入框信息
  inputSNumber: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.sNumber = e.detail.value;
    this.setData({
      userInfo: userInfo
    })
  },
  inputName: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.name = e.detail.value;
    this.setData({
      userInfo: userInfo
    })
  },
  inputAcademy: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.academy = e.detail.value;
    this.setData({
      userInfo: userInfo
    })
  },
  inputMajor: function (e) {
    var userInfo = this.data.userInfo;
    userInfo.major = e.detail.value;
    this.setData({
      userInfo: userInfo
    })
  },
  inputPhone: function(e){
    var userInfo = this.data.userInfo;
    userInfo.phone = e.detail.value;
    this.setData({
      userInfo: userInfo
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
    var that = this;
    wx.getStorage({
      key: 'currentUser',
      success: function (res) {
        // console.log(res.data);
        if (res.data) {
          that.setData({
            userInfo: res.data,
            isManager: res.data.isManager
          })
          console.log(res.data.avatarUrl)
          //获取云数据库数据，并更新本地缓存
          db.collection('user').where(that.data.userInfo._id).get({
            success: function (res) {
              that.setDat({
                userInfo: res.data
              })
              console.log(res.data.avatarUrl)
              wx.setStorage({
                key: 'currentUser',
                data: res.data,
              })
            }
          })
          
        }

      },
    })
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

  },

})