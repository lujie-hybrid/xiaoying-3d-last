<template>
  <v-inner>
    <v-unit title="门禁列表" no-right>
      <v-scroll class="actual-scroll">
        <!-- <v-collapse
          v-if="list && list.length > 0"
          @clicked="clickItem"
          :list="list"
          :id="id"
        ></v-collapse> -->
        <v-tree
          @clicked="(u) => clickItem(u.doorId)"
          v-if="list && list.length > 0"
          :list="list"
          :id="value"
        ></v-tree>
      </v-scroll>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      list: [],
      result: "",
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState("access", {
      id: (state) => state.id,
      value: function (state) {
        let msg = { value: "" };
        console.log(state, "state.id");
        this.filterList(this.list, msg, state.id);
        return msg.value;
      },
    }),
  },
  watch: {
    id: {
      handler: function (val) {
        if (val) {
          this.clickItem(val);
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    this.set_value({
      key: "personList",
      val: [],
    });
    this.$render.setPOISelect(`access_${this.id}`, false);

    setTimeout(() => {
      this.set_value({ key: "id", val: "" });
    }, 500);
  },
  methods: {
    ...mapMutations("access", ["set_value"]),
    // 获取树的列表
    getData() {
      this.$api.access.getTreeList().then((res) => {
        const r = res || [];
        this.loopList(r);
        this.list = r;
        // this.$api.access.getDefaultPOI().then((res) => {
        //   const doorId = this.id || res.doorId;
        //   if (doorId) {
        //     this.clickItem(doorId);
        //   }
        // });
      });
    },
    filterList(list, msg, val) {
      if (list && list.length > 0) {
        list.forEach((item) => {
          if (item.chds && item.chds.length > 0) {
            this.filterList(item.chds, msg, val);
          }
          if (item.doorId && item.doorId == val) {
            msg.value = item.id;
          }
          return false;
        });
      }
    },
    loopList(list) {
      list.forEach((item) => {
        const chds = item.children || [];
        const accessList = item.accessListModels || [];
        item.name = item.regionName || item.doorName;
        item.chds = [...accessList, ...chds];
        this.loopList(item.chds);
      });
    },
    clickItem(id) {
      this.set_value({ key: "id", val: id });
      this.$skt.send({ xiaoying: "access_record", doorId: id });
      this.$render.setPOISelect(`access_${id}`);
      this.$render.focusCovering(`access_${id}`, "poi", 120);
    },
  },
};
</script>
<style lang="scss" scoped>
.actual-scroll {
  margin: 7px 0 20px 0;
  height: calc(100vh - 260px);
}
</style>
