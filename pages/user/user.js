var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: undefined,
    isLogin: false
  },
  onShow: function() {
    if (typeof(app.globalData.userInfo) != "undefined") {
      this.setData({
        "isLogin": true,
        "userInfo": app.globalData.userInfo
      });
    }
  },
  doLogin: function() {
    wx.redirectTo({
      url: '/pages/user/login/login'
    })
  },
  doLogout: function() {
    var that = this;
    wx.showModal({
      title: '确定退出？',
      content: '退出将会清除你的个人数据',
      confirmColor: '#ff0000',
      success(res) {
        if (res.confirm) {
          that.setData({
            "isLogin": false,
            "userInfo": []
          });
          app.globalData.userInfo = [];
        }
      }
    })
  },
  showAvatar: function() {
    var avatarUrl = this.data.userInfo.largeAvatar;
    wx.navigateTo({
      url: '/pages/user/avatar/avatar?avatarUrl=' + avatarUrl
    });
  },
  showUserInfo: function() {
    console.log("userinfo");
  },
  showFols: function() {
    wx.navigateTo({
      url: '/pages/user/relation/relation?isFans=false'
    })
  },
  showFans: function() {
    wx.navigateTo({
      url: '/pages/user/relation/relation?isFans=true'
    })
  },
  showCollects: function() {
    wx.navigateTo({
      url: '/pages/user/event/event?isCollect=true'
    })
  },
  showHistory: function() {
    wx.navigateTo({
      url: '/pages/user/event/event?isCollect=false'
    })
  }
})