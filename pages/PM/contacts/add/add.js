// pages/PM/contacts/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //topTips data
    show: false,
    success:'',
    topStatus:'',

    avatar: ''
  },
  formSubmit: function (e) {
    let _this = this
    console.log("formSubmit _this",_this)
    const data = e.detail.value;
    // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
    const contactName = data.contactName
    const contactTele = data.contactTele
    const company = data.company
    const job = data.job
    const avatar = _this.data.avatar
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
      console.log("avatar",avatar)
      wx.request({
            url: app.serverUrl + '/contacts/add',
            data:{
              data:{contactName,contactTele,company,job,avatar}
            },

            success(res){
              console.log("服务器返回值：",res)
              if (res.data === 1){
                _this.setData({
                  show: true,
                  success: '添加成功',
                  topStatus: 'success'
                })
                wx.redirectTo({
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
   * 上传头像
   */

  avatarUpload: function () {
    let _this = this
    wx.chooseImage({
      count: 1,
      success(res) {
        console.log("res",res)
        const filepath = res.tempFilePaths

        wx.uploadFile({
          url: app.serverUrl + '/contacts/upload',
          filePath: filepath[0],
          name: 'avatar',
          formData: {
            description: 'avatarTest'
          },
          success(res) {
            console.log(res.data)
            const avatar = res.data
            _this.setData({
              avatar: avatar
            })
          },
          fail(res) {
            console.log("upload连接失败")
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  }

})