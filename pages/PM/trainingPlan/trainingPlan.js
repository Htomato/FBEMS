// pages/PM/trainingPlan/trainingPlan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectArray: [
      {
        id: 0,
        name: '体能'
      },
      {
        id: 1,
        name: '技术'
      },
      {
        id: 2,
        name: '战术'
      },
      {
        id: 3,
        name: '心理'
      },
      {
        id: 4,
        name: '队列'
      }
    ],
    index: 0,
    trplan:[]
    //{ trorg: "利钝",
    //  trplanId: 1,
    //  trplancontent: "1、俯卧撑\n2、仰卧起坐\n3、100米佩戴空气呼吸机（2盘65mm水带）跑\n4、1500米长跑\n5、单杠引体\n6、双杠臂屈伸",
    //  trplantype: "体能"}


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
  navigator:function ( e ) {
    console.log("navigator.e=",e)
    const type = e.currentTarget.dataset.type
    const trorg = e.currentTarget.dataset.trorg
    const content = e.currentTarget.dataset.content

    wx.navigateTo({
      url:'/pages/PM/trainingPlan/trainingTypeDetail/trainingTypeDetail?title=' + type + '&content=' + content + '&trorg='+ trorg
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + '/trplan/allTrplan',
      success(res) {
        console.log(res)
        const trplan = res.data
        _this.setData({
          trplan: trplan
        })

      }
    })

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