// pages/signUp/signUp.js
import WxValidate from '../../utils/WxValidate.js'
const util = require('../../utils/util.js')
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: [],
    userInfo: null,
    pickOrder: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  //报错
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    //定义规则
    var arr = this.data.formdata;
    var tempRules={};
    var tempMessages={};
    console.log(arr)
    for(var idx in arr){
      if (arr[idx].isNecessary==true){
        let title = arr[idx].title;
        tempRules[title] = { required: true}
        tempMessages[title] = { required: "请输入" + title}
      }
    }
    console.log(tempRules)
    console.log(tempMessages)
    const rules = tempRules
    const messages = tempMessages
    console.log(rules);
    console.log(messages);
    this.WxValidate = new WxValidate(rules, messages)
  },
  formsubmit(event){
    var that = this;
    var params = event.detail.value;
    console.log(params);
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var id = options.id;
   var that = this
    db.collection('post').doc(id).get({
      success(res) {
        // res.data 包含该记录的数据
        console.log(res.data)
        that.setData({
          formdata:res.data.formdata
        })
        that.initValidate();
      }
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
    var that = this;
    wx.getStorage({
      key: 'currentUser',
      success: function (res) {

        console.log(res)
        that.setData({
          userInfo: res.data,
        })
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

  }
})