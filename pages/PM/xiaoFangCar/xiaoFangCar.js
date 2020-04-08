const app = getApp()
Page({
    data: {
        fireCarList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/allFireCar',
            success(res) {
                console.log(res)
                _this.setData({
                    fireCarList: res.data
                })
            }
        })

    },
    addXiaoFangCar: function () {
       wx.navigateTo({
           url: '/pages/PM/xiaoFangCar/add/add'
       })
    }
});