<template>
  <v-inner>
    <v-unit is-top title="门禁状态（实时）" @detail="() => clickNav(1)">
      <v-warning
        :list="statusList"
        @item="clickItem"
        :prop-name="{
          name: 'doorName',
          posName: 'buildName',
          desc: 'alarmName',
        }"
      ></v-warning>
    </v-unit>
    <v-unit
      is-video
      :code="east.cameraIndexCode"
      title="东门入营人员通行视频 (实时)"
    >
      <v-f-player
        :code="east.cameraIndexCode"
        ref="eastVideo"
        id="access-left1"
        :url="east.url"
      ></v-f-player>
    </v-unit>
    <v-unit
      is-video
      :code="west.cameraIndexCode"
      title="西门入营人员通行视频 (实时)"
    >
      <v-f-player
        :code="west.cameraIndexCode"
        ref="westVideo"
        id="access-left2"
        :url="west.url"
      ></v-f-player>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { clickNav } from "@u/common";
export default {
  components: {},
  data() {
    return {
      east: {},
      west: {},
    };
  },
  mounted() {
    // this.$refs.eastVideo.player.play();
    // this.$refs.westVideo.player.play();
    this.$skt.send({ xiaoying: "access_alarm" });
    setTimeout(() => {
      // this.$handler.addHighlight();
      this.$render.resetHomeCamera();
    }, 500);
  },
  computed: {
    ...mapState("access", {
      statusList: (state) => state.statusList,
    }),
  },
  created() {
    this.getVideo();
  },
  methods: {
    ...mapMutations("access", ["set_value"]),
    clickNav,
    // 获取视频信息
    getVideo() {
      this.$api.access.getEastVideo().then((res) => {
        this.east = res;
      });
      this.$api.access.getWestVideo().then((res) => {
        this.west = res;
      });
    },
    // seeDetail(type) {
    //   const item = type == "east" ? this.east : this.west;
    //   this.set_value({ key: "id", val: item.id });
    //   clickNav(1);
    // },
    clickItem(item) {
      console.log(item);
      this.set_value({ key: "id", val: item.doorId });
      clickNav(1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
