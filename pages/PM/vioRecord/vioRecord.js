const app = getApp()
Page({
    data: {
        vioRecordDrivers: [],
        licenseType:'',
        //licenseTypeRadio
        licenseTypeRadio: [
            {name: 'B1',value: 'B1'},
            {name: 'B2',value: 'B2'},
            {name: 'C1',value: 'C1'},
            {name: 'C2',value: 'C2'}
        ],
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
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const  driverName = data.driverName
        const  licenseType = _this.data.licenseType
        const driverCompany = data.driverCompany
        wx.request({
            url: app.serverUrl + '/driver/selectorVio?driverName=' + driverName
                +'&licenseType=' + licenseType +'&driverCompany=' + driverCompany,
            success(res) {
                _this.setData({
                    vioRecordDrivers: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
        this.setData({
            licenseType:''
        })
    },
    licenseTypeRadio: function (e) {
        this.setData({
            licenseType:e.detail.value
        })
    },
});