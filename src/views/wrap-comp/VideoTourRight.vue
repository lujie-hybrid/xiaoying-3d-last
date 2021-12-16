<template>
  <v-inner is-right>
    <template v-if="tourList && tourList.length > 0">
      <v-unit
        v-for="(item, i) in tourList"
        :key="i"
        :title="item.cameraName"
        no-right
      >
        <v-f-player :id="`video-right-player${i}`" :url="item.url"></v-f-player>
      </v-unit>
    </template>
    <div class="empty-wrap" v-show="tourList && tourList.length == 0">
      <p><i class="el-icon-warning"></i><span>暂无监控巡视视频</span></p>
    </div>
  </v-inner>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapState("video", {
      tourList: (state) => state.tourList.slice(3),
    }),
  },
  created() {
    this.$api.video.getVideo().then((res) => {
      this.list = res.preViewModels.slice(3);
    });
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
