// pages/PM/contacts/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    success:'',
    status:''
  },
  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    const dataType = typeof (data);
    console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
    var name = data.name
    console.log(name)
    var tele = data.tele
    if(name == ''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    } else if (tele == '') {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      })
    }else{
      var dataStr = JSON.stringify(data)
      console.log(dataStr)
      wx.request({
        url: 'http://localhost:8080/contacts/add',
        method:"POST",
        data:{
          dataStr:''
        },

        success(res){
          console.log(res)
          _this.setData({
            show: true,
            success: '添加成功',
            topStatus: 'success'
          })
        }
      })
    }
    
     
    
  },
  formReset: function () {

    
    console.log('form发生了reset事件')
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      success: '添加成功',
      topStatus: 'success'
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