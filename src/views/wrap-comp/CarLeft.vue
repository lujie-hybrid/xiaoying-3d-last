<template>
  <v-inner>
    <!-- <v-unit is-top title="车位状态（实时）" no-right>
      <v-warning-car></v-warning-car>
    </v-unit> -->
    <template v-if="east && east.length > 0">
      <v-unit
        v-for="(item, i) in east"
        mini
        :key="i"
        :title="`东门${item.inOrOut ? '进' : '出'}通行车辆信息`"
        no-right
      >
        <div class="cl-img-wrap">
          <el-image class="cl-img" fit="cover" :src="item.imagePath"></el-image>
        </div>
        <p class="cl-tip">
          <img src="~@/assets/images/car-fill.png" />
          <span>{{ item.carcode }}</span>
          <span>{{ item.username }}</span>
          <span>{{ item.chartypename }}</span>
          <span>{{ item.useraddress }}</span>
        </p>
      </v-unit>
    </template>
    <template v-if="west && west.length > 0">
      <v-unit
        mini
        v-for="(item, i) in west"
        :key="i"
        :title="`西门${item.inOrOut ? '进' : '出'}通行车辆信息`"
        no-right
      >
        <div class="cl-img-wrap">
          <el-image class="cl-img" fit="cover" :src="item.imagePath"></el-image>
        </div>
        <p class="cl-tip">
          <img src="~@/assets/images/car-fill.png" />
          <span>{{ item.carcode }}</span>
          <span>{{ item.username }}</span>
          <span>{{ item.chartypename }}</span>
          <span>{{ item.useraddress }}</span>
        </p>
      </v-unit>
    </template>
  </v-inner>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  created() {
    // this.$refs.eastVideo.player.play();
    // this.$refs.westVideo.player.play();
    this.$skt.send({ xiaoying: "access_carstus" });
    this.$skt.send({ xiaoying: "access_careast" });
    this.$skt.send({ xiaoying: "access_carwest" });
    this.$render.setCameraInfo({
      center_coord: "72362.34375,112950.742188",
      coord_type: 1,
      arm_distance: "55.000019",
      pitch: "30.0",
      yaw: "25.114502",
    });
    // this.$render.removeCovering("home_range");
    this.$render.showHideCovering("home_range", false);
    this.$store.commit("set_value", { key: "hignlight", val: false });
  },
  computed: {
    ...mapState("car", {
      east: (state) => state.eastCar,
      west: (state) => state.westCar,
    }),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.cl-tip {
  font-size: 13px;
  font-weight: $font-weight-400;
  color: $color-ffffff;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 2px;
  > img {
    width: 16px;
    margin-right: 8px;
  }
  > span {
    margin-left: 10px;
    &:nth-child(2) {
      margin-left: 0;
    }
  }
}
.cl-img {
  width: 340px;
  height: 140px;
  margin: 7px 0;
  &-wrap {
    display: flex;
    justify-content: center;
  }
}
</style>
