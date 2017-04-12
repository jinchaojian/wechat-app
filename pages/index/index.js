//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    time:{},
    period:'morning',
    inputValue:'',
    setValue:''
  },
  //事件处理函数
/*  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },*/
  bindKeyInput: function(e) {
    this.setData({
      setValue: e.detail.value,
      inputValue:''
    });
    var timeNow=new Date();
    var day=timeNow.getDate();
    if(day<10){
      day='0'+day;
    }
    wx.setStorageSync('work', e.detail.value+day);
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });

      //处理时间
      function updateTime(){
    var timeNow=new Date();
    var now={};
    var period;
    now.hours=timeNow.getHours();
    now.minutes=timeNow.getMinutes();
    now.seconds=timeNow.getSeconds();
    if(now.hours<10){
      now.hours='0'+now.hours;
    }
    if(now.minutes<10){
      now.minutes='0'+now.minutes;
    }
    if(now.hours>=12&&now.hours<18){
      period='afternoon';  
    }
    if(now.hours>=18&&now.hours<22){
      period='evening';  
    }
    if(now.hours>=22&&now.hours<24){
      period='night';  
    }
      that.setData({
        time:now,
        period:period
      })
      }
      updateTime();
      setInterval(updateTime,1000);
    });

//获取每日英文
wx.request({
 url: 'https://open.iciba.com/dsapi/', //这里填写你的接口路径
 header: { //这里写你借口返回的数据是什么类型，这里就体现了微信小程序的强大，直接给你解析数据，再也不用去寻找各种方法去解析json，xml等数据了
  'Content-Type': 'application/json'
 },

 success: function(res) {
 //这里就是请求成功后，进行一些函数操作
 console.log(res.data.content)
 that.setData({
   content:res.data.content
 });
 }
});



    //存储每日任务
  wx.getStorage({
  key: 'work',
  success: function(res) {
    var timeNow=new Date();
    var day=timeNow.getDate();
    var last=res.data;
    var period=last.substring(0,last.length-2);
    day=parseInt(day);
    var setDay=last.substring(last.length-2);
    if(day!=setDay){
      period='';
    }
      that.setData({
        setValue:period
      })
  } 
});
  },

  //设置分享
  onShareAppMessage: function () {
    return {
      title: 'chac',
      path: '/pages/index/index',
      success: function(res) {
        // 分享成功
      },
      fail: function(res) {
        // 分享失败
      }
    }
  }
})
