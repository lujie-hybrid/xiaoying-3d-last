<template>
  <v-inner is-right>
    <v-unit title="入营人员类型统计" @detail="seeDetail('1')">
      <div class="home-pie" v-if="pieOption1.series[0].data.length > 0">
        <my-pie ref="home_pie1" id="pie1" :option="pieOption1"></my-pie>
        <p class="home-pie-tip">- 当月入营人员类型统计表 -</p>
      </div>
    </v-unit>
    <v-unit title="入营车辆类型统计" no-right>
      <div class="home-pie" v-if="pieOption2.series[0].data.length > 0">
        <my-pie ref="home_pie2" id="pie2" :option="pieOption2"></my-pie>
        <p class="home-pie-tip">- 当月入营车辆类型统计表 -</p>
      </div>
    </v-unit>
    <v-unit title="房屋总入住状态统计" @detail="seeDetail('2')">
      <my-pie
        :formatter="pieOption3.formatter"
        ref="home_pie3"
        id="pie3"
        :option="pieOption3"
      ></my-pie>
    </v-unit>
    <v-unit title="总缴费金额统计" @detail="seeDetail('3')">
      <house-progress
        v-if="list && list.length > 0"
        mg="8px 2px"
        :list="list"
      ></house-progress>
    </v-unit>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import HouseProgress from "@comp/house/HouseProgress";
import { getDictLabel, clickNav, clickNavbar } from "@u/common";
export default {
  components: { MyPie, HouseProgress },
  data() {
    return {
      pieOption1: {
        height: 138,
        title: {
          text: "",
          subtext: "总人数",
        },
        series: [
          {
            name: "总人数",
            radius: ["60%", "80%"],
            data: [],
          },
        ],
      },
      pieOption2: {
        height: 138,
        title: {
          text: "",
          subtext: "总车辆数",
        },
        series: [
          {
            name: "总车辆数",
            radius: ["60%", "80%"],
            data: [],
          },
        ],
      },
      pieOption3: {
        formatter: function (params) {
          console.log(params, "params");
          return [
            `{one|${params.name}数：${params.value}户}`,
            `{two|${params.name}率：${params.percent}%}`,
          ].join("\n");
        },
        height: 156,
        title: {
          text: "",
          subtext: "总房屋数",
        },
        color: ["#78F7FD", "#FAAD14"],
        series: [
          {
            name: "房屋入住",
            radius: ["56%", "76%"],
            data: [],
            label: {
              show: true,
              rich: {
                one: {
                  color: "#ffffff",
                  lineHeight: 14,
                  fontSize: 12,
                  fontWeight: 400,
                },
                two: {
                  color: "#ffffff",
                  lineHeight: 13,
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
            },
          },
        ],
      },
      list: [],
    };
  },
  mounted() {
    this.$api.house.getViewNew().then((res) => {
      this.list = res || [];
    });
    this.$api.house.getView().then((res) => {
      this.pieOption3.title.text = res.houseTotalCount;
      this.pieOption3.series[0].data = [
        { name: "空置", value: res.houseTotalCount - res.userHouseCount },
        { name: "入住", value: res.userHouseCount },
      ];
      this.$refs.home_pie3 && this.$refs.home_pie3.setChartData();
    });
    this.$api.car.getInCar().then((res) => {
      const list = res.list || [];
      const r = list.map((item) => ({
        value: item.num,
        name: getDictLabel(2, item.cartype) + "车辆",
      }));
      this.pieOption2.series[0].data = r;
      this.pieOption2.title.text = res.count;
      this.$refs.home_pie2 && this.$refs.home_pie2.setChartData();
    });
    this.$api.access.getInPeople().then((res) => {
      const list = res.accessRecordDtos || [
        {
          passCount: 0,
          personTypeDict: 1,
        },
        {
          passCount: 0,
          personTypeDict: 2,
        },
      ];
      const r = list.map((item) => ({
        value: item.passCount,
        name: getDictLabel(0, item.personTypeDict),
      }));
      this.pieOption1.series[0].data = r;
      this.pieOption1.title.text = res.count || 0;
      this.$refs.home_pie1 && this.$refs.home_pie1.setChartData();
    });
  },
  methods: {
    // 查看详情
    seeDetail(type) {
      if (type == "1") {
        clickNavbar("left", 1);
        clickNav(1);
      } else if (type == "2") {
        clickNavbar("right", 2);
        clickNav(1);
      } else if (type == "3") {
        clickNavbar("right", 2);
        clickNav(1);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.home-pie {
  &-tip {
    margin-bottom: 8px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
  }
}
</style>
