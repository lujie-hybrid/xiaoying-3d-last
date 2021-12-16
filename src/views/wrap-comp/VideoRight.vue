<template>
  <v-inner is-right>
    <v-unit
      is-video
      :code="item.cameraIndexCode"
      v-for="(item, i) in list"
      :key="i"
      :title="item.regionName"
    >
      <v-f-player
        :id="`video-right-player${i}`"
        :code="item.cameraIndexCode"
        :url="item.url"
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
      this.list = res.preViewModels.slice(3);
    });
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
