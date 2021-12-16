<template>
  <div :class="{ 'inner-left': !isRight, 'inner-right': isRight }">
    <div :class="{ 'inner-left-wrap': !isRight, 'inner-right-wrap': isRight }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isRight: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.inner {
  &-left {
    position: fixed;
    left: 0;
    top: 148px;
    width: 453px;
    height: calc(100% - 148px);
    background: url("~@/assets/images/bg-left.png") no-repeat left top;
    background-size: 100% 100%;
    // background: linear-gradient(
    //   90deg,
    //   rgba(25, 45, 52, 0.9) 0%,
    //   rgba(18, 30, 34, 0.7) 56%,
    //   rgba(41, 64, 71, 0.6) 100%
    // );
    padding-left: 20px;
    &-wrap {
      width: 398px;
    }
    z-index: 2;
  }
  &-right {
    position: fixed;
    right: 0;
    top: 148px;
    width: 453px;
    height: calc(100% - 148px);
    background: url("~@/assets/images/bg-right.png") no-repeat left top;
    background-size: 100% 100%;
    // background: linear-gradient(
    //   -90deg,
    //   rgba(25, 45, 52, 0.9) 0%,
    //   rgba(18, 30, 34, 0.7) 56%,
    //   rgba(41, 64, 71, 0.6) 100%
    // );
    z-index: 2;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    &-wrap {
      width: 398px;
    }
  }
}
</style>
