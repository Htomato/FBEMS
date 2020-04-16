const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
        eqexpertQuaimage: ''
    },
    formSubmit: function (e) {
        let _this = this
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const eqexpertName = data.eqexpertName
        const eqexpertCompany = data.eqexpertCompany
        const eqexpertQua = data.eqexpertQua
        const eqexpertDomain = data.eqexpertDomain
        const eqexpertDetail = data.eqexpertDetail
        const eqexpertQuaimage = _this.data.eqexpertQuaimage
        if(eqexpertName === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
        } else if (eqexpertQua === '') {
            wx.showToast({
                title: '职称不能为空',
                icon: 'none'
            })
        }else if (eqexpertCompany === '') {
            wx.showToast({
                title: '单位不能为空',
                icon: 'none'
            })
        }else if (eqexpertDomain === '') {
            wx.showToast({
                title: '领域不能为空',
                icon: 'none'
            })
        }else if (eqexpertDetail === '') {
            wx.showToast({
                title: '介绍不能为空',
                icon: 'none'
            })
        }
        else{

            wx.request({
                url: app.serverUrl + '/eqExpert/add',
                data:{
                    data:{eqexpertName,eqexpertCompany,eqexpertQua,eqexpertDomain,eqexpertDetail,eqexpertQuaimage}
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
                                url:'/pages/PM/eqExpert/eqExpert'
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
    /**
     * 上传证书
     */

    quaImgUpload: function () {
        let _this = this
        wx.chooseImage({
            count: 1,
            success(res) {
                console.log("res",res)
                const filepath = res.tempFilePaths

                wx.uploadFile({
                    url: app.serverUrl + '/eqExpert/upload',
                    filePath: filepath[0],
                    name: 'eqexpertQuaimage',
                    formData: {
                        description: 'eqexpertQuaimage'
                    },
                    success(res) {
                        console.log(res.data)
                        const eqexpertQuaimage = res.data
                        _this.setData({
                            eqexpertQuaimage: eqexpertQuaimage
                        })
                    },
                    fail(res) {
                        console.log("upload连接失败")
                    }
                })
            }
        })
    },
    onLoad: function (options) {

    }
});