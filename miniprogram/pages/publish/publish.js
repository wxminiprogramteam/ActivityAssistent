// pages/publish/publish.js
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
    isAddAttribute: false,
    isDeleteAttribute: false,
    isAddOption: false,
    isPostImg:false,
    postImgPath:"",
    userInfo:null,
    count: 0,
    index: 0,
    order: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    tempOptions: [],
    formdata: [{
      title: '姓名',
      type: 'text',
      options: [],
      label:'name',
      isNecessary: true
    },
    {
      title: '学号',
      type: 'text',
      options: [],
      label: 'sNumber',
      isNecessary: true
    },
    {
      title: '学院',
      type: 'text',
      options: [],
      label: 'academy',
      isNecessary: true
    },
    {
      title: '专业',
      type: 'text',
      options:[],
      label: 'major',
      isNecessary: true
    },
    {
      title: '联系方式',
      type: 'text',
      options: [],
      label: 'phone',
      isNecessary: true
    },
    ],
    test: ['text', 'textarea', 'radio'],
    types: [{
      name: '单行文本',
      type: 'text'
    },
    {
      name: '多行文本',
      type: 'textarea'
    },
    {
      name: '单选',
      type: 'radio'
    },
    {
      name: '多选',
      type: 'checkbox'
    },
    {
      name: '下拉框',
      type: 'picker'
    },
    ]
  },
  addAttribute() {
    this.setData({
      isAddAttribute: true,
      isDeleteAttribute: false
    })
  },
  deleteAttribute() {
    this.setData({
      isDeleteAttribute: true
    })
  },
  delete(evevt) {
    // console.log(evevt);
    let List = this.data.formdata;
    let num = evevt.currentTarget.dataset.deleteIndex;
    List.splice(num, 1);
    this.setData({
      'formdata': List
    })
  },
  addOption() {
    this.setData({
      isAddOption: true
    })
  },
  formsubmit(event) { //添加字段
    // console.log(event.detail.value);
    if ("false" == event.detail.value.isNecessary)
      var flag = false;
    else
      var flag = true;
    var newAttribute = {
      title: event.detail.value.title,
      type: this.data.types[event.detail.value.type].type,
      options: this.data.tempOptions,
      isNecessary: flag,
    }
    if (event.detail.value.type == 4)
      newAttribute.select = 0;
    var newArray = [newAttribute];
    this.data.formdata = this.data.formdata.concat(newArray);
    console.log(newArray);
    this.setData({
      'formdata': this.data.formdata,
      'tempOptions': [],
      isAddAttribute: false,

    })
  },
  optionsform(event) { //添加选项
    //   console.log(event.detail.value);
    var newdata = [event.detail.value.optionName]
    this.data.tempOptions = this.data.tempOptions.concat(newdata);
    this.setData({
      count: this.data.count + 1,
      'tempOptions': this.data.tempOptions,
      isAddOption: false
    })
  },

  cannel() {
    this.setData({
      'tempOptions': [],
      isAddAttribute: false,

    })
  },
  postImgUplod() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera', 'album'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0];
        that.setData({
          isPostImg: true,
          postImgPath: tempFilePaths,
        });
      },
    })
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
    const rules = {
      organizer: {
        required: true,
      },
      title: {
        required: true,
      },
      type: {
        required: true,
      },
      activityTime: {
        required: true,
      },
      place: {
        required: true,
      },
      content: {
        required: true,
      },
      detail: {
        required: true,
      },
      postImgPath:{
        required:true
      }

    }
    const messages = {
      organizer: {
        required: "请填写主办方",
      },
      title: {
        required: "请填写讲座主题",
      },
      type: {
        required: "请填写讲座类型",
      },
      activityTime: {
        required: "请填写讲座时间",
      },
      place: {
        required: "请填写讲座地点",
      },
      content: {
        required: "请填写讲座主题",
      },
      detail: {
        required: "请填写讲座详细内容",
      },
      postImgPath: {
        required: "请上传讲座相关图片"
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  activitySubmit(e) {
    var that = this;
    var params = e.detail.value;
    params.postImgPath = that.data.postImgPath;
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
    wx.cloud.uploadFile({//先上传讲座图片
      cloudPath: 'post/post_img/' + that.data.userInfo._openid + Date.parse(new Date()) + ".png", // 上传至云端的路径 
      filePath:that.data.postImgPath,
      success: res => {
        // 获得图片id
        console.log(res.fileID);
        db.collection('post').add({//讲座图片上传成功后，将讲座数据插入数据库中
          
          data: {
            activityTime:params.activityTime,
            banner:-1,
            collectionNum:0,
            collectionStatus:false,
            commentNum:0,
            content:params.content,
            detail:params.detail,
            organizer:params.organizer,
            organizerImg: that.data.userInfo.avatarUrl,
            place:params.place,
            postImg:res.fileID,
            postTime: util.formatTime(new Date()),
            readingNum:0,
            title:params.title,
            type:params.type,
            upNum:0,
            upStatus:false,
            formdata:that.data.formdata

          },
          success(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        })

      },
      fail: err => {
        // handle error
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.initValidate();
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
      success: function(res) {

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