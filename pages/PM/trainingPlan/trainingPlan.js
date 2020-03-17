// pages/PM/trainingPlan/trainingPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    listData:[
      {"code":"01","text":"利钝","type":"体能"},
      {"code":"02","text":"消强","type":"业务"},
      {"code":"03","text":"text3","type":"type3"},
      {"code":"04","text":"text4","type":"type4"},
      {"code":"05","text":"text5","type":"type5"},
      {"code":"06","text":"text6","type":"type6"},
      {"code":"07","text":"text7","type":"type7"}
    ]

  },
  formSubmit: function (e) {
    
    var data = e.detail.value
    console.log('form发生了submit事件，携带数据为：', data)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  pickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})