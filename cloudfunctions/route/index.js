// 云函数入口文件
wx.cloud.init()
const cloud = require('wx-server-sdk');
const express= require('express');
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
   
}