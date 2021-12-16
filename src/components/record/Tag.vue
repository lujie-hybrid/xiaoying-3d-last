<template>
  <div class="tag-wrap">
    <span>{{ label }}：</span>
    <ul class="tag-list">
      <li
        v-for="item in list"
        :key="item[propName.value]"
        :title="item[propName.name]"
        @click="emitCode(item)"
        :class="{
          active: code == item[propName.value],
          'is-large': large,
        }"
      >
        {{ item[propName.name] }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    large: {
      type: Boolean,
      default: false,
    },
    propName: {
      type: Object,
      default: () => ({ name: "title", value: "id" }),
    },
    code: {
      type: [String, Number],
      default: 0,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    emitCode(item) {
      this.$emit("code", item);
    },
  },
};
</script>
<style lang="scss" scoped>
.tag-wrap {
  display: flex;
  align-items: center;
  > span {
    font-weight: $font-weight-500;
    font-size: $font-size-18;
    color: $color-ffffff;
    font-family: $font-AM;
  }
  .tag-list {
    display: flex;
    > li {
      margin-left: 16px;
      background: rgba(120, 247, 253, 0.3);
      width: 65px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-weight: $font-weight-400;
      font-size: $font-size-16;
      color: $color-E1E1E1;
      padding: 0 3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      &.active {
        background: url("~@/assets/images/tag-active.png") no-repeat left top;
        background-size: 100% 100%;
      }
      &.is-large {
        width: 80px;
      }
    }
  }
}
</style>
