const app = getApp()
Page({
    data: {
        //topTips data
        show: false,
        success:'',
        topStatus:'',
    },
    formSubmit: function (e) {
        let _this = this
        console.log("formSubmit _this",_this)
        const data = e.detail.value;
        const trmanName = data.trmanName
        const trmanCompany = data.trmanCompany
        const grades1 = data.grades1
        const grades2 = data.grades2
        const grades3 = data.grades3
        const grades4 = data.grades4
        const trmanGrades = [{"type": "体能", "grade": grades1}, {"type": "战术", "grade": grades2}, {"type": "心理", "grade": grades3}, {"type": "救援", "grade": grades4}]
        if(trmanName === ''){
            wx.showToast({
                title: '姓名不能为空',
                icon: 'none'
            })
        } else if (trmanCompany === '') {
            wx.showToast({
                title: '单位不能为空',
                icon: 'none'
            })
        }else if (grades1 === '' || grades2 == '' ) {
            wx.showToast({
                title: '体能战术成绩不能为空',
                icon: 'none'
            })
        }else{
            wx.request({
                url: app.serverUrl + '/trman/add',
                data:{
                    data:{trmanName,trmanCompany,trmanGrades}
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
                                url:'/pages/PM/trMan/trMan'
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

    }
});