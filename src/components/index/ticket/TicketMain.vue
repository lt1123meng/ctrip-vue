<template>
  <div class="ticket_main">
    <span class="back"><span class="el-icon-arrow-left"></span></span>
    <img class="img" src="https://dimg04.c-ctrip.com/images/y30l0d0000006uois08A7.jpg" alt="">
    <el-row class="nav">
      <el-col :span="8"><span class="airport">机票</span></el-col>
      <el-col :span="8"><span class="active ticket">火车票</span></el-col>
      <el-col :span="8"><span class="bus">汽车票</span></el-col>
    </el-row>
    <div class="searchBox">
      <el-row class="address">
        <el-col :span="10" class="left" v-text="startStation"><input class="left" type="text" v-model="startStation"></el-col>
        <el-col :span="4"><img src="images/change.png" alt=""></el-col>
        <el-col :span="10" class="right" v-text="endStation"><input class="right" type="text" v-model="endStation"></el-col>
      </el-row>
      <el-row class="time">
        <el-col class="left" :span="12"><span class="chooseTime" v-text="chooseTime"></span></el-col>
        <el-col class="right" :span="12">
          <span class="chooseWeek" v-text="chooseWeek"></span>
          <span class="chooseWeek el-icon-arrow-right"></span>
        </el-col>
      </el-row>
      <el-row class="addition">
        <el-col class="left" :span="12"><span>学生票查询</span></el-col>
        <el-col class="right" :span="12"><span>只查高铁动车</span></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        startStation: '北京西',
        endStation: '正定机场',
        chooseTime: '3月30日',
        chooseWeek: '周四'
      }
    },
    created: function () {
      this.$http.get(this.$root.BaseURI + 'ticket/station').then((response) => {
        console.log(response)
      })
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ticket_main {
    background-color: #fff;
  }
  .ticket_main .back{
    display: inline-block;
    position: fixed;
    top: 12px;
    left: 12px;
    background-color: rgba(0,0,0,0.4);
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
  }
  .ticket_main .img {
    margin-top: -10px;
  }

  .ticket_main .nav {
    background-color: rgba(0, 0, 0, 0.3);
    margin-top: -40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    z-index: 1;
  }

  .ticket_main .nav span {
    font-size: 16px;
  }

  .ticket_main .nav span {
    color: #fff;
    display: inline-block;
    padding: 0 8px;
  }

  .ticket_main .nav span.active {
    position: relative;
    display: inline-block;
    color: inherit;
    text-decoration: none;
    margin: 0 -.3em;
  }

  .ticket_main .nav span.active::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #fff;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    transform: perspective(.5em) rotateX(1.1deg) scale(1.3);
    transform-origin: bottom;
  }

  .ticket_main .searchBox {
    padding: 8px 16px;
  }

  .ticket_main .searchBox .el-row {
    line-height: 45px;
    height: 45px;
  }

  .ticket_main .searchBox .el-row {
    line-height: 50px;
    height: 50px;
  }

  .ticket_main .searchBox .left {
    text-align: left;
  }

  .ticket_main .searchBox .right {
    text-align: right;
  }

  .ticket_main .searchBox .el-col {
    border-bottom: 0.5px solid #eee;
    height: 100%;
  }

  .ticket_main .searchBox .address {
    height: 45px;
    vertical-align: middle;
    font-size: 25px;
    font-weight: bold;
    font-family: '楷体';

  }

  .ticket_main .searchBox .el-col-4 img {
    width: 28px;
    vertical-align: middle;
  }

  .ticket_main .searchBox .el-col-4 {
    text-align: center;
    border-bottom: 0;
  }

  .ticket_main .searchBox .time .chooseTime {
    font-size: 20px;
    font-family: '楷体';
  }

  .ticket_main .searchBox .time .chooseWeek {
    font-size: 14px;
    color: #aaa;
  }

  .ticket_main .searchBox .addition el-col {
    border-bottom: 0;
  }

  .ticket_main .searchBox .time {

  }

  .ticket_main .searchBox .addition {

  }
</style>

