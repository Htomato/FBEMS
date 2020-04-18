const app = getApp()
Page({
    data: {
        underList: [],
        //carCategoryRadio
        carCategory:'',
        carCategoryRadio: [
            {name:'消防车',value:'消防车辆'},
            {name:'行政车',value:'行政车辆'}
        ]
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/under',
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
        const  carCompany = data.carCompany
        const carCategory = _this.data.carCategory
        wx.request({
            url: app.serverUrl + '/car/selectorUnder?carCategory=' + carCategory +'&carCompany=' + carCompany,
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
    carCategoryRadio: function (e) {
        this.setData({
            carCategory:e.detail.value
        })
    }
});