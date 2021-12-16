<template>
  <div class="nav">
    <ul class="nav-btn-left">
      <li
        @click="handleClickNav('left', i)"
        :class="[
          'nav-btn',
          { active: navbarType === 'left' && navbarIndex === i },
        ]"
        v-for="(lItem, i) in navLeft"
        :key="i"
      >
        {{ lItem }}
      </li>
    </ul>
    <ul class="nav-btn-right">
      <li
        @click="handleClickNav('right', i)"
        :class="[
          'nav-btn',
          { active: navbarType === 'right' && navbarIndex === i },
        ]"
        v-for="(rItem, i) in navRight"
        :key="i"
      >
        {{ rItem }}
      </li>
    </ul>
    <div class="nav-title">
      <p>智慧营区综合管理平台</p>
      <img src="~@/assets/images/title-img.png" />
      <div class="nav-title-msg">
        <img src="~@/assets/images/time.png" />
        <p>时间: {{ time }}</p>
        <!-- <img src="~@/assets/images/cloud.png" /> -->
        <!-- <p>天气: 晴</p> -->
      </div>
    </div>
    <i
      title="显示/隐藏区域范围"
      @click="showHide"
      :class="['el-icon-s-grid head-icon', { hide: !hignlight }]"
    ></i>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { clickNavbar } from "@u/common";
import { getNowTime } from "@u/date";
export default {
  components: {},
  data() {
    return {
      navLeft: ["综合态势", "门禁管理", "视频监控"],
      navRight: ["周界报警", "车辆管控", "住房管理"],
      time: getNowTime(),
    };
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    "navbarType",
    "navbarIndex",
    "noRightComponent",
    "currentLeftComponent",
    "hignlight",
  ]),
  created() {
    this.timer = setInterval(() => {
      this.time = getNowTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    ...mapMutations({
      set_value: "set_value",
      set_access_value: "access/set_value",
      set_car_value: "car/set_value",
      set_house_value: "house/set_value",
    }),
    handleClickNav: clickNavbar,
    getNowTime,
    showHide() {
      this.set_value({ key: "hignlight", val: !this.hignlight });
      this.$render.showHideCovering("home_range", this.hignlight);
    },
  },
};
</script>
<style lang="scss" scoped>
.nav {
  width: 100%;
  &-btn {
    width: 120px;
    height: 50px;
    background: url("~@/assets/images/btn.png");
    background-size: 100% 100%;
    margin-right: 40px;
    font-size: $font-size-24;
    font-weight: $font-weight-500;
    color: $color-e1e1e1;
    text-align: center;
    font-family: $font-AM;
    line-height: 50px;
    cursor: pointer;
    &-left {
      left: 238px;
      top: 38px;
      position: absolute;
      display: flex;
    }
    &-right {
      right: 238px;
      top: 38px;
      position: absolute;
      display: flex;
    }
    &.active {
      background-image: url("~@/assets/images/btn-active.png");
      font-weight: bold;
      color: #ffffff;
      font-family: $font-AB;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &-title {
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 484px;
    > p:nth-child(1) {
      font-family: $font-AH;
      font-weight: $font-weight-800;
      font-size: $font-size-32;
      color: $color-ffffff;
      text-align: center;
    }
    > img:nth-child(2) {
      width: 484px;
      margin-top: 4px;
    }
    &-msg {
      margin-top: 16px;
      color: $color-66BFDE;
      display: flex;
      align-items: center;
      justify-content: center;
      > img {
        margin-right: 8px;
        width: 13px;
        height: 13px;
      }
      span {
        margin: 0 32px 0 13px;
      }
    }
  }
}

.head-icon {
  position: absolute;
  z-index: 500;
  right: 100px;
  top: 53px;
  font-size: $font-size-24;
  color: #66bfde;
  cursor: pointer;
  &.hide {
    color: #f5f5f5;
  }
}
</style>
