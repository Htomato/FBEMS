const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
        //trplantypeRadio
        trplantypeRadio: [
            {name: '体能',value: '体能'},
            {name: '战术',value: '战术'},
            {name: '心理',value: '心理'},
            {name: '救援',value: '救援'}
        ],
    //    选择的值
        trplantype:''

    },
    formSubmit: function (e) {
        let _this = this
        console.log("formSubmit _this",_this)
        const data = e.detail.value;
        // console.log('form发生了submit事件，携带数据为：', data,"数据类型",dataType)
        const trorg = data.trorg
        const trplancontent = data.trplancontent
        const trplangoal = data.trplangoal
        const trplantype = _this.data.trplantype
        if(trorg === ''){
            wx.showToast({
                title: '机构名称不能为空',
                icon: 'none'
            })
        } else if (trplantype === '') {
            wx.showToast({
                title: '培训类别不能为空',
                icon: 'none'
            })
        }else if (trplangoal === '') {
            wx.showToast({
                title: '培训目的不能为空',
                icon: 'none'
            })
        }else if (trplancontent === '') {
            wx.showToast({
                title: '方案不能为空',
                icon: 'none'
            })
        }else{
            wx.request({
                url: app.serverUrl + '/trplan/add',
                data:{
                    data:{
                        trorg,
                        trplancontent,
                        trplantype,
                        trplangoal
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
                                url:'/pages/PM/trainingPlan/trainingPlan'
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
    onLoad: function (options) {


    },
    trplantypeRadio: function (e) {
        this.setData({
            trplantype: e.detail.value
        })
    }
});