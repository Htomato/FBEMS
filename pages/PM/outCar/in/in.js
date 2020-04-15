
const app = getApp()
Page({
    data: {
        inList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/outcar/in',
            success(res) {
                _this.setData({
                    inList: res.data
                })
            }
        })
    }
})