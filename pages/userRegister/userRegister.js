//index.js
//获取应用实例
const app = getApp();
var httpRequestUtil = require("../../utils/network.js"); //require引入
Page({
  data: {
    motto: 'Welcome to our vote',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取用户信息
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    //获取openid
    wx.login({
      success: function (res) {
        var that = this;
        //向数据库注册用户，验证用户
        console.log("nickName:" + e.detail.userInfo.nickName);
        console.log("avatarUrl:" + e.detail.userInfo.avatarUrl);
        //发送请求获取openid
        wx.request({
          url: httpRequestUtil.webUrl + '/toupiao/Users/add',//接口地址
          data: {
            username: e.detail.userInfo.nickName,
            touxiang: e.detail.userInfo.avatarUrl,
            openid: 11
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
          },
          success: function (res) {
            console.log("uid:"+res.data.data);
            wx.uid = res.data.data.uid;//获取用户登录id赋值
            //跳转到主页
            wx.switchTab({
              url: '../home/home'
            });
          }
        })
      }
    })
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    })
  },
  bindViewTap:function(){
    console.log("bindViewTap");
  }
})