const app = getApp()
Page({
    data: {
        eqExpert:{}
    },
    onLoad: function (options) {
        let _this = this
        const id = options.id
        wx.request({
            url: app.serverUrl + '/eqExpert/one?id='+id,
            success(res) {
                _this.setData({
                    eqExpert: res.data
                })
            }
        })
    }
});