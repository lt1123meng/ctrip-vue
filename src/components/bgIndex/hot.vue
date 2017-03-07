<template>
  <div class="hot_box">
    <div v-if="!show" class="list">
      <div class="addBtn" @click="addHotBtn"><span class="el-icon-plus"></span>添加</div>
      <el-row :gutter="10">
        <el-col v-for="item in hotSaleList" :xs="12" :sm="8" :md="6" :lg="3">
          <img :src="item.ImgUrl">
          <p v-text="item.ProductName"></p>
          <p class="money"><span v-text="'￥'+item.SalesPrice+'起'"></span> <span
            v-text="'省￥'+(item.OriginalPrice-item.SalesPrice)"></span></p>
        </el-col>
      </el-row>
    </div>
    <div v-if="show" class="add">
      <div class="backBtn" @click="addHotBtn"><span class="el-icon-arrow-left"></span>返回</div>
      <el-row>
        <el-col :span="4" :offset="4">产品类型：</el-col>
        <el-col :span="12">
          <el-select v-model="type">
            <el-option :value="'今日爆款'" :label="'今日爆款'">今日爆款</el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="4">产品描述：</el-col>
        <el-col :span="12">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="产品描述"
            v-model="name">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="4">原始价格：</el-col>
        <el-col :span="12">
          <el-input type="number" v-model="originalPrice"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="4">今日售价：</el-col>
        <el-col :span="12">
          <el-input type="number" v-model="salesPrice"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" :offset="4">图片地址：</el-col>
        <el-col :span="12">
          <div class="el-button">
            <span v-text="imgSrc?'重新添加':'添加图片'"></span>
            <input type="file" @change="uploadImg">
          </div>
        </el-col>
      </el-row>
      <el-row v-show="imgSrc">
        <el-col :span="8" :offset="8">
          <img :src="imgSrc">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3" :offset="15">
          <el-button type="primary" @click="addHot">添加</el-button>
        </el-col>
      </el-row>
    </div>
  </div>

</template>
<script>
  export default {
    data () {
      return {
        show: false,
        hotSaleList: '',
        type: '',
        name: '',
        originalPrice: '',
        salesPrice: '',
        image: '',
        imgSrc: ''
      }
    },
    created: function () {
      this.$parent.activeIndex = '2'
      this.$http.get('http://localhost:8888/server/hot/list').then((response) => {
        response = response.data
        console.log(response)
        if (response.responseStatus.ack === 'success') {
          this.hotSaleList = response.data.hotSaleList
        }
      })
    },
    methods: {
      addHotBtn: function () {
        this.show = !this.show
      },
      addHot: function () {
        this.$http.post('http://localhost:8888/server/hot/add', {
          type: this.type,
          name: this.name,
          originalPrice: this.originalPrice,
          salesPrice: this.salesPrice,
          image: this.imgSrc
        }).then((response) => {
          response = response.data
          console.log(response)
          if (response.responseStatus.ack === 'success') {
            this.$message({
              message: '插入成功',
              type: 'success'
            })
            this.reset()
          }
        }, (response) => {
          // 响应错误回调
        })
      },
      uploadImg: function (event) {
        var imgFile = new FileReader()
        imgFile.readAsDataURL(event.target.files[0])
        imgFile.onload = ($this) => {
          console.log($this.currentTarget.result)
          this.imgSrc = $this.currentTarget.result
        }
      },
      reset: function () {
        this.name = ''
        this.originalPrice = ''
        this.salesPrice = ''
        this.imgSrc = ''
      }
    }
  }
</script>
<style scope>
  .hot_box .list ,.hot_box .add{
    padding-top: 50px;
  }
  .hot_box .addBtn{
    position: absolute;
    right: 50px;
    top: 8px;
    font-size: 20px;
    font-family: 'STKaiti';
  }
  .hot_box .backBtn{
    position: absolute;
    left: 50px;
    top: 8px;
    font-size: 20px;
    font-family: 'STKaiti';
  }
  .hot_box .list .el-row {
    line-height: 40px;
    padding: 12px;
    margin-bottom: 6px;
  }

  .hot_box .el-col {
    height: 100%;
    line-height: 20px;
    position: static;
    padding-bottom: 22px;
  }

  .hot_box .money {
    position: absolute;
    bottom: 8px;
    text-align: center;
  }

  .money span:first-of-type {
    color: #ff495e;
  }

  .money span:last-of-type {
    background-color: #ff495e;
    color: #fff;
    display: inline-block;
    padding: 0px 4px;
    border-radius: 8px;
    font-size: 12px;
  }

  .hot_box .el-row .el-col-4 {
    text-align: right;
  }

  .hot_box input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
</style>
