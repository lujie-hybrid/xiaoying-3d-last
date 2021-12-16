<template>
  <v-inner>
    <v-unit
      v-for="(item, i) in tourList"
      :key="i"
      :title="item.cameraName"
      no-right
    >
      <v-f-player :id="`video-left-player${i}`" :url="item.url"></v-f-player>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("video", {
      tourList: (state) => state.tourList.slice(0, 3),
      tourPOIList: (state) => state.tourPOIList,
    }),
  },
  beforeDestroy() {
    this.$render.setCameraToMoveState();
    this.$render.removeAllCovering(["path", "scene_effect"]);
    this.$api.video.endTour();
  },
  mounted() {
    this.$api.video.getTourPOI().then((res) => {
      this.$render.addPath({
        id: "tour_path",
        points: res.map((r) => ({
          coord: `${r.longitude},${r.latitude}`, //路径坐标点 lng,lat
          coord_z: 2, //高度(单位:米)
        })),
      });
      res.forEach((ele) => {
        this.$render.addEffect({
          id: `tour_effect_${ele.id}`,
          coord: `${ele.longitude},${ele.latitude}`,
          title_text: ele.name,
        });
      });

      // setTimeout(() => {
      //   this.$render.focusAllCovering(["path", "poi"]);
      // }, 1000);

      // setTimeout(() => {
      //   this.$render.setCameraToMove("tour_path");
      // }, 1000);

      this.set_value({ key: "tourPOIList", val: res || [] });
      // setTimeout(() => {
      //   this.$skt.send({ xiaoying: "camera_patrol_event" });
      // }, 300);
      this.getFirstData();
    });
  },
  methods: {
    ...mapMutations("video", ["set_value"]),
    getFirstData() {
      this.$api.video.startTourData().then((res) => {
        console.log(res, "res");

        this.set_value({ key: "tourList", val: res.list || [] });
        this.$handler.tourCameraPOI();
        this.$render.updateEffectStyle(this.tourPOIList, res.id);
        this.$render.focusCovering(
          `tour_effect_${res.id}`,
          "scene_effect",
          150
        );
        this.$skt.send({ xiaoying: "camera_patrol_event" });
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
