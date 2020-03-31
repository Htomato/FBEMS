// pages/PM/trMan/trMan.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
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