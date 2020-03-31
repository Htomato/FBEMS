Page({
    data: {
        name: '',
        trmanGrades: [],
        trmanCompany: ''
    },
    onLoad: function (options) {
        console.log(options)
        const trmanGrades = JSON.parse(options.trmangradesStr)
        console.log("trmanGrades",trmanGrades)
        this.setData({
            name: options.name,
            trmanGrades: trmanGrades,
            trmanCompany: options.trmanCompany
        })
    }
});