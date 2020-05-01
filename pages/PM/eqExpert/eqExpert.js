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

  },
  addEqExpert: function () {
    wx.redirectTo({
      url: '/pages/PM/eqExpert/add/add',
    })
  },
  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    const  name = data.name
    const number = data.number
    wx.request({
      url: app.serverUrl + '/eqExpert/selector?number=' + number +'&name=' + name,
      success(res) {
        _this.setData({
          eqExpertList: res.data
        })

      }
    })


  },
  formReset: function () {
    this.onLoad()
  },
  details:function (e) {
    const id =  e.currentTarget.dataset.id
    wx.navigateTo({
      url:'/pages/PM/eqExpertReview/detail/detail?id='+id
    })
  },
  touchstart:function (e){
    this.startTime = e.timeStamp
  },
  touchend: function (e){
    this.endTime = e.timeStamp
  },
  delete: function (e) {

    let _this = this
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: "提醒",
      content: "是否删除？",
      cancelText: "否",
      confirmText: "是",
      success(res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + '/eqExpert/delete?id=' + id,
            success(res) {
              console.log("服务器res",res)
              if (res.data === 1) {
                _this.setData({
                  show: true,
                  success: '删除成功',
                  topStatus: 'success'
                })
                //刷新页面
                _this.onLoad()
              } else {
                _this.setData({
                  show: true,
                  success: '删除失败',
                  topStatus: 'error'
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log("用户点击了取消")
        }
      }

    })
  }
})