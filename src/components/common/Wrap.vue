<template>
  <div class="wrap">
    <div class="wrap-header">
      <v-header></v-header>
    </div>
    <transition
      appear
      appear-active-class="animate__animated animate__fadeInLeftBig"
      mode="out-in"
      name="left-transition"
      enter-active-class="animate__animated animate__fadeInLeftBig"
      leave-active-class="animate__animated animate__fadeOutLeftBig"
    >
      <component :is="currentLeftComponent"></component>
    </transition>
    <transition
      appear
      appear-active-class="animate__animated animate__fadeInRightBig"
      mode="out-in"
      name="right-transition"
      :enter-active-class="
        noRightComponent
          ? 'animate__animated animate__fadeInRightBig animate__delay-1'
          : 'animate__animated animate__fadeInRightBig'
      "
      leave-active-class="animate__animated animate__fadeOutRightBig"
    >
      <component :is="currentRightComponent"></component>
    </transition>

    <v-nav-child
      v-if="navList && navList.length > 0"
      :width="childNavWidth"
      :nav-list="navList"
    ></v-nav-child>
    <record v-if="recordPageShow" :visible.sync="recordPageShow"></record>
    <v-big-video v-if="videoShow" :visible="videoShow"></v-big-video>
    <v-full-screen-video
      v-if="fullScreenShow"
      :visible="fullScreenShow"
    ></v-full-screen-video>
    <car-record v-if="carRecordShow" :visible.sync="carRecordShow"></car-record>
    <house-record
      v-if="houseRecordShow"
      :visible.sync="houseRecordShow"
    ></house-record>
  </div>
</template>

<script>
import HomeLeft from "@/views/wrap-comp/HomeLeft";
import HomeRight from "@/views/wrap-comp/HomeRight";
// import AccessActualLeft from "@/views/wrap-comp/AccessActualLeft";
// import AccessActualRight from "@/views/wrap-comp/AccessActualRight";
// import VideoLeft from "@/views/wrap-comp/VideoLeft";
// import VideoRight from "@/views/wrap-comp/VideoRight";
// import VideoActualLeft from "@/views/wrap-comp/VideoActualLeft";
// import VideoActualRight from "@/views/wrap-comp/VideoActualRight";
// import PerimeterLeft from "@/views/wrap-comp/PerimeterLeft";
// import PerimeterActualLeft from "@/views/wrap-comp/PerimeterActualLeft";
// import PerimeterActualRight from "@/views/wrap-comp/PerimeterActualRight";
// import Record from "@/views/wrap-comp/AccessRecord";
import { mapState } from "vuex";
export default {
  components: {
    HomeLeft,
    HomeRight,
    AccessRight: () => import("@/views/wrap-comp/AccessRight"),
    AccessLeft: () => import("@/views/wrap-comp/AccessLeft"),
    AccessActualLeft: () => import("@/views/wrap-comp/AccessActualLeft"),
    AccessActualRight: () => import("@/views/wrap-comp/AccessActualRight"),
    Record: () => import("@/views/wrap-comp/AccessRecord"),
    VideoLeft: () => import("@/views/wrap-comp/VideoLeft"),
    VideoRight: () => import("@/views/wrap-comp/VideoRight"),
    VideoActualLeft: () => import("@/views/wrap-comp/VideoActualLeft"),
    VideoActualRight: () => import("@/views/wrap-comp/VideoActualRight"),
    VideoTourLeft: () => import("@/views/wrap-comp/VideoTourLeft"),
    VideoTourRight: () => import("@/views/wrap-comp/VideoTourRight"),
    PerimeterLeft: () => import("@/views/wrap-comp/PerimeterLeft"),
    PerimeterActualLeft: () => import("@/views/wrap-comp/PerimeterActualLeft"),
    PerimeterActualRight: () =>
      import("@/views/wrap-comp/PerimeterActualRight"),
    CarLeft: () => import("@/views/wrap-comp/CarLeft"),
    CarRight: () => import("@/views/wrap-comp/CarRight"),
    CarRecord: () => import("@/views/wrap-comp/CarRecord"),
    HouseLeft: () => import("@/views/wrap-comp/HouseLeft"),
    HouseRight: () => import("@/views/wrap-comp/HouseRight"),
    HouseRecord: () => import("@/views/wrap-comp/HouseRecord"),
    HouseDetailLeft: () => import("@/views/wrap-comp/HouseDetailLeft"),
    HouseDetailRight: () => import("@/views/wrap-comp/HouseDetailRight"),
    RemouldLeft: () => import("@/views/wrap-comp/RemouldLeft"),
    RemouldRight: () => import("@/views/wrap-comp/RemouldRight"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapState([
      // 映射 this.count 为 store.state.count
      "currentLeftComponent",
      "currentRightComponent",
      "recordPageShow",
      "navList",
      "childNavWidth",
      "noRightComponent",
    ]),
    ...mapState({
      videoShow: (state) => state.video.videoShow,
      fullScreenShow: (state) => state.video.fullScreenShow,
      carRecordShow: (state) => state.car.recordShow,
      houseRecordShow: (state) => state.house.recordShow,
    }),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.wrap {
  &-header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 148px;
    background: url("~@/assets/images/bg-top.png") no-repeat left top;
    background-size: 100% 100%;
    // background: linear-gradient(
    //   180deg,
    //   rgba(25, 45, 52, 0.9) 0%,
    //   rgba(18, 30, 34, 0.6) 100%
    // );
    z-index: 1;
  }
}
</style>
