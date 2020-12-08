// pages/location/category/category.js
var app = getApp();
Page({
  data: {
    windowWidth: undefined, // 视窗宽度
    windowHeight: undefined, // 视窗高度
    locId: undefined,
    events: [], // 活动列表
  },
  onLoad: function(options) {
    this.setData({
      "locId": options.locId,
      "windowWidth": app.globalData.windowWidth,
      "windowHeight": app.globalData.windowHeight
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
  handleConfirm: function (e) {
    var keyWord = e.detail.value;
    console.log(keyWord);
    if (keyWord == "") {
      wx.showToast({
        title: '输入内容不能为空',
      })
    } else {
      this.getEventListData(keyWord);
    }
  },
  getEventListData: function (keyWord) {
    var that = this;

    // 拼接参数
    var parameter = "?keyWord=" + keyWord;
    // 请求活动列表,获取100个活动
    var eventListURL = app.globalData.doubanBase + app.globalData.event_search_url + parameter;
    console.log("URL:" + eventListURL);

    // 显示加载中
    wx.showLoading({
      title: '加载中'
    });

    wx.request({
      url: eventListURL,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'json'
      }, // 设置请求的 header
      success: function (res) {
        console.log(res);
        var data = res.data;
        that.processEventListData(data);
      },
      fail: function (res) {
        // fail
        console.log(res.msg);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /** 组装活动列表 */
  processEventListData: function (data) {
    var events = [];
    for (let idx in data) {
      var event = data[idx];

      var temp = {
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
      events.push(temp);
    }

    this.setData({
      "events": events,
    });
  },
  /** 到达页面底部 */
  handleLower: function(event) {
    console.log("handleLower");
    // 请求活动列表
    // this.processEventListData();
  },
  /** 到达页面顶部 */
  handleUpper: function(event) {
    console.log("handleUpper");
  },
  /** 查看活动详情 */
  handleEventTap: function(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/discover/event/event?id=' + id
    });
  },
})