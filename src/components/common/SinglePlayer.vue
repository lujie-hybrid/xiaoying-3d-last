<template>
  <div class="player-wrap">
    <div class="player-feature">
      <img
        @click="pause"
        v-show="isPlay"
        title="暂停"
        src="~@/assets/images/stop.png"
        alt=""
      />
      <img
        @click="resume"
        v-show="!isPlay"
        title="播放"
        src="~@/assets/images/play.png"
        alt=""
      />
      <img
        :class="{ 'not-set': fastNum == 1 }"
        title="放慢"
        @click="slow"
        src="~@/assets/images/slow.png"
        alt=""
      />
      <img
        :class="{ 'not-set': fastNum == 8 }"
        title="快进"
        @click="fast"
        src="~@/assets/images/fast.png"
        alt=""
      />
    </div>
    <div class="player-jump" v-show="playBack">
      <el-time-picker
        ref="time"
        class="player-picker"
        size="small"
        value-format="yyyy-MM-dd HH:mm:ss"
        :editable="false"
        v-model="jumpTime"
        @change="timeChange"
        :clearable="false"
        :picker-options="{
          selectableRange: range,
        }"
        placeholder="请选择时间点定位"
      >
      </el-time-picker>
    </div>
    <div
      :id="id"
      class="vd"
      :style="{ width: width + 'px', height: height + 'px' }"
    ></div>
  </div>
</template>

<script>
import VPlayer from "@/plugins/player";

export default {
  props: {
    // 地址
    url: {
      type: String,
      default: "",
    },
    // 视频id
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: 380,
    },
    height: {
      type: Number,
      default: 212,
    },
    // 当前播放的窗口index
    indexNum: {
      type: Number,
      default: 0,
    },
    // 分离的窗口个数
    splitNum: {
      type: Number,
      default: 1,
    },
    // 回放的时间数组【开始，结束】
    backTime: {
      type: Array,
      default: () => [],
    },
    backHourTime: {
      type: Array,
      default: () => [],
    },
    playBack: {
      type: Boolean,
      default: false,
    },
  },
  components: {},
  data() {
    return {
      isPlay: true, // 是否是播放的状态
      time: "2021-07-28T23:54:41Z",
      jumpTime: "",
      fastNum: 1, // 倍率
    };
  },
  watch: {
    backHourTime() {
      this.jumpTime = "";
    },
  },
  computed: {
    range() {
      return `${this.backHourTime[0]}:00 - ${this.backHourTime[1]}:00`;
    },
  },
  mounted() {
    this.initVideo();
  },
  beforeDestroy() {
    this.pr.destroy();
  },
  methods: {
    timeChange(val) {
      const t = val.split(" ");
      const str = `${t[0]}T${t[1]}Z`;
      this.pr.seek(0, str, this.backTime[1]);
    },
    // 初始化
    initVideo() {
      this.pr = new VPlayer({
        szId: this.id,
        width: this.width,
        height: this.height,
        iCurrentSplit: this.splitNum,
        iMaxSplit: 4,
        style: {
          border: "none",
          borderSelect: "none",
          background: "rgba(0,0,0,0.5)",
        },
      });
      this.play(this.url, this.backTime[0], this.backTime[1]);
    },
    // 播放
    play(url, startTime, endTime) {
      console.log(url, startTime, endTime);
      this.pr.play(url, { playURL: this.url }, 0, startTime, endTime);
    },
    // 快进
    fast() {
      if (this.fastNum == 8) {
        console.log("over");
        return;
      }
      this.fastNum *= 2;
      this.pr.fast(this.indexNum);
    },
    // 放慢
    slow() {
      if (this.fastNum == 1) {
        return;
      }
      this.fastNum /= 2;
      this.pr.slow(this.indexNum);
    },
    // 暂停
    pause() {
      this.isPlay = false;
      this.pr.pause(this.indexNum);
    },
    // 回复播放
    resume() {
      this.isPlay = true;
      this.pr.resume(this.indexNum);
    },
  },
};
</script>
<style lang="scss" scoped>
.player-wrap {
  position: relative;
}
.player-feature {
  > img {
    position: absolute;
    z-index: 1000;
    bottom: 15px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
    z-index: 100;
    &.not-set {
      cursor: not-allowed;
    }
    &:nth-child(1) {
      left: 35px;
    }
    &:nth-child(2) {
      left: 35px;
    }
    &:nth-child(3) {
      right: 100px;
    }
    &:nth-child(4) {
      right: 30px;
    }
  }
}
.player-jump {
  left: 100px;
  bottom: 18px;
  position: absolute;
  z-index: 1000;
}
.player-picker {
  width: 180px;
}
</style>
