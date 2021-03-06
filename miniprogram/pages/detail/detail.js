var app = getApp();
const db = wx.cloud.database({
  env: "activity-assistant-1065dc"
});
const _ = db.command;
Page({
  data: {
    isloading: true,
    post:null,
    userInfo:null,
    upStatus: false,
    postId:"",
    collectionStatus: false
  },
  onLoad: function (options) {
    var id = options.id;
    var that = this;
    that.setData({
      postId:id
      })
    wx.getStorage({
      key: id,
      success(res){
        that.setData({
          post: res.data
        })
        setTimeout(function () {
          that.setData({
            isloading: false
          })
        }, 700)
      }
    })

    //获取喜欢收藏状态
    wx.getStorage({
      key: "currentUser",
      success(res) {
        //如果res.data为true表示用户已经登录，则按照用户的数据来设置喜欢收藏状态
        if(res.data){
          that.setData({
            userInfo: res.data
          })
          //遍历upPosts
          if (res.data.upPosts) {
            for (let i = 0; i < res.data.upPosts.length; i++) {
              if (res.data.upPosts[i] == id) {
                that.setData({
                  upStatus: true
                })
              }
            }
          }
          //遍历collectionPosts
          if (res.data.collectionPosts) {
            for (let i = 0; i < res.data.collectionPosts.length; i++) {
              if (res.data.collectionPosts[i] == id) {
                that.setData({
                  collectionStatus: true
                })
              }
            }
          }
        }
      }
    })
  },
  onCollectionTap: function (event) {
    var that = this;
    let post = this.data.post;
    let userInfo = that.data.userInfo;

    // 判断是否已登录
    if(!userInfo){
      wx.showToast({
        title: "请先登录",
        duration: 500,
        icon: "none",
        mask: true
      })

      //保存当前页面信息，以便跳转登录页登录之后能够返回当前页面
      var lastPage = ["/" + this.route + "?id=" + this.options.id,false];
      app.globalData.lastPage = lastPage;

      setTimeout(function () {
        wx.switchTab({
          url: '/pages/mine/mine'
        })
      }, 1000)

      return;
    }
    // 如果是未收藏状态
    if (!that.data.collectionStatus) {
      post.collectionNum++;
      //修改当前页面数据(post的喜欢数+1，修改喜欢状态)
      this.setData({
        post: post,
        collectionStatus: true
      }),

      //修改缓存数据(文章的喜欢数和userInfo的喜欢数组)
      wx.setStorage({
        key: post._id,
        data: post,
      })
      // console.log(userInfo);
      if (userInfo.collectionPosts) {
        userInfo.collectionPosts.push(post._id);
      } else {
        userInfo.collectionPosts = [post._id];
      }
      wx.setStorage({
        key: "currentUser",
        data: userInfo,
      })
      //修改云数据库数据
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updatePost',
        // 传给云函数的参数
        data: {
          _id: post._id,
          type: "collection",
          value: post.collectionNum
        },
        fail: console.error
      })
      db.collection('user').doc(userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
          collectionPosts: userInfo.collectionPosts
        }
      })
    } else {
      //已收藏状态
      post.collectionNum--;

      //修改当前页面数据
      this.setData({
        post: post,
        collectionStatus: false
      }),

        //修改缓存数据
        wx.setStorage({
          key: post._id,
          data: post,
        })
      // console.log(userInfo);
      //删除数组对应项
      for (let i = 0; i < userInfo.collectionPosts.length; i++) {
        if (userInfo.collectionPosts[i] == post._id) {
          userInfo.collectionPosts.splice(i, 1);
        }
      }
      wx.setStorage({
        key: "currentUser",
        data: userInfo,
      })
      //修改云数据库数据
      console.log("修改云数据库数据:" + post.collectionNum);
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updatePost',
        // 传给云函数的参数
        data: {
          _id: post._id,
          type: "collection",
          value: post.collectionNum
        },
        fail: console.error
      })
      db.collection('user').doc(userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
          collectionPosts: userInfo.collectionPosts
        }
      })
    }

  
  },

//点击喜欢按钮
  onUpTap: function (event) {
    var that = this;
    let post = this.data.post;
    let userInfo = that.data.userInfo;
    if (!userInfo) {
      wx.showToast({
        title: "请先登录",
        duration: 500,
        icon: "none",
        mask: true
      })


      //保存当前页面信息，以便跳转登录页登录之后能够返回当前页面
      var lastPage = ["/" + this.route + "?id=" + this.options.id, false];
      app.globalData.lastPage = lastPage;


      setTimeout(function () {
        wx.switchTab({
          url: '/pages/mine/mine'
        })
      }, 1000)

      return;
    }
    // 如果是未喜欢状态
    if(!that.data.upStatus){
      post.upNum++;
      //修改当前页面数据(post的喜欢数+1，修改喜欢状态)
      this.setData({
        post: post,
        upStatus: true
      }),

        //修改缓存数据(文章的喜欢数和userInfo的喜欢数组)
        wx.setStorage({
          key: post._id,
          data: post,
        })
      if (userInfo.upPosts) {
        userInfo.upPosts.push(post._id);
      } else {
        userInfo.upPosts = [post._id];
      }
      wx.setStorage({
        key: "currentUser",
        data: userInfo,
      })
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updatePost',
        // 传给云函数的参数
        data: {
          _id: post._id,
          type: "up",
          value: post.upNum
        },
        fail: console.error
      })
      db.collection('user').doc(userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
          upPosts: userInfo.upPosts
        }
      })
    }else{
    //已喜欢状态
      post.upNum--;

      //修改当前页面数据(post的喜欢数+1，修改喜欢状态)
      this.setData({
        post: post,
        upStatus: false
      })

      //修改缓存数据(文章的喜欢数和userInfo的喜欢数组)
      wx.setStorage({
        key: post._id,
        data: post,
      })
      // console.log(userInfo);
      //删除数组对应项
      for(let i=0; i<userInfo.upPosts.length; i ++){
        if(userInfo.upPosts[i] == post._id){
          userInfo.upPosts.splice(i,1);
        }
      }
      wx.setStorage({
        key: "currentUser",
        data: userInfo,
      })
      //修改云数据库数据
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updatePost',
        // 传给云函数的参数
        data: {
          _id: post._id,
          type: "up",
          value: post.upNum
        },
        fail: console.error
      })
      db.collection('user').doc(userInfo._id).update({
        // data 传入需要局部更新的数据
        data: {
          upPosts: userInfo.upPosts
        }
      })
    }

  },
  //报名
  signUp(){
    var that = this;
    let post = this.data.post;
    let userInfo = that.data.userInfo;
    if (!userInfo) {
      wx.showToast({
        title: "请先登录",
        duration: 500,
        icon: "none",
        mask: true
      })
      //保存当前页面信息，以便跳转登录页登录之后能够返回当前页面
      var lastPage = ["/" + this.route + "?id=" + this.options.id, false];
      app.globalData.lastPage = lastPage;
      
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/mine/mine'
        })
      },1000)

      return;
    }
    wx.navigateTo({
      url: '../signUp/signUp?id='+that.data.postId,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  tapShare: function(){
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  onShow: function(){
    var that = this;
    setTimeout(function(){
      //修改浏览数
      let post = that.data.post;
      post.readingNum++;
      //更新当前页面数据
      that.setData({
        post: post
      })
      //更新缓存数据
      wx.setStorage({
        key: post._id,
        data: post,
      })
      //更新云数据库数据
      wx.cloud.callFunction({
        // 云函数名称
        name: 'updatePost',
        // 传给云函数的参数
        data: {
          _id: post._id,
          type: "reading",
          value: post.readingNum
        },
        fail: console.error
      })

    },2000);
  }

})