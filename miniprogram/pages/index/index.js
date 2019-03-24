//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    posts: []
  },
  onLoad: function (options) {
    //注意： 在下面获取数据库数据的api的回调函数中，this会变，因此要在此处将当前的this保存下来
    var that = this;
    console.log("onLoad");
    const db = wx.cloud.database({
      env: "activity-assistant-1065dc"
    });

    db.collection('posts').get({
      success(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        console.log(res.data);
        that.setData({
          posts: res.data
        })
      }
    })
  },
})
