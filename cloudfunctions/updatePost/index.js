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
**_id: 指定要修改的文章的_id
**type: 指定要修改的属性
**value: 指定修改后的值
*/
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  console.log(event._id,event.type,event.value);

  //修改云数据库中的数据
  try {
    switch (event.type){
      case "up":
        return await db.collection('post').doc(event._id).update({
          data: {
            upNum: event.value
          },
        })
        break;
      case "collection":
        return await db.collection('post').doc(event._id).update({
          data: {
            collectionNum: event.value
          },
        })
        break;
      case "comment":
        return await db.collection('post').doc(event._id).update({
          data: {
            commentNum: event.value
          },
        })
        break;
    }
   
  } catch (e) {
    console.error(e)
  }
  
}