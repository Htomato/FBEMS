const app = getApp()
Page({
    data: {
        perInfoList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/all',
            success(res) {
                console.log(res)
                _this.setData({
                    perInfoList: res.data
                })

            }
        })
    }
})