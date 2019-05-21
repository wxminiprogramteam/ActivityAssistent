// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "activity-assistant-1065dc"
})

const db = cloud.database();
const _ = db.command

// 云函数入口函数
/*
**参数
**id: 指定要修改的文章的id
**data：报名人的信息
**
*/
exports.main = async (event, context) => {
  console.log(event.id,event.data);
  return await db.collection('post').doc(event.id).update({
    data:{
      signup:_.push(event.data)
      }
  })
}