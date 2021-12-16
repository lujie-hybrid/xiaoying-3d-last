<template>
  <!-- <ul class="hp no-scrll" :style="{ margin: mg, height: height }">
    <li v-for="(item, i) in list" :key="i">
      <span>{{ item.feeTypeName }}</span>
      <el-progress
        class="hp-progress"
        :stroke-width="16"
        :text-inside="true"
        :show-text="item.usageRate > 20"
        :percentage="item.usageRate"
        :color="i === 0 ? '#DD0000' : '#66BFDE'"
      ></el-progress>
      <span :title="dealChartValue(item.totalMoney)">{{
        dealChartValue(item.totalMoney)
      }}</span>
    </li>
  </ul> -->
  <bar-overlap
    id="h_progress"
    ref="status"
    :label-formatter="overloapOption.labelFormatter"
    :tooltip-func="overloapOption.formatter"
    :option="overloapOption"
  ></bar-overlap>
</template>

<script>
import { dealChartValue } from "@u/common";
import BarOverlap from "@comp/chart/BarOverlap";
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // 间距
    mg: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "92px",
    },
  },
  components: { BarOverlap },
  mounted() {
    const overlapData = this.list;
    this.overloapOption.yAxis.data = overlapData.map((d) => d.feeTypeName);
    this.overloapOption.series[0].data = overlapData.map((d) => d.totalMoney);
    this.$refs.status && this.$refs.status.setChartData();
  },
  data() {
    return {
      overloapOption: {
        // legend: {
        //   data: ["空置率(%)", "入住率(%)"],
        // },
        // formatter(params) {
        //   return dealChartValue(params[0].value);
        // },
        labelFormatter(params) {
          return dealChartValue(params.value);
        },
        yAxis: {
          data: [],
        },
        grid: {
          top: 8,
          bottom: 8,
        },
        height: 132,
        series: [
          {
            name: "缴费金额",
            data: [],
            barWidth: 12,
            label: {
              show: true,
              fontSize: 12,
              fontWeight: 500,
              color: "#fff",
              position: "right",
            },
          },
          {},
        ],
      },
      dealChartValue,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.hp {
  margin: 16px 5px;
  overflow-y: auto;
  padding-right: 5px;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  > li {
    display: flex;
    align-items: center;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    margin-bottom: 8px;
    > span:nth-child(1) {
      margin-right: 8px;
      width: 40px;
    }
    > span:last-child {
      margin-left: 4px;
      display: block;
      width: 55px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: right;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-progress {
    flex: 1;
    ::v-deep .el-progress-bar__outer {
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 0;
    }
    ::v-deep .el-progress-bar__inner {
      border-radius: 0;
      text-align: left;
      .el-progress-bar__innerText {
        margin: 0 9px;
      }
    }
  }
}
</style>
