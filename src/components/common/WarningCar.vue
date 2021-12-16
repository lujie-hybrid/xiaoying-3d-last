<template>
  <div class="warning">
    <div :class="['warning-circle', { normal: msg.stuts === 0 }]">
      <div class="warning-circle-1">
        <div class="warning-circle-2">
          <p v-show="msg.stuts !== 0">车位已满</p>
          <div class="normal-text" v-show="msg.stuts === 0">
            <p>{{ msg.remaincarportNum }}</p>
            <p>剩余车位</p>
          </div>
        </div>
      </div>
    </div>

    <div class="warning-cont">
      <div class="wc-icon">
        <p></p>
        <p>车位已满</p>
        <p></p>
        <p>车位空余</p>
      </div>
      <div class="right">
        <p>
          <span>总车位:</span><span>{{ msg.allcarportNum }} 个</span>
        </p>
        <p>
          <span>已入营车辆:</span><span>{{ msg.carportNum }} 辆</span>
        </p>
        <p>
          <span>停放立体车库:</span><span>{{ msg.ltcarportNum }} 辆</span>
        </p>
        <p>
          <span>剩余车位数:</span><span>{{ msg.remaincarportNum }} 个</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("car", {
      msg: (state) => state.status,
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.warning {
  padding: 10px 0 10px 20px;
  display: flex;
  &-circle {
    width: 148px;
    height: 148px;
    border-radius: 148px;
    background: rgba(221, 0, 0, 0.1);
    padding: 8px;
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
        left: 42px;
      }
    }
    &.normal {
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
        width: 100%;
        text-align: center;
        > p:nth-child(1) {
          font-size: $font-size-20;
          line-height: 28px;
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
      > span:nth-child(1) {
        width: 77px;
        display: inline-block;
      }
      > span:nth-child(2) {
        margin-left: 16px;
      }
    }
  }
}
</style>
