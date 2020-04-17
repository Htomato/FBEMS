Page({
    data: {
        name: '',
        trmanGrades: [],
        trmanCompany: ''
    },
    onLoad: function (options) {
        const trmanGrades = JSON.parse(options.trmangradesStr)
        this.setData({
            name: options.name,
            trmanGrades: trmanGrades,
            trmanCompany: options.trmanCompany
        })
    }
});