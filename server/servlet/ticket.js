/**
 * Created by LX on 2017/3/3.
 */
var dao = require('../dao')
module.exports = {
  station:function(req,res){
    var sql='select * from station';
    dao(sql,req,res,function(req,res,rows){
      res.send({
        ServerCurrentTime:new Date().getTime(),
        data:{
          stationList:rows
        },
        responseStatus:{
          ack:'success',
          error:''
        }
      })
    })
  }
}
