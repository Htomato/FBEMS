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
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const  name = data.name
        const number = data.number
        wx.request({
            url: app.serverUrl + '/eqExpert/selector?number=' + number +'&name=' + name,
            success(res) {
                _this.setData({
                    eqExpertList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    }
});