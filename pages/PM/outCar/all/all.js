const app = getApp()
Page({
    data: {
        allList: [],

    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/outcar/all',
            success(res) {
                _this.setData({
                    allList: res.data
                })
            }
        })
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const outcarDriver = data.outcarDriver
        const outcarLicense = data.outcarLicense
        wx.request({
            url: app.serverUrl + '/outcar/selectorAll?outcarDriver=' + outcarDriver
                +'&outcarLicense=' + outcarLicense,
            success(res) {
                _this.setData({
                    allList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    },
    in:function () {
        wx.redirectTo({
            url: '/pages/PM/outCar/outCar',
        })
    }
});