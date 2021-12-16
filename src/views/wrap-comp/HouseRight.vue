<template>
  <v-inner is-right>
    <v-unit :title="`总缴费金额统计（${year}年）`" no-right>
      <house-progress
        v-if="list && list.length > 0"
        :list="list"
      ></house-progress>
    </v-unit>
    <v-unit :title="`各楼&月度缴费金额统计（${year}年）`" has-foot no-right>
      <template #header-foot>
        <div class="hr-tag">
          <p
            @click="clickTag(tg)"
            :class="{ active: tagIndex == tg.dictValue }"
            v-for="(tg, t) in tagList"
            :key="t"
          >
            {{ tg.dictLabel }}
          </p>
        </div>
      </template>
      <my-bar
        ref="hr_ref_build"
        id="hr-bar-1"
        :y-label-format="barOption.yFormat"
        :option="barOption"
      ></my-bar>
      <div class="hr-tip-wrap"><p class="hr-tip">- 各楼缴费金额统计 -</p></div>
      <my-line
        id="hr-bar-2"
        ref="hr_ref_month"
        :y-label-format="lineOption.yFormat"
        :option="lineOption"
        :label-format="lineOption.labelFormat"
      ></my-line>
      <div class="hr-tip-wrap">
        <p class="hr-tip no-border">- 月度缴费金额统计 -</p>
      </div>
    </v-unit>
    <house-stat v-if="houseStatShow" :visible="houseStatShow"></house-stat>
  </v-inner>
</template>

<script>
import HouseProgress from "@comp/house/HouseProgress";
import MyBar from "@comp/chart/Bar";
import MyLine from "@comp/chart/Line";
import { dealChartValue, clickNav } from "@u/common";
import { mapState, mapMutations } from "vuex";
import HouseStat from "@/views/wrap-comp/HouseStat";
import { getNowYear } from "@u/date";
export default {
  components: { HouseProgress, MyLine, MyBar, HouseStat },
  data() {
    return {
      year: getNowYear(),
      barOption: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        yFormat(value) {
          if (value === 0) {
            return "";
          }
          return value / 10000 + " 万";
        },
        height: 260,
        legend: {
          data: ["总金额", "已缴纳金额"],
          top: 15,
          left: 20,
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
          left: 45,
          top: 50,
          right: 0,
          bottom: 0,
          height: 190,
          containLabel: false,
        },
        yAxis: {
          type: "value",
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
            name: "总金额",
            itemStyle: {
              color: "#59B6BB",
              borderWidth: 1,
              borderColor: "#78F7FD",
              shadowColor: "#EBFEFF",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
          },
          {
            barWidth: 16,
            data: [],
            name: "已缴纳金额",
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
          },
        ],
      },
      lineOption: {
        yFormat(value) {
          if (value === 0) {
            return "";
          }
          return value / 10000 + " 万";
        },
        labelFormat(params) {
          return dealChartValue(params.value);
        },
        height: 270,
        legend: {
          data: ["总金额", "已缴纳金额"],
          top: 15,
          left: 40,
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
          left: 45,
          top: 60,
          right: 0,
          bottom: 0,
          height: 190,
          containLabel: false,
        },
        yAxis: {
          type: "value",
          // max: 100000,
          // interval: 20000,
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
            name: "总金额",
            type: "line",
            symbolSize: 8,
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
              fontSize: 8,
              fontWeight: 500,
              color: "#66BFDE",
            },
          },
          {
            barWidth: 16,
            data: [],
            name: "已缴纳金额",
            type: "line",
            symbolSize: 8,
            itemStyle: {
              color: "#FAAD14",
              borderWidth: 1,
              borderColor: "#FAAD14",
              shadowColor: "#FFFFFF",
              shadowBlur: "3px",
              shadowOffsetX: 0,
              shadowOffsetY: "1px",
            },
            lineStyle: {
              type: "dashed",
            },
            label: {
              show: true,
              fontSize: 8,
              fontWeight: 500,
              color: "#FAAD14",
            },
          },
        ],
      },
      list: [],
      tagList: [],
      tagIndex: "-1",
    };
  },
  computed: {
    ...mapState("house", {
      houseStatShow: (state) => state.statShow,
    }),
  },
  mounted() {
    this.$api.house.getViewNew().then((res) => {
      this.list = res || [];
    });
    this.getDictData();
    this.getData();
  },
  methods: {
    ...mapMutations("house", ["set_value"]),
    // 获取搜索条件数据
    getDictData() {
      this.$api.house.getDict().then((res) => {
        this.tagList = res.feeTypeDictDataModels || [];
      });
    },
    // 点击tag进行筛选
    clickTag(tg) {
      this.tagIndex = tg.dictValue;
      this.getData();
    },
    // 获取数据
    getData() {
      this.$api.house
        .getBuildNewData({ feeType: this.tagIndex })
        .then((res) => {
          const d1 = res || [];
          this.barOption.xAxis.data = d1.map((d) => d.name);
          this.barOption.series[0].data = d1.map((d) => d.totalMoney);
          this.barOption.series[1].data = d1.map((d) => d.totalPayMoney);
          this.$refs.hr_ref_build && this.$refs.hr_ref_build.setChartData();
        });
      this.$api.house
        .getMonthNewData({ feeType: this.tagIndex })
        .then((res) => {
          const d2 = res || [];
          this.lineOption.xAxis.data = d2.map((d) => `${d.month}月`);
          this.lineOption.series[0].data = d2.map((d) => d.totalMoney);
          this.lineOption.series[1].data = d2.map((d) => d.totalPayMoney);
          this.$refs.hr_ref_month && this.$refs.hr_ref_month.setChartData();
        });
    },
    // 各楼&月度缴费金额统计 查看详情
    getDetail() {
      this.set_value({ key: "statShow", val: true });
    },
    clickNav,
  },
};
</script>
<style lang="scss" scoped>
.hr-tag {
  background: rgba(120, 247, 253, 0.3);
  padding: 8px 0 8px 23px;
  display: flex;
  border: 1px solid $color-78F7FD;
  border-top: 1px dashed $color-DBDBDB;
  margin-bottom: 8px;
  > p {
    width: 62px;
    height: 22px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
    line-height: 22px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: 8px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
    &.active {
      background-color: #dd9900;
    }
  }
}
.hr-tip {
  font-weight: $font-weight-400;
  font-size: $font-size-12;
  line-height: 17px;
  color: $color-ffffff;
  padding: 8px 0;
  border-bottom: 1px dashed $color-D8D8D8;
  width: 364px;
  text-align: center;
  &-wrap {
    display: flex;
    justify-content: center;
  }
  &.no-border {
    border-bottom: none;
  }
}
</style>
