const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
        //选项卡
        carCategory:'',
        carSource: '',
        //carSourceRadio
        carSourceRadio: [
            {name: '购买',value: '购买'},
            {name: '调拨',value: '调拨'},
            {name: '捐赠',value: '捐赠'},
            {name: '其他',value: '其他'}
        ],
        //carCategoryRadio
        carCategoryRadio: [
            {name:'消防车',value:'消防车辆'},
            {name:'行政车',value:'行政车辆'}
        ]
    },
    onLoad: function (options) {

    },
    formSubmit: function (e) {
        let _this = this
        console.log("formSubmit _this",_this)
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const headName = data.headName
        const headTele = data.headTele
        const headCompany = data.headCompany
        const headCard = data.headCard
        const carCompany = data.carCompany
        const carBrand = data.carBrand
        const carModel = data.carModel
        const carCategory = _this.data.carCategory
        const carSource = _this.data.carSource
        if(headName === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
        } else if (headTele === '') {
            wx.showToast({
                title: '电话不能为空',
                icon: 'none'
            })
        }else if (headCompany === '') {
            wx.showToast({
                title: '单位不能为空',
                icon: 'none'
            })
        }else if (headCard === '') {
            wx.showToast({
                title: '驾驶证号不能为空',
                icon: 'none'
            })
        }else if (carCompany === '') {
            wx.showToast({
                title: '车辆单位不能为空',
                icon: 'none'
            })
        }else if (carBrand === '') {
            wx.showToast({
                title: '车辆品牌不能为空',
                icon: 'none'
            })
        }else if (carModel === '') {
            wx.showToast({
                title: '车辆型号不能为空',
                icon: 'none'
            })
        }else if (carCategory === '') {
            wx.showToast({
                title: '车辆类别不能为空',
                icon: 'none'
            })
        }
        else if (carSource === '') {
            wx.showToast({
                title: '车辆来源不能为空',
                icon: 'none'
            })
        }else{
            wx.request({
                url: app.serverUrl + '/car/add',
                data:{
                    data:{
                        headName,
                        headTele,
                        headCompany,
                        headCard,
                        carCompany,
                        carBrand,
                        carModel,
                        carCategory,
                        carSource
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
                        wx.navigateTo({
                                url:'/pages/PM/xiaoFangCar/xiaoFangCar'
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
    carSourceRadio: function (e) {
        console.log("车辆来源数据",e.detail.value)
        this.setData({
            carSource: e.detail.value
        })
    },
    carCategoryRadio: function (e) {
        console.log("车辆类别数据",e.detail.value)
        this.setData({
            carCategory:e.detail.value
        })
    }
});