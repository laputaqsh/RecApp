var app = getApp();
Page({
  data: {
    userInfo: {},
    content: '豆瓣同城',
    latitude: undefined,
    longitude: undefined
  },
  onLoad: function(options) {
    this.setData({
      "latitude": app.globalData.latitude,
      "longitude": app.globalData.longitude
    });
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  /** 查看活动详情 */
  handleEventTap: function() {
    var id = 30438900;
    wx.navigateTo({
      url: '/pages/discover/event/event?id=' + id
    });
  }
})