// pages/PM/trMan/trMan.js
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
    trmen:[]
  },

  details:function (e){
    // console.log("提交页面数据", e)
    const name = e.currentTarget.dataset.name
    const trmanCompany = e.currentTarget.dataset.trmancompany
    // 页面之间不可以传递JSON对象 利用json str 传输
    const trmangrades = e.currentTarget.dataset.trmangrades
    const trmangradesStr = JSON.stringify(trmangrades)

    wx.navigateTo({
      url:'/pages/PM/trMan/trManDetail/trManDetail?name=' + name
          + '&trmangradesStr=' + trmangradesStr + '&trmanCompany=' + trmanCompany,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    wx.request({
      url: app.serverUrl + '/trman/allTrman',
      success(res) {
        const trmenList = res.data
        // 转化数据库中的JSONStr --> JSONObj
        const trmenWrapperList = [];
        for(let i = 0; i < trmenList.length; i++){
          const trmen = trmenList[i];
          const trmanGradesStr = trmen.trmanGrades;
          let gradesArr = [];
          if(trmanGradesStr != null && trmanGradesStr != undefined && trmanGradesStr != ""){
            gradesArr = JSON.parse(trmanGradesStr);
          }
          const gradesWrapper = {
            trmanId: trmen.trmanId,
            trmanName: trmen.trmanName,
            trmanCompany: trmen.trmanCompany,
            trmanGrades: gradesArr

          };
          trmenWrapperList.push(gradesWrapper);
        }
        _this.setData({
          trmen: trmenWrapperList
        })

      }
    })

  },

  formSubmit: function (e) {
    let _this = this
    var data = e.detail.value
    const  name = data.name
    const number = data.number
    wx.request({
      url: app.serverUrl + '/trman/selector?number=' + number +'&name=' + name,
      success(res) {
        const trmenList = res.data
        // 转化数据库中的JSONStr --> JSONObj
        const trmenWrapperList = [];
        for(let i = 0; i < trmenList.length; i++){
          const trmen = trmenList[i];
          const trmanGradesStr = trmen.trmanGrades;
          let gradesArr = [];
          if(trmanGradesStr != null && trmanGradesStr != undefined && trmanGradesStr != ""){
            gradesArr = JSON.parse(trmanGradesStr);
          }
          const gradesWrapper = {
            trmanId: trmen.trmanId,
            trmanName: trmen.trmanName,
            trmanCompany: trmen.trmanCompany,
            trmanGrades: gradesArr

          };
          trmenWrapperList.push(gradesWrapper);
        }
        _this.setData({
          trmen: trmenWrapperList
        })

      }
    })


  },
  formReset: function () {
    this.onLoad()
  },
  add: function () {
    wx.redirectTo({
      url: '/pages/PM/trMan/add/add',
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
            url: app.serverUrl + '/trman/delete?id=' + id,
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