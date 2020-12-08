var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: undefined, // 视窗宽度
    windowHeight: undefined, // 视窗高度
    userInfo: undefined,
    events: undefined,
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = options.isCollect == "false" ? false : true;
    this.setData({
      "isCollect": data,
      "userInfo": app.globalData.userInfo,
      "windowWidth": app.globalData.windowWidth,
      "windowHeight": app.globalData.windowHeight
    })
    this.getEventList();
  },

  getEventList: function(e) {
    var that = this;
    var url = app.globalData.doubanBase;
    if (this.data.isCollect) {
      url += app.globalData.user_collects_url;
    } else {
      url += app.globalData.user_history_url;
    };
    url += "?userId=" + this.data.userInfo.id;
    console.log("url: " + url);

    this.setData({
      events: []
    })

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
        var data = res.data;
        that.processEventListData(data.data);
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
  /** 组装活动列表 */
  processEventListData: function(data) {
    var events = [];
    for (let idx in data) {
      var event = data[idx];
      var tmp = {
        id: event.id,
        image: event.image,
        loc_id: event.locId,
        loc_name: event.locName,
        owner: event.ownerId,
        category: event.category,
        title: event.title,
        wisher_count: event.wisherCount,
        has_ticket: event.hasTicket,
        content: event.content,
        can_invite: event.canInvite,
        time_str: event.timeStr,
        album: event.album,
        participant_count: event.participantCount,
        tags: event.tags,
        image_hlarge: event.imageHlarge,
        begin_time: event.beginTime,
        price_range: event.priceRange,
        geo: event.geo,
        image_lmobile: event.imageLmobile,
        end_time: event.endTime,
        address: event.address,
      };
      events.push(tmp);
    }

    this.setData({
      "events": events
    });
  },

  handleEventTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/discover/event/event?id=' + id
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