/**
 * Created by LX on 2017/3/3.
 */
var dao = require('../dao')
module.exports = {
  station: function (req, res) {
    var sql = 'select * from station where name like "%' + req.query.like + '%"';
    dao(sql, req, res, function (req, res, rows) {
      res.send({
        ServerCurrentTime: new Date().getTime(),
        data: {
          stationList: rows
        },
        responseStatus: {
          ack: 'success',
          error: ''
        }
      })
    })
  },
  find: function (req, res) {
    var sql = 'SELECT * FROM' +
      '(' +
      'SELECT con_table.name,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.station END )as startStation,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.num END)as startNum,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.money END)startMoney,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.station END)as stopStation,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.num END)as stopNum,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.money END)as stopMoney' +
      ' from (' +
      'SELECT * FROM `train_detail` WHERE station = "' + req.query.start + '" or station = "' + req.query.end + '"' +
      ') AS con_table ' +
      'GROUP BY con_table.name' +
      ') AS change_table ' +
      'WHERE change_table.startNum < change_table.stopNum'
    dao(sql, req, res, function (req, res, rows) {
      res.send({
        ServerCurrentTime: new Date().getTime(),
        data: {
          trainList: rows
        },
        responseStatus: {
          ack: 'success',
          error: ''
        }
      })
    })
  }
}
