// pages/PM/contacts/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    success:'',
    topStatus:''
  },
  formSubmit: function (e) {
    let _this = this
    const data = e.detail.value;
    const dataType = typeof (data);
    // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
    const contactName = data.contactName
    const contactTele = data.contactTele
    const company = data.company
    const job = data.job
    if(contactName === ''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none'
      })
    } else if (contactTele === '') {
      wx.showToast({
        title: '电话不能为空',
        icon: 'none'
      })
    }else if (company === '') {
      wx.showToast({
        title: '单位不能为空',
        icon: 'none'
      })
    }else if (job === '') {
      wx.showToast({
        title: '职业不能为空',
        icon: 'none'
      })
    }else{
      // console.log("即将发送的：  ---",data)
      wx.request({
            url: app.serverUrl + '/contacts/add',
            data:{
              data:{contactName,contactTele,company,job}
            },

            success(res){
              console.log("服务器返回值：",res)
              if (res.data === 1){
                _this.setData({
                  show: true,
                  success: '添加成功',
                  topStatus: 'success'
                })
                wx.navigateTo({
                      url:'/pages/PM/contacts/contacts'
                    }
                )
              }else{
                _this.setData({
                  show: true,
                  success: '添加失败',
                  topStatus: 'error'
                })
              }

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