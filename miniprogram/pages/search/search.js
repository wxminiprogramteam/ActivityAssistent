// pages/search/search.js
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[],

  },

  inputSearch: function(e){
    var that = this;
    var inputValue = e.detail.value;
    //去掉空白字符
    inputValue = inputValue.replace(/\s*/g, "");
    if(inputValue != ''){
      //正则表达式实现模糊查询
      db.collection('post').where({
        title: db.RegExp({
          regexp: inputValue,
          options: 'i',
        })
      }).get({
        success(res) {
          var items = res.data;
          //处理过长的标题
          for(let i = 0; i < items.length; i ++){
            if(items[i].title.length>15){
              // items[i].title.splice(14,title.length-15,'.','.','.');
              items[i].title = items[i].title.slice(0,15);
              items[i].title = items[i].title + "...";
              console.log("修改过长：" + items[i].title);
            }
          }
          that.setData({
            items: items
          })
        }
      })
    }
  },
  tapToDetail: function(e){
    var postId = e.currentTarget.dataset.postId;
    // console.log(postId);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + postId,
    })
  }
})