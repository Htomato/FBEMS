// pages/PM/trainingPlan/trainingPlan.js
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
    trplantypeRadio: [
      {name: '体能',value: '体能'},
      {name: '战术',value: '战术'},
      {name: '心理',value: '心理'},
      {name: '救援',value: '救援'}
    ],
    index: 0,
    trplan:[],
    trplantypeSelect:''



  },
  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    console.log('forSubmit',e.detail.value)
    const  name = data.name
    const number = data.number
    const trplantype = this.data.trplantypeSelect
    console.log("select",trplantype)
    wx.request({
      url: app.serverUrl + '/trplan/selector?number=' + number +'&name=' + name + '&trplantype=' +trplantype,
      success(res) {
        _this.setData({
          trplan: res.data
        })
      }
    })


  },
  formReset: function () {
    this.onLoad()
  },
  pickerChange: function (e) {
    this.setData({
      index: e.detail.value,
    })
  },
  navigator:function ( e ) {
    console.log(e)
    const type = e.currentTarget.dataset.type
    const trorg = e.currentTarget.dataset.trorg
    const content = e.currentTarget.dataset.content
    const goal = e.currentTarget.dataset.goal
    console.log('goal',goal)


    wx.navigateTo({
      url:'/pages/PM/trainingPlan/trainingTypeDetail/trainingTypeDetail?title=' + type + '&content=' + content + '&trorg='+ trorg+ '&goal='+ goal
    })
  },
  trplantypeSelectRadio:function (e){
    this.setData({
      trplantypeSelect: e.detail.value
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
        const trplan = res.data
        console.log(trplan)
        _this.setData({
          trplan: trplan
        })

      }
    })

  },
  addTraPlan: function () {
    wx.redirectTo({
      url: '/pages/PM/trainingPlan/add/add',
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
            url: app.serverUrl + '/trplan/delete?id=' + id,
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