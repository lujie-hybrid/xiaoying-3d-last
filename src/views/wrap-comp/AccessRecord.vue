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
      :left="30"
      :nav-list="navList"
    ></v-nav-child>
    <div class="record-cont">
      <div class="rc-tag">
        <div class="rc-tag-top">
          <!-- <r-tag
            :code="nowPos.id || posList[0].id"
            :prop-name="{ name: 'name', value: 'id' }"
            v-if="posList && posList.length > 0"
            @code="clickBuild"
            label="位置选择"
            :list="posList"
          ></r-tag> -->
          <div class="area-select">
            <p>区域选择：</p>
            <el-cascader
              class="area-select-cascader"
              v-model="areaValue"
              :options="areaOptions"
              @change="getListData"
              popper-class="ar-popper"
              clearable
              size="small"
              :props="{
                label: 'name',
                value: 'id',
              }"
            ></el-cascader>
          </div>

          <v-date-time
            @change="getListData"
            :time.sync="time"
            label="日期选择"
          ></v-date-time>
        </div>
        <div class="rc-tag-bottom">
          <!-- <div class="rtb-inner">
            <r-tag
              :code="nowUnit"
              :prop-name="{ name: 'name', value: 'id' }"
              v-show="!nowPos.isdoor"
              @code="(c) => clickSearchArea('nowUnit', c.id)"
              label="单元选择"
              :list="unitList"
            ></r-tag>
            <r-tag
              :code="inOutCode"
              :prop-name="{ name: 'label', value: 'value' }"
              v-show="nowPos.isdoor"
              label="出入门禁"
              :list="inOutList"
              @code="(c) => clickSearchArea('inOutCode', c.value)"
            ></r-tag>
            <r-tag
              :code="nowPeopleCode"
              :prop-name="{ name: 'label', value: 'value' }"
              class="tag-wrap-r"
              @code="(c) => clickSearchArea('nowPeopleCode', c.value)"
              label="人员类型"
              :list="peopleType"
            ></r-tag>
          </div> -->
          <!-- <r-tag
            large
            v-show="nowPos.isdoor && nowPeopleCode == specialCode"
            label="异常筛选"
            :code="nowErrorCode"
            :list="errList"
            @code="(c) => clickSearchArea('nowErrorCode', c.id)"
          ></r-tag> -->
        </div>
        <div class="name-select">
          <p>姓名筛选：</p>
          <el-input
            v-model="nameVal"
            class="name-select-input"
            size="small"
            @keyup.enter.native="getListData"
            placeholder="请输入姓名"
          ></el-input>
          <el-button @click="getListData" class="name-select-btn" size="small"
            >搜索</el-button
          >
          <el-button @click="resetAll" class="name-select-btn" size="small"
            >查询条件重置</el-button
          >
        </div>
      </div>
      <div class="bottom">
        <div class="rc-tb-wrap">
          <v-table
            @refresh="getListData"
            @row-click="getRowDetail"
            :max-height="590"
            v-show="
              !nowPos.isdoor || (nowPos.isdoor && nowPeopleCode != specialCode)
            "
            :data="tb.list"
            :column-list="tb.columns"
            :pag="tb.pag"
          >
            <template #info="slotProps">
              <span
                >姓名：{{ slotProps.row.name }}
                <span class="ml30">{{ slotProps.row.deptName }}</span></span
              >
            </template>
            <template #remark="slotProps">
              <span>{{
                slotProps.row.remark ? slotProps.row.remark : "无"
              }}</span>
            </template>
          </v-table>
          <v-table
            @refresh="getListData"
            @row-click="getRowDetail"
            :max-height="590"
            v-show="nowPeopleCode == specialCode && nowPos.isdoor"
            :data="tb.warningList"
            :column-list="tb.warningColumns"
            :pag="tb.pag"
          >
            <template #info="slotProps">
              <span
                >姓名：{{ slotProps.row.name }}
                <span class="ml30">{{ slotProps.row.deptName }}</span></span
              >
            </template>
            <template #out="slotProps">
              <span
                :class="{
                  'danger-text':
                    slotProps.row.exceptionType == 1 &&
                    slotProps.row.dealType == 0,
                }"
                v-show="slotProps.row.outPassTime"
                >{{ slotProps.row.outDoorName }}
                <span class="ml16">{{ slotProps.row.outPassTime }}</span></span
              >
              <p class="no-record" v-show="!slotProps.row.outPassTime">
                <span
                  :class="{
                    'danger-text':
                      slotProps.row.exceptionType == 1 &&
                      slotProps.row.dealType == 0,
                  }"
                  ><i class="el-icon-warning-outline"></i>无记录</span
                >
              </p>
            </template>
            <template #in="slotProps">
              <span
                :class="{
                  'danger-text':
                    slotProps.row.exceptionType == 1 &&
                    slotProps.row.dealType == 0,
                }"
                v-show="slotProps.row.passTime"
                >{{ slotProps.row.doorName }}
                <span class="ml16">{{ slotProps.row.passTime }}</span></span
              >
              <p class="no-record" v-show="!slotProps.row.passTime">
                <span
                  :class="{
                    'danger-text':
                      slotProps.row.exceptionType == 1 &&
                      slotProps.row.dealType == 0,
                  }"
                  ><i class="el-icon-warning-outline"></i>无记录</span
                >
              </p>
            </template>
            <template #remark="slotProps">
              <span
                v-show="
                  slotProps.row.exceptionType != 1 ||
                  (slotProps.row.exceptionType == 1 &&
                    slotProps.row.dealType == 1)
                "
                >{{ slotProps.row.remark ? slotProps.row.remark : "无" }}</span
              >
              <span
                @click="showRemark(slotProps.row)"
                v-show="
                  slotProps.row.exceptionType == 1 &&
                  slotProps.row.dealType == 0
                "
                class="deal"
                >处理</span
              >
            </template>
          </v-table>
        </div>
        <div class="rc-info" v-if="right.list && right.list.length > 0">
          <p class="rc-info-title">通行人员详细信息</p>
          <div class="info-header">
            <el-image
              class="info-header-img"
              fit="cover"
              :src="right.perMsg.takePhoto"
            ></el-image>
            <div class="info-header-right">
              <p><span>姓名：</span>{{ right.perMsg.name }}</p>
              <p><span>人员类型：</span>{{ right.perMsg.personType }}</p>
              <!-- <p><span>所属网格：</span>{{ right.perMsg.deptName }}</p> -->
              <p><span>联系电话：</span>{{ right.perMsg.phone }}</p>
              <!-- <p><span>身份证号：</span>{{ right.perMsg.cardNo }}</p> -->
            </div>
          </div>
          <div class="unit-line">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <p class="rc-info-bottom">近30天内走访记录</p>
          <v-scroll class="rib-wrap">
            <ul class="rib-cont">
              <li v-for="(rItem, r) in right.list" :key="r">
                <div
                  class="rib-cont-time"
                  v-if="rItem.passTime || rItem.outPassTime"
                >
                  <p>{{ (rItem.passTime || rItem.outPassTime) | str_year }}</p>
                  <p>{{ (rItem.passTime || rItem.outPassTime) | str_date }}</p>
                </div>
                <div class="rib-cont-detail">
                  <p v-if="rItem.passTime">
                    <span>入营时间：</span>{{ rItem.doorName }}
                    <span>{{ rItem.passTime }}</span>
                  </p>
                  <p v-if="rItem.outPassTime">
                    <span :class="{ 'no-time': !rItem.outPassTime }"
                      >离营时间：</span
                    >{{ rItem.outDoorName }}
                    <span>{{ rItem.outPassTime }}</span>
                  </p>
                  <!-- <p><span>走访地点：</span></p>
                  <p>
                    <span>走访户主姓名：{{ rItem.visitedName }}</span>
                  </p> -->
                </div>
              </li>
            </ul>
          </v-scroll>
        </div>
        <v-dialog :visible.sync="remarkVisible">
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
        </v-dialog>
      </div>
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
    peopleType(state) {
      const peo = state.dict[state.dictKeys[0]] || [];
      return [{ label: "全部", value: 0 }, ...peo];
    },
    inOutList(state) {
      const access = state.dict[state.dictKeys[1]] || [];
      return [{ label: "全部", value: 0 }, ...access];
    },
  }),
  data() {
    return {
      areaValue: [],
      areaOptions: [],
      nowPos: {}, // 当前的楼栋
      nowUnit: 0, // 当前单元
      inOutCode: 0, // 当前出入禁code
      nowPeopleCode: 0, // 当前的人员类型code
      unitList: [], // 单元列表
      posList: [], // 楼栋列表
      errList: [
        { title: "全部记录", id: 0 },
        { title: "异常记录", id: 1 },
      ],
      // 当前的异常code
      nowErrorCode: 0,
      time: getStartToNow(), //时间
      specialCode: "2", // 访客的code
      // 列表
      tb: {
        pag: {
          pageNum: 1,
          pageSize: 20,
          total: 0,
          loading: false,
        },
        list: [], // 非大门访客列表
        warningList: [], // 大门访客列表
        columns: [
          {
            label: "人员信息",
            prop: "info",
            width: 336,
            custom: true,
          },
          {
            label: "门禁位置",
            prop: "doorName",
            width: 134,
          },
          {
            label: "入门禁日期",
            prop: "passTime",
            width: 277,
          },
          {
            label: "出门禁日期",
            prop: "outPassTime",
            width: 277,
          },
          {
            label: "人员类型",
            prop: "personType",
            width: 104,
          },
          {
            label: "备注/操作",
            prop: "remark",
            width: 119,
            custom: true,
          },
        ],
        warningColumns: [
          {
            label: "人员信息",
            prop: "info",
            width: 336,
            custom: true,
          },
          {
            label: "入门禁日期 & 日期",
            prop: "in",
            width: 277,
            custom: true,
          },
          {
            label: "出门禁日期 & 日期",
            prop: "out",
            width: 277,
            custom: true,
          },
          {
            label: "人员类型",
            prop: "personType",
            width: 104,
          },
          {
            label: "备注/操作",
            prop: "remark",
            width: 119,
            custom: true,
          },
        ],
      },
      right: {
        list: [],
        perMsg: {},
      },
      remarkVisible: false,
      remarkCont: "", // 备注文案
      currentRow: {}, // 当前处理的行
      nameVal: "",
    };
  },
  created() {
    this.$api.access.getRecordBuild({ id: 0 }).then((res) => {
      this.posList = res;
      this.getUnit(res[0].id);
      this.getListData();
    });
    this.$api.access.getArea().then((res) => {
      // console.log(res, "res");
      this.areaOptions = res || [];
    });
  },
  methods: {
    resetAll() {
      this.areaValue = [];
      this.time = getStartToNow();
      this.nameVal = "";
      this.getListData();
    },
    // 处理操作
    showRemark(item) {
      this.currentRow = item;
      this.remarkVisible = true;
      this.remarkCont = "";
    },
    dealMark() {
      this.$api.access
        .deal({
          recordId: this.currentRow.recordID,
          remark: this.remarkCont,
        })
        .then(() => {
          this.$message({
            message: "添加备注成功",
            type: "success",
          });
          this.remarkVisible = false;
          this.tb.pag.pageNum = 1;
          this.getListData();
        });
    },
    // 点击列表行，获取详情
    getRowDetail(row) {
      this.$api.access.getRecordDetail({ cardNo: row.cardNo }).then((res) => {
        this.right.list = res.accessRecordDetailDtos || [];
        this.right.perMsg =
          this.right.list && this.right.list.length > 0
            ? this.right.list[0]
            : {};
      });
    },
    // 点击楼栋
    clickBuild(b) {
      this.nowPos = b;
      this.inOutCode = 0;
      this.nowErrorCode = 0;
      if (!b.isdoor) {
        this.nowUnit = 0;
        this.getUnit(b.id);
      }
      this.tb.pag.pageNum = 1;
      this.getListData();
    },
    // 获取楼栋下的单元信息
    getUnit(value) {
      this.$api.access.getRecordBuild({ id: value }).then((res) => {
        this.unitList = [{ name: "全部", id: 0 }, ...res];
      });
    },
    // 点击搜索区域进行赋值和获取列表数据
    clickSearchArea(key, value) {
      this[key] = value;
      this.tb.pag.pageNum = 1;
      this.getListData();
    },
    // 获取列表数据
    getListData() {
      const {
        // nowPos,
        tb,
        areaValue,
        time,
        // inOutCode,
        // nowPeopleCode,
        // nowErrorCode,
        // posList,
        nameVal,
      } = this;
      console.log(areaValue, "areaValue");
      this.right.list = [];
      this.$api.access
        .getRecords({
          pageNum: tb.pag.pageNum,
          pageSize: tb.pag.pageSize,
          unitId:
            areaValue && areaValue.length > 0
              ? areaValue[areaValue.length - 1]
              : null,
          start: time[0],
          end: time[1],
          // inOut: inOutCode,
          // exceptionType: nowErrorCode,
          // personType: nowPeopleCode,
          name: nameVal ? nameVal : null,
        })
        .then((res) => {
          if (this.nowPos.isdoor && this.nowPeopleCode == this.specialCode) {
            this.tb.warningList = res.accessRecordDetailDtos || [];
            this.tb.pag.total = res.count;
          } else {
            this.tb.list = res.accessRecordDetailDtos || [];
            this.tb.pag.total = res.count;
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.record-cont {
  padding: 0 30px 30px 30px;
  .rc-tag {
    padding: 18px;
    background: rgba(37, 62, 70, 0.5);
    // height: 132px;
    &-top {
      display: flex;
      // justify-content: space-between;
      margin-bottom: 16px;
    }
    &-bottom {
      display: flex;
      justify-content: space-between;
      .tag-wrap-r {
        margin-left: 32px;
      }
      .rtb-inner {
        display: flex;
      }
    }
  }
}
.nav-static {
  position: static;
  margin: 148px 0 24px 30px;
}
.rc-tb-wrap {
  width: 1252px;
}
.bottom {
  margin-top: 16px;
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
    margin: 20px 0 16px 30px;
    &-img {
      width: 104px;
      height: 132px;
    }
    &-right {
      margin-left: 16px;
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
          margin-right: 20px;
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
    margin-bottom: 20px;
  }
  &-time {
    width: 48px;
    height: 48px;
    background: $color-66BFDE;
    font-size: $font-size-18;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color-ffffff;
    margin-right: 16px;

    > p:nth-child(2) {
      font-size: $font-size-12;
      margin-top: 4px;
    }
  }
  &-detail {
    flex: 1;
    margin-right: 10px;
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
        // width: 78px;
        color: $color-E1E1E1;
        margin-left: 0;
        margin-right: 5px;
        &.no-time {
          color: $color-FF0000;
        }
      }
      > span {
        margin-left: 10px;
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
  i {
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
  margin-top: 16px;
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
.area-select {
  display: flex;
  align-items: center;
  margin-right: 100px;
  > p {
    font-weight: 500;
    font-size: 18px;
    color: #ffffff;
    font-family: "AlibabaPuHuiTi-Medium";
  }
  &-cascader {
    margin-left: 16px;
    width: 350px;
    ::v-deep .el-input__inner {
      border-radius: 0;
      background-color: rgba(120, 247, 253, 0.3);
      border: none;
      font-size: $font-size-16;
      font-weight: $font-weight-400;
      color: $color-ffffff;
    }
  }
}
</style>
