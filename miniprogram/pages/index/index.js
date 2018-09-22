//index.js
//获取应用实例
const app = getApp()
wx.cloud.init()

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    video_contents: {}
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(){
      var page = this;
      wx.cloud.callFunction({
          name: 'sql',
          data: {
              low: 0,
              hight: 8
          },
          success: res => {
              console.log(res);
              console.log(res.result.data[1]);
              page.setData(
                  {
                      video_contents: res.result.data
                  }
              )
          },
            fail:console.error
      })

  },
  ontap:function () {
          var page = this;
          wx.cloud.callFunction({
              name: 'sql',
              data: {
                  low: 0,
                  hight: 8
              },
              success: res => {
                  console.log(res);
                  
                  page.setData(
                      {
                          video_contents: res
                      }
                  )
              }
          })

      }
})
