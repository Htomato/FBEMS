const app = getApp()
Page({
    data: {
        fireCarList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/allAdminCar',
            success(res) {
                console.log(res)
                _this.setData({
                    fireCarList: res.data
                })
            }
        })
    },
    addXingZhengCar: function () {
        wx.navigateTo({
            url: '/pages/PM/xiaoFangCar/add/add'
        })
    }
});