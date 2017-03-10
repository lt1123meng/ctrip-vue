<template>
  <div class="ticket_time">
    <div class="header">
      <span @click="back" class="back el-icon-arrow-left"></span>
      <span v-text="name"></span><span>时刻表</span>
    </div>
    <div class="content">
      <el-row class="title">
        <el-col :span="8">车站名称</el-col>
        <el-col :span="5" class="_textCenter">到达</el-col>
        <el-col :span="5" class="_textCenter">出发</el-col>
        <el-col :span="6" class="_textRight">停留</el-col>
      </el-row>
      <el-row class="list" v-for="item in timeList">
        <el-col :span="8">
          <span class="tag"></span>
          <span v-text="item.station"></span>
        </el-col>
        <el-col :span="5" class="_textCenter">
          <span v-text="item.arrive_time"></span></el-col>
        <el-col :span="5" class="_textCenter">
          <span v-text="item.depart_time"></span></el-col>
        <el-col :span="6" class="_textRight">
          <span>{{item.arrive_time | minusTime(item.depart_time)}}</span></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        name: '',
        start: '',
        end: '',
        timeList: ''
      }
    },
    created: function () {
      this.name = this.$route.params.name
      this.start = this.$route.params.start
      this.end = this.$route.params.end
      this.getTrainTime()
    },
    methods: {
      getTrainTime () {
        this.$http.get(this.$root.BaseURI + 'ticket/detail/station', {
          params: {
            name: this.$route.params.name
          }
        }).then((response) => {
          response = response.data
          if (response.responseStatus.ack === 'success') {
            this.timeList = response.data.stationList
          }
        })
      },
      back () {
        this.$router.go(-1)
      }
    },
    filters: {
      minusTime (first, second) {
        first = first.split(':')
        second = second.split(':')
        if (parseInt(first[0]) > parseInt(second[0])) {
          second[0] = parseInt(second[0]) + 24
        }
        first = parseInt(first[0]) * 60 + parseInt(first[1])
        second = parseInt(second[0]) * 60 + parseInt(second[1])
        return (second - first) + '分钟'
      }
    }
  }
</script>
<style scope>
  .ticket_time {
    height: 100%;
    background-color: #fff;
  }

  .ticket_time .header {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    background-color: #3d98ff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 15px;
  }

  .ticket_time .header .back {
    position: absolute;
    top: 12px;
    left: 16px;
    font-size: 16px;
  }

  .ticket_time .content {
    padding: 40px 14px 12px 20px;
    background-color: #fff;
  }

  .ticket_time .content .el-row {
    line-height: 36px;
  }

  .ticket_time .content .tag {
    position: relative;
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 2px solid #71b4ff;
    background-color: #fff;
    border-radius: 100%;
    vertical-align: middle;
    left: -5px;
    top: -3px;
  }

  .ticket_time .content .list .el-col-8 {
    border-left: 1px solid #b1ddfd;
  }
</style>
