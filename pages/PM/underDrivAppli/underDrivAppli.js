const app = getApp()
Page({
    data: {
        underList: [],
        licenseType:'',
        //licenseTypeRadio
        licenseTypeRadio: [
            {name: 'B1',value: 'B1'},
            {name: 'B2',value: 'B2'},
            {name: 'C1',value: 'C1'},
            {name: 'C2',value: 'C2'}
        ]
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/driver/under',
            success(res) {
                _this.setData({
                    underList: res.data
                })

            }
        })

    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const driverCompany = data.driverCompany
        const licenseType = _this.data.licenseType
        wx.request({
            url: app.serverUrl + '/driver/selectorUnder?licenseType=' + licenseType +'&driverCompany=' + driverCompany,
            success(res) {
                _this.setData({
                    underList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    },
    licenseTypeRadio: function (e) {
        this.setData({
            licenseType:e.detail.value
        })
    }
});