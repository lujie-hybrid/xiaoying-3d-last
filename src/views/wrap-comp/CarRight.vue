<template>
  <v-inner is-right>
    <v-unit is-top title="入营车辆类型统计" no-right>
      <div class="home-pie" v-if="pieOption.series[0].data.length > 0">
        <my-pie ref="pie" id="pie" :option="pieOption"></my-pie>
        <p class="home-pie-tip">- 当月入营车辆类型统计表 -</p>
      </div>
    </v-unit>
    <v-unit no-right title="月度入营车辆类型统计">
      <div class="home-bar">
        <my-bar ref="bar" id="bar" :option="barOption"></my-bar>
        <p class="home-bar-tip">- 月度访客车辆入营次数统计表 -</p>
      </div>
      <template #header-right>
        <div class="bar-right">
          <div class="bar-right-left">
            <p
              @click="clickBarRight(bro)"
              :class="{ active: barRightValue === bro.value }"
              v-for="bro in barRightOption"
              :key="bro.value"
            >
              {{ bro.label }}
            </p>
          </div>
          <p @click="showMore">
            更多<img src="~@/assets/images/arrow-right.png" />
          </p>
        </div>
      </template>
    </v-unit>
    <car-stat v-if="carYearShow" :visible="carYearShow"></car-stat>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import MyBar from "@comp/chart/Bar";
import CarStat from "@/views/wrap-comp/CarStat";
import { fillMonth, getDictLabel } from "@u/common";
import { mapState, mapMutations } from "vuex";

export default {
  components: { MyPie, MyBar, CarStat },
  data() {
    return {
      pieOption: {
        height: 210,
        title: {
          text: "927",
          subtext: "总车次",
        },
        series: [
          {
            name: "当月入营车辆类型统计",
            data: [],
          },
        ],
      },
      barOption: {
        height: 345,
        yAxis: { data: [] },
        xAxis: { name: "车辆数" },
        series: [{ data: [], name: "月度车辆入营" }],
      },
      barRightValue: "",
      visible: false,
    };
  },
  computed: {
    ...mapState({
      barRightOption: (state) => state.dict[state.dictKeys[2]],
      carYearShow: (state) => state.car.carYearShow,
    }),
  },
  created() {
    this.barRightValue = this.barRightOption[0].value;
    this.getData();
  },
  methods: {
    ...mapMutations({
      set_car_value: "car/set_value",
    }),
    showMore() {
      this.set_car_value({ key: "carYearShow", val: true });
    },
    // 初始化获取右边的数据
    getData() {
      this.$api.car.getInCar().then((res) => {
        const list = res.list || [];
        const r = list.map((item) => ({
          value: item.num,
          name: getDictLabel(2, item.cartype) + "车辆",
        }));
        this.pieOption.series[0].data = r;
        this.pieOption.title.text = res.count;
        this.$refs.pie && this.$refs.pie.setChartData();
      });
      this.getRightBottom();
    },
    // 月度入营车辆类型统计
    getRightBottom() {
      this.$api.car
        .getInMonthCar({ chartype: this.barRightValue })
        .then((res) => {
          const list = res || [];
          const newList = fillMonth(list, "num");
          this.barOption.yAxis.data = newList.map((item) => `${item.month}月`);
          this.barOption.series[0].data = newList.map((item) => item.num);
          this.$refs.bar && this.$refs.bar.setChartData();
        });
    },
    // 点击tab切换，获取数据
    clickBarRight(bro) {
      this.barRightValue = bro.value;
      this.getRightBottom();
    },
  },
};
</script>
<style lang="scss" scoped>
.home-pie {
  &-tip {
    margin-bottom: 16px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
  }
}
.home-bar {
  padding: 16px 0;
  &-tip {
    margin-top: 15px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
  }
}
.bar-right {
  display: flex;
  align-items: center;
  margin-right: 16px;
  &-left {
    display: flex;
    align-items: center;
    > p {
      background: rgba(255, 255, 255, 0.2);
      color: $color-E1E1E1;
      font-size: $font-size-12;
      font-weight: $font-weight-400;
      width: 36px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 4px;
      &:first-child {
        margin-left: 0;
      }
      &.active {
        background-color: $color-DD9900;
      }
    }
  }
  > p {
    font-weight: $font-weight-400;
    font-size: $font-size-14;
    color: $color-ffffff;
    margin-left: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    > img {
      width: 12px;
      margin-left: 1px;
      height: 12px;
    }
  }
}
</style>
