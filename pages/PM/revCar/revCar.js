const app = getApp()
Page({
    data: {
        revCarList:[],
        //  topTips 页面初始数据
        show: false,
        success: '',
        topStatus: ''
    },
    onLoad: function (options) {
        let _this = this
        wx.request({
            url: app.serverUrl + '/car/revCar',
            success(res) {
                console.log(res)
                _this.setData({
                    revCarList: res.data
                })

            }
        })

    },
    changeCarRev: function (e) {
        console.log(e)
        let _this = this
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: "提醒",
            content: "是否通过车辆年审？",
            cancelText: "否",
            confirmText: "通过",
            success(res) {
                console.log(res)
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/car/changeRevCar?id=' + id,
                        success(res) {
                            console.log("服务器res",res)
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


    },
});