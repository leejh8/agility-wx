const app = getApp()

var pageObject = {
  data: {},
  onLoad: function(e) {
    var date = new Date()
    this.setData({
      today: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
    });
  },

  search: function(e) {
    var that = this
    console.log('搜索')
    wx.showLoading({
      title: "正在检索",
    });
    if (app.globalData.employee) {
      wx.request({
        url: "https://shgic.com/chkiEvent/absence/" + app.globalData.employee.data.loginSysUserVo.departmentName + "/" + e.detail.value,
        method: "GET",
        header: {
          token: app.globalData.employee.data.token,
        },
        success: function(res) {
          var employee = {
            listName: "未打卡员工",
            items: [],
          };
          if (res.statusCode == 401) {
            setTimeout(() => {
              wx.showToast({
                title: "请先登录",
                icon: "loading",
                duration: 3000,
              }), 1000
            });
            wx.switchTab({
              url: '/pages/setting/setting',
            })
          } else {
            if (res.data && res.data.data) {
              res.data.data.forEach((item, index) => {
                employee.items.push({
                  nickName: item.nickname,
                  avatarUrl: item.avatarUrl == null ? app.globalData.emptyAvatarUrl : item.avatarUrl,
                })
              });
              that.setData({
                employee: employee,
              });
              wx.showToast({
                title: "搜索到 " + employee.items.length + " 条记录",
                icon: "success",
              });
            }
          }
          wx.hideLoading();
        }
      });
    }
  },
  detail: function(event) {
    var num = event.currentTarget.dataset.num;
    var res = this.data.employee.items[num];
    wx.showModal({
      title: "咦",
      content: "没有 " + res.nickName + " 的信息",
      showCancel: false,
    });
  },
}

Page(pageObject)