<template>
  <el-dialog
    append-to-body
    custom-class="base-dialog"
    :visible="visible"
    fullscreen
  >
    <v-header></v-header>
    <v-nav-child
      class="nav-static"
      :width="238"
      :left="30"
      :nav-list="navList"
    ></v-nav-child>
    <div class="record-cont">
      <div class="rc-tag">
        <v-date-time
          @change="getListData"
          :time.sync="time"
          label="日期选择"
        ></v-date-time>
        <div class="name-select">
          <p>车牌号筛选：</p>
          <el-input
            v-model="noVal"
            class="name-select-input"
            size="small"
            @keyup.enter.native="getListData"
            placeholder="请输入车牌号"
          ></el-input>
          <el-button @click="getListData" class="name-select-btn" size="small"
            >搜索</el-button
          >
          <el-button @click="resetAll" class="name-select-btn" size="small"
            >查询条件重置</el-button
          >
        </div>
        <!-- <div class="rc-tag-top">
          <div class="rct-inner">
            <r-tag
              :code="nowDoor"
              :prop-name="{ name: 'label', value: 'value' }"
              @code="(c) => clickSearchArea('nowDoor', c.value)"
              label="入营车闸"
              :list="doors"
            ></r-tag>
            <r-tag
              large
              class="tag-wrap-r"
              :code="nowPark"
              :prop-name="{ name: 'label', value: 'value' }"
              @code="(c) => clickSearchArea('nowPark', c.value)"
              label="停放位置"
              :list="parks"
            ></r-tag>
          </div>
          <r-tag
            large
            label="异常筛选"
            :code="nowErrorCode"
            :list="errList"
            @code="(c) => clickSearchArea('nowErrorCode', c.id)"
          ></r-tag>
        </div>
        <div class="rc-tag-bottom">
          <r-tag
            large
            :code="nowCarType"
            :prop-name="{ name: 'label', value: 'value' }"
            @code="(c) => clickSearchArea('nowCarType', c.value)"
            label="车辆类型"
            :list="carTypes"
          ></r-tag>

          <v-date-time
            @change="getListData"
            :time.sync="time"
            label="日期选择"
          ></v-date-time>
        </div> -->
      </div>
      <div class="bottom">
        <div class="rc-tb-wrap">
          <v-table
            v-loading="loading"
            @row-click="getRowDetail"
            :data="tb.list"
            :column-list="tb.columns"
            :pag="tb.pag"
            @refresh="getListData"
          >
            <!-- <template #info="slotProps">
              <span>姓名：{{ slotProps.row.userName }} </span>
            </template>
            <template #park="slotProps">
              {{ slotProps.row.carportype | dict(3) }}
            </template>
            <template #carType="slotProps">
              {{ slotProps.row.cartype | dict(2) }}
            </template>
            <template #remark="slotProps">
              <span v-show="slotProps.row.state != 1">{{
                slotProps.row.remark ? slotProps.row.remark : "无"
              }}</span>
              <span
                @click="showRemark(slotProps.row)"
                v-show="slotProps.row.state == 1"
                class="deal"
                >处理</span
              >
            </template>
            <template #out="slotProps">
              <span
                :class="{ 'danger-text': slotProps.row.state == 1 }"
                v-show="slotProps.row.outTime"
                >{{ slotProps.row.outChannelname }}
                <span class="ml16">{{ slotProps.row.outTime }}</span></span
              >
              <p class="no-record" v-show="!slotProps.row.outTime">
                <span :class="{ 'danger-text': slotProps.row.state == 1 }"
                  ><i class="el-icon-warning-outline"></i>无记录</span
                >
              </p>
            </template>
            <template #in="slotProps">
              <span
                :class="{ 'danger-text': slotProps.row.state == 1 }"
                v-show="slotProps.row.inTime"
                >{{ slotProps.row.inChannelname }}
                <span class="ml16">{{ slotProps.row.inTime }}</span></span
              >
              <p class="no-record" v-show="!slotProps.row.inTime">
                <span :class="{ 'danger-text': slotProps.row.state == 1 }"
                  ><i class="el-icon-warning-outline"></i>无记录</span
                >
              </p>
            </template> -->
          </v-table>
        </div>
        <div class="rc-info" v-if="right.car">
          <p class="rc-info-title">通行车辆详细信息</p>
          <div class="info-header">
            <el-image
              :src="right.car.imagePath"
              fit="cover"
              class="info-header-img"
            ></el-image>
            <div class="info-header-right">
              <p><span>车主姓名：</span>{{ right.car.userName }}</p>
              <p><span>车牌号：</span>{{ right.car.plateNo }}</p>
              <p><span>车辆品牌：</span>{{ right.car.carBrand }}</p>
              <p v-if="right.car.inChannelName">
                <span>入营闸道：</span>{{ right.car.inChannelName }}
              </p>
              <p v-if="right.car.outChannelName">
                <span>出营闸道：</span>{{ right.car.outChannelName }}
              </p>
            </div>
          </div>
          <div class="unit-line">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <p class="rc-info-bottom">近30天内通行记录</p>
          <v-scroll class="rib-wrap" v-if="right.list && right.list.length > 0">
            <ul class="rib-cont">
              <li v-for="(rItem, r) in right.list" :key="r">
                <div class="rib-cont-time" v-if="rItem.inChannelTime">
                  <p>{{ rItem.inChannelTime | str_year }}</p>
                  <p>{{ rItem.inChannelTime | str_date }}</p>
                </div>
                <div class="rib-cont-time" v-else-if="rItem.outChannelTime">
                  <p>{{ rItem.outChannelTime | str_year }}</p>
                  <p>{{ rItem.outChannelTime | str_date }}</p>
                </div>
                <div class="rib-cont-detail">
                  <p v-if="rItem.inChannelTime">
                    <span>入营时间：</span>{{ rItem.inChannelName }}
                    <span>{{ rItem.inChannelTime }}</span>
                  </p>
                  <p v-if="rItem.outChannelTime">
                    <span>离营时间：</span>{{ rItem.outChannelName }}
                    <span>{{ rItem.outChannelTime }}</span>
                  </p>
                  <p><span>车主姓名：</span>{{ rItem.userName }}</p>
                  <p><span>车牌号：</span>{{ rItem.plateNo }}</p>
                </div>
              </li>
            </ul>
          </v-scroll>
        </div>
      </div>
      <!-- <v-dialog :visible.sync="remarkVisible">
        <template #header>
          <div class="rk-header">
            <i class="el-icon-warning"></i>
            是否处置这条异常记录
          </div>
        </template>
        <el-input
          class="rk-input"
          type="textarea"
          placeholder="请填写备注"
          v-model="remarkCont"
        >
        </el-input>
        <template #footer>
          <div class="rk-footer">
            <el-button @click="remarkVisible = false">取消</el-button>
            <el-button type="primary" @click="dealMark">确定</el-button>
          </div>
        </template>
      </v-dialog> -->
    </div>
  </el-dialog>
</template>

<script>
// import RTag from "@comp/record/Tag";
import { mapState } from "vuex";
import { getStartToNow } from "@u/date";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  // components: { RTag },
  computed: mapState({
    // 映射 this.count 为 store.state.count
    navList: "navList",
    // doors(state) {
    //   const door = state.dict[state.dictKeys[4]] || [];
    //   return [{ label: "全部", value: -1 }, ...door];
    // },
    // parks(state) {
    //   const park = state.dict[state.dictKeys[3]] || [];
    //   return [{ label: "全部", value: -1 }, ...park];
    // },
    // carTypes(state) {
    //   const types = state.dict[state.dictKeys[2]] || [];
    //   const r = types.map((item) => ({ ...item, label: item.label + "车辆" }));
    //   return [{ label: "全部", value: -1 }, ...r];
    // },
  }),
  data() {
    return {
      // nowDoor: -1, // 当前入营车闸
      // nowPark: -1, // 当前停放位置
      // nowCarType: -1, // 当前车辆类型
      // errList: [
      //   { title: "全部记录", id: -1 },
      //   { title: "异常记录", id: 1 },
      // ],
      // // 当前的异常code
      // nowErrorCode: -1,
      loading: false,
      noVal: "",
      time: getStartToNow(), //时间
      // 列表
      tb: {
        pag: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
        },
        list: [],
        columns: [
          {
            label: "车牌号",
            prop: "plateNo",
            width: 116,
          },
          {
            label: "车主名称",
            prop: "userName",
            width: 120,
          },
          {
            label: "入营闸道名称",
            prop: "inChannelName",
            width: 190,
          },
          {
            label: "出营闸道名称",
            prop: "outChannelName",
            width: 190,
          },
          {
            label: "车辆颜色",
            prop: "plateColor",
            width: 110,
          },
          {
            label: "入营时间",
            prop: "inChannelTime",
            width: 190,
          },
          {
            label: "出营时间",
            prop: "outChannelTime",
            width: 190,
          },
          {
            label: "车辆类型",
            prop: "carTypeName",
            width: 110,
          },
          {
            label: "车辆品牌",
            prop: "carBrand",
            width: 115,
          },
        ],
      },
      // 右边信息
      right: {
        list: [],
        car: null,
      },
      // remarkVisible: false,
      // remarkCont: "", // 备注文案
      // currentRow: {}, // 当前处理的行
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    resetAll() {
      this.noVal = "";
      this.time = getStartToNow();
      this.getListData();
    },
    // 处理操作
    // showRemark(item) {
    //   this.currentRow = item;
    //   this.remarkVisible = true;
    //   this.remarkCont = "";
    // },
    // dealMark() {
    //   this.$api.car
    //     .deal({
    //       RecordID: this.currentRow.recordID,
    //       remark: this.remarkCont,
    //     })
    //     .then(() => {
    //       this.$message({
    //         message: "添加备注成功",
    //         type: "success",
    //       });
    //       this.remarkVisible = false;
    //       this.tb.pag.pageNum = 1;
    //       this.getListData();
    //     });
    // },
    // 点击列表行，获取详情
    getRowDetail(row) {
      this.right.car = row;
      this.right.list = row.recordListHistory;
      // this.$api.car.getDetail({ plateNo: row.plateNo }).then((res) => {
      //   this.right.list = res.recorddetilsList || [];
      //   this.right.car =
      //     this.right.list && this.right.list.length > 0
      //       ? this.right.list[0]
      //       : {};
      // });
    },
    // 点击搜索区域进行赋值和获取列表数据
    clickSearchArea(key, value) {
      this[key] = value;
      this.tb.pag.pageNum = 1;
      this.getListData();
    },
    // 获取列表数据
    getListData() {
      const { tb, time, noVal } = this;
      this.right.car = null;
      this.loading = true;
      this.$api.car
        .getList({
          pageNum: tb.pag.pageNum,
          pageSize: tb.pag.pageSize,
          start: time[0],
          end: time[1],
          carNum: noVal,
          // channeltype: nowDoor,
          // cartype: nowCarType,
          // carportype: nowPark,
          // state: nowErrorCode,
        })
        .then((res) => {
          this.tb.list = res.records || [];
          this.tb.pag.total = res.total;
          this.loading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.record-cont {
  padding: 0 30px 30px 30px;
  .rc-tag {
    padding: 24px 50px 24px 16px;
    background: rgba(37, 62, 70, 0.5);
    height: auto;
    display: flex;
    align-items: center;
    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
    }
    .tag-wrap-r {
      margin-left: 80px;
    }
    .rct-inner {
      display: flex;
    }
  }
}

.nav-static {
  position: static;
  margin: 148px 0 24px 30px;
}

.rc-tb-wrap {
  width: 1334px;
}
.bottom {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
}
.rc-info {
  background: url("~@/assets/images/record-info-bg.png") no-repeat left top;
  background-size: 100% 100%;
  width: 446px;
  height: 626px;
  margin-right: 40px;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  &-title {
    font-size: $font-size-20;
    font-weight: $font-weight-500;
    color: $color-ffffff;
    margin: 18px 0 0 30px;
    font-family: $font-AM;
  }
  .info-header {
    display: flex;
    align-items: center;
    margin: 20px 0 16px 30px;
    &-img {
      width: 155px;
      height: 87px;
    }
    &-right {
      margin-left: 30px;
      > p {
        color: $color-ffffff;
        font-weight: $font-weight-400;
        line-height: 20px;
        margin-bottom: 8px;
        &:last-child {
          margin-bottom: 0;
        }
        > span {
          display: inline-block;
          width: 70px;
          margin-right: 16px;
          color: $color-E1E1E1;
        }
      }
    }
  }
}
.unit-line {
  display: flex;
  align-items: center;
  margin: 0 10px;
  > p:nth-child(1),
  > p:nth-child(3) {
    width: 7px;
    height: 7px;
    background: $color-78F7FD;
  }
  > p:nth-child(2) {
    flex: 1;
    height: 1px;
    border: 1px dashed $color-DBDBDB;
    margin: 0 4px;
  }
}
.rc-info-bottom {
  margin: 8px 0 0 30px;
  font-weight: $font-weight-500;
  color: $color-ffffff;
  font-size: $font-size-16;
  font-family: $font-AM;
}
.rib-wrap {
  margin: 16px 11px 20px 30px;
  flex: 1;
  // padding-bottom: 20px;
}
.rib-cont {
  > li {
    display: flex;
    margin-bottom: 30px;
  }
  &-time {
    width: 48px;
    height: 48px;
    background: $color-66BFDE;
    font-size: $font-size-16;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color-ffffff;

    > p:nth-child(2) {
      font-size: $font-size-12;
      margin-top: 4px;
    }
  }
  &-detail {
    margin: 0 14px;
    flex: 1;
    > p {
      color: $color-ffffff;
      font-weight: $font-weight-400;
      line-height: 20px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
      > span:nth-child(1) {
        display: inline-block;
        width: 98px;
        color: $color-E1E1E1;
        margin-left: 0;
        &.no-time {
          color: $color-FF0000;
        }
      }
      > span {
        margin-left: 16px;
      }
    }
  }
}
.ml30 {
  margin-left: 30px;
}
.ml16 {
  margin-left: 16px;
}
.no-record {
  font-size: $font-size-16;
  font-weight: $font-weight-400;
  display: flex;
  align-items: center;
  justify-content: center;
  > i {
    margin-right: 8px;
  }
}
.danger-text {
  color: $color-FF0000;
  font-size: $font-size-16;
  font-weight: $font-weight-400;
}
.deal {
  cursor: pointer;
  color: $color-32C5FF;
  font-size: $font-size-14;
  font-weight: $font-weight-400;
}

.rk-header {
  padding: 24px 0 16px 25px;
  display: flex;
  align-items: center;
  > i {
    font-size: $font-size-16;
    color: $color-faad14;
    margin-right: 8px;
  }
  font-family: $font-AM;
  font-size: $font-size-18;
  color: $color-ffffff;
  font-weight: $font-weight-500;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.rk-footer {
  padding: 17px 42px 17px 0;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  ::v-deep .el-button + .el-button {
    margin-left: 24px;
  }
  ::v-deep .el-button {
    border-radius: 2px;
    font-size: $font-size-16;
    font-weight: $font-weight-400;
    height: 32px;
    line-height: 32px;
    padding: 0 17px;
    &:nth-child(1) {
      color: $color-E1E1E1;
      background-color: transparent;
      border: 1px solid $color-D8D8D8;
    }
    &:nth-child(2) {
      border: 1px solid $color-66BFDE;
      background-color: $color-66BFDE;
      color: $color-ffffff;
    }
  }
}
.rk-input {
  width: 100%;
  ::v-deep .el-textarea__inner {
    height: 200px;
    resize: none;
    border-radius: 0;
    background-color: transparent;
    padding: 17px 24px;
    border: none;
    font-size: $font-size-16;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    line-height: 22px;
    &::placeholder {
      color: $color-E1E1E1;
    }
  }
}
.name-select {
  display: flex;
  width: 600px;
  align-items: center;
  margin-left: 150px;
  > p {
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    font-family: "AlibabaPuHuiTi-Medium";
  }
  &-input {
    flex: 1;
    margin-left: 16px;
    ::v-deep .el-input__inner {
      border-radius: 0;
      background-color: rgba(120, 247, 253, 0.3);
      border: none;
      font-size: $font-size-16;
      font-weight: $font-weight-400;
      color: $color-ffffff;
    }
  }
  &-btn {
    margin-left: 16px;
    border-radius: 0;
    background-color: rgba(120, 247, 253, 0.3);
    border: none;
    font-size: $font-size-16;
    font-weight: $font-weight-400;
    color: $color-ffffff;
  }
}
</style>
