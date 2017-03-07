<template>
  <div class="index_server">
    <header>
      <div class="headerBox">
        <el-row>
          <el-col :span="12" :class="{ active: headerChoose }">
            <div v-on:click.prevent="headerChange('order')" :class="{ text: !headerChoose }">订单服务</div>
          </el-col>
          <el-col :span="12" :class="{ active: !headerChoose }">
            <div v-on:click.prevent="headerChange('recetion')" :class="{ text: headerChoose }">售前咨询</div>
          </el-col>
        </el-row>
      </div>
    </header>
  </div>
</template>

<script>
  export default {
    name: 'server',
    data () {
      return {
        headerChoose: false
      }
    },
    methods: {
      headerChange (type) {
        if (type === 'order') {
          this.headerChoose = true
        } else {
          this.headerChoose = false
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index_server {
    height: 100%;
    background-color: rgba(89, 0, 111, 0.7);;
  }

  /*头部*/
  .index_server header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 50px;
    background-color: #9c55af;
  }

  .index_server .headerBox {
    vertical-align: bottom;
    height: 30px;
    width: 60%;
    margin: 20px auto 0;
    text-align: center;
    color: #fff;
  }

  .index_server .headerBox {
    vertical-align: bottom;
    height: 30px;
    width: 60%;
    margin: 20px auto 0;
    text-align: center;
    color: #fff;
  }

  .index_server .headerBox .el-col {
    position: relative;
    height: 30px;
  }

  .index_server .headerBox .el-col div {
    width: 100%;
    height: 30px;
    line-height: 30px;
    z-index: 4;
    position: absolute;
    bottom: 0px;
    line-height: 30px;
  }

  .index_server .headerBox .el-col .text {
    width: 100%;
    height: 100%;
    z-index: 2;
    position: absolute;
    bottom: 0;
    line-height: 30px;
    background-color: #b070c1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

  }

  .index_server .headerBox .el-col.active {
    position: relative;
    height: 38px;
    top: -8px;
    background-color: rgba(0, 0, 0, 0);
    z-index: 3;
  }

  .index_server .headerBox .el-col.active::before {
    content: ''; /* To generate the box */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 115%;
    height: 38px;
    background: #7098fd;
    transform: perspective(.5em) rotateX(1deg);
    transform-origin: bottom left;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .index_server .headerBox .el-col.active:first-of-type::before {
    transform-origin: bottom left;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .index_server .headerBox .el-col.active:last-of-type::before {
    transform-origin: bottom right;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    left: -15%;
  }
</style>
