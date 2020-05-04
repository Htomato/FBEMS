const app = getApp()
Page({
    data: {
        AdminCarList: [],
        //  topTips 页面初始数据
        show: false,
        success: '',
        topStatus: ''
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/allAdminCar',
            success(res) {
                console.log(res)
                _this.setData({
                    AdminCarList: res.data
                })
            }
        })
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const  carLicenseplate = data.carLicenseplate
        const headName = data.headName
        wx.request({
            url: app.serverUrl + '/car/selectorAdmin?carLicenseplate=' + carLicenseplate +'&headName=' + headName,
            success(res) {
                _this.setData({
                    AdminCarList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    },
    addXingZhengCar: function () {
        wx.navigateTo({
            url: '/pages/PM/xiaoFangCar/add/add'
        })
    },
    changeLicense: function (e) {
        let _this = this
        const id = e.currentTarget.dataset.id
        const licensePlat = e.currentTarget.dataset.license
        if (licensePlat === null){
            wx.showModal({
                title: "提示",
                content: '车辆尚未上牌',
                showCancel: false
            })
        }else {
            wx.showModal({
                title: "提醒",
                content: "是否更改车牌？",
                cancelText: "否",
                confirmText: "是",
                success(res) {
                    console.log(res)
                    if (res.confirm) {
                        wx.request({
                            url: app.serverUrl + '/car/changeLicense',
                            success(res) {
                                console.log("服务器res", res)
                                if (res.data === 1) {
                                    _this.setData({
                                        show: true,
                                        success: '修改通过',
                                        topStatus: 'success'
                                    })
                                    //刷新页面
                                    _this.onLoad()
                                } else {
                                    _this.setData({
                                        show: true,
                                        success: '修改失败',
                                        topStatus: 'error'
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        console.log("用户点击了取消")
                    }
                }

            })
        }

    }
});