var app = getApp();
Page({
  data: {
    locId: undefined,
    addresses: [], // 区域
    types: [], //获取到的类别
    events: {}, // 获取到的活动
    cates: {}, // 所有活动中类别信息
    locs: {}, // 支持的所有城市
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.latitude && options.longitude) {
      console.log("latitude: " + options.latitude + ", longitude" + options.longitude);
    }
    this.setData({
      "locs": app.globalData.locs,
      "locId": app.globalData.locId,
      "cates": app.globalData.cates
    });
    console.log(this.data.locId);

    // 获取当前城市的活动
    this.getEventListData();
  },
  onReady: function() {
    // 页面渲染完成
    console.log("onReady");
  },
  onShow: function() {
    // 页面显示
    console.log("onShow");
    // 界面是否需要重新刷新
    if (app.globalData.reflesh) {
      console.log("reflesh");
      app.globalData.reflesh = null;
      this.setData({
        "locId": app.globalData.locId
      });
      // 根据城市Id获取活动列表
      this.getEventListData();
    }
  },
  onHide: function() {
    // 页面隐藏
    console.log("hide");
  },
  onUnload: function() {
    // 页面关闭
    console.log("onUnload");
  },
  /** 跳转到城市选择页面 */
  bindLocation: function(event) {
    var parameter = "?locId=" + this.data.locId;
    wx.navigateTo({
      url: '/pages/discover/select-city/select-city' + parameter
    });
  },
  /** 获取活动信息列表 */
  getEventListData: function() {
    var that = this;

    // 拼接参数
    var parameter = "?locId=" + this.data.locId;
    // 请求活动列表,获取100个活动
    var eventListURL = app.globalData.doubanBase + app.globalData.event_list_url + parameter + app.globalData.event_limit_const;
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
      success: function(res) {
        var data = res.data;
        that.processEventListData(data);
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
    var events = {};
    for (let idx in data) {
      var event = data[idx];
      // 判断是否有该类别的集合
      var category = event.category;
      if (!events[category]) {
        events[category] = [];
      }

      var timeStr = event.timeStr;
      var time = "";
      if (typeof event.timeStr == 'string') {
        var time_arr = event.timeStr.substring(0, event.timeStr.length-2);
        time = time_arr;
      }

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
        time_str: time,
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
      events[category].push(temp);
    }

    var types = Object.keys(events);

    app.globalData.types = types;
    app.globalData.events = events;
  
    this.setData({
      "events": events,
      "types": types
    });
  },
  /** 查看活动详情 */
  handleEventTap: function(event) {
    var id = event.currentTarget.dataset.id;
    console.log("eventId: " + id);
    wx.navigateTo({
      url: '/pages/discover/event/event?id=' + id
    });
  },
  /** 选择类型 */
  bindSearch: function(event) {
    wx.navigateTo({
      url: '/pages/discover/search/search'
    });
  },
  /** 用户点击更多，选择某个特定类型的活动 */
  handleMore: function(event) {
    var type = event.currentTarget.dataset.type;
    var param = "?locId=" + this.data.locId + "&&type=" + type;
    wx.navigateTo({
      url: '/pages/discover/category/category' + param
    });
  }
})