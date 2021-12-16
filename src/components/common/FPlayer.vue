<template>
  <div :class="['rel', { 'player-wrap': mini }]">
    <iframe
      :height="height"
      :width="width"
      v-if="url"
      :src="`${baseUrl}/vdf?w=${width}&h=${height}&u=${url}&id=${id}`"
    ></iframe>
    <i v-if="mini" @click="showFull" class="el-icon-full-screen full-icon"></i>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
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
    // 是否是小型的
    mini: {
      type: Boolean,
      default: true,
    },
    width: {
      type: Number,
      default: 380,
    },
    height: {
      type: Number,
      default: 212,
    },
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_FRAME,
    };
  },
  methods: {
    ...mapMutations({
      set_video: "video/set_value",
    }),
    showFull() {
      this.set_video({ key: "fullScreenUrl", val: this.url });
      this.set_video({ key: "fullScreenShow", val: true });
    },
  },
};
</script>
<style lang="scss" scoped>
.player-wrap {
  margin: 8px 10px;
}
.full-icon {
  position: absolute;
  bottom: 9px;
  right: 3px;
  color: $color-ffffff;
  font-size: 18px;
  cursor: pointer;
}
</style>
