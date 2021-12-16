<template>
  <v-inner>
    <v-unit title="周界电子围栏列表" no-right>
      <v-scroll class="pal-scroll">
        <v-collapse
          v-if="list && list.length > 0"
          :list="list"
          :id="rangeId"
          @clicked="clickItem"
        ></v-collapse>
      </v-scroll>
    </v-unit>
    <v-unit title="周界电子围栏报警记录" no-right>
      <ul class="pal-records">
        <li v-for="(rd, r) in records" :key="r">
          <p>
            <span class="circle">{{ r + 1 }}</span>
            <span>{{ rd.name }}</span>
          </p>
          <span>{{ rd.regionName }}</span>
          <span>{{ rd.statusName }}</span>
        </li>
      </ul>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState("perimeter", ["records", "rangeId"]),
  },
  beforeDestroy() {
    this.set_value({ key: "rangeId", val: "" });
  },
  mounted() {
    this.$api.perimeter.getArea().then((res) => {
      const r = res || [];
      const list = r.map((item) => {
        if (item.worldAlarmListModels && item.worldAlarmListModels.length > 0) {
          item.children = item.worldAlarmListModels.map((chd) => ({
            title: chd.name,
            id: chd.id,
            parentId: chd.regionId,
            isDanger: chd.status == 2,
          }));
        }
        item.title = item.regionName;
        item.id = item.regionId;
        return item;
      });
      this.list = list;
      const id = this.rangeId || list[0].children[0].id;
      this.set_value({ key: "rangeId", val: id });
      this.$render.focusCovering(`perimeter_${id}`, "range", 150);
      this.getMsg(id);
    });
  },
  watch: {
    rangeId(val) {
      this.clickItem({ id: val });
    },
  },
  methods: {
    ...mapMutations("perimeter", ["set_value"]),
    // 点击item
    clickItem(item) {
      this.getMsg(item.id);
      this.set_value({ key: "rangeId", val: item.id });
      this.$render.simClickCovering(`perimeter_${item.id}`);
      this.$render.focusCovering(`perimeter_${item.id}`, "range", 150);
    },
    // 获取右边信息
    getMsg(worldAlarmId) {
      this.$api.perimeter.getRightMsg({ worldAlarmId }).then((res) => {
        this.set_value({ key: "right", val: res });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.pal-scroll {
  margin: 7px 0 20px 0;
  height: calc(100vh - 580px);
}
.pal-records {
  padding: 20px 0;
  > li {
    font-weight: $font-weight-400;
    font-size: $font-size-16;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    color: $color-ffffff;
    display: flex;
    justify-content: space-between;
    &:last-child {
      margin-bottom: 0;
    }
    &.s-danger {
      color: $color-DD0000;
    }
    &.s-finish {
      color: $color-66BFDE;
    }
    .circle {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1) 0%,
        rgba(255, 255, 255, 0.3) 10%,
        rgba(255, 255, 255, 0.4) 50%,
        rgba(255, 255, 255, 0.5) 100%
      );
      text-align: center;
      line-height: 20px;
      margin: 0 8px;
    }
    > p:nth-child(1) {
      width: 140px;
    }
    > span {
      &:nth-child(2) {
        margin-left: 10px;
        flex: 1;
      }
      &:nth-child(3) {
        margin: 0 8px;
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style>
