<template>
  <div :class="['unit', { mini: mini }, { mgt0: isTop }]">
    <div :class="['unit-title', { 'has-foot': hasFoot }]">
      <div class="ut-left">
        <img src="~@/assets/images/unit-img.png" />
        {{ title }}
      </div>
      <div
        class="ut-right"
        v-show="!noRight && !isVideo"
        @click="$emit('detail')"
      >
        <p>查看详情</p>
        <img src="~@/assets/images/arrow-right.png" />
      </div>
      <div class="ut-right" v-show="isVideo" @click="seeHistory">
        <p>查看回放</p>
        <img src="~@/assets/images/arrow-right.png" />
      </div>
      <slot name="header-right"></slot>
    </div>
    <slot name="header-foot"></slot>
    <div class="unit-line">
      <p></p>
      <p></p>
      <p></p>
    </div>
    <div class="inner-wrap"><slot></slot></div>
    <div class="unit-line">
      <p></p>
      <p></p>
      <p></p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    isTop: {
      type: Boolean,
      default: false,
    },
    noRight: {
      type: Boolean,
      default: false,
    },
    isVideo: {
      type: Boolean,
      default: false,
    },
    hasFoot: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: "",
    },
    mini: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    console.log("code", this.code);
  },
  methods: {
    ...mapMutations({
      set_video: "video/set_value",
    }),
    seeHistory() {
      this.set_video({ key: "videoCode", val: this.code });
      this.set_video({ key: "videoShow", val: true });
    },
  },
};
</script>
<style lang="scss" scoped>
.unit {
  width: 100%;
  margin-top: 25px;
  &:first-child {
    margin-top: 0 !important;
  }
  &.mini {
    margin-top: 10px;
  }
}
.inner-wrap {
  min-height: 60px;
}
.mgt0 {
  margin-top: 0;
}
.unit-title {
  width: 100%;
  height: 38px;
  background: rgba(120, 247, 253, 0.3);
  border: 1px solid #78f7fd;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  &.has-foot {
    border-bottom: 0;
    margin-bottom: 0;
  }
  .ut-left {
    display: flex;
    align-items: center;
    font-size: $font-size-18;
    font-weight: $font-weight-500;
    font-family: $font-AM;
    color: $color-ffffff;
    > img {
      width: 7px;
      height: 38px;
      margin-right: 16px;
    }
  }
  .ut-right {
    display: flex;
    align-items: center;
    padding-right: 16px;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    cursor: pointer;
    > img {
      width: 12px;
      height: 12px;
      margin-left: 4px;
    }
  }
}
.mini .unit-title {
  height: 28px;
  .ut-left {
    display: flex;
    align-items: center;
    font-size: $font-size-14;
    font-weight: $font-weight-500;
    font-family: $font-AM;
    color: $color-ffffff;
    > img {
      width: 7px;
      height: 28px;
      margin-right: 16px;
    }
  }
}
.unit-line {
  display: flex;
  align-items: center;
  > p:nth-child(1),
  > p:nth-child(3) {
    width: 7px;
    height: 7px;
    background: $color-78F7FD;
  }
  > p:nth-child(2) {
    flex: 1;
    height: 1px;
    border: 1px dashed $color-DBDBDB;
    margin: 0 4px;
  }
}
</style>
