<template>
  <div>
    <div class="block">
      <!-- 幻灯片 -->
      <el-carousel height="700px" class="carousel">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <div
            class="banner"
            :style="
              `background:url(${$axios.defaults.baseURL}${item.url}) center center no-repeat`
            "
          ></div>
        </el-carousel-item>
      </el-carousel>
      <!-- 搜索框 -->
      <div class="banner-content">
        <div class="search-bar">
          <!-- tab栏 -->
          <el-row type="flex" class="search-tab">
            <span
              v-for="(item, index) in options"
              :key="index"
              @click="handleOption(index)"
              :class="{ active: current === index }"
              ><i>{{ item.name }}</i></span
            >
          </el-row>

          <!-- 输入框 -->
          <el-row type="flex" align="middle" class="search-input">
            <input type="text" :placeholder="options[current].placeholder" />
            <i class="aa"></i>
            <i class="el-icon-search"></i>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: [], // 轮播图数据
      current: 0,
      options: [
        {
          name: "攻略",
          placeholder: "搜索城市"
        },
        {
          name: "酒店",
          placeholder: "请输入城市搜索酒店"
        },
        {
          name: "机票",
          placeholder: "请输入出发地"
        }
      ]
    };
  },
  methods: {
    handleOption(index) {
      this.current = index;
    }
  },
  mounted() {
    // 轮播图数据获取
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const { data } = res.data;
      this.banner = data;
    });
  }
};
</script>

<style lang="less" scoped>
.carousel {
  min-width: 1000px;
}
.banner {
  height: 700px;
}
.banner-content {
  width: 1000px;
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translateX(-50%);
  border-top: 1px solid transparent;
  .search-bar {
    width: 552px;
    margin: 0 auto;
  }
  .search-tab {
    .active {
      i {
        color: #333;
      }
      &::after {
        background: #fff;
      }
    }
    span {
      width: 82px;
      height: 36px;
      display: block;
      margin-right: 8px;
      position: relative;
      cursor: pointer;
      i {
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        line-height: 30px;
        text-align: center;
        color: #fff;
      }
      &:after {
        position: absolute;
        left: 0;
        top: 0;
        display: block;
        content: "";
        width: 100%;
        height: 100%;
        border: 1px rgba(255, 255, 255, 0.2) solid;
        border-bottom: none;
        transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
        transform-origin: bottom left;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1px 2px 0 0;
        box-sizing: border-box;
      }
    }
  }
  .search-input {
    width: 550px;
    height: 46px;
    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none;
      border: 0;
      font-size: 16px;
    }
    .aa {
      height: 30px;
      border-right: 1px solid rgb(230, 230, 230);
    }
    .el-icon-search {
      cursor: pointer;
      font-size: 22px;
      padding: 0 10px;
      font-weight: bold;
    }
  }
}
</style>
