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
        console.log(data)
        const carLicenseplateold = data.carLicenseplateold
        const carLicenseplate = data.carLicenseplate
        const headName = data.headName
        wx.request({
            url: app.serverUrl + '/car/selectorChFile?carLicenseplateold=' + carLicenseplateold +'&carLicenseplate=' + carLicenseplate +'&headName=' + headName,
            success(res) {
                console.log(res)
                _this.setData({
                    changeList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    }
});