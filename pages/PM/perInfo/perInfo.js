const app = getApp()
Page({
    data: {
        perInfoList: [],
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
            url: app.serverUrl + '/driver/all',
            success(res) {
                console.log(res)
                _this.setData({
                    perInfoList: res.data
                })

            }
        })
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const driverName = data.driverName
        const licenseType = _this.data.licenseType
        console.log(licenseType)
        const driverCompany = data.driverCompany
        wx.request({
            url: app.serverUrl + '/driver/selectorPerson?driverName=' + driverName
                +'&licenseType=' + licenseType +'&driverCompany=' + driverCompany,
            success(res) {
                _this.setData({
                    perInfoList: res.data
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
    addPerson: function () {
        wx.redirectTo({
            url: '/pages/PM/perInfo/add/add'
        })
    }

})