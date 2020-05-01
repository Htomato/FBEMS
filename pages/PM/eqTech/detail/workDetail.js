const app = getApp()
Page({
    data: {
        worker:{},
    //    按钮显示
        hidden: true
    },
    onLoad: function (options) {
        let _this = this
        const id = options.id
        wx.request({
            url: app.serverUrl + '/worker/one?id=' + id,
            success(res) {
                console.log(res.data)
                if (res.data.workerStatus !== 1){
                    _this.setData({
                        hidden: false
                    })
                }
                _this.setData({
                    worker: res.data
                })
            }
        })

    },
    no:function (e) {
        let _this = this
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: "提醒",
            content: "是否删除？",
            cancelText: "否",
            confirmText: "是",
            success(res) {
                console.log(res)
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/worker/delete?id=' + id,
                        success(res) {
                            if (res.data === 1) {
                                _this.setData({
                                    show: true,
                                    success: '删除成功',
                                    topStatus: 'success'
                                })
                            } else {
                                _this.setData({
                                    show: true,
                                    success: '删除失败',
                                    topStatus: 'error'
                                })
                            }
                            wx.redirectTo({
                                url:'/pages/PM/eqTech/eqTech'
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log("用户点击了取消")
                }
            }

        })

    },
    yes:function (e) {
        let _this = this
        const id = e.currentTarget.dataset.id
        console.log("id",id)
        wx.showModal({
            title: "提醒",
            content: "是否审核通过？",
            cancelText: "否",
            confirmText: "是",
            success(res) {
                console.log(res)
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/worker/changeStatus?id=' + id,
                        success(res) {
                            if (res.data === 1) {
                                _this.setData({
                                    show: true,
                                    success: '修改成功',
                                    topStatus: 'success'
                                })
                            } else {
                                _this.setData({
                                    show: true,
                                    success: '修改失败',
                                    topStatus: 'error'
                                })
                            }
                            wx.redirectTo({
                                url:'/pages/PM/eqTech/eqTech'
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log("用户点击了取消")
                }
            }

        })

    },
    changeStatus:function (e) {
        let _this = this
        const id = e.currentTarget.dataset.id
        wx.showModal({
            title: "提醒",
            content: "是否通过审核？",
            cancelText: "否",
            confirmText: "通过",
            success(res) {
                console.log(res)
                if (res.confirm) {
                    wx.request({
                        url: app.serverUrl + '/worker/changeStatus?id=' + id,
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
    }
});