<template>
  <div class="date_picker">
    <div class="datepPickerBox" @click="goChooseDate">
      <div class="time"><span class="chooseTime" v-text="date.time"></span></el-col></div>
      <div class="week">
        <span class="chooseWeek" v-text="date.week"></span>
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
          <div class="day">
            <div class="item" :class="{_greyColor:!item.isChoose}" v-for="item in dayItem.day" v-text="item.text"></div>
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
        currentMoment: ''
      }
    },
    props: {
      date: {
        default: function () {
          return {
            time: moment().format('YY年MM月DD日'),
            week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][parseInt(moment().day())]
          }
        }
      },
      option: {
        default: function () {
          return {
            text: 'text',
            type: 'day'
          }
        }
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
        var year = this.currentMoment.year()
//      获取这个月的信息
        var month = ''
//      今天
        var dayIndex = ''
//        这个月的天数
        var monthDays = ''
//        本月的第一天是星期几
        var dayFirstWeek = ''
        var dayObj = []
        goNextMonth(this)
        function goNextMonth (thisVm) {
          year = thisVm.currentMoment.year()
//        获取这个月的信息
          month = thisVm.currentMoment.month() + 1
//        这个月的天数
          monthDays = thisVm.currentMoment.daysInMonth()
          if (first) {
            dayIndex = thisVm.currentMoment.date()
          }
//        本月的第一天是星期几
          dayFirstWeek = thisVm.currentMoment.date(1).day()
          console.log(dayIndex)
          dayObj = {
            year: year,
            month: month,
            day: []
          }
          for (let i = 0; i < dayFirstWeek; i++) {
            dayObj.day.push({
              text: '',
              isChoose: false
            })
          }
          for (let i = 0; i < monthDays; i++) {
            var isChoose = true
            if ((first && i < dayIndex - 1) || (!first && thisVm.buyDays < 0)) {
              isChoose = false
            }
            dayObj.day.push({
              text: i + 1,
              isChoose: isChoose,
              moment: thisVm.currentMoment.date(i + 1).format('YYYY-MM-DD')
            })
            if (isChoose) {
              thisVm.buyDays--
            }
          }
          daysList.push(dayObj)
          first = false
          if (thisVm.buyDays < 0) {
            thisVm.daysList = daysList
            console.log(thisVm.daysList)
          } else {
            thisVm.currentMoment.add(1, 'M')
            goNextMonth(thisVm)
          }
        }
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
    border-bottom: 0.5px solid #eeeeee;
  }

  .date_picker .datePickerOverlay .nav .weekNameBox .weekItem {
    display: inline-block;
    width: 14.28%;
    text-align: center;
    font-size: 12px;
  }

  .date_picker .datePickerOverlay .content {
    padding-top: 71px;
  }

  .date_picker .datePickerOverlay .content .day .item {
    display: inline-block;
    width: 14.28%;
    text-align: center;
  }
</style>
