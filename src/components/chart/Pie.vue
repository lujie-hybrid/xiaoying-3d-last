<template>
  <div
    :id="id"
    class="pie-chart"
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
    formatter: Function,
  },
  components: {},
  data() {
    return {
      defaultOption: {
        tooltip: {},
        title: {
          left: "center",
          top: "34%",
          textStyle: {
            color: "#fff",
            fontSize: 17,
            fontWeight: 500,
          },
          subtextStyle: {
            color: "#fff",
            fontSize: 15,
            fontWeight: 500,
          },
        },
        color: ["#00ACFF", "#78F7FD", "#DE0202", "#BF6900"],
        series: [
          {
            type: "pie",
            radius: ["55%", "75%"],
            height: this.option.height,
            label: {
              color: "#fff",
              fontSize: 14,
              fontWeight: 400,
              formatter: this.formatter || {},
            },
            labelLine: {
              // smooth: true,
              length: 5,
              length2: 30,
              minTurnAngle: 30,
              maxSurfaceAngle: 60,
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
      console.log(r, "pie setting");
      this.chart.setOption(r);
    },
  },
};
</script>
<style lang="scss" scoped>
.pie-chart {
  width: 100%;
}
</style>
