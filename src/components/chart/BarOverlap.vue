<template>
  <div
    :id="id"
    class="bar-chart"
    :style="{ height: `${option.height || 160}px` }"
  ></div>
</template>

<script>
import { objFunc } from "@u/3d";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    option: {
      type: Object,
      default: () => ({}),
    },
    tooltipFunc: Function,
    labelFormatter: Function,
  },
  components: {},
  data() {
    return {
      defaultOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: this.tooltipFunc || {},
        },
        legend: {
          data: ["空置率", "入住率"],
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
          type: "value",
          show: false,
        },
        grid: {
          left: 63,
          top: 50,
          right: 20,
          bottom: 14,
          height: this.option,
        },
        yAxis: {
          type: "category",
          data: [],
          splitLine: {
            show: false,
          },
          axisTick: { show: false },
          axisLabel: {
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 400,
          },
          axisLine: {
            show: false,
          },
        },

        series: [
          {
            name: "",
            type: "bar",
            stack: "total",
            label: {
              offset: [0, 1.5],
              show: false,
              formatter: this.labelFormatter || "{c}%",
              color: "#192D34",
              fontSize: 12,
              fontWeight: 400,
            },
            barWidth: 16,
            data: [],
            itemStyle: {
              color: "#DD9900",
              borderWidth: 1,
              borderColor: "#FAAD14",
              shadowColor: "#FFFFFF",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
          },
          {
            name: "",
            type: "bar",
            data: [],
            stack: "total",
            label: {
              offset: [0, 1.5],
              show: false,
              formatter: "{c}%",
              color: "#ffffff",
              fontSize: 12,
              fontWeight: 400,
            },
            barWidth: 16,
            itemStyle: {
              color: "#55B2B6",
              borderWidth: 1,
              borderColor: "#66BFDE",
              shadowColor: "#78F7FD",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.chart = this.$chart.init(document.getElementById(this.id));
    this.setChartData();
  },
  methods: {
    resizeChart() {
      setTimeout(() => {
        this.chart && this.chart.resize();
      }, 100);
    },
    setChartData() {
      const o = JSON.parse(JSON.stringify(this.option));
      const r = objFunc.merge(this.defaultOption, o);
      console.log(r, "----------");
      this.chart.setOption(r);
    },
  },
};
</script>
<style lang="scss" scoped>
.bar-chart {
  width: 100%;
}
</style>
