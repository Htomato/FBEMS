const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
        //上传图片
        traorgQuaimg: '',
    //    培训机构类别
        trplantypeSelect:'',
        trplantypeRadio: [
            {name: '体能',value: '体能'},
            {name: '战术',value: '战术'},
            {name: '心理',value: '心理'},
            {name: '救援',value: '救援'}
        ]

    },
    trplantypeSelectRadio:function (e){
        this.setData({
            trplantypeSelect: e.detail.value
        })
    },
    formSubmit: function (e) {
        let _this = this
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const traorgName = data.traorgName
        const traorgHead = data.traorgHead
        const traorgHeadtele = data.traorgHeadtele
        const traorgType = _this.data.trplantypeSelect
        const traorgDetail = data.traorgDetail
        const traorgQuaimg = _this.data.traorgQuaimg
        if(traorgName === ''){
            wx.showToast({
                title: '名称不能为空',
                icon: 'none'
            })
        } else if (traorgHead === '') {
            wx.showToast({
                title: '负责人不能为空',
                icon: 'none'
            })
        }else if (traorgHeadtele === '') {
            wx.showToast({
                title: '联系方式不能为空',
                icon: 'none'
            })
        }else if (traorgType === '') {
            wx.showToast({
                title: '机构类别不能为空',
                icon: 'none'
            })
        }else if (traorgDetail === '') {
            wx.showToast({
                title: '机构详情不能为空',
                icon: 'none'
            })
        }else if (traorgQuaimg === '') {
            wx.showToast({
                title: '资质不能为空',
                icon: 'none'
            })
        }else{

            wx.request({
                url: app.serverUrl + '/traorg/add',
                data:{
                    data:{traorgName,traorgHead,traorgHeadtele,traorgType,traorgQuaimg,traorgDetail}
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
                                url:'/pages/PM/traOrgMain/traOrgMain'
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
                        const traorgQuaimg = res.data
                        _this.setData({
                            traorgQuaimg: traorgQuaimg
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