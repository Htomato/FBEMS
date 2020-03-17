// pages/service/service.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    menuItems: [],

    curNav: 1,

    curIndex: 0
  },
  search: function (value) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{ text: '搜索结果', value: 1 }, { text: '搜索结果2', value: 2 }])
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
  },
  switchRightTab: function (e) {

    // 获取item项的id，和数组的下标值  

    let id = e.target.dataset.id,

      index = parseInt(e.target.dataset.index);

    // 把点击到的某一项，设为当前index  

    this.setData({

      curNav: id,

      curIndex: index

    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      search: this.search.bind(this)
    })
    wx:wx.request({
      url: 'http://localhost:8080/menu/allMenu',
      
      success: function(res) {
        var menuList = res.data
        console.log(menuList)

        var menuWapperList = [];
        for(var i = 0; i < menuList.length;i++){
          var menu = menuList[i];
          var groupsStr = menu.groups;
          var groupsArr = [];
          if(groupsStr != null && groupsStr != undefined && groupsStr != ""){
            groupsArr = JSON.parse(groupsStr);
          }
          // console.log(groupsArr);
          var menuWapper = {
            menuId : menu.menuId,
            menuName : menu.menuName,
            groups: groupsArr
          }
          menuWapperList.push(menuWapper);
          console.log(menuWapperList);
          }
          that.setData({
            menuItems:menuWapperList
          })
      },
     
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