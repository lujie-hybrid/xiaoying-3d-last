<template>
  <ul
    class="wrap-child"
    :style="{ width: `${width}px`, left: `${left}px`, top: `${top}px` }"
  >
    <li
      @click="clickNav(n)"
      v-for="(nv, n) in navList"
      :key="n"
      :class="{ active: navActiveIndex === n }"
    >
      {{ nv
      }}<img
        v-show="navActiveIndex !== 1 && navActiveIndex !== n && n !== 1"
        src="~@/assets/images/split.png"
      />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    navList: {
      type: Array,
      required: true,
    },
    width: {
      type: Number,
      default: 355,
    },
    left: {
      type: Number,
      default: 463,
    },
    top: {
      type: Number,
      default: 148,
    },
    defaultVal: {
      type: Number,
      default: -1,
    },
  },
  components: {},
  data() {
    return {
      navActiveIndex: "",
    };
  },
  watch: {
    defaultVal: {
      handler(val) {
        this.navActiveIndex = val;
      },
      immediate: true,
    },
  },
  methods: {
    clickNav(n) {
      this.navActiveIndex = n;
      this.$emit("nav-click", n);
    },
  },
};
</script>
<style lang="scss" scoped>
.wrap-child {
  height: 44px;
  background: url("~@/assets/images/child-bg.png") no-repeat left top;
  background-size: 100% 100%;
  position: fixed;
  display: flex;
  > li {
    flex: 1;
    font-size: $font-size-20;
    text-align: center;
    line-height: 44px;
    font-family: $font-AM;
    color: $color-E1E1E1;
    position: relative;
    cursor: pointer;
    &.active {
      background: url("~@/assets/images/child-active.png") no-repeat left top;
      background-size: 100% 100%;
    }
    > img {
      width: 11px;
      height: 42px;
      position: absolute;
    }
    &:nth-child(3) > img {
      top: 1px;
      left: 0;
      transform: translate(-50%, 0);
    }
    &:nth-child(1) > img {
      top: 1px;
      right: 0;
      transform: translate(50%, 0);
    }
  }
}
</style>
