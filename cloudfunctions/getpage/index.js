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
        // index: filter.gt(50)
        index: event.index
    }).get({
        success: function (res) {
            console.log(res);
        },
        fail: console.error
    });
    // return new Promise((resolve,reject)=>{
    //     resolve(title_db.where({
    //         "index": filter.in(event.low, event.high)
    //     }).get({
    //         success: function (res) {
    //             console.log('初始化成功，数据传递'+ res);
    //         }
    //     }
    //     ))
    // }) 

}