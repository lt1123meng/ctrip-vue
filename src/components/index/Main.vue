<template>
  <div class="main_box">
    <div v-if="search">
      <header class="header" :style="{ backgroundColor:bgColor }">
        <span class="scanning el-icon-menu" :style="{ color:iconColor }"></span>
        <span class="message el-icon-menu" :style="{ color:iconColor }"></span>
        <div class="searchBox" :style="{ backgroundColor:bgSearch }"><span class="search el-icon-menu"></span>
          <input @focus="searchFocus()" type="text" placeholder="搜索目的地/景点"></div>
      </header>
      <swiper :options="swiperOption" ref="mySwiperA">
        <!-- 幻灯内容 -->
        <swiper-slide v-for="item in items">
          <img :src="item.src">
        </swiper-slide>
        <!-- ... -->
        <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
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
              <router-link to="/ticket/main">火车票</router-link>
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
              <swiper :options="swiperOption">
                <swiper-slide v-for="item in hotSale">
                  <img :src="item.ImgUrl">
                  <p class="_twoLine" v-text="item.ProductName"></p>
                  <p class="money"><span v-text="'￥'+item.SalesPrice+'起'"></span> <span
                    v-text="'省￥'+(item.OriginalPrice-item.SalesPrice)"></span></p>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!search">
      <header class="header searchHeader">
        <span @click="searchFocus()" class="scanning el-icon-arrow-left"></span>
        <input type="text" placeholder="搜索目的地/景点">
      </header>
      <div class="searchCon">
        <div class="nav">
          <span>搜索推荐</span>
        </div>
        <div class="box">
          <span class="sign"></span>
          <div class="content">
            <el-button>酒店</el-button>
            <el-button>机票</el-button>
            <el-button>火车票</el-button>
            <el-button>渡假</el-button>
            <el-button>攻略</el-button>
          </div>
        </div>
        <div class="box">
          <span class="sign"></span>
          <div class="content">
            <el-button>香港的酒店</el-button>
            <el-button>三亚的酒店</el-button>
            <el-button>石家庄的酒店</el-button>
            <el-button>上海的酒店</el-button>
            <el-button>北京的酒店</el-button>
          </div>
        </div>
        <div class="box">
          <span class="sign"></span>
          <div class="content">
            <el-button>石家庄跟团游</el-button>
            <el-button>石家庄自由行</el-button>
            <el-button>石家庄景点门票</el-button>
            <el-button>石家庄一日游</el-button>
            <el-button>迪士尼游玩</el-button>
            <el-button>三亚旅游</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Slider from 'vue-slider/slider/Slider.vue'
  export default {
    name: 'mian',
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
        swiperOption: {
          // 所有配置均为可选（同Swiper配置）
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象（假如你需要使用获取swiper对象来做什么事，那么这个属性一定要是true）
          notNextTick: true,
          autoplay: 3000,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          speed: 1000
        },
        bgColor: 'rgba(0,0,0,0)',
        iconColor: '#fff',
        bgSearch: '#fff',
        hotSale: {
          'HotSaleProductList': []
        },
        search: true
      }
    },
    beforeCreate: function () {
      //      请求  热门
      this.$http.get(this.$root.BaseURI + 'hot/list').then(response => {
        response = response.data
        if (response.responseStatus.ack === 'success') {
          this.hotSale = response.data.hotSaleList
          console.log(this.hotSale)
        }
      }, response => {
      })
    },
    created: function () {
//        监听滚动事件
      var thisVm = this
      document.onscroll = function () {
        if (document.body.scrollTop > 100) {
          thisVm.bgColor = 'rgba(255,255,255,0.9)'
        } else {
          thisVm.bgColor = 'rgba(255,255,255,' + document.body.scrollTop / 120 + ')'
        }
      }
    },
    methods: {
      tap () {
      },
      searchFocus () {
        this.search = !this.search
      }
    },
    components: {
      Slider
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main_box {
    padding-bottom: 60px;
  }

  /*头部*/
  .main_box .header {
    position: fixed;
    width: 100%;
    z-index: 2;
    height: 40px;
    padding: 4px 40px;
    box-sizing: border-box;
  }

  .main_box .header .scanning, .main_box .header .search, .searchBox span {
    position: absolute;
    top: 10px;
    font-size: 18px;
    left: 7px;
  }

  .main_box .header .message {
    position: absolute;
    top: 10px;
    font-size: 18px;
    right: 7px;
  }

  .main_box .header .searchBox {
    line-height: 32px;
    padding-left: 30px;
    border-radius: 4px;
  }

  .main_box .header .search {
    position: absolute;
    top: 8px;
    font-size: 15px;
    left: 4px;
    color: #888;
  }

  .main_box .header .searchBox input {
    border: 0;
    height: 32px;
    vertical-align: top;
  }

  /*内容区域*/
  .main_box .contentBox {
    padding: 4px 0;
  }

  .main_box .contentBox .title {
    line-height: 35px;
    text-align: center;
  }

  /*index.Vue*/
  /*第一个导航*/
  .main_box .contentBox .navBox {
    padding: 0 4px;
    color: #fff;
    text-align: center;
  }

  .main_box .contentBox .navBox .el-row {
    border-radius: 5px;
    margin-bottom: 4px;
  }

  .main_box .contentBox .navBox .el-row:nth-child(1) {
    background-color: #ff697a;
  }

  .main_box .contentBox .navBox .el-row:nth-child(2) {
    background-color: #3d98ff;
  }

  .main_box .contentBox .navBox .el-row:nth-child(3) {
    background-color: #fc9720;
  }

  .main_box .contentBox .navBox .el-row .el-col:nth-child(1) {
    border: 0
  }

  .main_box .contentBox .navBox .el-row .el-col {
    border-left: 1px solid #fff;
  }

  .main_box .contentBox .navBox .el-row .el-col a + a {
    border-top: 1px solid #fff;
  }

  .main_box .contentBox .navBox a {
    height: 45px;
    line-height: 45px;
    display: block;
    font-size: 1em;
  }

  /*特卖区域*/
  .main_box .hotSale {
    background-color: #fff;
  }

  .main_box .hotSale .hotSale-hd {
    height: 40px;
    border-bottom: 1px solid #ccc;

  }

  .main_box .hotSale .hotSale-hd span {
    display: block;
    position: absolute;
    top: 0px;
  }

  .main_box .hotSale .hotSale-hd span:first-of-type {
    left: 6px;
    top: 6px;
    color: #fb520a;
    font-family: FZShuTi;
    font-size: 1.2em;
    font-weight: bold;
  }

  .main_box .hotSale .hotSale-hd span:last-of-type {
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

  .main_box .hotSale .hotSale-bd {
    min-height: 100px;
    padding: 8px 8px 8px 8px;
  }

  .main_box .searchHeader {
    padding: 4px 8px 4px 40px;
    border-bottom: 1px solid #aeaeae;
  }

  .main_box .searchHeader input {
    width: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid #aeaeae;
  }

  .main_box .searchCon {
    padding-top: 40px;
  }

  .main_box .searchCon .nav {
    background-color: #efefef;
  }

  .main_box .searchCon .box {
    padding: 2px 2px 2px 40px;
    background-color: #fff;
  }

  .main_box .searchCon .box .content {
    border-top: 1px solid #aeaeae;
  }

  .main_box .searchCon .box .el-button {
    padding: 8px 12px;
    margin: 4px 0;
  }

  .main_box .money {
    bottom: 0;
  }
</style>
