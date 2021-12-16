<template>
  <div class="h-status">
    <div class="h-status-circle">
      <p>{{ count }}</p>
      <p>{{ label }}</p>
    </div>
    <div class="h-status-right">
      <p>实时报警记录</p>
      <p @click="clickItem(item)" v-for="(item, i) in list" :key="i">
        {{ item[propName.name] }}
        <span>{{ item[propName.posName] }}</span>
        <span>{{ item[propName.desc] }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    count: {
      type: Number,
      default: 0,
    },
    propName: {
      type: Object,
      default: () => ({
        name: "cameraName",
        posName: "regionName",
        desc: "description",
      }),
    },
    label: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    clickItem(item) {
      this.$emit("item", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.h-status {
  margin: 14px 0;
  display: flex;
  justify-content: center;
  padding: 0 20px;
  &-circle {
    width: 120px;
    height: 120px;
    background: url("~@/assets/images/home-circle.png") no-repeat left top;
    background-size: 100% 100%;
    border-radius: 120px;
    margin-right: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > p:nth-child(1) {
      color: $color-ffffff;
      font-size: $font-size-24;
      font-weight: $font-weight-500;
      line-height: 33px;
    }
    > p:nth-child(2) {
      color: $color-ffffff;
      font-size: $font-size-16;
      font-weight: $font-weight-500;
      line-height: 22px;
    }
  }
  &-right {
    padding-top: 5px;
    > p {
      width: 200px;
      font-size: $font-size-12;
      font-weight: $font-weight-400;
      color: $color-ffffff;
      line-height: 14px;
      margin-bottom: 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      > span {
        margin-left: 10px;
        &:last-child {
          color: $color-DD0000;
        }
      }
    }
    > p:nth-child(1) {
      line-height: 20px;
      font-size: $font-size-14;
      font-weight: $font-weight-500;
      margin-bottom: 16px;
    }
  }
}
</style>
