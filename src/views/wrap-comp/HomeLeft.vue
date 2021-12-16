<template>
  <v-inner>
    <v-unit title="门禁状态（实时）" @detail="seeDetail('1')">
      <v-home-status
        @item="(item) => toDetail('1', item)"
        label="总门禁数"
        :list="accessList"
        :count="accessCount"
        :prop-name="{
          name: 'doorName',
          posName: 'buildName',
          desc: 'alarmName',
        }"
      ></v-home-status>
    </v-unit>
    <v-unit title="监控状态（实时）" @detail="seeDetail('2')">
      <v-home-status
        @item="(item) => toDetail('2', item)"
        label="总监控点"
        :list="homeRecords"
        :count="count"
      ></v-home-status>
    </v-unit>
    <v-unit title="周界状态（实时）" @detail="seeDetail('3')">
      <v-home-status
        @item="(item) => toDetail('3', item)"
        label="总防区"
        :list="perimeterRecords"
        :count="perimeterCount"
        :prop-name="{ name: 'name', posName: 'regionName', desc: 'statusName' }"
      ></v-home-status>
    </v-unit>
    <!-- <v-unit title="车位状态（实时）" @detail="seeDetail('4')">
      <v-home-car></v-home-car>
    </v-unit> -->
  </v-inner>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { clickNav, clickNavbar } from "@u/common";
export default {
  components: {},
  data() {
    return {
      count: 0,
      perimeterCount: 0,
    };
  },
  mounted() {
    this.getDict(() => {
      this.getCamera();
      this.getPerimeter();
      this.getPOI();
      this.$render && this.$render.resetHomeCamera();
    });
  },
  computed: {
    ...mapState({
      homeRecords: (state) => state.video.homeRecords,
      perimeterRecords: (state) => state.perimeter.records,
      accessList: (state) => state.access.statusList,
      accessCount: (state) => state.access.statusCount,
      homeOver: (state) => state.homeOver,
    }),
  },
  methods: {
    ...mapMutations({
      set_value: "set_value",
      set_video_value: "video/set_value",
      set_access_value: "access/set_value",
      set_house_value: "house/set_value",
      set_perimeter_value: "perimeter/set_value",
      set_dict_value: "set_dict_value",
    }),
    // 获取字典
    getDict(fn) {
      const codes = this.$store.state.dictKeys;
      codes.forEach((code) => {
        this.$api.base.getDict(code).then((res) => {
          const list = res.map((r) => ({
            label: r.dictLabel,
            value: r.dictValue,
          }));
          this.set_dict_value({ key: code, val: list });
          fn && fn();
        });
      });
    },
    getPOI() {
      // 房屋
      const p1 = this.$api.house.getDetailBuild();
      // 门禁
      const p2 = this.$api.access.getHomeAllPoi();
      // 监控
      const p3 = this.$api.video.getVideo();
      // 周界
      const p4 = this.$api.perimeter.getAllData();
      // 改造点
      const p5 = this.$api.remould.getRemouldPOI();
      // 真实房屋
      const p6 = this.$api.house.getDetailBuild({ isAll: 0 });
      Promise.all([p1, p2, p3, p4, p5, p6]).then((arr) => {
        // house
        this.set_house_value({ key: "poiList", val: arr[0] || [] });
        // access
        this.set_access_value({ key: "poiList", val: arr[1] || [] });
        // 监控
        this.set_video_value({
          key: "poiList",
          val: arr[2].cameraListModels || [],
        });
        // 周界
        const r = arr[3].listModels || [];
        this.set_perimeter_value({
          key: "rangeList",
          val: r,
        });
        this.set_value({ key: "homeOver", val: true });
        // 改造点
        const rp = arr[4] || [];
        this.set_value({
          key: "remouldPOI",
          val: rp,
        });
        // 真实房屋
        this.set_house_value({ key: "realList", val: arr[5] || [] });
      });
    },
    // 监控信息
    getCamera() {
      this.$api.video.getHomeCamera().then((res) => {
        const list = res.eventRecordsListModels || [];
        this.set_video_value({
          key: "homeRecords",
          val: list,
        });
        this.count = res.count;
      });
    },
    // 周界信息
    getPerimeter() {
      this.$api.perimeter.getHomeMsg().then((res) => {
        const list = res.worldAlarmListModels || [];
        this.set_perimeter_value({
          key: "records",
          val: list,
        });
        this.perimeterCount = res.count;
      });
    },
    clickNav,
    // 查看详情
    seeDetail(type) {
      if (!this.homeOver) return;
      if (type == "1") {
        clickNavbar("left", 1);
        clickNav(1);
      } else if (type == "2") {
        clickNavbar("left", 2);
        clickNav(1);
      } else if (type == "3") {
        clickNavbar("right", 0);
        clickNav(1);
      }
    },
    // 点击进入详情
    toDetail(type, item) {
      if (!this.homeOver) return;
      if (type == "1") {
        this.set_access_value({ key: "id", val: item.doorId });
        clickNavbar("left", 1);
        clickNav(1);
      } else if (type == "2") {
        this.set_video_value({ key: "poi", val: item.cameraIndexCode });
        clickNavbar("left", 2);
        clickNav(1);
      } else if (type == "3") {
        this.set_perimeter_value({ key: "rangeId", val: item.id });
        clickNavbar("right", 0);
        clickNav(1);
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
