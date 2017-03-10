<template>
  <div class="ticket_detail">
    <div class="header">
      <div class="title _textCenter _size12">
        <span @click="back" class="back el-icon-arrow-left"></span>
        车次详情
      </div>
      <div class="detail">
        <el-row>
          <el-col :span="8">
            <p v-text="detail.startStation"></p>
            <p class="_size12 _weightBold" v-text="detail.departTime"></p>
          </el-col>
          <el-col :span="8" class="_textCenter">
            <div>
              <p v-text="detail.name"></p>
              <p><span @click="stationDetail">经停信息</span></p>
            </div>
          </el-col>
          <el-col :span="8" class="_textRight">
            <p v-text="detail.endStation"></p>
            <p class="_size12 _weightBold" v-text="detail.arriveTime"></p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="content">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <el-row>
              <el-col :span="12">
                <span>二等座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>
              </el-col>
              <el-col :span="12" class="_textRight">
                <span>816张</span>
                <el-button type="warning">
                  预定
                </el-button>
              </el-col>
            </el-row>
          </template>
          <div class="buy">
            <el-row>
              <el-col :span="12">
                <img src="images/xc.jpg" alt=""> 携程预定
              </el-col>
              <el-col :span="12" class="_textRight">
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>
                <el-button type="primary">
                  买票
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <img src="images/12306.png" alt=""> 12306预定
              </el-col>
              <el-col :span="12" class="_textRight">
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>
                <el-button type="primary">
                  买票
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <el-row>
              <el-col :span="12">
                <span>一等座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)*2}}</span>
              </el-col>
              <el-col :span="12" class="_textRight">
                <span>129张</span>
                <el-button type="primary">
                  抢票
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <el-row>
              <el-col :span="12">
                <span>商务座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)*4}}</span>
              </el-col>
              <el-col :span="12" class="_textRight">
                <span>12张</span>
                <el-button type="primary">
                  抢票
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-collapse-item>
        <el-collapse-item title="可控 Controllability" name="4">
          <template slot="title">
            <el-row>
              <el-col :span="12">
                <span>无座&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>
              </el-col>
              <el-col :span="12" class="_textRight">
                <span>无票</span>
                <el-button type="primary">
                  抢票
                </el-button>
              </el-col>
            </el-row>
          </template>
        </el-collapse-item>
      </el-collapse>

    </div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        detail: '',
        activeName: 1
      }
    },
    created: function () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        this.$http.get(this.$root.BaseURI + 'ticket/detail', {
          params: {
            name: this.$route.params.name,
            start: this.$route.params.start,
            end: this.$route.params.end
          }
        }).then((response) => {
          response = response.data
          if (response.responseStatus.ack === 'success') {
            this.detail = response.data.detail
          }
        })
      },
      stationDetail () {
        this.$router.push('/ticket/time/' + this.$route.params.name + '/' + this.$route.params.start + '/' + this.$route.params.end)
      },
      back () {
        this.$router.go(-1)
      }
    },
    filters: {
      'moneyMinus': function (first, second) {
        return parseFloat(first) - parseFloat(second)
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*手风琴*/

  .ticket_detail .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #3d98ff;
    color: #fff;
    z-index: 1;
  }

  .ticket_detail .title {
    line-height: 40px;
  }

  .ticket_detail .title .back {
    position: absolute;
    top: 12px;
    font-size: 15px;
    left: 16px;
  }

  .ticket_detail .header .detail {
    padding: 8px 12px;
  }

  .ticket_detail .content {
    padding-top: 120px;
  }

  .ticket_detail .content .buy {
    padding: 4px 12px 4px 12px;
    line-height: 34px;
    background-color: #efefef;
  }

  .ticket_detail .content .buy .el-row {
    margin-bottom: 4px;
  }

  .ticket_detail .content .buy img {
    width: 28px;
    vertical-align: middle;
    border-radius: 50%;
  }

</style>

<!--<div class="list">-->
<!--<div class="ticket">-->
<!--<el-row>-->
<!--<el-col :span="12">-->
<!--<span>二等座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--<span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>-->
<!--</el-col>-->
<!--<el-col :span="12" class="_textRight">-->
<!--<span>816张</span>-->
<!--<el-button type="warning">-->
<!--预定-->
<!--</el-button>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</div>-->
<!--<div class="list">-->
<!--<div class="ticket">-->
<!--<el-row>-->
<!--<el-col :span="12">-->
<!--<span>一等座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--<span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)*2}}</span>-->
<!--</el-col>-->
<!--<el-col :span="12" class="_textRight">-->
<!--<span>129张</span>-->
<!--<el-button type="primary">-->
<!--抢票-->
<!--</el-button>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</div>-->
<!--<div class="list">-->
<!--<div class="ticket">-->
<!--<el-row>-->
<!--<el-col :span="12">-->
<!--<span>商务座</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--<span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)*4}}</span>-->
<!--</el-col>-->
<!--<el-col :span="12" class="_textRight">-->
<!--<span>12张</span>-->
<!--<el-button type="primary">-->
<!--抢票-->
<!--</el-button>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</div>-->
<!--<div class="list">-->
<!--<div class="ticket">-->
<!--<el-row>-->
<!--<el-col :span="12">-->
<!--<span>无座&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-->
<!--<span class="_weightBold _orangeColor">￥{{detail.sendMoney| moneyMinus(detail.startMoney)}}</span>-->
<!--</el-col>-->
<!--<el-col :span="12" class="_textRight">-->
<!--<span>无票</span>-->
<!--<el-button type="primary">-->
<!--抢票-->
<!--</el-button>-->
<!--</el-col>-->
<!--</el-row>-->
<!--</div>-->
<!--</div>-->
