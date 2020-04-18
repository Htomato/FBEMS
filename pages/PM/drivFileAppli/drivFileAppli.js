const app = getApp()
Page({
    data: {
        applyFileList: [],

    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/all',
            success(res) {
                console.log(res)
                _this.setData({
                    applyFileList: res.data
                })

            }
        })
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const licenseNumber = data.licenseNumber
        const driverName = data.driverName
        const  driverCompany = data.driverCompany
        wx.request({
            url: app.serverUrl + '/driver/selectorFileAppli?licenseNumber=' + licenseNumber
                +'&driverName=' + driverName +'&driverCompany=' + driverCompany,
            success(res) {
                _this.setData({
                    applyFileList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    }
})