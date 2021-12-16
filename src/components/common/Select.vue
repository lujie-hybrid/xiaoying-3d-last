<template>
  <el-select
    class="my-select"
    popper-class="my-select-popper"
    v-model="select.value"
    placeholder="请选择"
    @change="$emit('change', select.value)"
  >
    <el-option
      v-for="item in select.option"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    select: {
      type: Object,
      required: true,
      default: () => ({ value: "", option: [] }),
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.my-select {
  ::v-deep .el-input__inner {
    background-color: rgba(120, 247, 253, 0.3);
    border: none;
    height: 32px;
    line-height: 32px;
    font-size: $font-size-18;
    color: $color-ffffff;
    font-weight: $font-weight-400;
    box-shadow: none;
    &:focus {
      box-shadow: 0px 1px 3px 0px rgba(120, 247, 253, 0.6);
      border: 1px solid #78f7fd;
    }
  }
  ::v-deep .el-input__icon {
    line-height: 32px;
  }
}
</style>
