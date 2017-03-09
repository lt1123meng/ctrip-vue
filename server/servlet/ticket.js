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
    if (!req.query.start || !req.query.end) {
      res.send({
        ServerCurrentTime: new Date().getTime(),
        data: {},
        responseStatus: {
          ack: 'fail',
          error: 'no parameter'
        }
      })
      return;
    }
    var sql = 'SELECT * FROM' +
      '(' +
      'SELECT con_table.name,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.station END )as startStation,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.num END)as startNum,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.money END)as startMoney,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.arrive_time END)as startArriveTime,' +
      'MAX(CASE  station WHEN "' + req.query.start + '" THEN con_table.depart_time END)as startDepartTime,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.station END)as endStation,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.num END)as endNum,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.money END)as endMoney,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.arrive_time END)as endArriveTime,' +
      'MAX(CASE  station WHEN "' + req.query.end + '" THEN con_table.depart_time END)as endDepartTime' +
      ' from (' +
      'SELECT * FROM `train_detail` WHERE station = "' + req.query.start + '" or station = "' + req.query.end + '"' +
      ') AS con_table ' +
      'GROUP BY con_table.name' +
      ') AS change_table ' +
      'WHERE change_table.startNum < change_table.endNum'
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
  },
  detail: function (req, res) {
    var sql = 'select name,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.start + '" THEN daseTable.station END )as startStation,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.start + '" THEN daseTable.money END )as startMoney,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.start + '" THEN daseTable.depart_time END )as departTime,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.end + '" THEN daseTable.station END )as endStation,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.end + '" THEN daseTable.money END )as sendMoney,' +
      'MAX(CASE  daseTable.station WHEN "' + req.query.end + '" THEN daseTable.arrive_time END )as arriveTime ' +
      'from(' +
      'select * from train_detail WHERE (train_detail.station="' + req.query.start + '" or train_detail.station="' + req.query.end + '") and train_detail.name="' + req.query.name + '") as daseTable'
    dao(sql, req, res, function (req, res, rows) {
      res.send({
        ServerCurrentTime: new Date().getTime(),
        data: {
          detail: rows[0]
        },
        responseStatus: {
          ack: 'success',
          error: ''
        }
      })
    })
  },
  detailStation: function (req, res) {
    var sql = 'SELECT * FROM train_detail WHERE name="' + req.query.name + '" ORDER BY num';
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
  }
}
