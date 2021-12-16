<template>
  <el-dialog append-to-body :visible="visible" custom-class="big-video">
    <img
      @click="closeDialog"
      class="bv-close"
      src="~@/assets/images/close.png"
    />
    <p class="bv-title">大屏展示</p>
    <div class="bv-line">
      <p></p>
      <p></p>
      <p></p>
    </div>
    <v-f-player
      :height="790"
      :width="1310"
      :mini="false"
      id="full-screen-video"
      :url="fullScreenUrl"
      class="full-video"
    ></v-f-player>
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
    ...mapState("video", ["fullScreenUrl"]),
  },
  methods: {
    ...mapMutations({
      set_video: "video/set_value",
    }),
    // video关闭
    closeDialog() {
      this.set_video({ key: "fullScreenShow", val: false });
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
.full-video {
  margin: 24px 20px 0 20px;
}
</style>
