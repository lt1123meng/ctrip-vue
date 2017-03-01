<template>
  <div>
    <div v-if="search">
      <header class="header" :style="{ backgroundColor:bgColor }">
        <span class="scanning el-icon-menu" :style="{ color:iconColor }"></span>
        <span class="message el-icon-menu" :style="{ color:iconColor }"></span>
        <div class="searchBox" :style="{ backgroundColor:bgSearch }"><span class="search el-icon-menu"></span>
          <input @focus="searchFocus()" type="text" placeholder="搜索目的地/景点"></div>
      </header>
      <slider :items="items" :speed="2" :delay="3" :pause="true" :autoplay="true" :dots="true" :arrows="true"></slider>
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
                  <a v-for="(list,index) in hotSale" v-if="index==0">
                    <img :src="list.ImgURL">
                    <p class="_twoLine" v-text="list.ProductName"></p>
                    <p v-text="'￥'+list.SalesPrice+'起'"></p>
                  </a>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <img :src="'http://pic.c-ctrip.com/platform/h5/home/pic-tmh-02.png'">
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12"></el-col>
                    <el-col :span="12"></el-col>
                  </el-row>
                </el-col>
              </el-row>
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
        },
        search: true
      }
    },
    beforeCreate: function () {
      var thisVm = this
      //      请求  热门
      thisVm.$http.get('json/hotSale.json').then(response => {
        thisVm.$set(thisVm, 'hotSale', response.data.HotSaleProductList)
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
  /*头部*/
  .header {
    position: fixed;
    width: 100%;
    z-index: 1;
    height: 40px;
    padding: 4px 40px;
    box-sizing: border-box;
  }

  .header .scanning, .header .search, .searchBox span {
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

  .searchHeader {
    padding: 4px 8px 4px 40px;
    border-bottom: 1px solid #aeaeae;
  }

  .searchHeader input {
    width: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    border-radius: 5px;
    border: 1px solid #aeaeae;
  }

  .searchCon {
    padding-top: 40px;
  }

  .searchCon .nav {
    background-color: #efefef;
  }

  .searchCon .box {
    padding: 2px 2px 2px 40px;
    background-color: #fff;
  }

  .searchCon .box .content {
    border-top: 1px solid #aeaeae;
  }
  .searchCon .box .el-button {
    padding: 8px 12px;
    margin: 4px 0;
  }
</style>
