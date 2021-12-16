<template>
  <el-dialog append-to-body :visible="visible" custom-class="big-video">
    <img
      @click="closeDialog"
      class="bv-close"
      src="~@/assets/images/close.png"
    />
    <p class="bv-title">画面回放</p>
    <div class="bv-line">
      <p></p>
      <p></p>
      <p></p>
    </div>
    <iframe
      height="810"
      width="1350"
      v-if="videoCode"
      :src="`${baseUrl}/frame?code=${videoCode}`"
    ></iframe>
  </el-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      baseUrl: process.env.VUE_APP_FRAME,
    };
  },
  computed: {
    ...mapState("video", ["videoCode"]),
  },
  created() {
    console.log("dfsafjka", this.videoCode);
  },
  methods: {
    ...mapMutations({
      set_video: "video/set_value",
    }),
    // video关闭
    closeDialog() {
      this.set_video({ key: "videoShow", val: false });
    },
  },
};
</script>
<style lang="scss" scoped>
.bv-close {
  position: absolute;
  top: 20px;
  right: 24px;
  width: 34px;
  height: 34px;
  cursor: pointer;
}
.bv-line {
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
.bv-title {
  font-size: $font-size-24;
  font-family: $font-AM;
  font-weight: 500;
  color: $color-ffffff;
  position: absolute;
  left: 24px;
  top: 24px;
}
// .vd-title {
//   position: absolute;
//   padding: 8px 16px;
//   display: inline-block;
//   left: 0;
//   top: 0;
//   background: rgba(0, 0, 0, 0.5);
//   font-size: $font-size-20;
//   color: $color-ffffff;
//   font-weight: $font-weight-400;
//   &.h-center {
//     left: 50%;
//     transform: translate(-50%, 0);
//   }
// }
</style>
