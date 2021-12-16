<template>
  <v-inner>
    <v-unit :title="`房屋入住状态统计（${buildName}）`" no-right>
      <my-pie
        :formatter="pieOption.formatter"
        ref="stat"
        id="hdl1"
        :option="pieOption"
      ></my-pie>
    </v-unit>
    <v-unit title="房屋列表" no-right>
      <div class="rel">
        <el-carousel
          ref="carousel"
          :loop="false"
          :autoplay="false"
          class="hdl-swiper"
          height="30px"
          indicator-position="none"
          arrow="never"
        >
          <el-carousel-item v-for="(item, i) in buildList" :key="i">
            <ul class="build-wrap">
              <li
                @click="clickBuild(chd)"
                :class="['rel', { active: chd.id == activeIndex }]"
                v-for="chd in item"
                :key="chd.id"
              >
                {{ chd.name }}
                <span class="line"></span>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>
        <i @click="toPrev" class="el-icon-arrow-left hdl-swiper-left arrow"></i>
        <i
          @click="toNext"
          class="el-icon-arrow-right hdl-swiper-right arrow"
        ></i>
      </div>

      <div class="hdl-tag">
        <div class="hdl-status">
          <p></p>
          <p>已入住</p>
          <p></p>
          <p>空置</p>
        </div>
        <v-scroll class="hdl-tag-list">
          <ul class="htl-inner">
            <li
              @click="clickTag(tg)"
              :class="{ empty: tg.status == 1, active: tagActiveId == tg.id }"
              v-for="tg in tagList"
              :title="tg.name"
              :key="tg.id"
            >
              {{ tg.name }}
            </li>
          </ul>
        </v-scroll>
      </div>
    </v-unit>
  </v-inner>
</template>

<script>
import MyPie from "@comp/chart/Pie";
import { mapMutations, mapState } from "vuex";
export default {
  components: { MyPie },
  data() {
    return {
      buildList: [],
      activeIndex: "",
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
      tagList: [],
      tagActiveId: "",
      isInit: true,
    };
  },
  mounted() {
    this.getBuild();
  },
  computed: {
    ...mapState("house", ["poi", "buildName"]),
  },
  beforeDestroy() {
    this.set_value({ key: "poi", val: "" });
  },
  watch: {
    poi: {
      handler: function (val) {
        if (val) {
          this.clickBuild({ id: val }, () => {
            this.findActiveCarousel();
          });
        }
      },
    },
  },
  methods: {
    ...mapMutations("house", ["set_value"]),
    findActiveCarousel() {
      if (this.buildList && this.buildList.length > 0) {
        this.buildList.forEach((list, i) => {
          const r = list.find((d) => d.id == this.activeIndex);
          r && this.$refs.carousel.setActiveItem(i);
        });
      }
    },
    // 上一个
    toPrev() {
      this.$refs.carousel.prev();
    },
    // 下一个
    toNext() {
      this.$refs.carousel.next();
    },
    // 点击 tag
    clickTag(item) {
      if (item.status == 1) return;
      this.tagActiveId = item.id;
      this.getMsg(item.id);
    },
    // 点击楼层
    clickBuild(item, fn) {
      this.activeIndex = item.id;
      this.getHouse(item.id);
      this.getStat(item.id);
      this.$render.setPOISelect(`housereal_${item.id}`);
      this.$render.focusCovering(`housereal_${item.id}`, "poi");
      fn && fn();
    },
    // 获取统计数据
    getStat(buildId) {
      this.$api.house.getStat({ buildId }).then((res) => {
        const r = res.bsBuildHouseInfoModel || {};
        this.set_value({ key: "buildName", val: r.name });
        this.pieOption.title.text = r.totalHouseCount;
        this.pieOption.series[0].data = [
          { name: "空置", value: r.unUseHouseCount },
          { name: "入住", value: r.useHouseCount },
        ];
        this.$refs.stat && this.$refs.stat.setChartData();

        // const l = res.bsBuildFeeDetailModel.feeDetailUnitModels || [];
        // this.set_value({ key: "stat", val: l });
      });
      this.$api.house.getViewNewDetail({ buildId }).then((res) => {
        const l = res || [];
        this.set_value({ key: "stat", val: l });
      });
    },
    // 获取楼下面的房间号
    getHouse(buildId) {
      this.$api.house.getDetailHouse({ buildId }).then((res) => {
        const list = res || [];
        this.tagList = list;
        this.tagActiveId = "";
        this.set_value({ key: "houseRightMsg", val: null });
        // list && list.length > 0 && (this.tagActiveId = list[0].id);
        // this.getMsg(list[0].id);
      });
    },
    // 获取此房间的入住信息（入住人员信息、缴费信息）
    getMsg(houseId) {
      this.$api.house.getHouseMsg({ houseId }).then((res) => {
        this.set_value({ key: "houseRightMsg", val: res });
      });
    },
    // 获取楼栋
    getBuild() {
      this.$api.house.getDetailBuild({ isAll: 0 }).then((res) => {
        let result = [];
        const list = res || [];
        let len;
        if (list && list.length > 0) {
          if (list.length % 5 === 0) {
            len = list.length / 5;
          } else {
            len = list.length / 5 + 1;
          }
          len = Math.floor(len);
          for (let i = 0; i < len; i++) {
            const l = list.slice(i * 5, 5 * (i + 1));
            result.push(l);
          }
          this.buildList = result;
          const id = this.poi || result[0][0].id;
          this.activeIndex = id;
          this.getHouse(id);
          this.getStat(id);
          this.$render.setPOISelect(`housereal_${id}`);
          this.$render.focusCovering(`housereal_${id}`);
          this.$nextTick(() => {
            this.clickBuild({ id }, () => {
              this.findActiveCarousel();
            });
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.build-wrap {
  display: flex;
  align-items: center;
  > li {
    font-size: $font-size-18;
    color: $color-ffffff;
    margin-left: 19px;
    line-height: 30px;
    cursor: pointer;
    &.active {
      color: $color-78F7FD;
      .line {
        display: block;
      }
    }
    .line {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: none;
      height: 1px;
      background-color: $color-78F7FD;
    }
  }
}
.hdl-swiper {
  margin: 16px 0 16px 22px;
  width: 354px;
  ::v-deep .el-carousel__arrow {
    width: 18px;
    height: 18px;
    border-radius: 0;
    background-color: transparent;
    font-size: $font-size-18;
  }
  &-left {
    left: 5px;
  }
  &-right {
    right: 5px;
  }
}
.arrow {
  position: absolute;
  font-size: $font-size-18;
  color: $color-ffffff;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
}
.hdl-tag {
  padding: 0 40px 24px 40px;
}
.hdl-status {
  display: flex;
  align-items: center;
  font-size: $font-size-10;
  color: $color-ffffff;
  line-height: 14px;
  > p:nth-child(1) {
    width: 10px;
    height: 10px;
    background: $color-458A91;
    margin-right: 8px;
  }
  > p:nth-child(3) {
    width: 10px;
    height: 10px;
    background: $color-DD9900;
    margin-right: 8px;
    margin-left: 24px;
  }
}
.hdl-tag-list {
  height: 444px;
  margin-top: 16px;
}
.htl-inner {
  display: flex;
  flex-wrap: wrap;
  > li {
    font-size: 13px;
    font-weight: $font-weight-500;
    color: $color-E1E1E1;
    text-align: center;
    line-height: 30px;
    width: 65px;
    height: 30px;
    background-color: $color-386E74;
    background-repeat: no-repeat;
    background-position: left top;
    background-size: 100% 100%;
    padding: 0 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0 0 16px 16px;
    cursor: pointer;
    &:nth-child(4n + 1) {
      margin-left: 0;
    }
    &.empty {
      background-color: rgba(182, 137, 46, 0.5);
      cursor: not-allowed;
    }
    &.active {
      background-image: url("~@/assets/images/tag-active.png");
    }
  }
}
</style>
