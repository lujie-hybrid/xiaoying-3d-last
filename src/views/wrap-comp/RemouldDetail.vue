<template>
  <el-dialog
    append-to-body
    custom-class="base-dialog"
    :visible="visible"
    fullscreen
  >
    <div class="remould">
      <v-header></v-header>
      <div class="remould-title">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <p class="remould-title-text">改造前后影像资料对比</p>
        <v-select
          class="remould-select"
          :select="options"
          @change="changeVal"
        ></v-select>
      </div>
      <div class="unit-line">
        <p></p>
        <p></p>
        <p></p>
      </div>
      <!-- <v-scroll class="chart-wrap">
        <ul class="remould-list">
          <li v-for="item in 15" :key="item">111</li>
        </ul></v-scroll
      > -->
      <div class="rd-cont">
        <div class="rd-cont-item">
          <v-swiper
            ref="left"
            @change="(val) => sliderChange('left', val)"
            v-if="remouldLeftImg && remouldLeftImg.length > 0"
            id="rd-left"
            :list="remouldLeftImg"
          ></v-swiper>
          <p class="rd-cont-title">{{ name }}改造前</p>
        </div>
        <div class="rd-cont-item">
          <v-swiper
            ref="right"
            @change="(val) => sliderChange('right', val)"
            v-if="remouldRightImg && remouldRightImg.length > 0"
            id="rd-right"
            :list="remouldRightImg"
          ></v-swiper>
          <p class="rd-cont-title">{{ name }}改造后</p>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: "",
      options: {
        value: 0,
        option: [],
      },
    };
  },
  mounted() {
    this.options.value = parseInt(this.remouldId);
    this.options.option = this.remouldPOI.map((item) => ({
      label: item.name,
      value: item.id,
    }));
    this.getInfo();
  },
  computed: {
    ...mapState([
      "remouldLeftImg",
      "remouldRightImg",
      "remouldId",
      "remouldPOI",
    ]),
  },
  watch: {
    remouldId: function (val) {
      if (this.options.option.length > 0) {
        const r = this.options.option.find((d) => d.value === val);
        this.name = r.label;
      } else {
        this.name = "";
      }
    },
  },
  methods: {
    ...mapMutations(["set_value"]),
    // 返回
    goBack() {
      this.set_value({ key: "remouldDetailShow", val: false });
      this.$render.setPOISelect(`remould_${this.remouldId}`);
      this.$render.focusCovering(`remould_${this.remouldId}`, "poi", 50);
    },
    changeVal(val) {
      this.set_value({ key: "remouldId", val });
      this.getInfo();
    },
    sliderChange(type, val) {
      if (type == "left") {
        this.$refs.right.gallery.slideTo(val);
      } else {
        this.$refs.left.gallery.slideTo(val);
      }
    },
    getInfo() {
      this.$api.remould
        .getImage({ projectid: parseInt(this.remouldId) })
        .then((res) => {
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
.remould {
  padding: 148px 30px 0 30px;
  &-title {
    display: flex;
    align-items: center;
    color: $color-ffffff;
    font-size: $font-size-24;
    &-text {
      font-family: $font-AM;
      font-weight: $font-weight-500;
      margin-left: 32px;
      margin-right: 50px;
    }
    > i {
      cursor: pointer;
    }
  }
  &-select {
    width: 160px;
  }
}
.unit-line {
  display: flex;
  align-items: center;
  margin: 16px 0 7px 0;
  > p:nth-child(1),
  > p:nth-child(3) {
    width: 7px;
    height: 7px;
    background: $color-78F7FD;
  }
  > p:nth-child(2) {
    flex: 1;
    height: 1px;
    border: 1px dashed $color-DBDBDB;
    margin: 0 4px;
  }
}
.chart-wrap {
  height: calc(100vh - 220px);
}
.rd-cont {
  display: flex;
  margin-top: 18px;
  &-item {
    background: url("~@/assets/images/remould-bg.png") no-repeat left top;
    background-size: 100% 100%;
    width: 928px;
    height: 840px;
    padding: 80px 25px 0 25px;
    position: relative;
  }
  &-title {
    background: url("~@/assets/images/remould-title-bg.png") no-repeat left top;
    background-size: 100% 100%;
    padding: 7px 40px;
    line-height: 28px;
    color: $color-ffffff;
    font-size: $font-size-20;
    // display: inline-block;
    position: absolute;
    left: 25px;
    top: 27px;
  }
}
</style>
