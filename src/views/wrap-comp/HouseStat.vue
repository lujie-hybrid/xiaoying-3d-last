<template>
  <el-dialog
    append-to-body
    custom-class="base-dialog"
    :visible="visible"
    fullscreen
  >
    <div class="house">
      <v-header></v-header>
      <div class="house-title">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <p class="house-title-text">各楼栋缴费金额情况统计图</p>
        <v-date-time @change="getListData" :time.sync="time"></v-date-time>
      </div>
      <div class="unit-line">
        <p></p>
        <p></p>
        <p></p>
      </div>
      <v-scroll class="chart-wrap">
        <ul class="house-list">
          <li v-for="(item, i) in data" :key="i">
            <my-bar
              :ref="`ref_bar_${i}`"
              :y-label-format="barOption.yFormat"
              :label-format="barOption.labelFormat"
              :id="`house-bar-${i}`"
              :option="item.barOption"
            ></my-bar>
            <p class="house-tip">- {{ item.name }}缴费金额情况统计图 -</p>
            <p class="house-month">{{ item.name }}</p>
          </li>
        </ul></v-scroll
      >
    </div>
  </el-dialog>
</template>

<script>
import MyBar from "@comp/chart/Bar";
import { getStartToNow } from "@u/date";
import { dealChartValue } from "@u/common";
import { mapMutations } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: { MyBar },
  data() {
    return {
      barOption: {
        yFormat(value) {
          if (value === 0) {
            return "";
          }
          return value / 10000 + " 万";
        },
        labelFormat(params) {
          return dealChartValue(params.value);
        },
        height: 340,
        legend: {
          data: ["总金额", "已缴纳金额"],
          top: 18,
          left: 16,
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
          left: 55,
          top: 55,
          right: 50,
          bottom: 0,
          height: 250,
          containLabel: false,
        },
        yAxis: {
          type: "value",
          max: 32000,
          interval: 4000,
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
      time: getStartToNow(), //时间
      data: [],
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    ...mapMutations("house", ["set_value"]),
    // 获取年度数据
    getListData() {
      this.$api.house
        .getAllDataNew({ startTime: this.time[0], endTime: this.time[1] })
        .then((res) => {
          const list = res.map((r) => {
            r.barOption = JSON.parse(JSON.stringify(this.barOption));
            const l = r.feeDetailUnitModels || [];
            r.barOption.series[0].data = l.map((item) => item.totalMoney);
            r.barOption.series[1].data = l.map((item) => item.payTotalMoney);
            r.barOption.xAxis.data = l.map((item) => item.feeTypeName);
            return r;
          });
          this.data = list;
          this.$nextTick(() => {
            list.forEach((ele, i) => {
              const refName = `ref_bar_${i}`;
              this.$refs[refName] && this.$refs[refName][0].setChartData();
            });
          });
        });
    },
    // 返回
    goBack() {
      this.set_value({ key: "statShow", val: false });
    },
  },
};
</script>
<style lang="scss" scoped>
.house {
  padding: 148px 30px 0 30px;
  &-title {
    display: flex;
    align-items: center;
    color: $color-ffffff;
    font-size: $font-size-24;
    &-text {
      font-family: $font-AM;
      font-weight: $font-weight-500;
      margin-left: 32px;
      margin-right: 130px;
    }
    > i {
      cursor: pointer;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 440px;
      height: 392px;
      padding: 10px;
      background: url("~@/assets/images/house-stat-bg.png") no-repeat left top;
      background-size: 100% 100%;
      margin: 0 30px 30px 0;
      display: flex;
      align-items: center;
      //   justify-content: center;
      flex-direction: column;
      position: relative;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &.bottom {
        margin-bottom: 0;
      }
    }
  }
  &-select {
    margin-left: 60px;
    width: 144px;
  }
  &-tip {
    // margin-top: 10px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
  }
  &-month {
    position: absolute;
    top: 28px;
    right: 33px;
    font-weight: bold;
    font-family: $font-AB;
    color: $color-ffffff;
    font-size: $font-size-18;
    line-height: 22px;
  }
}
.unit-line {
  display: flex;
  align-items: center;
  margin: 16px 0 7px 0;
  > p:nth-child(1),
  > p:nth-child(3) {
    width: 7px;
    height: 7px;
    background: $color-78F7FD;
  }
  > p:nth-child(2) {
    flex: 1;
    height: 1px;
    border: 1px dashed $color-DBDBDB;
    margin: 0 4px;
  }
}
.chart-wrap {
  height: calc(100vh - 220px);
}
</style>
