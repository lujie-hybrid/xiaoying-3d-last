<template>
  <div class="warning">
    <div :class="['warning-circle', { normal: list.length === 0 }]">
      <div class="warning-circle-1">
        <div class="warning-circle-2">
          <p v-show="list.length > 0">报警</p>
          <div class="normal-text" v-show="list.length === 0">
            <p>正常</p>
            <p>无报警</p>
          </div>
        </div>
      </div>
    </div>

    <div class="warning-cont">
      <div class="wc-icon">
        <p></p>
        <p>报警</p>
        <p></p>
        <p>正常</p>
      </div>
      <div class="right" v-show="list.length > 0">
        <p
          @click="clickItem(item)"
          v-for="item in list"
          :key="item[propName.id]"
        >
          {{ item[propName.name] }}<span>{{ item[propName.posName] }}</span
          ><span>{{ item[propName.desc] }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    propName: {
      type: Object,
      default: () => ({
        name: "doorName",
        posName: "buildName",
        id: "doorId",
        desc: "desc",
      }),
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    clickItem(item) {
      this.$emit("item", item);
    },
  },
};
</script>
<style lang="scss" scoped>
@keyframes flash {
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.07, 1.07, 1.07);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
}
.warning {
  padding: 10px 0 10px 20px;
  display: flex;
  &-circle {
    width: 148px;
    height: 148px;
    border-radius: 148px;
    background: rgba(221, 0, 0, 0.1);
    padding: 8px;
    animation-name: flash;
    animation-duration: 1s;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
    &-1 {
      padding: 7px;
      width: 132px;
      height: 132px;
      border-radius: 132px;
      background: rgba(221, 0, 0, 0.2);
    }
    &-2 {
      position: relative;
      width: 118px;
      height: 118px;
      border-radius: 118px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.4) 0%,
        rgba(221, 0, 0, 0.5) 100%
      );
      box-shadow: 0px 1px 4px 0px #ffffff;
      > p {
        position: absolute;
        color: $color-ffffff;
        font-weight: $font-weight-500;
        white-space: nowrap;
      }
      > p:nth-child(1) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: $font-size-18;
        width: 100%;
        text-align: center;
      }
      > p:nth-child(2) {
        top: 23px;
        left: 24px;
        font-size: $font-size-10;
      }
      > p:nth-child(3) {
        top: 80px;
        left: 0;
        text-align: right;
        width: 100%;
        padding-right: 15px;
      }
    }
    &.normal {
      animation: none;
      background: rgba(120, 247, 253, 0.1);
      .warning-circle-1 {
        background: rgba(120, 247, 253, 0.2);
      }
      .warning-circle-2 {
        background: linear-gradient(
          180deg,
          rgba(102, 191, 222, 0.1) 0%,
          #66bfde 100%
        );
        box-shadow: 0px 1px 4px 0px #ffffff;
      }
      .normal-text {
        font-weight: $font-weight-500;
        color: $color-ffffff;
        font-size: $font-size-16;
        line-height: 22px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        > p:nth-child(1) {
          margin-bottom: 2px;
        }
      }
    }
  }
  &-cont {
    margin-left: 25px;
    padding-top: 9px;
    .wc-icon {
      font-size: $font-size-10;
      color: $color-ffffff;
      display: flex;
      margin-bottom: 26px;
      > p:nth-child(1) {
        width: 10px;
        height: 10px;
        margin-right: 8px;
        background-color: $color-DD0000;
      }
      > p:nth-child(3) {
        width: 10px;
        height: 10px;
        margin-right: 8px;
        margin-left: 24px;
        background-color: $color-66BFDE;
      }
    }
    .right > p {
      font-size: $font-size-12;
      color: $color-ffffff;
      margin-bottom: 15px;
      line-height: 14px;
      font-weight: $font-weight-400;
      cursor: pointer;
      > span {
        margin-left: 24px;
        &:last-child {
          color: $color-DD0000;
        }
      }
    }
  }
}
</style>
