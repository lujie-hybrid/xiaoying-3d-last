<template>
  <v-inner>
    <v-unit title="监控列表" no-right>
      <v-tree
        @clicked="clickCollapse"
        v-if="list && list.length > 0"
        :list="list"
        :id="value"
      ></v-tree>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },

  computed: {
    ...mapState("video", {
      poi: (state) => state.poi,
      value: function (state) {
        let msg = { value: "" };
        this.filterList(this.list, msg, state.poi);
        return msg.value;
      },
    }),
  },
  mounted() {
    this.$api.video.getCameraList().then((res) => {
      const r = res || [];
      this.loopList(r);
      this.list = r;
    });
    // this.$api.video.getDefaultPOI().then((res) => {
    //   const cameraIndexCode = this.poi || res.cameraIndexCode;
    //   if (cameraIndexCode) {
    //     if (!this.poi) {
    //       this.set_video_value({ key: "poi", val: cameraIndexCode });
    //     }
    //     this.getDetail(cameraIndexCode);
    //     this.$render.setPOISelect(`camera_${cameraIndexCode}`);
    //     this.$render.focusCovering(`camera_${cameraIndexCode}`, "poi", 120);
    //   }
    // });
  },
  beforeDestroy() {
    this.set_video_value({ key: "live", val: null });
    this.$render.setPOISelect(`camera_${this.poi}`, false);
    setTimeout(() => {
      this.set_video_value({ key: "poi", val: "" });
    }, 500);
  },
  watch: {
    poi: {
      handler: function (val) {
        if (val) {
          // this.getDetail(val);
          this.clickCollapseIn({ cameraIndexCode: val });
        }
      },
      immediate: true,
    },
  },

  methods: {
    ...mapMutations({
      set_video_value: "video/set_value",
    }),
    loopList(list) {
      list.forEach((item) => {
        // let chds = [];
        // let cameraList = [];
        // if (item.children && item.children.length > 0) {
        //   chds = item.children.map((chd) => ({
        //     ...chd,
        //     name: chd.regionName,
        //   }));
        // }

        // if (item.cameraListModels && item.cameraListModels.length > 0) {
        //   // const child = JSON.parse(JSON.stringify(item.children));
        //   cameraList = item.cameraListModels.map((d) => ({
        //     ...d,
        //     name: d.cameraName,
        //     danger: d.isAlarm,
        //   }));
        // }
        const chds = item.children || [];
        const cameraList = item.cameraListModels || [];
        item.name = item.regionName || item.cameraName;
        item.danger = item.isAlarm || false;
        item.chds = [...cameraList, ...chds];
        this.loopList(item.chds);
      });
    },
    filterList(list, msg, val) {
      if (list && list.length > 0) {
        list.forEach((item) => {
          if (item.chds && item.chds.length > 0) {
            this.filterList(item.chds, msg, val);
          }
          if (item.cameraIndexCode && item.cameraIndexCode == val) {
            msg.value = item.id;
          }
          return false;
        });
      }
    },
    // 获取详情
    getDetail(cameraCode) {
      this.$api.video.getCameraLive({ cameraCode }).then((res) => {
        this.set_video_value({ key: "live", val: res.preViewModel || {} });
        // this.set_video_value({ key: "history", val: res.playBackModels });
        this.set_video_value({
          key: "records",
          val: res.eventRecordsListModels,
        });
      });
    },
    // 点击Collapse
    clickCollapse(chd) {
      this.set_video_value({
        key: "poi",
        val: chd.cameraIndexCode,
      });
    },
    // 点击左边监控获取详情
    clickCollapseIn(chd) {
      this.getDetail(chd.cameraIndexCode);
      this.$render.setPOISelect(`camera_${chd.cameraIndexCode}`);
      this.$render.focusCovering(`camera_${chd.cameraIndexCode}`, "poi", 120);
    },
  },
};
</script>
<style lang="scss" scoped></style>
