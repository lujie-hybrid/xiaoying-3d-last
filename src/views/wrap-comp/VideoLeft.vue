<template>
  <v-inner>
    <v-unit
      is-video
      v-for="(item, i) in list"
      :key="i"
      :code="item.cameraIndexCode"
      :title="item.regionName"
    >
      <v-f-player
        :id="`video-left-player${i}`"
        :url="item.url"
        :code="item.cameraIndexCode"
      ></v-f-player>
    </v-unit>
  </v-inner>
</template>

<script>
// import { mapMutations } from "vuex";
// import { clickNav } from "@u/common";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.$api.video.getVideo().then((res) => {
      this.list = res.preViewModels.slice(0, 3);
    });
    setTimeout(() => {
      // this.$handler.addHighlight();
      this.$render.resetHomeCamera();
    }, 500);
  },
  methods: {
    // ...mapMutations("video", {
    //   set_video_value: "set_value",
    // }),
    // showBig() {
    //   this.set_video_value({ key: "navIndex", val: 0 });
    // },
    // seeDetail(item) {
    //   this.set_video_value({ key: "poi", val: item.cameraIndexCode });
    //   clickNav(1);
    // },
  },
};
</script>
<style lang="scss" scoped></style>
