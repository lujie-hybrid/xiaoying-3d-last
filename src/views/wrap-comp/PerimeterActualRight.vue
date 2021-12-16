<template>
  <v-inner is-right>
    <template v-if="right && right.length > 0">
      <v-unit
        is-video
        title="监控视频（实时）"
        v-for="(item, i) in right"
        :key="i"
        :code="item.cameraIndexCode"
      >
        <v-f-player
          :id="`par-player-${i}`"
          :url="item.url"
          :code="item.cameraIndexCode"
        ></v-f-player> </v-unit
    ></template>
    <div class="empty-wrap" v-show="right && right.length == 0">
      <p><i class="el-icon-warning"></i><span>暂无绑定监控</span></p>
    </div>
  </v-inner>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("perimeter", ["right"]),
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.empty-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    display: flex;
    align-items: center;
    font-size: $font-size-18;
    color: $color-ffffff;
    > span {
      text-shadow: 0 0 2px #e1e1e1;
    }
    > i {
      margin-right: 10px;
      font-size: $font-size-20;
      margin-top: 2px;
    }
  }
}
</style>
