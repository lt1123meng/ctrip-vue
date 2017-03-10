/**
 * Created by LX on 2017/3/3.
 */
var hot=require('../servlet/hot')
var ticket=require('../servlet/ticket')
module.exports= {
  server: function (app) {
    app.all('/server/*',function(req,res,next){
      console.log('server');
      next()
    })
    app.get('/server/login',function(req,res){
      res.send({
        status:'yes'
      })
      console.log('server/login')
    })
    // 热卖
    app.post('/server/hot/add',function(req,res){
      hot.add(req,res)
    })
    app.get('/server/hot/list',function(req,res){
      hot.list(req,res)
    })
    // 火车票
    app.get('/server/ticket/station',function(req,res){
      ticket.station(req,res)
    })
    app.get('/server/ticket/find',function(req,res){
      ticket.find(req,res)
    })
    app.get('/server/ticket/detail',function(req,res){
      ticket.detail(req,res)
    })
    app.get('/server/ticket/detail/station',function(req,res){
      ticket.detailStation(req,res)
    })
  }
}

