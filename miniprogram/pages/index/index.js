//index.js
//获取应用实例
const app = getApp()
wx.cloud.init();
const CollectionList = wx.getStorageSync('isCollectedList');
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
    video_contents: [],
    collectionList:[]
    },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(){
      var page = this;
      wx.showLoading({
          title: '玩命加载中...',
      })
      wx.cloud.callFunction({
          name: 'sql',
          data: {
              start: 0,
              end: 8
          },
          success: res => {
              app.starHandler(res,this,CollectionList);
              console.log(page.data);
              wx.hideLoading();
          },
            fail:console.error
      })

  },
  onShow:function(){//刷新数据
    console.log('show');
      const list = wx.getStorageSync('isCollectedList');
      console.log(list);
      for(let item in this.data.video_contents){
          console.log(list);
          console.log(list.indexOf(2));
          console.log(this.data.video_contents[item].index);
          if(list.indexOf(this.data.video_contents[item].index)!= -1){
              this.data.video_contents[item]['star']=true
          }else{
              this.data.video_contents[item]['star'] =false
          }
      }
      this.setData({
          video_contents:this.data.video_contents
      })
  },
  onPullDownRefresh:function(){
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
                if(CollectionList.indexOf(res.result.data[item].index)!=-1){
                    res.result.data[item]['star'] = true
                    
                }else{
                    res.result.data[item]['star'] = false
                }
                page.data.video_contents.push(res.result.data[item]);
              
            }   
        }).then(()=>{console.log(page.data.video_contents)})
        page.setData({
            video_contents:page.data.video_contents,
            nowposition: page.data.nowposition + page.data.gap,
        });
        wx.hideLoading();
  },
  toPerson:function(event){
      console.log(event.currentTarget.dataset.imgurl);
      wx.navigateTo({
          url: '../title/title?titleIndex=' + event.currentTarget.dataset.titleIndex
      })
      console.log('跳转');

  },
    star: function(e){
        app.star(e,this,CollectionList)
    }
    // function (e) {
    //     var pos = this.data.video_contents[e.currentTarget.dataset.index - 1]
    //     if (e.currentTarget.dataset.star) {
    //         CollectionList.splice(CollectionList.indexOf(pos.index),1)
    //         wx.setStorageSync('isCollectedList', CollectionList)
    //         e.currentTarget.dataset.star = false;
    //         console.log(wx.getStorageSync('isCollectedList'));
    //     } else {
            
    //         CollectionList.push(pos.index);
    //         wx.setStorageSync('isCollectedList', CollectionList)
    //         console.log(wx.getStorageSync('isCollectedList'));
    //         e.currentTarget.dataset.star = true;
    //     }
    //     var res = !pos.star;
    //     this.data.video_contents[pos.index-1].star = res;
    //     this.setData({
    //         video_contents:this.data.video_contents
    //     })
        
    // }
})
