<template>
  <div class="ticket_result">
    <div class="header">
      <div class="title">
        <span class="back el-icon-arrow-left"></span>
        <div>
          <span @click="changeStation">
            <span v-text="startStation"></span>
            <span class="el-icon-minus"></span>
            <span v-text="endStation"></span>
          </span>
        </div>
      </div>
      <div class="date"></div>
    </div>
    <div class="loading" v-if="loadShow">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1489035277288&di=2cdec5cb586fbdf2aa1bea4e544d8fde&imgtype=0&src=http%3A%2F%2Fpic.c-ctrip.com%2Fh5%2Frwd_myctrip%2Fno-search.gif"
        width="50%" alt="">
      <span v-text="loadText"></span>
    </div>
    <div class="contentList">
      <div class="list" v-for="item in trainList" @click="goDetail(item.name)">
        <el-row class="_size11">
          <el-col :span="6">
            <p v-text="item.startStation"></p>
            <p class="_commonColor _size12 _weightBold" v-text="item.startDepartTime"></p>
          </el-col>
          <el-col :span="6" class="_textCenter">
            <p class="_size08" v-text="item.name"></p>
            <p class="_size08">
              {{item.startDepartTime | timeMinus(item.endArriveTime)}}
            </p>
          </el-col>
          <el-col :span="6" class="_textRight">
            <p v-text="item.endStation"></p>
            <p class="_weightBold" v-text="item.endArriveTime"></p>
          </el-col>
          <el-col :span="6" class="_textRight">
            <p class="_orangeColor _weightBold">
              ￥{{item.endMoney | moneyMinus(item.startMoney)}}
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        minus: '',
        startStation: '',
        endStation: '',
        trainList: '',
        loadShow: true,
        loadText: '加载中'
      }
    },
    created: function () {
      console.log(this)
      this.startStation = this.$route.params.start
      this.endStation = this.$route.params.end
      this.findResult()
    },
    methods: {
      findResult () {
        this.$http.get(this.$root.BaseURI + 'ticket/find', {
          params: {
            start: this.startStation,
            end: this.endStation
          }
        }).then((response) => {
          response = response.data
          if (response.responseStatus.ack === 'success') {
            this.trainList = response.data.trainList
            this.loadShow = false
          } else {
            this.loadText = '加载失败，点击重新加载'
          }
        })
      },
      changeStation: function () {
        [this.startStation, this.endStation] = [this.endStation, this.startStation]
      },
      goDetail: function (name) {
        console.log(this.$root.addHistory())
        this.$router.push('/ticket/detail/' + name + '/' + this.startStation + '/' + this.endStation)
      }
    },
    filters: {
      'moneyMinus': function (first, second) {
        return parseFloat(first) - parseFloat(second)
      },
      'timeMinus': function (first, second) {
        first = first.split(':')
        second = second.split(':')
        if (first > second) {
          second[0] = parseInt(second[0]) + 24
        }
        first = parseInt(first[0]) * 60 + parseInt(first[1])
        second = parseInt(second[0]) * 60 + parseInt(second[1])
        console.log(first)
        console.log(second)
        return parseInt((second - first) / 60) + '时' + parseInt((second - first) % 60) + '分'
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ticket_result .header {
    background-color: #3d98ff;
    color: #fff;
  }

  .ticket_result .header .title {
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }

  .ticket_result .header .title div {
    text-align: center;
  }

  .ticket_result .header .title .back {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 16px;
  }

  .ticket_result .contentList {
    padding: 6px;
  }

  .ticket_result .contentList .list {
    padding: 8px 4px;
    background-color: #fff;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-bottom: 6px;
  }
</style>
