const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: null,
    password: null,
    departmentIndex: -1,
    departments: [],
    department: "正在加载...",
  },
  onLoad: function() {
    var _this = this;
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
    if (app.globalData.employee) {
      this.setData({
        userName: app.globalData.employee.data.loginSysUserVo.nickname,
      })
    }
    wx.request({
      url: 'https://shgic.com/sysDepartment/getAllDepartmentList',
      method: "POST",
      success: function(res) {
        if (res.data.data) {
          _this.setData({
            departments: res.data.data,
          });
          if (res.data.data.length > 0) {
            _this.setData({
              departmentIndex: 0,
              department: _this.data.departments[0].name,
            });
          }
          _this.sync();
        }
      },
      complete: function() {
        wx.hideLoading();
      },
    })
  },
  sync: function() {
    var _this = this;
    if (app.globalData.employee && this.data.departments) {
      this.data.departments.forEach((item, index) => {
        if (item.id == app.globalData.employee.data.loginSysUserVo.departmentId) {
          _this.setData({
            departmentIndex: index,
            department: _this.data.departments[index].name,
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      if (!app.globalData.userInfo.avatarUrl) {
        app.globalData.userInfo.avatarUrl = app.globalData.emptyAvatarUrl;
      }
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.userInfo != undefined && app.globalData.userInfo != null,
      });
    }
  },
  onUserNameChanged: function(e) {
    this.setData({
      userName: e.detail.value,
    });
  },
  onPasswordChanged: function(e) {
    this.setData({
      password: e.detail.value,
    });
  },
  bindchangeDepartment: function(event) {
    this.setData({
      departmentIndex: event.detail.value,
      department: this.data.departments[event.detail.value].name,
    })
  },
  bindtapLogin: function(event) {
    app.login(
      this.data.userName,
      this.data.password,
      this.data.departments[this.data.departmentIndex].id,
      "/pages/search/search");
  },
});