// pages/location/event/event.js
var app = getApp();
Page({
  data: {
    extended: false,
    categoryColor: "",
    event: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    var url = app.globalData.doubanBase + app.globalData.event_detail_url + "?id=" + id;
    console.log(url);
    this.getEventDatById(url);
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
  /** 根据id获取活动详情 */
  getEventDatById: function(url) {
    console.log("getEventDataById");
    var that = this;

    // 显示加载中
    wx.showLoading({
      title: '加载中',
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
        that.processEventData(data);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },
  /** 组装活动详情数据 */
  processEventData: function(event) {
    console.log(event.timeStr);

    // 判断是否有该类别的集合
    var category = event.category;
    var someCount = "";
    event.wisherCount && (someCount += event.wisherCount + "感兴趣");
    event.participantCount && (someCount += " / " + event.participantCount + "要参与");

    console.log(someCount);

    var temp = {
      id: event.id,
      image: event.image,
      loc_id: event.locId,
      loc_name: event.locName,
      owner: event.owner,
      category: event.category,
      title: event.title,
      wisher_count: event.wisherCount,
      some_count: someCount,
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
    var categoryColor = category;
    this.setData({
      "event": temp,
      "categoryColor": categoryColor
    });
  },
  /** 查看图片 */
  handlePosterTap: function(event) {
    var posterUrl = this.data.event.image_hlarge;
    wx.navigateTo({
      url: '/pages/discover/event/poster/poster?posterUrl=' + posterUrl
    });
  },
  /** 查看活动时间 */
  handleSchedule: function(event) {
    console.log("handleSchedule");
    var param = "";
    this.data.event.title && (param += "title=" + this.data.event.title);
    this.data.event.begin_time && (param += "&&beginTime=" + this.data.event.begin_time);
    this.data.event.begin_time && (param += "&&endTime=" + this.data.event.end_time);

    console.log(param);
    
    wx.navigateTo({
      url: '/pages/discover/event/schedule/schedule?' + param
    });
  },
  /** 查看地图 */
  handleMap: function(event) {
    console.log("handleMap");
    var geo = this.data.event.geo;
    if (typeof geo == 'string') {
      var loc = geo.split(" ");
      var latitude = parseFloat(loc[0]);
      var longitude = parseFloat(loc[1]);
      wx.openLocation({
        latitude: latitude,
        longitude: longitude,
        scale: 28
      });

    }
  },
  /** 在线购票 */
  handleTicket: function(event) {
    console.log("handleTicket");
    wx.showModal({
      title: '在线购票',
      content: '请拨打客服热线',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  /** 拨打电话 */
  handlePhone: function(event) {
    var phone = event.currentTarget.dataset.phone;
    console.log("handlePhone");
    wx.makePhoneCall({
      phoneNumber: phone,
      success: function(res) {
        // success
      }
    });
  },
  /** 用户感兴趣 */
  handleWish: function(event) {
    console.log("handleWish");
    var params = "action=wish";
    this.data.event.title && (params += "&&title=" + this.data.event.title);
    this.data.event.some_count && (params += "&&somecount=" + this.data.event.some_count);
    wx.navigateTo({
      url: '/pages/discover/event/action/action?' + params,
    });
  },
  /** 用户要参加 */
  handleJoin: function(event) {
    console.log("handleJoin");
    var params = "action=join";
    this.data.event.title && (params += "&&title=" + this.data.event.title);
    this.data.event.some_count && (params += "&&somecount=" + this.data.event.some_count);
    wx.navigateTo({
      url: '/pages/discover/event/action/action?' + params,
    });
  },
  bindExtend: function(event) {
    this.setData({
      "extended": true
    });
  }
})