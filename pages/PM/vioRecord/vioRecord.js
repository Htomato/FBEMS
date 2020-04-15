const app = getApp()
Page({
    data: {
        vioRecordDrivers: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/vioRecord',
            success(res) {
                console.log(res)
                _this.setData({
                    vioRecordDrivers: res.data
                })
            }
        })
    }
});