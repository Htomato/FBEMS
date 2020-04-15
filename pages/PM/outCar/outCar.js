
const app = getApp()
Page({
    data: {},
    onLoad: function (options) {

    },
    formSubmit: function (e) {
        let _this = this
        console.log("formSubmit _this",_this)
        const data = e.detail.value;
        //车型
        const outcarModel = data.outcarModel
        //备注
        const outcarRemarks = data.outcarRemarks
        //驾驶员
        const outcarDriver = data.outcarDriver
        //车牌号
        const outcarLicense = data.outcarLicense
        if(outcarModel === ''){
            wx.showToast({
                title: '车型不能为空',
                icon: 'none'
            })
        } else if (outcarDriver === '') {
            wx.showToast({
                title: '驾驶员姓名不能为空',
                icon: 'none'
            })
        }else if (outcarLicense === '') {
            wx.showToast({
                title: '车牌不能为空',
                icon: 'none'
            })
        }else{
            // console.log("即将发送的：  ---",data)

            wx.request({
                url: app.serverUrl + '/outcar/add',
                data:{
                    data:{outcarModel,outcarRemarks,outcarDriver,outcarLicense}
                },

                success(res){
                    console.log("服务器返回值：",res)
                    if (res.data === 1){
                        _this.setData({
                            show: true,
                            success: '添加成功',
                            topStatus: 'success'
                        })
                        wx.navigateTo({
                                url:'/pages/PM/outCar/in/in'
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
    }
});