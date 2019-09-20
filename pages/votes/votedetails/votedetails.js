//index.js
//获取应用实例
const app = getApp();
var httpRequestUtil = require("../../../utils/network.js"); //require引入
Page({
  data: {
    time:30,
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
    items: [
      { name: 'USA', value: '美国' },
      { name: 'CHN', value: '中国', checked: 'true' },
      { name: 'BRA', value: '巴西' },
      { name: 'JPN', value: '日本' },
      { name: 'ENG', value: '英国' },
      { name: 'FRA', value: '法国' },
    ],
    bid: 0,
    routers: [],
    title:'',
    did:0,
    index:0
  },
  //单选值
  radioChange: function (e) {
    var that = this;
    that.setData({
      did: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //加载函数
  onLoad: function (options) {
    var that = this;
    let index = options.index;
    var numberIndex = parseInt(index)
    console.log("index:" + index);
    console.log("numberIndex:" + numberIndex);
    that.setData({
      tid: options.tid,
      index: index
    })
    //请求项目
    that.queryQuestionByProId();
    that.setTime();//时间间隔设置
  },
  //根据项目ID查询问卷
  queryQuestionByProId: function () {
    var that = this;
    var tid = that.data.tid;
    console.log("tid:" + tid);
    wx.request({
      url: httpRequestUtil.webUrl + '/toupiao/Biaoti/all?tid=' + tid,//接口地址
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
      },
      success: function (res) {
        let lengths = res.data.data.length;//data数据长度
        console.log("listLength:" + lengths);  
        that.setData({
          routers: res.data.data[that.data.index].list,
          title: res.data.data[that.data.index].title,
          items: res.data.data[that.data.index].list
        })
        var checked = "routers[0].checked"	//routers[0]中空号里只能存放0-9的数字
        that.setData({
          [checked]: true
        })
      }
    })
  },

  //提交表单
  formSubmit:function(e){
    let that = this;
    let did = that.data.did;
    if (did>0){
      console.log("uid:" + wx.uid + ",did:" + did);
      wx.request({
        url: httpRequestUtil.webUrl + '/toupiao/Tj/add?uid=' + wx.uid + '&did=' + did, //接口地址
        data: {
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值  application/x-www-form-urlencoded(post) application/json(get)
        },
        success: function (res) {
          console.log("suc");
          wx.showModal({
            title: '提示',
            content: '提交成功',
          })
          that.returnBack();//返回页面
        }
      })
    }else{
      wx.showToast({
        title: '请选择选项！',
      })
      return;
    }
    
  },
  //返回上级页面
  returnBack: function () {
    var pages = getCurrentPages(); // 当前页面
    var beforePage = pages[pages.length -2]; // 前一个页面
    wx.navigateBack({
      success: function () {
        //beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    })
  },
  //设置计时器
  setTime() {
    let that = this;
    let myTime = setInterval(function () {
      that.setData({
        time: that.data.time - 1
      })
      if (that.data.time == 0) {
        clearInterval(myTime);
        wx.navigateBack({
          url: '../../home/home'
        })
      }
    }, 1000)
  },
  
})