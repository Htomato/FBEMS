const app = getApp()
Page({
    data: {
        //更换过车牌照的车辆列表
        changeList:[]
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/changeCarList',
            success(res) {
                console.log(res)
                _this.setData({
                    changeList: res.data
                })

            }
        })
    }
});