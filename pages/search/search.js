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
          var employees = {
            listName: "未打卡员工",
            itemList: [],
          };
          res.data.data.forEach((item, index) => {
            employees.itemList.push({
              nickName: item.nickname,
              avatarUrl: item.avatarUrl == null ? app.globalData.emptyAvatarUrl : item.avatarUrl,
            })
          });
          that.setData({
            employees: employees,
          });
          wx.hideLoading();
          wx.showToast({
            title: "搜索到 " +  employees.itemList.length + " 条记录" ,
            icon: "success",
          });
        }
      });
    }
  },
  detail: function(event) {
    var num = event.currentTarget.dataset.num;
    var res = this.data.searchRes.user.itemlist[num];
    wx.showModal({
      title: "咦",
      content: "没有 " + res.name + " 的信息",
      showCancel: false,
    });
  },
}

Page(pageObject)