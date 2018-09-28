// miniprogram/pages/star/star.js
const  app = getApp();
const starHandler = app.starHandler
// const starHandler = function(res,page){
//     for (let item in res.result.data) {
//         if (CollectionList.indexOf(parseInt(res.result.data[item].index)) != -1) {
//             res.result.data[item]['star'] = true
//             console.log('yes');
//         } else {
//             res.result.data[item]['star'] = false
//         }
//     }
//     page.setData(
//         {
//             video_contents: res.result.data
//         }
//     )
// }
Page({

  /**
   * 页面的初始数据
   */
  data: {
      video_contents:{},
      showInfo:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.showLoading({
          title: '玩命加载中',
      })
      console.log('star加载')
      var CollectionList = wx.getStorageSync('isCollectedList');
      if(!CollectionList.length){
          this.setData({
              showInfo:true
          })
      }
        var result = wx.cloud.callFunction({
            name:'getStar',
            data:{
                starList:CollectionList
            }
        })
        result.then(res=>{
            console.log(CollectionList);
            console.log(res);
            console.log(this);
            starHandler(res,this,CollectionList);
            wx.hideLoading();
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
  star:function(e){
      var CollectionList = wx.getStorageSync('isCollectedList');
      var page = this;
      if (e.currentTarget.dataset.star) {
          CollectionList.splice(CollectionList.indexOf(e.currentTarget.dataset.index), 1)
          wx.setStorageSync('isCollectedList', CollectionList)
          e.currentTarget.dataset.star = false;
          console.log(wx.getStorageSync('isCollectedList'));

      } else {
          CollectionList.push(pos.index);
          wx.setStorageSync('isCollectedList', CollectionList)
          console.log(wx.getStorageSync('isCollectedList'));
          e.currentTarget.dataset.star = true;
      }

      this.onLoad();
  }
})