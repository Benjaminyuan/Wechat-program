//index.js
//获取应用实例
const app = getApp()
wx.cloud.init();
var getData = function(start,end){
     return wx.cloud.callFunction({
        name:'sql',
        data:{
            start:start,
            end:end
        }
    })
};

Page({

  data: {
    nowposition:8,
    gap:3,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    video_contents: []
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
              start: 0,
              end: 8
          },
          success: res => {
              console.log(res.result.data);  
              page.setData(
                  {
                      video_contents: res.result.data
                  }
              )
          },
            fail:console.error
      })

  },
  onPullDownRefresh(){
      wx.showNavigationBarLoading();
      this.onLoad();
      setTimeout(()=>{
          wx.stopPullDownRefresh();
          wx.hideNavigationBarLoading();
          },1000);

  },
  onReachBottom:function(){
        var page = this;
       let result = getData(page.data.nowposition,page.data.nowposition+page.data.gap);
       wx.showLoading({
           title:'玩命加载中',
       })
        result.then(res=>{
            console.log(res.result.data);
            for(let item in res.result.data){
                page.data.video_contents.push(res.result.data[item]);
            }   
        }).then(()=>{console.log(page.data.video_contents)})
        page.setData({
            video_contents:page.data.video_contents
        });
        wx.hideLoading();
  }
})
