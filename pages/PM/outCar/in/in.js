
const app = getApp()
Page({
    data: {
        inList: [],
        //  topTips 页面初始数据
        show: false,
        success: '',
        topStatus: ''
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/outcar/in',
            success(res) {
                _this.setData({
                    inList: res.data
                })
            }
        })
    },
    formSubmit: function (e) {
        let _this = this
        var data = e.detail.value
        const outcarDriver = data.outcarDriver
        const outcarLicense = data.outcarLicense
        wx.request({
            url: app.serverUrl + '/outcar/selector?outcarDriver=' + outcarDriver
                +'&outcarLicense=' + outcarLicense,
            success(res) {
                _this.setData({
                    inList: res.data
                })

            }
        })


    },
    formReset: function () {
        this.onLoad()
    },
    out:function (e) {
        let _this = this
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: "提醒",
            content: "外来车辆是否放行？",
            cancelText: "否",
            confirmText: "是",
            success(res) {
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/outcar/out?id=' + id,
                        success(res) {
                            console.log("服务器res",res)
                            if (res.data === 1) {
                                _this.setData({
                                    show: true,
                                    success: '成功',
                                    topStatus: 'success'
                                })
                                //刷新页面
                                _this.onLoad()
                            } else {
                                _this.setData({
                                    show: true,
                                    success: '失败',
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
})