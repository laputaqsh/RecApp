var app = getApp();

Page({
  data: {

  },

  doRegist: function(e) {
    var me = this;
    var formObject = e.detail.value;
    var username = formObject.username;
    var password = formObject.password;

    // 简单验证
    if (username.length == 0 || password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 3000
      })
    } else {
      var url = app.globalData.doubanBase + app.globalData.user_regist_url + "?userId=" + username + "&userPw=" + password;
      wx.request({
        url: url,
        method: "POST",
        data: {},
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          console.log(res.data);
          var code = res.data.code;
          if (code == 200) {
            wx.showToast({
              title: "用户注册成功！",
              icon: 'none',
              duration: 3000
            });
            // 页面跳转
            wx.redirectTo({
              url: '/pages/user/login/login',
            })
          } else {
            wx.showToast({
              title: "已经存在该用户！",
              icon: 'none',
              duration: 3000
            })
          }
        },
        fail: function(res) {
          wx.showToast({
            title: "已经存在该用户！",
            icon: 'none',
            duration: 3000
          })
        }
      })
    }
  },

  goLoginPage: function() {
    wx.navigateTo({
      url: '/pages/user/login/login',
    })
  }
})