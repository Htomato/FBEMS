// pages/PM/traOrgReview/traOrgReview.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviewList: [],
    modalHidden: true,
    //  topTips 页面初始数据
    show: false,
    success: '',
    topStatus: ''
  },
  quaImg: function (e) {
    console.log(e)
    const ImgUrl = e.currentTarget.dataset.quaimgurl
    this.setData({
      modalHidden: false
    })
  },
  /**
   * 机构资格审核至审核通过
   * @param e：专家的id
   */
  changeStatus: function (e) {
    console.log(e)
    let _this = this
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.showModal({
      title: "提醒",
      content: "是否通过审核？",
      cancelText: "否",
      confirmText: "通过",
      success(res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + '/traorg/changeStatus?id=' + id,
            success(res) {
              console.log("服务器res",res)
              if (res.data === 1) {
                _this.setData({
                  show: true,
                  success: '修改通过',
                  topStatus: 'success'
                })
                //刷新页面
                _this.onLoad()
              } else {
                _this.setData({
                  show: true,
                  success: '修改失败',
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


  },

  /**
   * 点击取消
   */
  modalCandel: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   *  点击确认
   */
  modalConfirm: function () {
    // do something
    this.setData({
      modalHidden: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + '/traorg/review',
      success(res) {
        console.log(res)
        _this.setData({
          reviewList: res.data
        })

      }
    })
  }
})