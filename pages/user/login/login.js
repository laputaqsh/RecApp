var app = getApp();

Page({
  onLoad: function (params) {
    
  },

  // 登录  
  doLogin: function (e) {
    var that = this;
    var formObject = e.detail.value;
    var userId = formObject.username;
    var userPw = formObject.password;
    // 简单验证
    if (userId.length == 0 || userPw.length == 0) {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      var url = app.globalData.doubanBase + app.globalData.user_login_url + "?userId=" + userId + "&userPw=" + userPw;
      console.log(url);
      wx.showLoading({
        title: '请等待...',
      });
      // 调用后端
      wx.request({
        url: url,
        method: "POST",
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res);
          wx.hideLoading();
          if (res.data.code == 200) {
            // 登录成功跳转 
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            });

            // 缓存
            app.globalData.userInfo = res.data.data
            console.log(app.globalData.userInfo);

            // 页面跳转
            wx.switchTab({
              url: '/pages/user/user'
            });
          } else {
            // 失败弹出框
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 3000
            })
          }
        }
      })
    }
  },

  goRegistPage:function() {
    wx.redirectTo({
      url: '../regist/regist',
    })
  }
})