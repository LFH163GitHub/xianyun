<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 相当于router-view -->
    <nuxt />
    <Footer></Footer>
  </div>
</template>
<script>
//导入公共的组件
import Header from "@/components/header";
import Footer from "@/components/footer";
export default {
  components: {
    Header,
    Footer
  }
};
</script>
<style>
/* * {
  margin: 0;
  padding: 0;
}
ul,
li,
ol {
  list-style: none;
}
a{
  text-decoration:none;
  color: #000;
}
a:hover {
  columns: inherit;
}
em,
i {
  font-style: normal;
} */
@import url("@/assets/reset.css");
em,
i {
  font-style: normal;
}
</style>
