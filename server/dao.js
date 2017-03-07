/**
 * Created by LX on 2017/3/3.
 */
var mysql=require('mysql');
var connection=mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'ctrip'
})
connection.connect(function(err){
  if(err){
    console.log('连接mysql错误')
    console.log(err)
  }else{
    console.log('连接mysql成功')
  }
})
var SQLConnect=function(sql,req,res,callback){
  console.log('******sql******')
  console.log(sql)
  connection.query(sql,function(err,rows){
    if (err) throw err;
    console.log('******返回数据******')
    console.log(rows);
    callback(req,res,rows)
  })
}
module.exports=SQLConnect
 