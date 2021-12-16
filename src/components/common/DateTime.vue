<template>
  <div class="time-wrap">
    <span v-if="label">{{ label }}：</span>
    <el-date-picker
      v-model="timeArray"
      type="datetimerange"
      range-separator="→"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="yyyy-MM-dd HH:mm:ss"
      :editable="false"
      :clearable="false"
      popper-class="time-popper"
      class="tw-date"
      @change="valChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    time: {
      type: Array,
      default: () => ["2020-01-04 08:20:00", "2020-01-04 12:20:00"],
    },
  },
  components: {},
  data() {
    return {
      timeArray: this.time,
    };
  },
  watch: {
    time(val) {
      this.timeArray = val;
    },
  },
  methods: {
    valChange(val) {
      this.$emit("update:time", val);
      this.$emit("change");
    },
  },
};
</script>
<style lang="scss" scoped>
.time-wrap {
  display: flex;
  align-items: center;
  > span {
    font-weight: $font-weight-500;
    font-size: $font-size-18;
    color: $color-ffffff;
    font-family: $font-AM;
    margin-right: 16px;
  }
}
.tw-date {
  width: 460px;
  height: 30px;
  background: rgba(120, 247, 253, 0.3);
  border-radius: 0;
  border: none;
  ::v-deep .el-range__icon {
    font-size: $font-size-16;
    height: auto;
    margin-left: 0;
    color: $color-ffffff;
  }
  ::v-deep .el-range-input {
    background-color: transparent;
    font-size: $font-size-16;
    color: $color-ffffff;
    width: 40%;
    margin-top: 2px;
  }
  ::v-deep .el-range__close-icon {
    display: none;
  }
  ::v-deep .el-range-separator {
    font-size: 16px;
    padding: 0 16px;
    width: auto;
    height: auto;
    color: $color-78F7FD;
  }
}
</style>
