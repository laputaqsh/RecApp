var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: undefined, // 视窗宽度
    windowHeight: undefined, // 视窗高度
    userInfo: undefined,
    users: undefined,
    isFans: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = options.isFans == "false" ? false : true;
    this.setData({
      "isFans": data,
      "userInfo": app.globalData.userInfo,
      "windowWidth": app.globalData.windowWidth,
      "windowHeight": app.globalData.windowHeight
    })
    this.getRelationData();
  },

  getRelationData: function() {
    var that = this;
    var url = app.globalData.doubanBase;
    if (this.data.isFans) {
      url += app.globalData.user_fans_url;
    } else {
      url += app.globalData.user_fols_url;
    }
    url += "?userId=" + this.data.userInfo.id;
    console.log(url);

    // 显示加载中
    wx.showLoading({
      title: '加载中'
    });

    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'json'
      }, // 设置请求的 header
      success: function(res) {
        console.log(res);
        if (res.data.code == 200) {
          // 成功
          var data = res.data.data;
          that.setData({
            "users": data
          });
        } else {
          // 失败
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: function(res) {
        // fail
        console.log(res.msg);
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})