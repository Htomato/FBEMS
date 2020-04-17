const app = getApp()
Page({
    data: {
        headRevList:[],
        //  topTips 页面初始数据
        show: false,
        success: '',
        topStatus: ''
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/headRev',
            success(res) {
                console.log(res)
                _this.setData({
                    headRevList: res.data
                })

            }
        })

    },
    changeRev: function (e) {
        console.log(e)
        let _this = this
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: "提醒",
            content: "是否通过年审？",
            cancelText: "否",
            confirmText: "通过",
            success(res) {
                console.log(res)
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/car/changeHeadRev?id=' + id,
                        success(res) {
                            console.log("服务器res",res)
                            if (res.data === 1) {
                                _this.setData({
                                    show: true,
                                    success: '审核通过',
                                    topStatus: 'success'
                                })
                                //刷新页面
                                _this.onLoad()
                            } else {
                                _this.setData({
                                    show: true,
                                    success: '操作失败',
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