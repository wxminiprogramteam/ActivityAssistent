// pages/classify/classify.js
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    tabBars:[
      {
        name:"理论研究",
        id: "lilun"
      },
      {
        name:"志愿服务",
        id: "zhiyuan"
      },
      {
        name: "体育竞技",
        id: "tiyu"
      },
      {
        name: "文化艺术",
        id: "wenhua"
      }
    ],
    lilun:[],
    zhiyuan:[],
    tiyu:[],
    wenhua:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //获取 理论研究 数据
    db.collection('post').where({
      type: "lilun"
    })
    .get({
      success(res) {
        that.setData({
          lilun: res.data
        })
      }
    })
    //获取 志愿服务 数据
    db.collection('post').where({
      type: "zhiyuan"
    })
    .get({
      success(res) {
        that.setData({
          zhiyuan: res.data
        })
      }
    })
    //获取 体育竞技 数据
    db.collection('post').where({
      type: "tiyu"
    })
    .get({
      success(res) {
        that.setData({
          tiyu: res.data
        })
      }
    })
    //获取 文化艺术 数据
    db.collection('post').where({
      type: "wenhua"
    })
    .get({
      success(res) {
        that.setData({
          wenhua: res.data
        })
      }
    })
  },

  tapTab: function(event){
    this.setData({
      tabIndex: event.currentTarget.dataset.current
    })
  },
  changeTab: function(event){
    this.setData({
      tabIndex: event.detail.current
    })
  },
  onPostTapToDetail(event) {
    var postId = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    })
  }, 
  tapToSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  

})