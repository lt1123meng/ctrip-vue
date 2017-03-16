<template>
  <div class="date_picker">
    <div class="datepPickerBox" @click="goChooseDate">
      <div class="time"><span class="chooseTime" v-text="option.time"></span></el-col></div>
      <div class="week">
        <span class="chooseWeek" v-text="option.week"></span>
        <span class="chooseWeek el-icon-arrow-right"></span>
      </div>
    </div>
    <div class="datePickerOverlay" v-if="showChoose">
      <div class="header">
        <header>
          <span @click="back" class="back el-icon-arrow-left"></span>
          选择日期
        </header>
        <div class="nav">
          <div class="weekNameBox">
            <div class="weekItem" v-for="item in weekName" v-text="item">
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="box" v-for="dayItem in daysList">
          <div class="title">
            <span v-text="dayItem.year"></span>年
            <span v-text="dayItem.month"></span>月
          </div>
          <div class="day">
            <div class="item" :class="{_greyColor:!item.isChoose,chooseThis:item.chooseThis}"
                 v-for="item in dayItem.day"
                 @click="chooseDate(item.moment,item.isChoose)">
              <span v-text="item.text"></span>
              <span v-if="item.chooseThis" class="start">出发</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default{
    data: function () {
      return {
        showChoose: false,
        weekName: ['日', '一', '二', '三', '四', '五', '六'],
        daysList: [],
        buyDays: 60,
        currentMoment: '',
        sFtv: {
          '0101': '元旦',
          '0214': '情人节',
          '0308': '妇女节',
          '0312': '植树节',
          '0401': '愚人节',
          '0501': '劳动节',
          '0504': '青年节',
          '0512': '护士节',
          '0601': '儿童节',
          '0701': '建党节',
          '0801': '建军节',
          '0910': '教师节',
          '1001': '国庆节',
          '1006': '老人节',
          '1024': '联合国日',
          '1224': '平安夜',
          '1225': '圣诞节'
        },
        lFtv: {
          '0101': '春节',
          '0115': '元宵节',
          '0505': '端午节',
          '0707': '七夕情人节',
          '0715': '中元节',
          '0815': '中秋节',
          '0909': '重阳节',
          '1208': '腊八节',
          '1224': '小年'
        }
      }
    },
    props: {
      option: {
        type: Object,
        default: function () {
          return {
            format: 'YY-MM-DD',
            time: moment().format('YY年MM月DD日'),
            week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][parseInt(moment().day())]
          }
        }
      }
    },
    created: function () {
      if (!this.option.time) {
        this.option.time = moment().format(this.option.format)
        this.option.week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][parseInt(moment().day())]
      }
    },
    methods: {
      goChooseDate: function () {
        this.prepareDays()
        this.showChoose = true
      },
      back: function () {
        this.showChoose = false
      },
      prepareDays: function () {
        this.currentMoment = moment()
        var first = true
        var daysList = []

//        年信息
        var year = this.currentMoment.year()
//      获取这个月的信息，今天，这个月的天数，本月的第一天是星期几
        var month, dayIndex, monthDays, dayFirstWeek
        var dayObj = []

        var selectTime = moment(this.option.time, this.option.format)
        var Syear = selectTime.year()
        var Smonth = selectTime.month() + 1
        var SdayIndex = selectTime.date()
        var getDouble = function (val) {
          if (val.length === 1) {
            return '0' + val
          } else {
            return val
          }
        }
        var goNextMonth = function (thisVm) {
          year = thisVm.currentMoment.year()
          month = thisVm.currentMoment.month() + 1
          monthDays = thisVm.currentMoment.daysInMonth()
          if (first) {
            dayIndex = thisVm.currentMoment.date()
          }
          dayFirstWeek = thisVm.currentMoment.date(1).day()
          dayObj = {
            year: year,
            month: month,
            day: []
          }
          for (let i = 0; i < dayFirstWeek; i++) {
            dayObj.day.push({
              text: '',
              isChoose: false,
              chooseThis: false
            })
          }
          for (let i = 0; i < monthDays; i++) {
            var isChoose = true
            var chooseThis = false
            var holiday = ''
            if ((first && i < dayIndex - 1) || (!first && thisVm.buyDays < 0)) {
              isChoose = false
            }
            if (Syear === year && Smonth === month && SdayIndex === i + 1) {
              chooseThis = true
            }
            if (thisVm.sFtv[getDouble(month + '') + getDouble(i + 1 + '')]) {
              holiday = thisVm.sFtv[getDouble(month + '') + getDouble(i + 1 + '')]
            }
            dayObj.day.push({
              text: !holiday ? i + 1 : holiday,
              isChoose: isChoose,
              moment: thisVm.currentMoment.date(i + 1).format(thisVm.option.format),
              chooseThis: chooseThis
            })
            if (isChoose) {
              thisVm.buyDays--
            }
          }
          daysList.push(dayObj)
          first = false
          if (thisVm.buyDays < 0) {
            thisVm.daysList = daysList
            thisVm.buyDays = 60
          } else {
            thisVm.currentMoment.add(1, 'M')
            goNextMonth(thisVm)
          }
        }
        goNextMonth(this)
      },
      chooseDate: function (dateTime, choose) {
        if (!choose) {
          return
        }
        this.option.time = dateTime
        this.option.week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][parseInt(moment(dateTime, this.option.format).day())]
        this.$emit('getdate', dateTime)
        this.showChoose = false
      }
    }
  }
</script>
<style scope>
  .date_picker .datepPickerBox .time, .date_picker .datepPickerBox .week {
    position: absolute;
    top: 0;
    height: 100%;
  }

  .date_picker .datepPickerBox .time {
    left: 0;
  }

  .date_picker .datepPickerBox .week {
    right: 0;
  }

  .date_picker .datePickerOverlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: scroll;
  }

  .date_picker .datePickerOverlay .header {
    position: fixed;
    z-index: 12;
    top: 0;
    left: 0;
    width: 100%;
  }

  .date_picker .datePickerOverlay .header header {
    line-height: 45px;
    background-color: #1c8de0;
    color: #fff;
    text-align: center;
    font-size: 16px;
  }

  .date_picker .datePickerOverlay .header .back {
    position: absolute;
    font-size: 22px;
    height: 45px;
    line-height: 45px;
    width: 45px;
    text-align: center;
    top: 0px;
    left: 6px;
  }

  .date_picker .datePickerOverlay .nav .weekNameBox {
    line-height: 24px;
    background-color: #f3f3f3;
  }

  .date_picker .datePickerOverlay .nav .weekNameBox .weekItem {
    display: inline-block;
    width: 14.28%;
    text-align: center;
    font-size: 12px;
  }

  .date_picker .datePickerOverlay .content {
    padding-top: 70px;
  }

  .date_picker .datePickerOverlay .content .box .title {
    text-align: center;
    border-top: 1px solid #f3f3f3;
  }

  .date_picker .datePickerOverlay .content .day .item {
    display: inline-block;
    width: 14.28%;
    text-align: center;
  }

  .date_picker .datePickerOverlay .content .day .item.chooseThis {
    background-color: #1c8de0;
    color: #fff;
    font-size: 22px;
  }

  .date_picker .datePickerOverlay .content .day .item.chooseThis .start {
    position: absolute;
    font-size: 12px;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
  }

</style>
