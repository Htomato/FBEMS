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
    }
})