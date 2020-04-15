
const app = getApp()
Page({
    data: {
        driver: {}
    },
    onLoad: function (options) {
        console.log(options)
        const id = options.id
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/detail?id=' +id,
            success(res) {
                console.log(res)
                _this.setData({
                    driver: res.data
                })
            }
        })
    }
});