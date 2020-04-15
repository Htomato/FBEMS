const app = getApp()
Page({
    data: {
        head: '消防车辆牌照编配标准',
        content: '    号牌为白底黑字，配以红色汉字“应急”，其中：汽车号牌字符共8位，依次为省（自治区、直辖市）汉字简称、所属救援队伍代号、四位序号和汉字“应急”；摩托车号牌字符共7位，依次为汉字“应急”、省（自治区、直辖市）汉字简称、三位序号和所属救援队伍代号。',
        image: app.serverUrl + '/images/qua/standard.jpg'
    },
    onLoad: function (options) {

    }
});