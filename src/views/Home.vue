<template>
  <div class="">
    <div id="base"></div>
    <v-wrap></v-wrap>
    <div
      class="home-imgs"
      v-show="
        navbarType === 'left' && navbarIndex == 0 && renderOver && homeOver
      "
    >
      <img
        @click="clickImg(i)"
        v-for="(item, i) in imgList"
        :key="i"
        :src="currentImgIndex == i ? item[1] : item[0]"
        alt=""
      />
    </div>
    <!-- <el-button
      @click="getInfo"
      :style="{ position: 'fixed', top: '148px', left: '1200px' }"
      >获取镜头信息</el-button
    > -->
    <el-image class="home-covering" fit="cover" :src="covering"></el-image>
    <!-- <el-switch
      class="msg-wrap"
      v-model="showHideMsg"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="msgChange"
    >
    </el-switch> -->
    <!-- <i
      @click="changeHighlight"
      :class="['el-icon-s-opportunity highlight', { hide: !showHight }]"
    ></i> -->
  </div>
</template>

<script>
import { resizeFunc, removeResizeFunc, clickNavbar } from "@u/common";
import MyOperater from "@u/3d-operate";
import { mapMutations, mapState } from "vuex";
import img1 from "@/assets/images/home-img1.png";
import img2 from "@/assets/images/home-img2.png";
import img3 from "@/assets/images/home-img3.png";
import img4 from "@/assets/images/home-img4.png";
// import img5 from "@/assets/images/home-img5.png";
import img1_active from "@/assets/images/home-img1-active.png";
import img2_active from "@/assets/images/home-img2-active.png";
import img3_active from "@/assets/images/home-img3-active.png";
import img4_active from "@/assets/images/home-img4-active.png";
// import img5_active from "@/assets/images/home-img5-active.png";
import img_remould from "@/assets/images/home-remould.png";
import img_remould_active from "@/assets/images/home-remould-active.png";
import covering from "@/assets/images/covering.png";
import Vue from "vue";
// websocket的引入
import Socket from "@/plugins/socket";
export default {
  data() {
    return {
      imgList: [
        [img1, img1_active],
        [img2, img2_active],
        [img3, img3_active],
        [img4, img4_active],
        // [img5, img5_active],
        [img_remould, img_remould_active],
      ],
      covering,
      // showHideMsg: true,
      // showHight: true,
    };
  },
  computed: {
    ...mapState([
      "navbarType",
      "navbarIndex",
      "renderOver",
      "currentImgIndex",
      "homeOver",
      "currentLeftComponent",
    ]),
  },
  mounted() {
    Vue.prototype.$handler = new MyOperater("base");
    resizeFunc(() => {
      this.$render.setResolution();
    });
    const skt = new Socket();
    Vue.prototype.$skt = skt;
  },
  beforeDestroy() {
    removeResizeFunc();
    this.$render.stopRenderCloud();
  },
  methods: {
    ...mapMutations(["set_value"]),
    // changeHighlight() {
    //   this.showHight = !this.showHight;
    //   if (!this.showHight) {
    //     this.$render.removeAllCovering(["highlight_area"]);
    //   } else {
    //     this.$handler.addHighlight();
    //   }
    // },
    clickImg(i) {
      if (this.currentImgIndex == i) {
        this.set_value({ key: "currentImgIndex", val: -1 });
        this.$render.resetHomeCamera();
        if (i == 4) {
          clickNavbar("left", 0);
        }
        if (i == 2) {
          this.$handler.removePerimeter();
        }
        this.$render.removeAllCovering();
        this.$handler.housePOI(true);
      } else {
        this.$render.removeAllCovering();
        this.set_value({ key: "currentImgIndex", val: i });
        if (i != 4 && this.currentLeftComponent != "home-left") {
          clickNavbar("left", 0, false, true);
        }
        switch (i) {
          case 0:
            // this.$handler.addHighlight();
            this.$handler.accessPOI();
            this.$handler.housePOI(true);
            this.$handler.removePerimeter();
            // this.$handler.addHighlight();
            this.$render.showHideCovering("home_range", true);
            this.$store.commit("set_value", { key: "hignlight", val: true });
            this.$render.resetHomeCamera();
            break;
          case 1:
            // this.$handler.addHighlight();
            this.$handler.cameraPOI();
            this.$handler.housePOI(true);
            this.$handler.removePerimeter();
            // this.$handler.addHighlight();
            this.$render.showHideCovering("home_range", true);
            this.$store.commit("set_value", { key: "hignlight", val: true });
            this.$render.resetHomeCamera();
            break;
          case 2:
            this.$handler.addPerimeter();
            this.$handler.housePOI(true);
            this.$render.resetHomeCamera();
            // setTimeout(() => {
            //   this.$render.focusAllCovering("range");
            // }, 500);
            break;
          case 3:
            // this.$render.splitBuild("Build_01");
            // this.$render.removeCovering("home_range");
            this.$render.showHideCovering("home_range", false);
            this.$store.commit("set_value", { key: "hignlight", val: false });
            this.$handler.removePerimeter();
            this.$render.setCameraInfo({
              center_coord: "72362.34375,112950.742188",
              coord_type: 1,
              arm_distance: "55.000019",
              pitch: "30.0",
              yaw: "25.114502",
            });
            break;

          // case 4:
          //   this.$handler.addHighlight();
          //   this.$handler.housePOI();
          //   this.$render.resetHomeCamera();
          //   // 设置房屋镜头
          //   // this.$handler.setHouseCamera();
          //   break;
          case 4:
            // this.$handler.addHighlight();

            this.$render.resetHomeCamera();
            this.set_value({
              key: "currentLeftComponent",
              val: "remould-left",
            });
            this.set_value({
              key: "currentRightComponent",
              val: "remould-right",
            });
            this.$handler.remouldPOI();
            this.$handler.housePOI(true);
            this.$handler.removePerimeter();
            // this.$handler.addHighlight();
            this.$render.showHideCovering("home_range", true);
            this.$store.commit("set_value", { key: "hignlight", val: true });
            break;

          default:
            break;
        }
      }
    },
    msgChange(val) {
      if (val) {
        clickNavbar(this.navbarType, this.navbarIndex);
      } else {
        this.set_value({ key: "currentLeftComponent", val: "" });
        this.set_value({ key: "currentRightComponent", val: "" });
      }
    },
    // getInfo() {
    //   this.$render.getCameraInfo((res) => {
    //     console.log(res);
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.home-imgs {
  position: fixed;
  top: 148px;
  left: 463px;
  > img {
    width: 30px;
    height: 30px;
    margin-right: 40px;
    cursor: pointer;
  }
}
.home-covering {
  position: fixed;
  left: 50%;
  bottom: 0.6vh;
  transform: translate(-52%, 0);
  height: 3.5vh;
  width: 21vh;
}
.msg-wrap {
  position: fixed;
  right: 463px;
  top: 152px;
}
.highlight {
  position: fixed;
  right: 463px;
  top: 152px;
  font-size: $font-size-20;
  color: $color-DD9900;
  &.hide {
    color: #999;
  }
}
</style>
