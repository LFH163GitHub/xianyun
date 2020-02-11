// tab栏练习
<template>
  <div style="padding:100px">
    <div class="btn">
      <span
        v-for="(item, index) in ['国际', '体育', '娱乐']"
        :key="index"
        :class="{ active: currt === index }"
        @click="dian(index)"
      >
        {{ item }}
      </span>
    </div>
    <div v-if="currt === 0">
      <ul>
        <li>hhh</li>
        <li>hhh</li>
        <li>hhh</li>
      </ul>
    </div>
    <div v-if="currt === 1">
      <ul>
        <li>aaa</li>
        <li>hhh</li>
        <li>hhh</li>
      </ul>
    </div>
    <div v-if="currt === 2">
      <ul>
        <li>bbb</li>
        <li>hhh</li>
        <li>hhh</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currt: 0
    };
  },
  methods: {
    dian(index){
      this.currt =index
    }
  },
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
</style>
