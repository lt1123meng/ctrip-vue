<template>
  <div class="index-server">
    <header>
      <div class="headerBox">
        <el-row>
          <el-col :span="12"class="active">订单服务</el-col>
          <el-col :span="12">售前咨询</el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'server'
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index-server {
    height: 100%;
    background-color: rgba(89,0,111,0.7);;
  }
  /*头部*/
  header{
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #9c55af;
  }
  .headerBox{
    vertical-align: bottom;
    height: 30px;
    width: 60%;
    margin: 20px auto 0;
    text-align: center;
    color: #fff;
  }
  .headerBox {
    vertical-align: bottom;
    height: 30px;
    width: 60%;
    margin: 20px auto 0;
    text-align: center;
    color: #fff;
  }
  .headerBox .el-col{
    line-height: 30px;
    background-color: #b170c1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .headerBox .el-col.active{
    line-height: 35px;
    top: -5px;
    background-color: #75a5ec;
  }
</style>
