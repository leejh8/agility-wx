//app.js
App({
  globalData: {
    userInfo: null,
    emptyAvatarUrl: "https://iknow-pic.cdn.bcebos.com/35a85edf8db1cb132eaa3ca1de54564e93584b44?x-bce-process=image/resize,m_lfit,w_600,h_800,limit_1",
  },

  onLaunch: function() {
    var _this = this;
    this.globalData.employee = wx.getStorageSync('employee');
    if (this.globalData.employee) {
      console.log(this.globalData.employee);
    }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              if (res.userInfo.avatarUrl === "") {
                res.userInfo.avatarUrl = this.globalData.emptyAvatarUrl;
              }

              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          });
        }
      }
    })
  },

  login: function(userName, password, departmentId, success) {
    var _this = this;
    wx.showLoading({
      title: '登录中',
    });

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://shgic.com/wx/login',
          method: "POST",
          data: {
            wxCode: res.code,
          },
          success: function(res) {
            switch (res.data.code) {
              case 200:
                {
                  _this.logined(res.data, success);
                  wx.hideLoading();
                }
                break;

              case 202:
                {
                  _this.signup(userName, password, departmentId, success);
                }
                break;
            }
          },
          fail: function(){
            wx.hideLoading();
          }
        });
      },
    });
  },

  signup: function(userName, password, departmentId, success) {
    var _this = this;
    wx.login({
      success: res => {
        wx.request({
          url: 'https://shgic.com/wx/signup',
          method: "POST",
          data: {
            departmentId: departmentId,
            name: userName,
            sysUserWxext: {
              avatarUrl: this.globalData.userInfo.avatarUrl,
              city: this.globalData.userInfo.city,
              country: this.globalData.userInfo.country,
              gender: this.globalData.userInfo.gender,
              language: this.globalData.userInfo.language,
              nickName: this.globalData.userInfo.nickName,
              province: this.globalData.userInfo.province,
              username: userName,
              password: password,
            },
            wxCode: res.code,
          },
          success: function (res) {
            switch (res.data.code) {
              case 200:
                {
                  _this.logined(res.data, success);
                }
                break;

              case 500:
                {
                  wx.showModal({
                    title: res.data.msg,
                    content: res.data.data,
                  });
                }
                break;
            }
            wx.hideLoading();
          },
          fail: function () {
            wx.hideLoading();
          },
        });
      }
    });
  },

  logined: function(employee, success) {
    if (employee) {
      this.globalData.employee = employee;
      wx.setStorageSync("employee", employee);
      if (success) {
        success(employee);
      }
    }
  },
})