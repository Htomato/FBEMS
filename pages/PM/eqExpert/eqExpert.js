// pages/PM/eqExpert/eqExpert.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eqExpertList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + '/eqExpert/allEqExpert',
      success(res) {
        console.log(res)
        _this.setData({
         eqExpertList: res.data
        })

      }
    })

  }
})