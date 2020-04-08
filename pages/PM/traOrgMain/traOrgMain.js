// pages/PM/traOrgMain/traOrgMain.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    traOrgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + '/traorg/all',
      success(res) {
        console.log(res)
        _this.setData({
          traOrgList: res.data
        })
      }
    })

  }
})