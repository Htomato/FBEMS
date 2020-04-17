const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
        //trplantypeRadio
        workerJobRadio: [
            {name: '装备技师',value: '装备技师'},
            {name: '质检员',value: '质检员'}
        ],
    //    选择的值
        workerJob:''

    },
    formSubmit: function (e) {
        let _this = this
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const workerName = data.workerName
        const workerCompany = data.workerCompany
        const workerYear = data.workerYear
        const workerDetail = data.workerDetail
        const workerJob = _this.data.workerJob
        if(workerName === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
        } else if (workerCompany === '') {
            wx.showToast({
                title: '单位不能为空',
                icon: 'none'
            })
        }else if (workerJob === '') {
            wx.showToast({
                title: '工作不能为空',
                icon: 'none'
            })
        }else if (workerYear === '' || workerYear < 0) {
            wx.showToast({
                title: '工龄输入错误',
                icon: 'none'
            })
        }else if (workerDetail === '') {
            wx.showToast({
                title: '简介不能为空',
                icon: 'none'
            })
        }else{
            wx.request({
                url: app.serverUrl + '/worker/add',
                data:{
                    data:{
                        workerName,
                        workerCompany,
                        workerJob,
                        workerYear,
                        workerDetail
                    }
                },

                success(res){
                    console.log("服务器返回值：",res)
                    if (res.data === 1){
                        _this.setData({
                            show: true,
                            success: '添加成功',
                            topStatus: 'success'
                        })
                        if (workerJob === '装备技师'){
                            wx.redirectTo({
                                    url:'/pages/PM/eqTech/eqTech'
                                }
                            )
                        }else {
                            wx.redirectTo({
                                    url:'/pages/PM/inspectors/inspectors'
                                }
                            )
                        }
                    }else{
                        _this.setData({
                            show: true,
                            success: '添加失败',
                            topStatus: 'error'
                        })
                    }

                }
            })
        }



    },
    formReset: function () {

    },
    onLoad: function (options) {


    },
    jobRadioChange: function (e) {
        this.setData({
            workerJob: e.detail.value
        })
    }
});