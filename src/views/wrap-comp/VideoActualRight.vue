<template>
  <v-inner is-right v-if="live">
    <v-unit
      title="监控视频（实时）"
      is-video
      no-right
      :code="live.cameraIndexCode"
    >
      <v-f-player
        v-if="live && live.url"
        id="var1"
        :url="live.url"
        :code="live.cameraIndexCode"
      ></v-f-player>
    </v-unit>
    <!-- <v-unit title="历史监控视频" no-right> -->
    <!-- <template #header-right>
        <p class="var-more" @click="showBigVideo">
          更多<img src="~@/assets/images/arrow-right.png" />
        </p>
      </template> -->
    <!-- <div class="var-origin" v-if="history && history.length > 0">
        <div class="rel vo-wrap" v-for="(item, i) in history" :key="i">
          <v-player
            @full="showBigVideo"
            multi
            :mini="false"
            :width="189"
            :height="142"
            :id="`vo${i}`"
            :url="item.url"
            :code="item.cameraIndexCode"
          ></v-player>
          <p class="var-video-title">{{ item.cameraName }} 14:00 -15:00</p>
        </div>
      </div> -->
    <!-- </v-unit> -->
    <v-unit title="监控报警记录" no-right>
      <div
        class="empty-wrap"
        v-if="!records || (records && records.length == 0)"
      >
        <p><i class="el-icon-warning"></i><span>暂无报警记录数据</span></p>
      </div>
      <v-scroll class="var-records-wrap" v-if="records && records.length > 0">
        <ul class="var-records">
          <li
            :class="{
              's-danger': rd.process === 1,
              's-finish': rd.process === 3,
            }"
            v-for="(rd, r) in records"
            :key="r"
          >
            <span>{{ r + 1 }}</span>
            <span>{{ rd.startTime }}</span>
            <span>{{ rd.cameraName }}</span>
            <span>{{ rd.regionName }}</span>
            <span>{{ rd.description }}</span>
            <!-- <span>{{ rd.processName }}</span> -->
          </li>
        </ul>
      </v-scroll>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("video", ["live", "records", "camera"]),
  },
  // mounted() {
  //   alert(this.poi, "poi live");
  // },
  methods: {
    ...mapMutations("video", ["set_value"]),
    // showBigVideo() {
    //   this.set_value({ key: "navIndex", val: 1 });
    // },
  },
};
</script>
<style lang="scss" scoped>
.var-more {
  display: flex;
  align-items: center;
  color: $color-ffffff;
  font-weight: $font-weight-400;
  cursor: pointer;
  > img {
    width: 12px;
    margin: 0 16px 0 4px;
  }
}
.empty-wrap {
  height: 56px;
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
.var-records {
  &-wrap {
    height: 265px;
    margin: 15px 0;
  }
  > li {
    font-weight: $font-weight-400;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    color: $color-ffffff;
    &:last-child {
      margin-bottom: 0;
    }
    &.s-danger {
      color: $color-DD0000;
    }
    &.s-finish {
      color: $color-66BFDE;
    }
    > span {
      margin-left: 6px;
      font-size: $font-size-14;
      line-height: 18px;
      &:nth-child(1) {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        margin-left: 2px;
        margin-right: 4px;
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0.1) 0%,
          rgba(255, 255, 255, 0.3) 10%,
          rgba(255, 255, 255, 0.4) 50%,
          rgba(255, 255, 255, 0.5) 100%
        );
        text-align: center;
        line-height: 20px;
      }
      &:nth-child(2) {
        width: 100px;
      }
      &:nth-child(3) {
        width: 100px;
      }
      &:nth-child(4) {
        width: 40px;
      }
    }
  }
}
.var-video-title {
  display: inline-block;
  padding: 4px 8px;
  font-size: $font-size-8;
  color: $color-ffffff;
  font-weight: $font-weight-400;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
