const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',

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

    },
    formSubmit: function (e) {
        let _this = this
        console.log("formSubmit _this",_this)
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const driverName = data.driverName
        const driverAge = data.driverAge
        const driverCompany = data.driverCompany
        const licenseNumber = data.licenseNumber

        const licenseType = _this.data.licenseType
        if(driverName === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
        } else if (driverAge === '') {
            wx.showToast({
                title: '年龄不能为空',
                icon: 'none'
            })
        }else if (driverCompany === '') {
            wx.showToast({
                title: '单位不能为空',
                icon: 'none'
            })
        }else if (licenseType === '') {
            wx.showToast({
                title: '驾照类别不能为空',
                icon: 'none'
            })
        } else{
            wx.request({
                url: app.serverUrl + '/driver/add',
                data:{
                    data:{
                        driverName,
                        driverAge,
                        driverCompany,
                        licenseNumber,
                        licenseType
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
                        wx.redirectTo({
                                url:'/pages/PM/perInfo/perInfo'
                            }
                        )
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

        console.log('form发生了reset事件')
    },
    licenseTypeRadio: function (e) {
        this.setData({
            licenseType:e.detail.value
        })
    }
});