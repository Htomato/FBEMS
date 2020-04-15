const app = getApp()
Page({
    data: {
        drivList: []
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/normal',
            success(res) {
                console.log(res)
                _this.setData({
                    drivList: res.data
                })

            }
        })
    },
    details: function (e) {
        const id = e.currentTarget.dataset.id
        wx.navigateTo({
            url:'/pages/PM/drivRev/detail/detail?id=' +id,
        })

    }
});