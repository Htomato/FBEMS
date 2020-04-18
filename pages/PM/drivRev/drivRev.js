const app = getApp()
Page({
    data: {
        drivList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/normal',
            success(res) {
                console.log(res)
                _this.setData({
                    drivList: res.data
                })

            }
        })
    },
    details: function (e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url:'/pages/PM/drivRev/detail/detail?id=' +id,
        })

    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const driverName = data.driverName
        const driverCompany = data.driverCompany
        wx.request({
            url: app.serverUrl + '/driver/selectorReview?driverName=' + driverName +'&driverCompany=' + driverCompany,
            success(res) {
                _this.setData({
                    drivList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    }
});