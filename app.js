//app.js
App({
  globalData: {
    userInfo: undefined,
    latitude: undefined,
    longitude: undefined,
    windowWidth: undefined,
    windowHeight: undefined,
    reflesh: false,
    eventCategory: undefined,
    locId: 108288,
    types: [], //获取到的类别
    events: {}, // 获取到的活动
    cates: {}, // 所有活动中类别信息
    cates: {
      "music": "音乐",
      "film": "电影",
      "drama": "戏剧",
      "commonweal": "公益",
      "salon": "讲座",
      "exhibition": "展览",
      "party": "聚会",
      "sports": "运动",
      "travel": "旅行",
      "course": "课程",
      "competition": "赛事",
      "kids": "亲子",
      "others": "其他",
    },
    locs: {
      "108288": "北京",
      "108296": "上海",
      "118281": "广州",
      "118282": "深圳",
      "118318": "成都",
      "118254": "武汉",
      "118172": "杭州",
      "108309": "重庆",
      "118237": "郑州",
      "118159": "南京",
      "118371": "西安",
      "118163": "苏州",
      "118267": "长沙",
      "108289": "天津",
      "118200": "福州",
      "118220": "济南",
      "118123": "沈阳",
      "118183": "合肥",
      "118221": "青岛",
      "118146": "哈尔滨",
    },
    uids: {
      "108288": "beijing",
      "108296": "shanghai",
      "118281": "guangzhou",
      "118282": "shenzhen",
      "118318": "chengdu",
      "118254": "wuhan",
      "118172": "hangzhou",
      "108309": "chongqing",
      "118237": "zhengzhou",
      "118159": "nanjing",
      "118371": "xian",
      "118163": "suzhou",
      "118267": "changsha",
      "108289": "tianjin",
      "118200": "fuzhou",
      "118220": "jinan",
      "118123": "shenyang",
      "118183": "hefei",
      "118221": "qingdao",
      "118146": "haerbin",
    },
    doubanBase: "http://182.92.85.86/",
    event_list_url: "event/list",
    event_detail_url: "event/detail",
    event_limit_const: "&&start=0&&count=200"
  },
  onLaunch: function() {
    // Do something initial when launch.
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.globalData.windowWidth = res.windowWidth;
        that.globalData.windowHeight = res.windowHeight;
      }
    });
    this.getLocation();
  },
  getUserInfo: function(cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      wx.login({
        success: function(res) {
          // wx.getUserInfo({
          //     success: function (res) {
          //         that.globalData.userInfo = res.userInfo;
          //         typeof cb == "function" && cb(that.globalData.userInfo);
          //     }
          // });
        }
      });
    }
  },
  getLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res) {
        that.globalData.latitude = res.latitude;
        that.globalData.longitude = res.longitude;
      }
    })
  },
})