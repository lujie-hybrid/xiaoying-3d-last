<template>
  <el-dialog
    append-to-body
    custom-class="base-dialog"
    :visible="visible"
    fullscreen
  >
    <div class="cst">
      <v-header></v-header>
      <div class="cst-title">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <p class="cst-title-text">月度入营车辆类型圆环统计图详图</p>
        <v-select
          @change="getListData"
          class="cst-select"
          :select="year"
        ></v-select>
      </div>
      <div class="unit-line">
        <p></p>
        <p></p>
        <p></p>
      </div>
      <v-scroll class="chart-wrap">
        <ul class="cst-list">
          <li :class="{ bottom: i > 7 }" v-for="(item, i) in data" :key="i">
            <my-pie
              :ref="`ref_pie_${i}`"
              :id="`cst-pie-${i}`"
              :option="item.pieOption"
            ></my-pie>
            <p class="cst-tip">- {{ item.month }}月入营车辆类型统计表 -</p>
            <p class="cst-month">{{ item.month }}月</p>
          </li>
        </ul>
      </v-scroll>
    </div>
  </el-dialog>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import { getNowYear } from "@u/date";
import { getDictLabel } from "@u/common";
import { mapMutations } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: { MyPie },
  data() {
    return {
      pieOption: {
        height: 195,
        title: {
          text: "",
          subtext: "总车辆数",
        },
        series: [
          {
            name: "入营车辆",
            data: [],
          },
        ],
      },
      year: {
        value: getNowYear(),
        option: [
          { label: "2021年", value: 2021 },
          { label: "2022年", value: 2022 },
          { label: "2023年", value: 2023 },
          { label: "2024年", value: 2024 },
          { label: "2025年", value: 2025 },
          { label: "2026年", value: 2026 },
          { label: "2027年", value: 2027 },
          { label: "2028年", value: 2028 },
          { label: "2029年", value: 2029 },
          { label: "2030年", value: 2030 },
          { label: "2031年", value: 2031 },
        ],
      },
      data: [],
    };
  },
  mounted() {
    this.getListData();
  },
  methods: {
    ...mapMutations("car", ["set_value"]),
    // 获取年度数据
    getListData() {
      this.$api.car.getYearStat({ year: this.year.value }).then((res) => {
        const list = res.map((r) => {
          r.pieOption = JSON.parse(JSON.stringify(this.pieOption));
          r.pieOption.title.text = r.count;
          r.pieOption.series[0].data = r.list.map((item) => ({
            value: item.num,
            name: getDictLabel(2, item.cartype),
          }));
          return r;
        });
        this.data = list;
        this.$nextTick(() => {
          list.forEach((ele, i) => {
            const refName = `ref_pie_${i}`;
            this.$refs[refName] && this.$refs[refName][0].setChartData();
          });
        });
      });
    },
    // 返回
    goBack() {
      this.set_value({ key: "carYearShow", val: false });
    },
  },
};
</script>
<style lang="scss" scoped>
.cst {
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
    }
    > i {
      cursor: pointer;
    }
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      width: 423px;
      height: 248px;
      background: url("~@/assets/images/access-stat-bg.png") no-repeat left top;
      background-size: 100% 100%;
      margin: 0 50px 50px 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      position: relative;
      padding-top: 10px;
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
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
  }
  &-month {
    position: absolute;
    top: 20px;
    left: 24px;
    font-weight: bold;
    font-family: $font-AB;
    color: $color-ffffff;
    font-size: $font-size-30;
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
