// pages/report/report.js
var wxCharts = require('../../utils/wxcharts.js');
var httpRequestUtil = require("../../utils/network.js"); //require引入

var columnChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chartTitle: '投票数据',
    isMainChartDisplay: true,
    columnDate: {
      title: '投票数据',
      data: [23, 28, 35, 54, 95,56,90],
      categories: ['小潘', '小武', '小红', '小黑', '小绿','大黑','龙王'],
    },
    name:[],
    score:[],
    indexId:0,
    detail: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /*console.log("--- onLoad is run----tid:" + options.index);
    let indexId = options.index;
    console.log("indexId:" + indexId);
    var title=options.title;
    console.log("title:"+title);
    that.data.columnDate.title = title;
    that.setData({
      indexId: indexId,
      title: that.data.columnDate.title
    })*/
    that.initQuery();//初始化接口数据
  },
  //初始化方法
  initQuery: function (){
    var that = this;
    wx.showLoading({ title: '数据请求中...', icon: 'loading', duration: 10000 });//显示请求框
    let tid = 13;
    /*----数据请求begin---*/
    wx.request({
      url: httpRequestUtil.webUrl + '/toupiao/Tj/all',
      data: {
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        var result = res.data.state;
        var dataUserName = [];//用户名
        var dataScore = [];//分数
        if (result == 1) {
          var pf = res.data.data;
          var names = res.data.data;
          for(let index in pf){
            console.log("pf:"+pf[index].pf);
            dataScore.push(pf[index].pf);
          }
          for (let index in names) {
            console.log("names:" + names[index].title);
            dataUserName.push(names[index].title);
          }
         
          that.data.columnDate.categories = dataUserName;
          that.data.columnDate.data = dataScore;
          //赋值
          that.setData({
            categories: that.data.columnDate.categories,
            data:that.data.columnDate.data,
            name: dataUserName,
            score: dataScore,
          })
          
          for (let index in that.data.columnDate.categorie) {
            console.log("titles:" + that.data.columnDate.categorie[index]);
          
          }

          that.chartInit();//初始化图表
        } else {
          wx.showModal({
            title: '请求超时,请检查网络',
            content: res.data.msg,
            confirmColor: '#b02923',
            showCancel: false
          })
          return false;
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '请求超时,请检查网络！',
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    var that = this;
    console.log("--- onReady is run----");
    
  },
  //报表初始化
  chartInit:function(){
    var that = this;
    //that.initQuery();//调用接口赋值数据
    var windowWidth = 360;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //柱状图1  categories:chartData.main.categories , data:chartData.main.data,
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: that.data.columnDate.categories,
      series: [{
        name: '项目详情',
        color: '#188df0',
        data: that.data.columnDate.data,
        format: function (val, name) {
          return val.toFixed(2) + '分';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '分';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 180,
    });
    //柱状图2  categories:chartData.main.categories , data:chartData.main.data,
    columnChart = new wxCharts({
      canvasId: 'columnCanvas1',
      type: 'column',
      animation: true,
      categories: that.data.columnDate.categories,
      series: [{
        name: '投票详情',
        color: '#188df0',
        data: that.data.columnDate.data,
        format: function (val, name) {
          return val.toFixed(2) + '分';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + '分';
        },
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15,
        },
        legendTextColor: '#000000'
      },
      width: windowWidth,
      height: 180,
    });
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

  }
})