Page({
  data: {
    userInfo: {
      avatarUrl: "https://pic2.zhimg.com/v2-c15aefb8fa14eada3f9ab102a54b6dca_1200x500.jpg",
      nickName: "想太多",
    },
  },

  save: function(event){
    wx.showModal({
      content: "已提交审核，请勿重复注册",
      showCancel: false,
    });
  },
});