// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context) => {

    console.log(event);
    console.log('调用函数');
    const db = cloud.database();
    const filter = db.command;
    return db.collection('title').where({
         index: filter.eq(parseInt(event.index))
       
    }).get({
        success: function (res) {
            console.log(res);
        },
        fail: console.error
    });
}