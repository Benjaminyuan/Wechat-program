// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    const filter = db.command;
   return  db.collection('title').where({
        index:filter.in(event.starList)
    }).field({
        index:true,
        imgurl:true,
        title:true
    }).get({
        success: function (res) {
            console.log(res);
        },
        fail: console.error
    })
}