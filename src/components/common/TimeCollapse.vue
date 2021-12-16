<template>
  <el-collapse accordion class="my-collapse" v-model="defaultVal">
    <el-collapse-item :name="item.id" v-for="(item, i) in list" :key="i">
      <template slot="title">
        <div :class="['cpe-title', { active: activeParentId === item.id }]">
          <span>{{ item.yearMonthDay }}</span>
        </div>
      </template>
      <ul class="cpe-cont">
        <li
          :class="{ active: activeId === chd.id }"
          @click="setActive(chd)"
          v-for="(chd, c) in item.hoursList"
          :key="c"
        >
          <span>{{ `${chd.startHour} ~ ${chd.endHour}` }}</span>
        </li>
      </ul>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    activeId: {
      type: String,
      default: "",
    },
    activeParentId: {
      type: String,
      default: "",
    },
  },
  components: {},
  data() {
    return {
      defaultVal: "",
    };
  },
  created() {
    const r = this.list.find((d) => d.id === this.activeParentId);
    r && (this.defaultVal = r.id);
  },
  methods: {
    setActive(chd) {
      this.$emit("update:activeParentId", chd.parentId);
      this.$emit("update:activeId", chd.id);
      this.$emit("clicked", chd);
    },
  },
};
</script>
<style lang="scss" scoped>
.cpe-title {
  font-weight: $font-weight-500;
  font-size: $font-size-20;
  color: $color-ffffff;
  display: flex;
  align-items: center;
  padding-left: 60px;
  background-image: url("~@/assets/images/actual-down.png");
  background-repeat: no-repeat;
  background-position: 24px center;
  line-height: 28px;
  &.active {
    color: $color-78F7FD;
    background-image: url("~@/assets/images/actual-active-down.png") !important;
  }
}

.my-collapse {
  border: none;
  ::v-deep .el-collapse-item__header {
    background-color: transparent;
    border: none;
  }
  ::v-deep .el-collapse-item__wrap {
    background-color: transparent;
    border: none;
  }
  ::v-deep .el-collapse-item__content {
    padding-bottom: 0;
  }
  ::v-deep .el-collapse-item__header.is-active .cpe-title {
    background-image: url("~@/assets/images/actual-up.png");
    &.active {
      color: $color-78F7FD;
      background-image: url("~@/assets/images/actual-active.png") !important;
    }
  }
}

.cpe-cont {
  > li {
    height: 32px;
    margin-bottom: 18px;
    padding-left: 60px;
    display: flex;
    align-items: center;
    font-size: $font-size-16;
    color: $color-ffffff;
    cursor: pointer;
    font-weight: $font-weight-500;
    line-height: 22px;
    &.active {
      background: linear-gradient(
        90deg,
        rgba(102, 191, 222, 0.3) 0%,
        #66bfde 100%
      );
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 0px 6px 0px #78f7fd;
      border: 2px solid #78f7fd;
      color: $color-78F7FD;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
