//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //wx.setStorageSync('isCollectedList', [])//实际运行环境下这一行要注释掉！！！！！
    if(!wx.getStorageSync('isCollectedList'))
    {
        wx.setStorageSync('isCollectedList', [])
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    nowIsPlaying: false,
    playingIndex: 1, 
    userInfo: null,
  },
    starHandler :function (res, page,CollectionList) {
        for (let item in res.result.data) {
            if (CollectionList.indexOf(parseInt(res.result.data[item].index)) != -1) {
                res.result.data[item]['star'] = true
                console.log('yes');
            } else {
                res.result.data[item]['star'] = false
            }
        }
        page.setData(
            {
                video_contents: res.result.data
            }
        )
    },
    star: function (e,page,CollectionList) {
        var pos = page.data.video_contents[e.currentTarget.dataset.index - 1]
        if (e.currentTarget.dataset.star) {
            CollectionList.splice(CollectionList.indexOf(pos.index), 1)
            wx.setStorageSync('isCollectedList', CollectionList)
            e.currentTarget.dataset.star = false;
            console.log(wx.getStorageSync('isCollectedList'));
          
        }else{
            CollectionList.push(pos.index);
            wx.setStorageSync('isCollectedList', CollectionList)
            console.log(wx.getStorageSync('isCollectedList'));
            e.currentTarget.dataset.star = true;
        }
       
        page.data.video_contents[pos.index - 1].star = !pos.star;
        page.setData({
            video_contents: page.data.video_contents
        })

    }
})
