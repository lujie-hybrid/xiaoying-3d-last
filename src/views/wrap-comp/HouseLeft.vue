<template>
  <v-inner>
    <v-unit title="房屋总入住状态统计" @detail="() => clickNav(1)">
      <my-pie
        :formatter="pieOption.formatter"
        ref="stat"
        id="h1"
        :option="pieOption"
      ></my-pie>
    </v-unit>
    <v-unit title="各楼房屋入住状态统计" @detail="() => clickNav(1)">
      <bar-overlap
        class="h2-status"
        id="h2"
        ref="status"
        :option="overloapOption"
      ></bar-overlap>
    </v-unit>
    <v-unit title="各楼房屋入住人数统计" @detail="() => clickNav(1)">
      <my-bar
        class="hl-person"
        ref="person"
        id="h3"
        :option="barOption"
      ></my-bar>
    </v-unit>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import MyBar from "@comp/chart/Bar";
import BarOverlap from "@comp/chart/BarOverlap";
import { clickNav } from "@u/common";
export default {
  components: { MyPie, MyBar, BarOverlap },
  data() {
    return {
      pieOption: {
        formatter: function (params) {
          console.log(params, "params");
          return [
            `{one|${params.name}数：${params.value}户}`,
            `{two|${params.name}率：${params.percent}%}`,
          ].join("\n");
        },
        height: 185,
        title: {
          text: "",
          subtext: "总房屋数",
        },
        color: ["#78F7FD", "#FAAD14"],
        series: [
          {
            name: "房屋入住",
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
      overloapOption: {
        legend: {
          data: ["空置率(%)", "入住率(%)"],
        },
        yAxis: {
          data: [],
        },
        height: 280,
        series: [
          {
            name: "空置率(%)",
            data: [],
          },
          {
            name: "入住率(%)",
            data: [],
          },
        ],
      },
      barOption: {
        height: 216,
        xAxis: {
          data: [],
          type: "category",
        },
        grid: {
          left: 40,
          top: 16,
          right: 10,
          bottom: 0,
          height: 170,
          containLabel: false,
        },
        yAxis: {
          max: 500,
          interval: 100,
          splitLine: {
            show: false,
          },
          type: "value",
          axisLine: {
            show: true,
          },
          axisLabel: {
            verticalAlign: "top",
          },
        },
        series: [
          {
            barWidth: 16,
            data: [],
            name: "楼屋入住人数",
          },
        ],
      },
    };
  },
  mounted() {
    this.$api.house.getView().then((res) => {
      this.pieOption.title.text = res.houseTotalCount;
      this.pieOption.series[0].data = [
        { name: "空置", value: res.houseTotalCount - res.userHouseCount },
        { name: "入住", value: res.userHouseCount },
      ];
      this.$refs.stat && this.$refs.stat.setChartData();

      const overlapData = res.bsBuildHouseInfoModels || [];
      this.overloapOption.yAxis.data = overlapData.map((d) => d.name);
      this.overloapOption.series[0].data = overlapData.map(
        (d) => d.unUsageRate
      );
      this.overloapOption.series[1].data = overlapData.map((d) => d.usageRate);
      this.$refs.status && this.$refs.status.setChartData();

      const barData = res.bsBuildEnterMemberInfoModels || [];
      this.barOption.xAxis.data = barData.map((d) => d.name);
      this.barOption.series[0].data = barData.map((d) => d.enterMemberCount);
      this.$refs.person && this.$refs.person.setChartData();
    });
    setTimeout(() => {
      // this.$handler.addHighlight();
      this.$render.resetHomeCamera();
    }, 500);
  },
  methods: {
    clickNav,
  },
};
</script>
<style lang="scss" scoped></style>
