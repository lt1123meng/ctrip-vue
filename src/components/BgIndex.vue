<template>
  <div class="bg-index-box">
    <header class="header">
      <img src="images/logo.png"><span>后台管理系统</span>
    </header>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <router-link to="/bgindex/first">首页</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/bgindex/hot">特惠专区</router-link>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        activeIndex: ''
      }
    },
    created: function () {
      this.activeIndex = '1'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg-index-box {
    padding-top: 70px;
    background-color: #fff;
  }

  .header {
    position: fixed;
    top: 0;
    padding: 8px 12px;
  }

  .header img {
    width: 158px;
    height: 54px;
  }

  .el-menu {
    background-color: #2577e3;
  }

  .el-menu--horizontal .el-menu-item {
    height: 40px;
    line-height: 40px
  }

  .el-menu--horizontal .el-menu-item a, .el-menu--horizontal .el-menu-item a:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a56bb;
  }

  .el-menu--horizontal .el-menu-item:hover, .el-menu--horizontal .el-submenu__title:hover {
    background-color: #0a56bb;
  }
</style>
