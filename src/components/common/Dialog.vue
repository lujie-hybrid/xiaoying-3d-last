<template>
  <el-dialog
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    append-to-body
    :width="width + 'px'"
    :visible="visible"
    custom-class="base-dialog v-dialog"
  >
    <slot name="header"></slot>
    <slot></slot>
    <slot name="footer"></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 710,
    },
  },
  components: {},
  data() {
    return {};
  },

  created() {},
  methods: {},
};
</script>
<style lang="scss">
.el-dialog.v-dialog {
  background-color: #2c4951;
  margin-top: 0 !important;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
