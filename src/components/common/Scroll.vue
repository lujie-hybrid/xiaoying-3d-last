<template>
  <el-scrollbar class="my-scroll">
    <slot></slot>
  </el-scrollbar>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.my-scroll {
  // height: 100%;
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
