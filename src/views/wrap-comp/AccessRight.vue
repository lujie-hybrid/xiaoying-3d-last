<template>
  <v-inner is-right>
    <v-unit is-top title="入营人员类型统计" @detail="() => clickNav(1)">
      <div class="home-pie" v-if="pieOption.series[0].data.length > 0">
        <my-pie ref="pie" id="pie" :option="pieOption"></my-pie>
        <p class="home-pie-tip">- 当月入营人员类型统计表 -</p>
      </div>
    </v-unit>
    <v-unit no-right title="月度入营人员类型统计">
      <div class="home-pie">
        <my-bar
          :style="{ margin: '16px 0' }"
          :x-label-format="barOption.formatter"
          ref="bar"
          id="bar"
          :option="barOption"
        ></my-bar>
        <p class="home-pie-tip">- 月度访客入营次数统计表 -</p>
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
    <access-stat :visible="yearShow"></access-stat>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import MyBar from "@comp/chart/Bar";
import AccessStat from "@/views/wrap-comp/AccessStat";
import { fillMonth, getDictLabel, clickNav } from "@u/common";
import { mapState, mapMutations } from "vuex";

export default {
  components: { MyPie, MyBar, AccessStat },
  data() {
    return {
      pieOption: {
        height: 210,
        title: {
          text: "927",
          subtext: "总人数",
        },
        series: [
          {
            name: "总人数",
            data: [],
          },
        ],
      },
      barOption: {
        formatter(value) {
          return value / 10000 + " 万";
        },
        height: 345,
        yAxis: { data: [] },
        xAxis: {
          name: "人次",
          max: 10000,
          interval: 2000,
        },
        series: [{ data: [], name: "2021年" }],
      },
      barRightValue: "",
      visible: false,
    };
  },
  computed: {
    ...mapState({
      barRightOption: (state) => state.dict[state.dictKeys[0]],
      yearShow: (state) => state.access.yearShow,
    }),
  },
  created() {
    this.barRightValue = this.barRightOption[0].value;
    this.getData();
  },
  methods: {
    clickNav,
    ...mapMutations({
      set_access_value: "access/set_value",
    }),
    showMore() {
      this.set_access_value({ key: "yearShow", val: true });
    },
    // 初始化获取右边的数据
    getData() {
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
        this.pieOption.series[0].data = r;
        this.pieOption.title.text = res.count || 0;
        this.$refs.pie && this.$refs.pie.setChartData();
      });
      this.getRightBottom();
    },
    // 获取月度入营人员类型统计
    getRightBottom() {
      this.$api.access
        .getInMonthPeople({ personType: this.barRightValue })
        .then((res) => {
          const list = res.accessRecordDtos || [];
          const newList = fillMonth(list, "passCount");
          this.barOption.yAxis.data = newList.map((item) => `${item.month}月`);
          this.barOption.series[0].data = newList.map((item) => item.passCount);
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
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
    margin-bottom: 16px;
  }
}
.bar-right {
  display: flex;
  align-items: center;
  margin-right: 14px;
  &-left {
    display: flex;
    > p {
      background: rgba(255, 255, 255, 0.2);
      color: $color-E1E1E1;
      font-size: $font-size-12;
      font-weight: $font-weight-400;
      width: 37px;
      height: 22px;
      text-align: center;
      line-height: 22px;
      cursor: pointer;
      &:last-child {
        margin-left: 8px;
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
    margin-left: 35px;
    display: flex;
    align-items: center;
    cursor: pointer;
    > img {
      width: 12px;
      margin-left: 4px;
      height: 12px;
    }
  }
}
</style>
