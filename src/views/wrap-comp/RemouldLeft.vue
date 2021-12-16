<template>
  <v-inner>
    <v-unit title="营区改造项目统计" no-right>
      <my-pie
        :formatter="pieOption.formatter"
        ref="remouldLeftTop"
        id="remould-left-1"
        :option="pieOption"
      ></my-pie>
    </v-unit>
    <v-unit title="营区改造项目工期统计" no-right>
      <my-bar
        id="remould-left-2"
        ref="remouldLeftBottom"
        :y-label-format="barOption.yFormat"
        :option="barOption"
        :label-format="barOption.labelFormat"
      ></my-bar>
    </v-unit>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import MyBar from "@comp/chart/Bar";
export default {
  components: { MyPie, MyBar },
  data() {
    return {
      pieOption: {
        formatter: function (params) {
          return [
            `{one|${params.name}：${params.value}处}`,
            `{two|进度率：${params.percent}%}`,
          ].join("\n");
        },
        height: 240,
        title: {
          text: "",
          subtext: "总改造数",
          top: "38%",
        },
        color: ["#78F7FD", "#FAAD14"],
        series: [
          {
            name: "改造项目",
            data: [],
            radius: ["50%", "70%"],
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
            labelLine: {
              length: 10,
              length2: 15,
            },
          },
        ],
      },
      barOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        labelFormat(params) {
          return params.value + " 天";
        },
        yFormat(value) {
          if (value === 0) {
            return "";
          }
          return value + " 天";
        },
        height: 300,
        legend: {
          data: ["预计工期", "实际完成工期"],
          top: 18,
          left: 15,
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 24,
          icon: "rect",
          textStyle: {
            color: "#ffffff",
            fontSize: 10,
            fontWeight: 500,
          },
        },
        xAxis: {
          data: [],
          type: "category",
          axisLine: {
            show: true,
          },
        },
        grid: {
          left: 40,
          top: 70,
          right: 10,
          bottom: 0,
          height: 195,
          containLabel: false,
        },
        yAxis: {
          type: "value",
          // max: 24000,
          // interval: 4000,
          splitLine: {
            show: false,
          },
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
            name: "预计工期",
            itemStyle: {
              color: "#59B6BB",
              borderWidth: 1,
              borderColor: "#78F7FD",
              shadowColor: "#EBFEFF",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
            label: {
              show: true,
              color: "#FFFFFF",
              fontSize: 8,
              fontWeight: 500,
              position: "top",
            },
          },
          {
            barWidth: 16,
            data: [],
            name: "实际完成工期",
            type: "bar",
            itemStyle: {
              color: "#FAAD14",
              borderWidth: 1,
              borderColor: "#FAAD14",
              shadowColor: "#FFFFFF",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
            label: {
              show: true,
              color: "#FFFFFF",
              fontSize: 8,
              fontWeight: 500,
              position: "top",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.$api.remould.getLeftBottom().then((res) => {
      const list = res || [];
      this.barOption.xAxis.data = list.map((d) => d.name);
      this.barOption.series[0].data = list.map((d) => d.plan);
      this.barOption.series[1].data = list.map((d) => d.reals);
      this.$refs.remouldLeftBottom &&
        this.$refs.remouldLeftBottom.setChartData();
    });

    this.$api.remould.getLeftTop().then((res) => {
      this.pieOption.title.text = res.zgzs;
      this.pieOption.series[0].data = [
        { name: "改造完", value: res.wcs || 0 },
        { name: "待改造", value: res.dgzs || 0 },
        { name: "改造中", value: res.gzs || 0 },
      ];
      this.$refs.remouldLeftTop && this.$refs.remouldLeftTop.setChartData();
    });
    // setTimeout(() => {
    //   this.$render.focusAllCovering();
    // }, 500);
  },
  methods: {},
};
</script>
<style lang="scss" scoped></style>
