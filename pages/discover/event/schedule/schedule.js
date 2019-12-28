// pages/location/event/schedule/schedule.js
Page({
  data: {
    schedule: [],
    begin_time: "",
    end_time: "",
    week: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var title = options.title;
    var beginTime = options.beginTime.split(".")[0].replace("T", " ");
    var endTime = options.endTime.split(".")[0].replace("T", " ");

    wx.setNavigationBarTitle({
      title: title
    });
    this.processScheduleData(beginTime, endTime);
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
  processScheduleData: function(beginTime, endTime) {
    // 开始时间
    var beginArr = beginTime.split(" ")[0].split('-');
    var beginYear = beginArr[0];
    var beginMonth = beginArr[1] - 1;
    var beginDayOfMonth = beginArr[2];
    var beginDate = new Date(beginYear, beginMonth, beginDayOfMonth);
    var beginTimeMilli = beginDate.getTime();

    // 结束日期
    var endArr = endTime.split(" ")[0].split("-");
    var endYear = endArr[0];
    var endMonth = endArr[1] - 1;
    var endDayOfMonth = endArr[2];
    var endDate = new Date(endYear, endMonth, endDayOfMonth);
    var endTimeMilli = endDate.getTime();
    // 一天对应的毫秒数
    var oneDayMill = 24 * 60 * 60 * 1000;



    // 计算有多少天
    var len = endTimeMilli / oneDayMill - beginTimeMilli / oneDayMill + 1;
    var begin_time = beginTime.split(" ")[1];
    var endTime = endTime.split(" ")[1];

    var schedule = [];
    for (let i = 0; i < len && i < 7; i++) {
      var day = parseInt(beginDate.getDate()) + parseInt(i);
      var date = new Date(beginDate.getFullYear(), beginDate.getMonth(), day);
      console.log(date);
      var temp = (date.getMonth() + 1) + "月" + date.getDate() + "日 " + this.data.week[date.getDay()];
      schedule.push(temp);
    }

    this.setData({
      "schedule": schedule,
      "begin_time": begin_time,
      "end_time": endTime
    });
    console.log("schedule: " + schedule);
  }
})