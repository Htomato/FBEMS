const app = getApp()
Page({
    data: {
        traorg:{}
    },
    onLoad: function (options) {
        let _this = this
        const id = options.id
        wx.request({
            url: app.serverUrl + '/traorg/one?id='+id,
            success(res) {
                console.log(res.data)
                _this.setData({
                    traorg: res.data
                })
            }
        })
    }
});