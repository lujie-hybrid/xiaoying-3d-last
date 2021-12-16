<template>
  <div class="no-scrll">
    <el-table
      @row-click="(row) => $emit('row-click', row)"
      fit
      :max-height="maxHeight"
      border
      class="my-table"
      :data="data"
      style="width: 100%"
    >
      <template v-for="(item, i) in columnList">
        <el-table-column
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          v-if="!item.custom"
        >
        </el-table-column>
        <el-table-column
          :key="i"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          v-else
        >
          <template slot-scope="scope">
            <slot v-if="item.custom" :name="item.prop" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="pag-wrap">
      <el-pagination
        popper-class="my-select-popper"
        background
        :page-size="pag.pageSize"
        :total="pag.total"
        :current-page="pag.pageNum"
        :page-sizes="[20, 50, 100, 200, 300]"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentPage"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    columnList: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    pag: {
      type: Object,
      default: () => ({ total: 0, pageSize: 20, pageNum: 1 }),
    },
    maxHeight: {
      type: Number,
      default: 610,
    },
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    handleCurrentPage(page) {
      this.pag.pageNum = page;
      this.$emit("refresh");
    },
    handleSizeChange(size) {
      this.pag.pageNum = 1;
      this.pag.pageSize = size;
      this.$emit("refresh");
    },
  },
};
</script>
<style lang="scss" scoped>
.my-table {
  background-color: transparent;
  font-weight: $font-weight-400;
  color: $color-ffffff;
  font-size: $font-size-16;
  border-color: $color-78F7FD;
  &::before {
    background-color: $color-78F7FD;
  }
  &::after {
    background-color: $color-78F7FD;
  }
  ::v-deep .el-table__header th {
    background-color: rgba(120, 247, 253, 0.3);
    color: $color-E1E1E1;
    font-size: $font-size-18;
    padding: 7px 0;
    font-weight: $font-weight-500;
    border-color: $color-78F7FD;
  }
  ::v-deep tr,
  ::v-deep th {
    background-color: transparent;
  }
  ::v-deep .el-table__row {
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(102, 191, 222, 0.7) 0%,
        rgba(102, 191, 222, 0.3) 30%,
        rgba(102, 191, 222, 0.1) 50%,
        rgba(102, 191, 222, 0.3) 70%,
        rgba(102, 191, 222, 0.7) 100%
      );
      box-shadow: 0px 1px 20px 0px $color-78F7FD;
    }
    > td {
      padding: 15px 0;
      border-color: $color-78F7FD;
    }
  }
  ::v-deep .el-table__body tr:hover > td {
    background-color: transparent;
  }
}
.pag-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 26px;
  margin-right: -10px;
  ::v-deep .el-pagination.is-background .el-pager li {
    background-color: rgba(102, 191, 222, 0.1);
    color: $color-E1E1E1;
    border-radius: 2px;
    font-size: $font-size-14;
    height: 32px;
    line-height: 32px;
    min-width: 32px;
    &.active {
      background: rgba(120, 247, 253, 0.6);
      border: 1px solid #78f7fd;
      color: $color-ffffff;
      box-sizing: border-box;
    }
  }
  ::v-deep .el-pagination.is-background .btn-next,
  ::v-deep .el-pagination.is-background .btn-prev {
    background-color: rgba(102, 191, 222, 0.1);
    color: $color-E1E1E1;
    border-radius: 2px;
    height: 32px;
    line-height: 32px;
    min-width: 32px;
    .el-icon {
      font-size: $font-size-14;
    }
    &:disabled .el-icon {
      color: rgba(255, 255, 255, 0.15);
    }
  }

  ::v-deep .el-pagination__total {
    color: $color-E1E1E1;
    font-size: $font-size-14;
    line-height: 32px;
    margin-right: 14px;
    height: 32px;
  }
  ::v-deep .el-pagination__jump {
    color: $color-E1E1E1;
    font-size: $font-size-14;
    margin-left: 50px;
    .el-pagination__editor {
      margin: 0 5px;
    }
    .el-input__inner {
      border-radius: 2px;
      border: 1px solid rgba(102, 191, 222, 0.1);
      background-color: transparent;
      font-size: $font-size-14;
      color: $color-ffffff;
      height: 32px;
      line-height: 32px;
    }
  }
  ::v-deep .el-pagination__sizes {
    margin-right: 14px;
    .el-input__inner {
      height: 32px;
      background: rgba(102, 191, 222, 0.1);
      border-radius: 2px;
      height: 32px;
      border: none;
      font-size: $font-size-14;
      color: $color-ffffff;
    }
    .el-select .el-input {
      width: 110px;
    }
  }
}
</style>
