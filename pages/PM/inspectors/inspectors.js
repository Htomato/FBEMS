// pages/PM/inspectors/inspectors.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inspectorsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + "/worker/allInspectors",
      success(res) {
        console.log(res),
        _this.setData({
          inspectorsList: res.data
        })
      }
    })
  },

  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    console.log('forSubmit',e.detail.value)
    const  name = data.name
    const number = data.number
    wx.request({
      url: app.serverUrl + '/worker/selectorIns?number=' + number +'&name=' + name,
      success(res) {
        _this.setData({
          inspectorsList: res.data
        })
      }
    })


  },
  formReset: function () {
    this.onLoad()
  },
  addEqTech: function () {
    wx.redirectTo({
      url: '/pages/PM/eqTech/add/add',
    })
  },
  details:function (e){
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:'/pages/PM/eqTech/detail/workDetail?id=' + id
    })
  }
})