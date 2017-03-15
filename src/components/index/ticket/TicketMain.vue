<template>
  <div class="ticket_main">
    <div v-show="!searchShoW" class="main">
      <span @click="backIndex" class="back"><span class="el-icon-arrow-left"></span></span>
      <img class="img" src="https://dimg04.c-ctrip.com/images/y30l0d0000006uois08A7.jpg" alt="">
      <el-row class="nav">
        <el-col :span="8"><span class="airport">机票</span></el-col>
        <el-col :span="8"><span class="active ticket">火车票</span></el-col>
        <el-col :span="8"><span class="bus">汽车票</span></el-col>
      </el-row>
      <div class="searchBox">
        <el-row class="address">
          <el-col :span="10" class="left">
            <div @click="chooseStation('start')" v-text="startStation"></div>
          </el-col>
          <el-col :span="4"><img @click="changeStation" src="images/change.png" alt=""></el-col>
          <el-col :span="10" class="right">
            <div @click="chooseStation('end')" v-text="endStation"></div>
          </el-col>
        </el-row>
        <el-row class="time">
          <el-col :span="24">
            <date-choose :option="dateOption" @getdate="getDate"></date-choose>
          </el-col>
        </el-row>
        <el-row class="addition">
          <el-col class="left" :span="12"><span>学生票查询</span></el-col>
          <el-col class="right" :span="12"><span>只查高铁动车</span></el-col>
        </el-row>
        <el-row>
          <el-col class="left" :span="24">
            <el-button type="warning" @click="search">查询</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div v-show="searchShoW" class="search_input">
      <div class="header" :style="focusStyle">
        <span v-show="focusShow" @click="backMian" class="el-icon-arrow-left"></span>
        <span v-show="!focusShow" @click="searchBlur" class="cancle">取消</span>
        <div class="inputBox">
          <span class="el-icon-search"></span>
          <input @focus="searchFocus" @blur="searchBlur" @input="textChange" type="text" v-model="searchText"
                 placeholder=" 输入中文/拼音/首字母">
        </div>
      </div>
      <div class="searchResult" v-show="!maskShow&&!focusShow">
        <div class="item" v-for="item in stationList" @mousedown="stationResult(item.name)">
          <span v-text="item.name"></span>
        </div>
      </div>
      <div class="mask" v-show="maskShow&&!focusShow"></div>
    </div>
  </div>
</template>
<script>
  import dateChoose from '../../npm/DatePicker.vue'
  export default{
    data () {
      return {
        target: '',
        searchShoW: false,
        startStation: '北京西',
        endStation: '正定机场',
        chooseTime: '3月30日',
        chooseWeek: '周四',
        maskShow: true,
        focusShow: true,
        focusStyle: {
          backgroundColor: '#3d98ff',
          color: '#fff',
          padding: '6px 6px 6px 40px',
          height: '45px'
        },
        searchText: '',
        stationList: [],
        date: '',
        dateOption: {
          format: 'YY年MM月DD日',
          time: this.date
        }
      }
    },
    created: function () {
      if (this.$root.StartStation !== '') {
        this.startStation = this.$root.StartStation
      }
      if (this.$root.EndStation !== '') {
        this.endStation = this.$root.EndStation
      }
      if (this.$route.params.show === '0') {
        this.searchShoW = false
      }
      if (this.$route.params.show === '1') {
        this.searchShoW = true
      }
    },
    methods: {
      changeStation: function () {
        [this.startStation, this.endStation] = [this.endStation, this.startStation]
        this.$root.StartStation = this.startStation
        this.$root.EndStation = this.endStation
      },
      backIndex: function () {
        this.$router.replace('/index/main')
      },
      backMian: function () {
        this.searchBlur()
        this.$router.replace('/ticket/main/0')
      },
      chooseStation: function (pos) {
        this.target = pos
        this.$router.push('/ticket/main/1')
      },
      searchFocus: function () {
        this.focusStyle.padding = '6px 50px 6px 6px'
        this.focusShow = false
      },
      searchBlur: function () {
        this.focusStyle.padding = '6px 6px 6px 40px'
        this.focusShow = true
        this.searchText = ''
        this.stationList = []
        this.maskShow = true
      },
      textChange: function () {
        if (this.searchText === '') return
        this.$http.get(this.$root.BaseURI + 'ticket/station', {
          params: {
            like: this.searchText
          }
        }).then((response) => {
          response = response.data
          if (response.responseStatus.ack === 'success') {
            this.maskShow = false
            this.stationList = response.data.stationList
          }
        })
      },
      stationResult: function (name) {
        this.searchBlur()
        if (this.target === 'start') {
          this.startStation = name
          this.$root.StartStation = name
        } else {
          this.endStation = name
          this.$root.EndStation = name
        }
        this.$router.replace('/ticket/main/0')
      },
      search: function () {
        this.$router.push('/ticket/result/' + this.startStation + '/' + this.endStation)
      },
      getDate: function (time) {
        this.date = time
      }
    },
    watch: {
      '$route': function (val, oldVal) {
        if (val.fullPath === '/ticket/main/0') {
          this.searchShoW = false
        } else {
          this.searchShoW = true
        }
      }
    },
    components: {
      'date-choose': dateChoose
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ticket_main {
    background-color: #fff;
    height: 100%;
  }

  .ticket_main .back {
    display: inline-block;
    position: fixed;
    top: 12px;
    left: 12px;
    background-color: rgba(0, 0, 0, 0.4);
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

  .ticket_main .searchBox .el-button {
    width: 100%;
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

  .ticket_main .searchBox .address .el-col div {
    height: 100%;
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

  .ticket_main .header {
    position: fixed;
    width: 100%;
    height: 45px;
    top: 0;
    z-index: 4;
  }

  .ticket_main .header span {
    position: absolute;
    top: 13px;
    left: 10px;
    font-size: 18px;
  }

  .ticket_main .header .cancle {
    left: auto;
    right: 10px;
    top: 12px;
    font-size: 16px;
  }

  .ticket_main .header .inputBox {
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 6px;
    padding-left: 28px;
  }

  .ticket_main .header .el-icon-search {
    color: #bbb;
    top: 9px;
    left: 8px;
    font-size: 14px;
  }

  .ticket_main .header input {
    height: 100%;
    font-size: 15px;
  }

  .ticket_main .header input::-webkit-input-placeholder { /* WebKit browsers */
    color: #dddddd;
  }

  .ticket_main .header input:focus {
    color: #7cdaff
  }

  .ticket_main .search_input {
    height: 100%;
  }

  .ticket_main .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.15);
  }

  .ticket_main .searchResult {
    padding-top: 45px;
  }

  .ticket_main .searchResult div {
    padding: 10px 16px;
    background-color: #fff;
    border-bottom: 0.7px solid #dddddd;
  }
</style>

