//index.js
//获取应用实例
const app = getApp();
var wxCharts = require('../../utils/wxcharts.js');
var httpRequestUtil = require("../../utils/network.js"); //require引入
var openid = wx.getStorageSync("openid");
Page({
  data: {
    hasUserInfo: openid == ""
  },
  //退出登录
  loginOut:function(evet){
    wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
    wx.request({
      url: httpRequestUtil.webUrl + 'fmServer/mobile/authen/login', //仅为示例，并非真实的接口地址
      data: {
        loginName: '',
        passWord: ''
      },
      dataType: 'json',
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值  application/x-www-form-urlencoded
      },
      success: function (res) {
        wx.showModal({
          title: '退出登录',
          content: '确定要退出登录吗？',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '../login/login',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }, fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求超时，请重新登录！',
        })
      }

    })
  },
  //新建问卷
  newQuestions(){
     wx.redirectTo({
       url: '',
     })
  },
  //报表数据
  report() {
    wx.navigateTo({
      url: '/pages/report/report',
    });
  },


})
