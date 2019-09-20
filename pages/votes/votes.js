//index.js
//获取应用实例
const app = getApp();
var httpRequestUtil = require("../../utils/network.js"); //require引入
Page({
  data: {
    imgUrls: [
      {
        id: 1,
        link: '/pages/index/index',
        url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2197066702,135802552&fm=26&gp=0.jpg'
      }, {
        id: 2,
        link: '/pages/logs/logs',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564145775519&di=2ebcf29f842a2a7ceb14352403bede37&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180608%2F71a9b9eb0c6346b9930cd5c893b069b6.jpeg'
      }, {
        id: 3,
        link: '/pages/test/test',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564145790173&di=df08e086f8b8943d032122ad014402e8&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn20%2F700%2Fw960h540%2F20180508%2F96cb-haichqy4851613.jpg'
      },
    ],
     programId:0,
     routers:[]
  },
  //加载函数
  onLoad: function (options) {
    var that=this;
    let indexId = options.index;
    console.log("indexId:" + indexId);
     that.setData({
       programId: options.id
     })  
     //请求项目
     that.queryQuestionByProId();
  },
  //根据项目ID查询问卷
  queryQuestionByProId:function(){
    var that = this;
    var programId = that.data.programId;
    console.log("programId:"+programId);
    wx.request({
      url: httpRequestUtil.webUrl + '/toupiao/Biaoti/all?tid=' + programId,//接口地址
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        //console.log("id:" + res.data.data[0].id)
        for (let index in res.data.data) {
          console.log("title:" + res.data.data[index].title);
          console.log("images:" + res.data.data[index].images);
        }
        that.setData({
          routers: res.data.data
        })
      }
    })
  },
  //投票报表
  queryReport: function (event) {
    var that = this;
    console.log("tid:" + event.currentTarget.dataset.tid)
    let tid = event.currentTarget.dataset.tid
    wx.navigateTo({
      url: '/pages/report/report?tid=' + tid,
    });

  }





})