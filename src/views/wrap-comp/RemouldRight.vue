<template>
  <v-inner is-right>
    <v-unit title="营区改造点工程信息" no-right>
      <div class="remould-msg">
        <p>
          {{ name }}项目<span>（{{ statusName }}）</span>
        </p>
        <ul class="rm-list">
          <li v-for="(item, i) in msgList" :key="i">
            <p></p>
            <p>{{ item.name }}</p>
            <p>{{ item.value }}</p>
          </li>
        </ul>
      </div>
    </v-unit>
    <v-unit title="营区改造点影像资料" has-foot @detail="toDetail">
      <template #header-foot>
        <div class="rel">
          <div class="remould-tag">
            <p
              @click="clickTag(tg)"
              :class="{ active: tagIndex == tg.dictValue }"
              v-for="(tg, t) in tagList"
              :key="t"
            >
              {{ tg.dictLabel }}
            </p>
          </div>
          <!-- <el-radio-group class="remould-radio" v-model="selectVal">
            <el-radio :label="1">图片</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group> -->
        </div>
      </template>
      <v-scroll class="remould-image">
        <ul class="image-list">
          <template v-if="tagIndex != 2">
            <li
              @click="toDetail"
              v-for="(leftImg, l) in remouldLeftImg"
              :key="l"
            >
              <el-image
                class="img"
                :src="leftImg.isVideo ? leftImg.poster : leftImg.url"
                fit="cover"
              ></el-image>
              <span>改造前</span>
              <i
                v-show="leftImg.isVideo"
                class="el-icon-video-play play-video"
              ></i>
            </li>
          </template>
          <template v-if="tagIndex != 1">
            <li
              @click="toDetail"
              v-for="(rightImg, r) in remouldRightImg"
              :key="`behind${r}`"
            >
              <el-image
                class="img"
                :src="rightImg.isVideo ? rightImg.poster : rightImg.url"
                fit="cover"
              ></el-image>
              <span class="behind">改造后</span>
              <i
                v-show="rightImg.isVideo"
                class="el-icon-video-play play-video"
              ></i>
            </li>
          </template>
        </ul>
      </v-scroll>
    </v-unit>
    <remould-detail
      v-if="remouldDetailShow"
      :visible="remouldDetailShow"
    ></remould-detail>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import RemouldDetail from "@/views/wrap-comp/RemouldDetail";
export default {
  components: { RemouldDetail },
  data() {
    return {
      name: "",
      statusName: "",
      msgList: [
        {
          name: "项目编号：",
          value: "",
          key: "code",
        },
        {
          name: "改造原因：",
          value: "",
          key: "reason",
        },
        {
          name: "项目位置：",
          value: "",
          key: "address",
        },
        {
          name: "计划开工日期：",
          value: "",
          key: "planStartTime",
        },
        {
          name: "计划竣工日期：",
          value: "",
          key: "planEndTime",
        },
        {
          name: "实际开工日期：",
          value: "",
          key: "realStartTime",
        },
        {
          name: "实际竣工日期：",
          value: "",
          key: "realEndTime",
        },
      ],
      // selectVal: 1,
      tagIndex: -1,
      tagList: [
        {
          dictValue: -1,
          dictLabel: "全部",
        },
        {
          dictValue: 1,
          dictLabel: "改造前",
        },
        {
          dictValue: 2,
          dictLabel: "改造后",
        },
      ],
    };
  },
  computed: {
    ...mapState([
      "remouldDetailShow",
      "remouldLeftImg",
      "remouldRightImg",
      "remouldId",
      "remouldPOI",
    ]),
  },
  mounted() {
    this.set_value({ key: "remouldId", val: this.remouldPOI[0].id });
    setTimeout(() => {
      this.$render.setPOISelect(`remould_${this.remouldPOI[0].id}`);
      this.$render.focusCovering(`remould_${this.remouldPOI[0].id}`);
    }, 500);
    this.getDetail(parseInt(this.remouldId));
  },
  watch: {
    remouldId(val) {
      if (val) {
        this.getDetail(val);
      }
    },
  },
  methods: {
    ...mapMutations(["set_value"]),
    toDetail() {
      this.set_value({ key: "remouldDetailShow", val: true });
    },
    clickTag(item) {
      this.tagIndex = item.dictValue;
    },
    // 获取详情
    getDetail(id) {
      this.$api.remould.getDetail({ id }).then((res) => {
        this.name = res.name;
        this.statusName = res.statusName;
        this.msgList.forEach((item) => {
          item.value = res[item.key];
        });
      });
      this.$api.remould.getImage({ projectid: id }).then((res) => {
        const leftImg = res.map((l) => ({
          isVideo: l.beforeMediaType,
          url: l.beforeAttachPath,
          poster: l.beforePostPath,
        }));
        const rightImg = res.map((r) => ({
          url: r.afterAttachPath,
          isVideo: r.afterMediaType,
          poster: r.afterPostPath,
        }));
        this.set_value({ key: "remouldLeftImg", val: leftImg });
        this.set_value({ key: "remouldRightImg", val: rightImg });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.remould-msg {
  padding: 16px 16px 22px 16px;
  > p:nth-child(1) {
    font-size: $font-size-20;
    line-height: 28px;
    color: $color-ffffff;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    > span {
      margin-left: 8px;
      font-size: $font-size-16;
      line-height: 22px;
      color: $color-faad14;
    }
  }
}
.rm-list {
  padding-left: 3px;
  > li {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    line-height: 22px;
    font-size: $font-size-16;
    color: $color-ffffff;
    &:last-child {
      margin-bottom: 0;
    }
    > p:nth-child(1) {
      width: 6px;
      height: 6px;
      border-radius: 6px;
      background-color: $color-faad14;
    }
    > p:nth-child(2) {
      width: 115px;
      margin: 0 8px;
    }
  }
}
.remould-tag {
  background: rgba(120, 247, 253, 0.3);
  padding: 8px 0 8px 23px;
  display: flex;
  border: 1px solid $color-78F7FD;
  border-top: 1px dashed $color-DBDBDB;
  margin-bottom: 8px;
  > p {
    width: 62px;
    height: 22px;
    font-size: $font-size-12;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    text-align: center;
    line-height: 22px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-left: 8px;
    cursor: pointer;
    &:first-child {
      margin-left: 0;
    }
    &.active {
      background-color: $color-DD9900;
    }
  }
}
.remould-radio {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translate(0, -40%);
  ::v-deep .el-radio__input.is-checked .el-radio__inner {
    border-color: $color-DD9900;
    &::after {
      width: 6px;
      height: 6px;
      background-color: $color-DD9900;
    }
  }
  ::v-deep .el-radio {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }
  }
  ::v-deep .el-radio__inner {
    background: transparent;
  }
  ::v-deep .el-radio__label {
    padding-left: 8px;
    color: $color-ffffff;
  }
  ::v-deep .el-radio__input.is-checked + .el-radio__label {
    color: $color-DD9900;
  }
}
.remould-image {
  height: 405px;
  margin: 15px;
  .image-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      position: relative;
      cursor: pointer;
      width: 112px;
      height: 112px;
      margin-right: 15px;
      margin-top: 15px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      > span {
        position: absolute;
        top: 0;
        left: 0;
        padding: 4px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 10px;
        color: $color-78F7FD;
        line-height: 14px;
        &.behind {
          color: $color-faad14;
        }
      }
      .img {
        width: 113px;
        height: 113px;
      }
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        margin-top: 0;
      }
      .play-video {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: $color-ffffff;
        font-size: $font-size-30;
      }
    }
  }
}
</style>
