<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @getData="getData" />

        <!-- 航班头部布局 -->
        <FlightsListHead></FlightsListHead>

        <!-- 航班信息 -->
        <FlightsItem
          v-for="(item, index) in dataList"
          :key="index"
          :data="item"
        ></FlightsItem>

        <!-- 分页组件 -->
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change：选择页数时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size：当前条数 -->
        <!-- total：总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside></FlightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";
export default {
  data() {
    return {
      flightsData: {
        // 航班总数据
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      },
      // dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  computed: {
    dataList() {
      if (!this.flightsData.flights) {
        return [];
      }
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  //监听实例下任何属性的变化
  watch: {
    // $route() {
    //   // console.log(this.$route);
    //   //每次url变化都重置
    //   this.pageIndex = 1;
    //   //请求机票列表数据
    //   this.getList();
    // },
    total() {
      this.pageIndex = 1;
    }
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    //每次url变化都重置
    this.pageIndex = 1;
    //   //请求机票列表数据
    this.getList();
    next();
  },
  mounted() {
    //请求机票列表数据
    // this.$axios({
    //   url: "/airs",
    //   params: this.$route.query
    // }).then(res => {
    //   this.flightsData = res.data;
    //   //备份数据
    //   this.cacheFlightsData = { ...res.data };
    //   this.total = this.flightsData.total;
    //   // console.log(this.total);
    // });
    this.getList();
  },
  methods: {
    getList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        this.flightsData = res.data;
        //备份数据
        this.cacheFlightsData = { ...res.data };
        this.total = this.flightsData.total;
        // console.log(this.total);
      });
    },
    handleSizeChange(value) {
      this.pageSize = value;
    },
    handleCurrentChange(value) {
      this.pageIndex = value;
    },
    getData(arr) {
      this.flightsData.flights = arr;
      // 总条数
      this.total = arr.length;
      // console.log(this.total);
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
