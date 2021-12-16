<template>
  <div
    :id="id"
    class="vd"
    :style="{ width: width + 'px', height: height + 'px' }"
  ></div>
</template>

<script>
import VPlayer from "@/plugins/player";

export default {
  props: {
    // 地址
    url: {
      type: String,
      default: "",
    },
    // 视频id
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 380,
    },
    height: {
      type: Number,
      default: 212,
    },
    // 当前播放的窗口index
    indexNum: {
      type: Number,
      default: 0,
    },
    // 分离的窗口个数
    splitNum: {
      type: Number,
      default: 1,
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.initVideo();
  },
  beforeDestroy() {
    this.pr.destroy();
  },
  methods: {
    // 初始化
    initVideo() {
      this.pr = new VPlayer({
        szId: this.id,
        width: this.width,
        height: this.height,
        iCurrentSplit: this.splitNum,
        iMaxSplit: 4,
        style: {
          border: "none",
          borderSelect: "none",
          background: "rgba(0,0,0,0.5)",
        },
      });
      this.pr.globalSetting();
      this.pr.play(this.url, { playURL: this.url }, 0);
    },
  },
};
</script>
<style lang="scss" scoped></style>
