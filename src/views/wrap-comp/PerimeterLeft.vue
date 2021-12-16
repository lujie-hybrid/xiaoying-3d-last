<template>
  <v-inner>
    <v-unit title="周界实时报警" @detail="() => clickNav(1)">
      <v-perimeter-warning
        :prop-name="{
          name: 'name',
          id: 'id',
          posName: 'regionName',
          desc: 'statusName',
        }"
        @item="clickItem"
        :list="records"
      ></v-perimeter-warning>
    </v-unit>
    <v-unit
      is-video
      v-for="(item, i) in list"
      :key="i"
      :title="item.regionName"
      :code="item.cameraIndexCode"
    >
      <v-f-player
        :id="`pl-player-${i}`"
        :url="item.url"
        :code="item.cameraIndexCode"
      ></v-f-player>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { clickNav } from "@u/common";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState("perimeter", ["records"]),
  },
  mounted() {
    this.$api.perimeter.getStatus().then((res) => {
      const list = res || [];
      this.set_value({ key: "records", val: list });
    });
    this.$api.perimeter.getAllData().then((res) => {
      const list = res.preViewModels || [];
      this.list = list;
    });
    setTimeout(() => {
      this.$render.resetHomeCamera();
    }, 500);
  },
  methods: {
    ...mapMutations("perimeter", ["set_value"]),
    clickNav,
    clickItem(item) {
      this.set_value({ key: "rangeId", val: item.id });
      clickNav(1);
    },
  },
};
</script>
<style lang="scss" scoped></style>
