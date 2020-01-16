<template>
  <div class="header-wrapper">
    <el-row type="flex" justify="space-between" class="header" align="middle">
      <!-- logo -->
      <div class="logo">
        <img src="/logo.jpg" alt="" />
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div>
        <nuxt-link to="/user/login">登录/注册</nuxt-link>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header-wrapper {
  height: 60px;
  min-width: 1000px;
  background: #fff;
}
.header {
  width: 1000px;
  height: 60px;
  margin: 0 auto;
  .logo {
    img {
      width: 156px;
      height: 42px;
      display: block;
    }
  }
  .navs {
    flex: 1;
    margin-left: 5px;
    a {
      display: block;
      line-height: 60px;
      height: 60px;
      padding: 0 20px;
      box-sizing: border-box;

      &:hover {
        border-bottom: 5px solid #409eff;
        color: #409eff;
      }
    }
    .nuxt-link-exact-active {
      background: #409eff;
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
