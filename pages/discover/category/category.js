// pages/location/category/category.js
var app = getApp();
Page({
  data: {
    windowWidth: undefined, // 视窗宽度
    windowHeight: undefined, // 视窗高度
    locId: undefined,
    events: {}, // 活动列表
    cates: {}, // 所有活动中类别信息
    reves: {},

    types: [], //获取到的类别
    dates: ["今天", "明天", "周末", "近期"],
    locas: ["东城区", "西城区", "朝阳区", "丰台区", "石景山", "海淀区", "门头沟", "房山区", "通州区", "顺义区", "昌平区", "大兴区", "怀柔区", "平谷区", "密云区", "延庆区"],

    type: "all", // 当前选择的活动类型
    date: "今天", // 当前选择的活动时间
    loca: "海淀区", // 当前选择的活动区域
  },
  onLoad: function(options) {
    var vals = app.globalData.types;
    var cates = app.globalData.cates;
    var types = [];
    var reves = {};

    for (let id in vals) {
      var type = vals[id];
      types.push(cates[type]);
      reves[cates[type]] = type;
    }    

    this.setData({
      "types": types,
      "cates": cates,
      "reves": reves,
      "type": options.type,
      "locId": options.locId,
      "events": app.globalData.events,
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
  bindChange: function (e) {
    var id = e.currentTarget.dataset.id;
    var idx = e.detail.value;
    
    if (id == "type") {
      var val = this.data.types[idx];
      var type = this.data.reves[val];
      this.setData({
        "type": type
      });
    }
    if (id == "date") {
      var val = this.data.dates[idx];
      this.setData({
        "date": val
      });
    }
    if (id == "loca") {
      var val = this.data.locas[idx];
      this.setData({
        "loca": val
      });
    }
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