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
})