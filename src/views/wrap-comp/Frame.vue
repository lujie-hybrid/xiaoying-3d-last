<template>
  <div class="one-player">
    <v-scroll
      class="one-player-scroll"
      v-if="single.list && single.list.length > 0"
    >
      <v-time-collapse
        :active-id.sync="single.activeId"
        :list="single.list"
        :active-parent-id.sync="single.parentId"
        @clicked="(item) => getClickedVideo(item)"
      ></v-time-collapse>
    </v-scroll>
    <v-single-player
      class="one-player-vd"
      id="one-player"
      :width="1050"
      v-if="single.url"
      :height="790"
      :url="single.videos[0].url"
      ref="frame_player"
      play-back
      :back-time="nowTime"
      :back-hour-time="nowHourTime"
    ></v-single-player>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      single: {
        list: [],
        activeId: "",
        parentId: "",
        url: "",
        videos: [],
      },
      videoCode: "",
      nowTime: [], // 回放的时间
      nowHourTime: [],
    };
  },
  created() {
    // 获取时间
    this.$api.video.getTime().then((res) => {
      this.single.list = res;
      if (res && res.length > 0) {
        this.single.activeId = res[0].hoursList[0].id;
        this.single.parentId = res[0].id;
        this.getClickedVideo(res[0].hoursList[0]);
      }
    });
    this.videoCode = this.getQueryString("code");
  },
  methods: {
    getQueryString(name) {
      const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      const r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    },
    // 获取此监控点的回放(包括单画面回放、多画面回放)
    getVideoData(isMore, cameraIndexCode) {
      const times = this.findTime(this.single);
      const params = {
        isMore,
        beginTime: times[0],
        endTime: times[1],
        cameraIndexCode,
      };
      this.$api.video.getMultiVideo(params).then((res) => {
        this.single.videos = res;
        this.single.url = this.single.videos[0].url;
        this.$refs.frame_player &&
          this.$refs.frame_player.play(
            this.single.url,
            this.nowTime[0],
            this.nowTime[1]
          );
      });
    },
    // 左边时间线点击事件
    getClickedVideo(item) {
      this.nowTime = [item.formatStartDate, item.formatEndDate];
      this.nowHourTime = [item.startHour, item.endHour];
      this.getVideoData(0, this.videoCode);
    },
    // 找到时间拼接
    findTime(msg) {
      const { activeId, parentId, list } = msg;
      const p = list.find((d) => d.id === parentId);
      const a = p.hoursList.find((d) => d.id === activeId);
      const y = p.yearMonthDay.replace(/\./g, "-");

      return [`${y} ${a.startHour}`, `${y} ${a.endHour}`];
    },
  },
};
</script>
<style lang="scss" scoped>
.one-player {
  display: flex;
  justify-content: space-between;
  background-color: #2c4951;
  height: 100%;
  &-scroll {
    width: 264px;
    height: calc(100vh - 40px);
    margin: 18px 0;
  }
  &-vd {
    margin: 18px 24px 0 0;
  }
}
// .vd-title {
//   position: absolute;
//   padding: 8px 16px;
//   display: inline-block;
//   left: 0;
//   top: 0;
//   background: rgba(0, 0, 0, 0.5);
//   font-size: $font-size-20;
//   color: $color-ffffff;
//   font-weight: $font-weight-400;
//   &.h-center {
//     left: 50%;
//     transform: translate(-50%, 0);
//   }
// }
</style>
