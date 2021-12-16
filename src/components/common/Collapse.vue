<template>
  <el-collapse
    v-if="list && list.length > 0"
    accordion
    class="my-collapse"
    v-model="value"
  >
    <el-collapse-item :name="item.id" v-for="(item, i) in list" :key="i">
      <template slot="title">
        <div
          :class="[
            'cpe-title',
            {
              active: nowItem.parentId == item.id,
              danger: nowItem.isDanger && nowItem.parentId == item.id,
            },
          ]"
        >
          <span>{{ item.title }}</span>
        </div>
      </template>
      <ul class="cpe-cont" v-if="item.children && item.children.length > 0">
        <li
          :class="{
            active: nowItem.id == chd.id,
            danger: chd.isDanger && nowItem.id == chd.id,
          }"
          @click="setActive(chd)"
          v-for="(chd, c) in item.children"
          :key="c"
        >
          <img
            v-show="nowItem.id == chd.id && !chd.isDanger"
            src="~@/assets/images/actual-unit-active.png"
          />
          <img
            v-show="nowItem.id == chd.id && chd.isDanger"
            src="~@/assets/images/actual-unit-danger.png"
          />
          <img
            v-show="nowItem.id != chd.id"
            src="~@/assets/images/actual-unit.png"
          />
          <span>{{ chd.title }}</span>
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
    id: {
      type: [Number, String],
      default: "",
    },
  },
  components: {},
  data() {
    return {
      value: "",
      nowItem: {},
    };
  },
  watch: {
    id: {
      handler(val) {
        console.log("watch", val);
        this.list.forEach((item) => {
          if (item.children && item.children.length > 0) {
            const r = item.children.find((d) => d.id == val);
            if (r) {
              this.nowItem = r;
              this.value = r.parentId;
            }
            return false;
          }
        });
      },
      immediate: true,
    },
  },
  // mounted() {
  //   console.log(this.hasDefault);
  //   if (this.hasDefault) {
  //     console.log(this.defaultValue);
  //     this.value = parseInt(this.defaultValue[1]);
  //     const item = this.list.find((d) => d.id == this.defaultValue[1]);
  //     this.nowItem = item.children.find((d) => d.id == this.defaultValue[0]);
  //   } else {
  //     this.value = this.list[0].id;
  //     this.nowItem = this.list[0].children[0];
  //   }
  // },
  methods: {
    setActive(chd) {
      this.nowItem = chd;
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
  padding-left: 36px;
  background-image: url("~@/assets/images/actual-down.png");
  background-repeat: no-repeat;
  background-position: left center;
  > img {
    width: 20px;
    margin-right: 16px;
  }
  &.active {
    color: $color-78F7FD;
    background-image: url("~@/assets/images/actual-active.png") !important;
  }
  &.danger {
    color: $color-DD0000;
    background-image: url("~@/assets/images/actual-warning-active.png") !important;
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
  }
  ::v-deep .el-collapse-item__arrow {
    display: none;
  }
}

.cpe-cont {
  > li {
    height: 32px;
    margin-bottom: 9px;
    padding-left: 60px;
    display: flex;
    align-items: center;
    font-size: $font-size-18;
    color: $color-ffffff;
    cursor: pointer;
    font-weight: $font-weight-400;
    > img {
      width: 16px;
      margin-right: 10px;
    }
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
    &.danger {
      background: linear-gradient(
        90deg,
        rgba(102, 191, 222, 0.3) 0%,
        #66bfde 100%
      );
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 0px 6px 0px #78f7fd;
      border: 2px solid #78f7fd;
      color: $color-DD0000;
    }
  }
}
</style>
