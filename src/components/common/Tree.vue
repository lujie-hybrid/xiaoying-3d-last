<template>
  <v-scroll ref="scr" class="var-scroll">
    <div class="my-tree">
      <el-tree
        ref="mytree"
        :data="list"
        :props="propName"
        :render-after-expand="false"
        :indent="13"
        node-key="id"
        :expand-on-click-node="false"
      >
        <div class="custom-tree-node" slot-scope="{ data }">
          <p
            @click="clickNode(data)"
            :ref="`ref${data.id}`"
            :class="{
              active: data.id == mine,
              title1: data.isTitle && data.level == 1,
              title2: data.isTitle && data.level != 1,
              danger: data.danger,
            }"
          >
            {{ data.name }}
          </p>
          <!-- <p
            :ref="`ref${chd.id}`"
            :class="{ active: chd.id == mine }"
            @click="clickNode(chd)"
            v-for="(chd, c) in data.cameraListModels"
            :key="c"
          >
            {{ chd.cameraName }}
          </p> -->
        </div>
      </el-tree>
    </div>
  </v-scroll>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    propName: {
      type: Object,
      default: () => ({
        label: "name",
        children: "chds",
      }),
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  watch: {
    id: {
      handler: function (val) {
        if (val) {
          this.setActive(val);
        }
      },
      // immediate: true,
    },
  },
  components: {},
  data() {
    return {
      mine: "",
    };
  },
  mounted() {
    this.setActive(this.id);
  },
  methods: {
    setActive(val) {
      this.mine = val;
      this.expandAll(this.$refs.mytree.getNode(val));
      const rf = this.$refs[`ref${val}`];
      if (rf) {
        const h = rf.offsetTop;
        const dom = this.$refs.scr.$el;
        dom.firstElementChild.scrollTop = h - 200;
      }
    },
    expandAll(node) {
      if (node && node.parent != null) {
        this.expandAll(node.parent);
      }
      node && (node.expanded = true);
    },
    clickNode(item) {
      if (item.isTitle) return;
      this.$emit("clicked", item);
      this.mine = item.id;
    },
  },
};
</script>
<style lang="scss" scoped>
.var-scroll {
  margin: 7px 0 20px 0;
  height: calc(100vh - 260px);
}
.my-tree {
  ::v-deep .el-tree {
    background-color: transparent;
    color: #fff;
    > .el-tree-node {
      &:focus > .el-tree-node__content {
        background-color: transparent;
      }
    }
    .el-tree-node__children .el-tree-node {
      margin-bottom: 6px;
      //   &.is-current {
      //     box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 0px 6px 0px #78f7fd;
      //     border: 2px solid #78f7fd;
      //     background: linear-gradient(
      //       90deg,
      //       rgba(102, 191, 222, 0.3) 0%,
      //       #66bfde 100%
      //     );
      //   }
      &:focus > .el-tree-node__content {
        background-color: transparent;
      }
    }
    .el-tree-node__content {
      height: auto;
      align-items: center;
      > .el-tree-node__expand-icon {
        padding: 6px 2px;
        color: #78f7fd;
        &.is-leaf {
          color: transparent;
        }
      }
      &:hover {
        background-color: transparent;
      }
    }
  }
  .custom-tree-node {
    font-size: 16px;
    // display: flex;
    // align-items: center;
    > p {
      display: flex;
      align-items: center;
      padding: 0 5px;
      height: 24px;
      margin-bottom: 2px;
      &.active {
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.3), 0px 0px 6px 0px #78f7fd;
        border: 2px solid #78f7fd;
        background: linear-gradient(
          90deg,
          rgba(102, 191, 222, 0.3) 0%,
          #66bfde 100%
        );
      }
      &.danger {
        color: $color-DD0000;
      }
      &.title1 {
        font-size: 20px;
        height: 28px;
        color: #78f7fd;
        font-family: $font-AM;
      }
      &.title2 {
        font-size: 18px;
        height: 26px;
        color: #66bfde;
      }
    }
  }
}
</style>
