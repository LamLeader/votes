const app = getApp();
var httpRequestUtil = require("../../utils/network.js"); //require引入
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrls: [
      {
        id:1,
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
    routers: [
      {
        name: '测试1',
        url: '/pages/votes/votes',
        icon: '../../images/bkgimg/billsquery.png',
        code: '10'
      },
      {
        name: '测试2',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '11'
      },
      {
        name: '测试3',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '12'
      },
      {
        name: '测试4',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '13'
      },
      {
        name: '测试5',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '14'
      },
      {
        name: '测试6',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '15'
      },
      {
        name: '测试7',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '16'
      },
      {
        name: '测试8',
        url: '/pages/billsquery/billsquery',
        icon: '../../images/bkgimg/billsquery.png',
        code: '17'
      },
      {
        name: '更多',
        url: '/pages/Course/course',
        icon: '../../images/bkgimg/more.png',
        code: '18'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    goodsName: '',
  },  
  //加载内容
  onLoad: function () {
    //console.log('onLoad')
    var that = this;
    that.initMain();
  },  
  /**
   * 组件的方法列表
   */
  methods: {

  },
  //初始化方法
  initMain:function(){
    var that=this;
    wx.request({
      url: httpRequestUtil.webUrl + '/toupiao/Tclass/all',//接口地址
      data: { 
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        //console.log("id:" + res.data.data[0].id)
        for (let index in res.data.data) {
          console.log("title:" + res.data.data[index].title);
        }
        that.setData({
          routers: res.data.data
        })
      }
    })
  },

  //点击页面跳转
  onProductsItmesTap:function(event){
    var id = event.currentTarget.dataset.id;
    console.log("even:" + id);
  },
  //投票报表
  queryReport: function (event) {
    /*var that = this;
    console.log("index:" + event.currentTarget.dataset.index)
    let index = event.currentTarget.dataset.index;
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/report/report?index=' + index + "&title=" + title,
    });*/

  }
 


})
