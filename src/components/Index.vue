<template>
  <div class="index-box">
    <router-view></router-view>
    <footer class="footer">
      <el-row>
        <el-col :span="6">
          <router-link to="main"><img src="images/footer/footer-1.png">
            <p>首页</p></router-link>
        </el-col>
        <el-col :span="6"><img src="images/footer/footer-2.png">
          <p>行程</p></el-col>
        <el-col :span="6">
          <router-link to="server"><img src="images/footer/footer-3.png">
            <p>客服</p>
          </router-link>
        </el-col>
        <el-col :span="6"><span class="el-icon-setting"></span>
          <p>我的</p></el-col>
      </el-row>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-box {
    padding-bottom: 50px;
    height: 100%;
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
    z-index: 4;
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
