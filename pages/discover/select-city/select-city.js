// pages/location/select-city/select-city.js
var app = getApp();
Page({
  data: {
    searching: false,
    showSearchNone: false,
    locId: undefined,
    locs: {},
    uids: {},
    searchLocs: undefined,
    city: undefined,

    hotLocs: ["108288", "108296", "118281", "118282", "118318", "118159", "118254", "118281", "108309"],
    locList: {},
    uidList: [],
    searchUids: [],
    searchLocs: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var locId = options.locId;
    var locs = app.globalData.locs;
    var uids = app.globalData.uids;
    this.setData({
      locId: locId,
      locs: locs,
      uids: uids
    });
    this.processCityListData();
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
  /** 搜索城市 */
  bindSearch: function(event) {
    this.setData({
      "searching": true
    });
  },
  /** 处理城市信息 */
  processCityListData: function() {
    // 按字母顺序排序
    var ids = Object.keys(this.data.locs);
    ids.sort();
    // 提取所有城市并按首字母归类
    var locList = {};
    var uidList = [];
    for (let idx in ids) {
      var id = ids[idx];
      var uid = this.data.uids[id].substring(0, 1);
      if (!cityList[uid]) {
        locList[uid] = [];
        uidList.push(uid);
      }
      locList[uid].push(id);
    }

    this.setData({
      "locList": locList,
      "uidList": uidList,
    });
  },
  /** 选择城市 */
  bindCityTap: function(event) {
    var locId = event.currentTarget.dataset.locId;
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res) {
        app.globalData.reflesh = true;
        app.globalData.locId = locId;
      }
    });
  },
  /** 点击完成按钮时触发 */
  handleConfirm: function(event) {
    console.log("handleConfirm");
  },
  /** 搜索框失去焦点时触发 */
  handleBlur: function(event) {
    console.log("bindblur");
  },
  /** 取消搜索 */
  handleCancel: function(event) {
    this.setData({
      "searching": false
    });
  },
  handleInput: function(event) {
    var val = event.detail.value;
    console.log("value: " + val);
    var searchUids = [];
    var searchLocs = {};
    var readyData = {
      "searchUids": searchUids,
      "searchLocs": searchLocs,
      "showSearchNone": false
    };
    if (val == "") {
      this.setData(readyData);
      return;
    }

    var ids = Object.keys(this.data.uids);
    for (let idx in ids) {
      var id = ids[idx];
      var uid = this.data.uids[id];
      var loc = this.data.locs[id];
      if (uid.indexOf(val) != -1 || loc.indexOf(val) != -1) {
        searchUids[uid.substring(0, 1)] = id;
      }
    }

    if (searchUids.length == 0) {
      readyData["showSearchNone"] = true;
      this.setData(readyData);
      return;
    }
    searchUids.sort();
    for (let idx in searchUids) {
      var uid = searchUids[idx];
      searchLocs[uid] = this.data.locList[uid];
    }

    readyData["searchUids"] = searchUids;
    readyData["searchLocs"] = searchLocs;
    this.setData(readyData);

    console.log(searchUids);
    console.log(searchLocs);
  }
})