const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: null,
    password: null,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo;
    if (app.globalData.userInfo.avatarUrl === "") {
      app.globalData.userInfo.avatarUrl = app.globalData.emptyAvatarUrl;
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.userInfo != undefined && app.globalData.userInfo != null,
    });
  },
  onUserNameChanged: function (e) {
    this.setData({
      userName: e.detail.value,
    });
  },
  onPasswordChanged: function (e) {
    this.setData({
      password: e.detail.value,
    });
  },
  save: function (event) {
    wx.showModal({
      content: "已提交后台审核，请稍后再试",
      showCancel: false,
    });
  },
});