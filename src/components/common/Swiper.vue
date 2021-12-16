<template>
  <div class="wrap">
    <div :class="['swiper-container', `${id}-gallery`]">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item, i) in list" :key="`big${i}`">
          <el-image
            v-if="!item.isVideo"
            class="big-image"
            fit="cover"
            :src="item.url"
          ></el-image>
          <v-video
            :ref="`remould_player_ref${i}`"
            v-else
            :width="870"
            :height="610"
            :id="`remould-player${i}`"
            :url="item.url"
            :poster="item.poster"
          ></v-video>
        </div>
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next swiper-button-white"></div>
      <div class="swiper-button-prev swiper-button-white"></div>
    </div>
    <div :class="['swiper-container', 'gallery-thumbs', `${id}-thumbs`]">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide rel"
          v-for="(item, i) in list"
          :key="`small${i}`"
        >
          <el-image
            class="small-image"
            fit="cover"
            :src="item.isVideo ? item.poster : item.url"
          ></el-image>
          <i v-show="item.isVideo" class="el-icon-video-play play-video"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["remouldId"]),
  },
  watch: {
    remouldId() {
      this.$nextTick(() => {
        if (this.gallery) {
          this.gallery.update();
          this.gallery.slideTo(0);
        }
        if (this.galleryThumbs) {
          this.galleryThumbs.update();
          this.galleryThumbs.slideTo(0);
        }
      });
    },
  },
  mounted() {
    const that = this;
    this.galleryThumbs = new window.Swiper(`.${this.id}-thumbs`, {
      spaceBetween: 38,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    this.gallery = new window.Swiper(`.${this.id}-gallery`, {
      spaceBetween: 0,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: this.galleryThumbs,
      },
      on: {
        slideChangeTransitionStart: function () {
          that.$emit("change", this.activeIndex);
          const myRef = that.$refs[`remould_player_ref${this.previousIndex}`];
          if (myRef) {
            if (that.list[this.previousIndex].isVideo) {
              if (!myRef[0].player.paused) {
                myRef[0].player.pause();
              }
            }
          }
        },
      },
    });
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 878px;
}
.big-image {
  width: 100%;
  height: 610px;
}
.small-image {
  width: 146px;
  height: 116px;
  margin-top: 8px;
}
.gallery-thumbs {
  ::v-deep .swiper-slide {
    opacity: 0.4;
  }
  ::v-deep .swiper-slide-thumb-active {
    opacity: 1;
  }
}
.play-video {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: $color-ffffff;
  font-size: $font-size-30;
}
</style>
