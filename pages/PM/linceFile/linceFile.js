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

    }
});