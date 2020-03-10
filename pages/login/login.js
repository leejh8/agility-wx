var app = getApp()

Page({
  data: {
    inputUsernameDate: "123",
    inputPasswordDate: "123",
    loginBtnTxt: "登录",
    btnLoading: false,
    disabled: false,
    inputUserName: '',
    inputPassword: '',
    avatarUrl: "../../images/timg.png",
    logIcon: "../../images/logIcon.png",
    pwdIcon: "../../images/pwdIcon.png",
    key: "1",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad');
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  formSubmit: function(e) {
    var param = e.detail.value;
    this.mysubmit(param);
  },
  mysubmit: function(param) {
    var flag = this.checkUserName(param) && this.checkPassword(param)
    if (flag) {
      this.setLoginData1();
      this.checkUserInfo(param);
    }
  },
  setLoginData1: function() {
    this.setData({
      loginBtnTxt: "登录中",
      disabled: !this.data.disabled,
      btnLoading: !this.data.btnLoading
    });
  },
  setLoginData2: function() {
    this.setData({
      loginBtnTxt: "登录",
      disabled: !this.data.disabled,
      btnLoading: !this.data.btnLoading
    });
  },
  checkUserName: function(param) {
    var inputUserName = param.username.trim();
    var inputPassword = param.password.trim();
    if (inputUserName.length >= 3 || inputPassword.length >= 3) {
      return true;
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的账号密码'
      });
      return false;
    }
  },
  checkPassword: function(param) {
    var userName = param.username.trim();
    var password = param.password.trim();
    if (password.length <= 0) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入密码'
      });
      return false;
    } else {
      return true;
    }
  },
  checkUserInfo: function(param) {
    var username = param.username.trim();
    var password = param.password.trim();
    var that = this;
    if (username == '123' && password == '123') {
      setTimeout(function() {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1500
        });
        that.setLoginData2();
        that.redirectTo(param);
      }, 2000);
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '用户名或密码有误，请重新输入'
      });
      this.setLoginData2();
    }
  },
  redirectTo: function(param) {
    //需要将param转换为字符串
    param = JSON.stringify(param);
    wx.navigateTo({
      url: '/pages/logs/logs',
    })
  }
})