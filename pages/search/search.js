var pageObject = {
  data: {
    searchRes1: {
      "user": {
        "count": 2,
        "itemlist": [
          {
            "docid": "944940",
            "id": "944940",
            "mid": "0020PeOh4ZaCw1",
            "name": "裘东 (Julian Qiu)",
            "pic": "http://imgcache.qq.com/music/photo/mid_singer_58/w/1/0020PeOh4ZaCw1.jpg",
            "user": "裘东 (Julian Qiu)"
          },
          {
            "docid": "89698",
            "id": "89698",
            "mid": "003Cn3Yh16q1MO",
            "name": "邱明月",
            "pic": "http://imgcache.qq.com/music/photo/mid_singer_58/M/O/003Cn3Yh16q1MO.jpg",
            "user": "邱明月"
          }
        ],
        "name": "未打卡员工",
        "order": 1,
        "type": 2
      },
    }
  },
  search: function (e) {
    var that = this
    console.log('搜索')
    wx.showLoading({
      title: "正在检索",
    });
    setTimeout(function () {
      wx.hideLoading();
      that.setData({
        searchRes: that.data.searchRes1,
      })
    }, 2000);
    /*
    wx.request({
      url: 'http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
      data: {
        is_xml: 0,
        format: 'jsonp',
        key: e.detail.value,
        g_tk: 5381,
        jsonpCallback: 'SmartboxKeysCallbackmod_top_search463',
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
      },
      header: {
        'Content-Type': 'text/html;charset=utf-8'
      },
      success: function (res) {
        // var pattern =new RegExp("\\((.*?)\\)","igm");
        that.setData({
          //searchRes: JSON.parse(res.data.substring(38, res.data.length - 1)).data
        });
        setTimeout( function(){
          wx.hideLoading();
          that.setData({
            searchRes: that.data.searchRes1,
          })
        }, 2000);
      }
    })*/
  },
  detail: function (event) {
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