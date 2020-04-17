const app = getApp()
Page({
    data: {
        licenseList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/allLicense',
            success(res) {
                console.log(res)
                _this.setData({
                    licenseList: res.data
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
            url: app.serverUrl + '/eqExpert/selector?number=' + number +'&name=' + name,
            success(res) {
                _this.setData({
                    eqExpertList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    }
});