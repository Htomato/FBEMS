// pages/PM/contacts/contacts.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contacts:[],
    //  topTips 页面初始数据
    show: false,
    success: '',
    topStatus: '',

  },
  /**
   * 点击与长摁时间；点击打电话 长摁删除联系人
   * @param e
   */
  touchstart:function (e){
    this.startTime = e.timeStamp
  },
  touchend: function (e){
    this.endTime = e.timeStamp
  },
  //点击事件
  call: function(e){
    if (this.endTime - this.startTime < 350) {
      console.log("点击事件")
      const teleNum = e.currentTarget.dataset.telenum
      wx.makePhoneCall({
        phoneNumber:teleNum
      })
    }
  },
  //长摁事件
  delete: function (e){
    let _this = this
    console.log("长摁事件")
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: "提醒",
      content: "是否删除联系人？",
      cancelText: "否",
      confirmText: "是",
      success(res) {
        console.log(res)
        if (res.confirm) {
          wx.request({
            url: app.serverUrl + '/contacts/delete?id=' + id,
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

  },


  search: function (value) {
    let _this = this
    const name  = value
    wx.request({
      url: app.serverUrl + '/contacts/search?name=' + name,
      success(res) {
        console.log("res",res)
        _this.setData({
          contacts: res.data
        })
      }
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  addContact: function () {
    wx.redirectTo({
      url: '/pages/PM/contacts/add/add',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    _this.setData({
      search: this.search.bind(this)
    })
    wx.request({
      url: app.serverUrl + '/contacts/allContacts',
      success(res) {
        const contacts = res.data
        _this.setData({
          contacts:contacts
        })
      }
    })

  },
  hideInput:function () {
    this.onLoad()
  }
})