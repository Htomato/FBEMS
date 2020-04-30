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

  },
  addTraOrg: function () {
    wx.redirectTo({
      url: '/pages/PM/traOrgMain/add/add',
    })
  },
  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    const  name = data.name
    const number = data.number
    wx.request({
      url: app.serverUrl + '/traorg/selector?number=' + number +'&name=' + name,
      success(res) {
        _this.setData({
          traOrgList: res.data
        })

      }
    })


  },
  formReset: function () {
    this.onLoad()
  },
  detail:function (e) {
    const id =  e.currentTarget.dataset.id
    wx.navigateTo({
      url:'/pages/PM/traOrgReview/detail/detail?id='+id
    })
  }
})