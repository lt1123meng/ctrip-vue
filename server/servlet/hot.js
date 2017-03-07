/**
 * Created by LX on 2017/3/3.
 */
var dao = require('../dao')
module.exports = {
  add: function (req, res) {
    var reqBody = req.body;
    var sql = 'INSERT INTO `hot_sale` ( `ProductType`, `ProductName`, `OriginalPrice`, `SalesPrice`, `Discount`, `ImgUrl`) VALUES ("' + reqBody.type + '", "' + reqBody.name + '", ' + reqBody.originalPrice + ', ' + reqBody.salesPrice + ', ' + Math.floor(reqBody.salesPrice / reqBody.originalPrice) + ', "' + reqBody.image + '");'
    console.log('-----------------sql-------------------')
    console.log(sql)
    dao(sql,req,res,function(req,res,rows){
      if(rows.affectedRows==1){
        res.send({
          ServerCurrentTime:new Date().getTime(),
          data:{
            id:rows.insertId
          },
          responseStatus:{
            ack:'success',
            error:''
          }
        })
      }
    })
  },
  list: function (req, res) {
    var reqBody = req.body;
    var sql = 'select * from  `hot_sale`'
    console.log('-----------------sql-------------------')
    console.log(sql)
    dao(sql,req,res,function(req,res,rows){
      res.send({
        ServerCurrentTime:new Date().getTime(),
        data:{
          hotSaleList:rows
        },
        responseStatus:{
          ack:'success',
          error:''
        }
      })
    })
  }
}
