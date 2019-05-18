// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  var dbName = event.dbName; //集合名称
  var filter = event.filter ? event.filter : null; //筛选条件，默认为空 格式{_id:'xxx'}
  var pageIndex = event.pageIndex ? event.pageIndex : 0; //当前第几页，默认为第一页,从0开始计数
  var pageSize = event.pageSize ? event.pageSize : 5; //每页取多少条记录，默认5条
  var countResult = await db.collection(dbName).where(filter).count()//获取集合中的总记录数
  var total = countResult.total; //得到总记录数
  var totalPage = Math.ceil(total/10);//计算需要多少页
  var hasMore;//是否还有数据
  if(pageIndex > totalPage || pageIndex == totalPage){
    hasMore = false;
  }else{
    hasMore = true;
  }
  //查询数据并返回给前端
  return db.collection(dbName).where(filter).skip(pageIndex*pageSize).limit(pageSize).get().then(res => {
    res.hasMore = hasMore;
    return res;
  })
}