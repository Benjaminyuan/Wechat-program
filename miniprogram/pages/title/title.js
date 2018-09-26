// pages/title_main/title.js
var g_app = getApp();
console.log(g_app);
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isPlayingMusic: false,
      info:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
      console.log(options);
      if(options){
          this.setData({
              info: options
          })
      }else{
          
      }
      console.log(options);
      console.log(g_app.globalData.nowIsPlaying)
      if(g_app.globalData.nowIsPlaying && g_app.globalData.palyingIndex==this.data.info.titleIndex){
          this.setData({
              inPlayingMusic:true
          })
          }
      this.setPlayingMonitor();
  },
setPlayingMonitor:function(){
        var page = this;
        wx.onBackgroundAudioPlay(function(){
            page.setData({
                isPlayingMusic:true
            })
            g_app.globalData.nowIsPlaying = true;
            g_app.globalData.palyingIndex = page.data.info.titleIndex;
        }),
        wx.onBackgroundAudioPause(function () {
            page.setData({
                    isPlayingMusic: false
            })
            console.log(g_app);
            g_app.globalData.nowIsPlaying = false;
            g_app.globalData.palyingIndex = page.data.info.titleIndex;
            })
    },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onMusicTap:function(event){
      var status = this.data.isPlayingMusic;
      if(status){
          wx.pauseBackgroundAudio();
          this.setData({
              isPlayingMusic:false
          })
      }else{
          wx.playBackgroundAudio({
              dataUrl:this.data.info.title_url,
              title:this.data.info.title,
          })
          this.setData({
              isPlayingMusic: true
          })
      }
    
  }
})