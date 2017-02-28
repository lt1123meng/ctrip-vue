<template>
  <div class="index-box">
    <header class="header" :style="{ backgroundColor:bgColor }">
      <span class="scanning el-icon-menu" :style="{ color:iconColor }"></span>
      <span class="message el-icon-menu" :style="{ color:iconColor }"></span>
      <div class="searchBox" :style="{ backgroundColor:bgSearch }"><span class="search el-icon-menu"></span><input
        type="text" placeholder="搜索目的地/景点"></div>
    </header>
    <slider :items="items" :speed="2" :delay="3" :pause="true" :autoplay="true" :dots="true" :arrows="true"></slider>
    <img class="finger-demo-img" src="images/footer/footer-1.png"
         v-finger:longtap="tap"
    />
    <div class="contentBox">
      <div class="navBox">
        <el-row>
          <el-col :span="8">
            <a>酒店</a>
          </el-col>
          <el-col :span="8">
            <a>
              海外酒店
            </a>
            <a>
              特价酒店
            </a>
          </el-col>
          <el-col :span="8">
            <a>
              团购
            </a>
            <a>
              民宿·客栈
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <a>机票</a>
          </el-col>
          <el-col :span="8">
            <a>
              火车票
            </a>
            <a>
              特价机票
            </a>
          </el-col>
          <el-col :span="8">
            <a>
              汽车票·船票
            </a>
            <a>
              专车·租车
            </a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <a>旅游</a>
          </el-col>
          <el-col :span="8">
            <a>
              目的地攻略
            </a>
            <a>
              周边游
            </a>
          </el-col>
          <el-col :span="8">
            <a>
              游轮
            </a>
            <a>
              定制旅行
            </a>
          </el-col>
        </el-row>
      </div>
      <p class="title"><span class="el-icon-minus"></span> 特惠专区 <span class="el-icon-minus"></span></p>
      <div class="hotSale">
        <div class="hotSale-hd">
          <span>特卖会</span>
          <span>领红包再下单<i class="el-icon-arrow-right"></i></span>
        </div>
        <div class="hotSale-bd">
          <div class="empty" v-if="hotSale.length==0">
            <p v-html="hotSale.length"></p>
            <span class="el-icon-loading"></span>
          </div>
          <div v-if="hotSale.length!=0">
            <el-row>
              <el-col :span="12">
                <a>
                  <img :src="hotSale[0].ImgURL" alt="">
                  <p v-text="hotSale[0].ProductName"></p>
                  <p v-text="'￥'+hotSale[0].SalesPrice+'起'"></p>
                </a>
              </el-col>
              <el-col :span="12"></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <el-row>
        <el-col :span="6"><img src="images/footer/footer-1.png">
          <p>首页</p></el-col>
        <el-col :span="6"><img src="images/footer/footer-2.png">
          <p>行程</p></el-col>
        <el-col :span="6"><img src="images/footer/footer-3.png">
          <p>客服</p></el-col>
        <el-col :span="6"><span class="el-icon-setting"></span>
          <p>我的</p></el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
  console.log(window)
  import Slider from 'vue-slider/slider/Slider.vue'
  export default {
    name: 'hello',
    data () {
      return {
        items: [
          {
            src: 'http://dimg04.c-ctrip.com/images/700i0d0000006vjz74860_810_235_85.jpg',
            alt: 'images-1'
          },
          {
            src: 'http://dimg04.c-ctrip.com/images/700c0c0000006o63c095A_810_235_85.jpg',
            alt: 'images-2'
          },
          {
            src: 'http://dimg04.c-ctrip.com/images/70060d0000006vid0C412_810_235_85.jpg',
            alt: 'images-3'
          }
        ],
        sliderinit: {
          autoplay: 3000,
          loop: true,
          direction: 'horizontal',
          infinite: 1,
          slidesToScroll: 1
        },
        bgColor: 'rgba(0,0,0,0)',
        iconColor: '#fff',
        bgSearch: '#fff',
        hotSale: {
          'HotSaleProductList': []
        }
      }
    },
    created: function () {
      this.$http.get('json/hotSale.json').then((response) => {
        this.$set(this, 'hotSale', response.data.HotSaleProductList)
        console.log(this)
      }, (error) => {
        console.log(error)
      })
    },
    methods: {
      tap () {
        console.log('longTap')
      }
    },
    components: {
      Slider
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-box {
    padding-bottom: 60px;
  }

  /*头部*/
  .header {
    position: fixed;
    width: 100%;
    z-index: 1;
    height: 40px;
    padding: 4px 40px;
    box-sizing: border-box;
  }

  .header .scanning, .header .search {
    position: absolute;
    top: 10px;
    font-size: 18px;
    left: 7px;
  }

  .header .message {
    position: absolute;
    top: 10px;
    font-size: 18px;
    right: 7px;
  }

  .header .searchBox {
    line-height: 32px;
    padding-left: 30px;
    border-radius: 4px;
  }

  .header .search {
    position: absolute;
    top: 8px;
    font-size: 15px;
    left: 4px;
    color: #888;
  }

  .header .searchBox input {
    border: 0;
    height: 32px;
    vertical-align: top;
  }

  /*内容区域*/
  .contentBox {
    padding: 4px 0;
  }

  .contentBox .title {
    line-height: 35px;
    text-align: center;
  }

  /*index.Vue*/
  /*第一个导航*/
  .contentBox .navBox {
    padding: 0 4px;
    color: #fff;
    text-align: center;
  }

  .contentBox .navBox .el-row {
    border-radius: 5px;
    margin-bottom: 4px;
  }

  .contentBox .navBox .el-row:nth-child(1) {
    background-color: #ff697a;
  }

  .contentBox .navBox .el-row:nth-child(2) {
    background-color: #3d98ff;
  }

  .contentBox .navBox .el-row:nth-child(3) {
    background-color: #fc9720;
  }

  .contentBox .navBox .el-row .el-col:nth-child(1) {
    border: 0
  }

  .contentBox .navBox .el-row .el-col {
    border-left: 1px solid #fff;
  }

  .contentBox .navBox .el-row .el-col a + a {
    border-top: 1px solid #fff;
  }

  .contentBox .navBox a {
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 1em;
  }

  /*特卖区域*/
  .hotSale {
    background-color: #fff;
  }

  .hotSale .hotSale-hd {
    height: 40px;
    border-bottom: 1px solid #ccc;

  }

  .hotSale .hotSale-hd span {
    display: block;
    position: absolute;
    top: 0px;
  }

  .hotSale .hotSale-hd span:first-of-type {
    left: 6px;
    top: 6px;
    color: #fb520a;
    font-family: FZShuTi;
    font-size: 1.2em;
    font-weight: bold;
  }

  .hotSale .hotSale-hd span:last-of-type {
    color: #fff;
    border-radius: 13px;
    height: 26px;
    line-height: 26px;
    top: 7px;
    padding: 0 5px;
    right: 7px;
    background-image: linear-gradient(to left, #ff4e63, #ff6cc9);
    background-image: -webkit-linear-gradient(to left, #ff4e63, #ff6cc9);
    background-image: -o-linear-gradient(to left, #ff4e63, #ff6cc9);
  }

  .hotSale .hotSale-bd {
    min-height: 100px;
    padding: 8px 8px 8px 8px;
  }

  /*底部*/
  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 51px;
    padding: 7px 0 0 0;
    text-align: center;
    background-color: #f4f4f4;
    box-shadow: 0 0 4px 0px #656565;
  }

  .footer span {
    font-size: 16pt;
  }

  .footer img {
    width: 21px;
    vertical-align: middle;
  }

  .footer p {
    font-size: 10pt;
    margin: 4px 0 0 0;
  }
</style>
