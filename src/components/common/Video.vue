<template>
  <div
    :id="id"
    class="vd"
    :style="{ width: width + 'px', height: height + 'px' }"
  ></div>
</template>

<script>
import Player from "xgplayer/dist/simple_player";

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
    poster: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {};
  },
  mounted() {
    this.initVideo();
  },
  // beforeDestroy() {
  //   this.pr.destroy();
  // },
  methods: {
    // 初始化
    initVideo() {
      this.player = new Player({
        id: this.id,
        url: this.url,
        width: this.width,
        height: this.height,
        videoInit: true,
        // autoplay: true,
        poster: this.poster,
        // poster: "/404.png",
        // playbackRate: [0.5, 0.75, 1, 1.5, 2], //传入倍速可选数组
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// .vd ::v-deep .xgplayer-start {
//   display: none;
// }
</style>
