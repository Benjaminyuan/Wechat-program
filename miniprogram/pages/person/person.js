// pages/person/person.js
var freshNum = function(page){
    console.log('show');
    const CollectionList = wx.getStorageSync('isCollectedList');
    console.log(CollectionList);
    page.setData({
        starNum: CollectionList.length
    })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
      starNum:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //   console.log('show');
    //   const CollectionList = wx.getStorageSync('isCollectedList');
    //   console.log(CollectionList);
    //      this.setData({
    //          starNum:CollectionList.length
    //      })
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
      freshNum(this);
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
  showStarList:function(){
      wx.navigateTo({
          url: '../star/star',
      })
  }
})