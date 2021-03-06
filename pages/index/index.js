var app = getApp();
Page({
  data: {
    windowWidth: undefined, // 视窗宽度
    windowHeight: undefined, // 视窗高度
    showRec: undefined,
    userId: undefined,
    locId: undefined,
    isFirst: true,
    navData: [{
        text: '热门'
      },
      {
        text: '推荐'
      }
    ],
    currentTab: 1,
    navScrollLeft: 0,
    cates: [],
    recs: [],
    hots: []
  },
  onLoad: function(options) {
    this.setData({
      "showRec": true,
      "cates": app.globalData.cates,
      "windowWidth": app.globalData.windowWidth,
      "windowHeight": app.globalData.windowHeight
    });
    this.getEventList();
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/2
    var singleNavWidth = this.data.windowWidth / 2;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 2;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
    if (this.data.isFirst) {
      this.setData({
        "isFirst": false
      })
      this.getEventList();
    }
  },
  onPullDownRefresh: function(e) {
    this.getEventList();
    wx.stopPullDownRefresh();
  },
  getEventList: function(e) {
    var that = this;
    var url = app.globalData.doubanBase;
    if (this.data.currentTab == 1) {
      url += app.globalData.event_recs_url;
      if (typeof(userId) != "undefined") {
        url += "?userId=" + this.data.userId;
      }
    } else {
      url += app.globalData.event_hots_url;
    };
    console.log("url: " + url);

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

    if (this.data.currentTab==1) {
      this.setData({
        "recs": events
      });
    } else {
      this.setData({
        "hots": events
      });
    }
  },
  handleHots: function(e) {
    this.setData({
      "showRec": false
    });
    this.getEventList();
  },
  handleRecs: function(e) {
    this.setData({
      "showRec": true
    });
    this.getEventList();
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