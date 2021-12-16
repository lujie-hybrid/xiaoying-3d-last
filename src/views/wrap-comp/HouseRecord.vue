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
      :width="355"
      :left="30"
      :nav-list="navList"
    ></v-nav-child>
    <div class="record-cont">
      <div class="rc-tag">
        <div class="rc-tag-top">
          <r-tag
            large
            :code="nowDoor"
            :prop-name="{ name: 'name', value: 'id' }"
            @code="clickBuild"
            label="位置选择"
            :list="doors"
          ></r-tag>
          <r-tag
            large
            class="tag-wrap-r"
            :code="status"
            :prop-name="{ name: 'dictLabel', value: 'dictValue' }"
            @code="(c) => clickSearchArea('status', c.dictValue)"
            label="房屋状态"
            :list="statusList"
          ></r-tag>
        </div>
        <div class="rc-tag-bottom">
          <r-tag
            large
            :code="nowUnit"
            :prop-name="{ name: 'name', value: 'id' }"
            @code="(c) => clickSearchArea('nowUnit', c.id)"
            label="单元选择"
            :list="units"
          ></r-tag>
          <r-tag
            large
            :code="nowProject"
            :prop-name="{ name: 'dictLabel', value: 'dictValue' }"
            @code="(c) => clickSearchArea('nowProject', c.dictValue)"
            label="欠费项目"
            :list="projects"
          ></r-tag>
        </div>
      </div>
      <div class="bottom">
        <div class="rc-tb-wrap">
          <v-table
            @row-click="getRowDetail"
            :data="tb.list"
            :column-list="tb.columns"
            :pag="tb.pag"
            @refresh="getListData"
          >
            <template #info="slotProps">
              <span>{{ slotProps.row.bsHouseDetailModel.houseInfo }}</span>
            </template>
            <template #area="slotProps">
              <span>{{ slotProps.row.bsHouseDetailModel.area }}㎡</span>
            </template>
            <template #status="slotProps">
              <span>{{ slotProps.row.bsHouseDetailModel.statusName }}</span>
            </template>
            <template #user="slotProps">
              <span v-if="slotProps.row.formerEnterMember"
                >户主: {{ slotProps.row.formerEnterMember.name }}
                {{
                  slotProps.row.formerEnterMember.sex == 0 ? "男" : "女"
                }}</span
              >
            </template>
            <template #num="slotProps">
              <span>
                {{ slotProps.row.bsHouseDetailModel.enterMemberNum }} 人</span
              >
            </template>

            <template #intime="slotProps">
              <span v-if="slotProps.row.masterMemberInfo">{{
                slotProps.row.masterMemberInfo.enterTime
              }}</span>
            </template>
            <template #arrears="slotProps">
              <span
                v-if="
                  slotProps.row.feeInfoModels &&
                  slotProps.row.feeInfoModels.length > 0
                "
              >
                <span
                  class="w-50"
                  v-for="(item, i) in slotProps.row.feeInfoModels"
                  :key="i"
                  >{{ item.feeTypeName }}: {{ item.arrearsMoney }}元</span
                >
              </span>
            </template>
          </v-table>
        </div>
        <div class="rc-info" v-if="right">
          <p class="rc-info-title">住户&房屋详细信息</p>
          <div class="rc-info-header" v-if="right.masterMemberInfo">
            <!-- <div>
              <el-image
                class="rih-img"
                fit="cover"
                :src="right.masterMemberInfo.headImageUrl"
              ></el-image>
              <p class="rih-img-text">( 户主照片 )</p>
            </div> -->
            <div class="rih-cont">
              <p>姓名:{{ right.masterMemberInfo.name }} <span>(户主)</span></p>
              <p>姓别:{{ right.masterMemberInfo.sex == 0 ? "男" : "女" }}</p>
              <p>联系电话:{{ right.masterMemberInfo.phone }}</p>
              <p>身份证号:{{ right.masterMemberInfo.cardId }}</p>
            </div>
            <!-- <div class="rih-right">
              <p>关联车牌号:</p>
              <p>苏A·9A6Q6</p>
              <p>苏A·9A6Q6</p>
              <p>苏A·9A6Q6</p>
            </div> -->
          </div>

          <div class="rc-flex rc-common mt16 pl35">
            <p class="mr36" v-if="right.masterMemberInfo">
              入住时间: {{ right.masterMemberInfo.enterTime }}
            </p>
            <p>入住人数: {{ right.bsHouseDetailModel.enterMemberNum }} 人</p>
          </div>

          <div class="rc-flex rc-common mt16 pl35">
            <p>家庭成员:</p>
            <ul
              class="rip-list"
              v-if="
                right.otherEnterMembers && right.otherEnterMembers.length > 0
              "
            >
              <li v-for="(man, m) in right.otherEnterMembers" :key="m">
                {{ man.name }}: {{ man.relationship }}
              </li>
            </ul>
          </div>

          <div class="unit-line">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <p class="rc-base">房屋基本信息</p>
          <div class="rc-flex rc-common pl35">
            <p>房间面积: {{ right.bsHouseDetailModel.area }} ㎡</p>
            <p class="ml32">
              房间状态: {{ right.bsHouseDetailModel.statusName }}
            </p>
            <p class="ml32">
              是否欠费:
              {{
                right.feeInfoModels && right.feeInfoModels.length > 0
                  ? "是"
                  : "否"
              }}
            </p>
          </div>
          <div class="rc-flex rc-common pl35 mt8">
            <p>欠费项目:</p>
            <ul
              class="project-list"
              v-if="right.feeInfoModels && right.feeInfoModels.length > 0"
            >
              <li v-for="(obj, o) in right.feeInfoModels" :key="o">
                {{ obj.feeTypeName }} ({{ obj.arrearsMoney }} 元)
              </li>
            </ul>
          </div>
          <p class="rc-base">历史租户信息</p>
          <div class="rc-flex pl35" v-if="right.formerEnterMember">
            <div class="rc-history-time">
              <p>{{ right.formerEnterMember.enterTime | str_year }}</p>
              <p>{{ right.formerEnterMember.enterTime | str_date }}</p>
            </div>
            <div class="rc-common">
              <p>
                入住户主姓名： {{ right.formerEnterMember.name }}
                {{ right.formerEnterMember.sex == 0 ? "男" : "女" }}
              </p>
              <p class="mt8">
                租住时间： {{ right.formerEnterMember.enterTime }} -
                {{ right.formerEnterMember.moveTime }}
              </p>
              <!-- <p class="mt8">入住人数： 3人</p> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import RTag from "@comp/record/Tag";
import { mapState } from "vuex";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  components: { RTag },
  computed: mapState({
    // 映射 this.count 为 store.state.count
    navList: "navList",
  }),
  data() {
    return {
      nowDoor: -1, // 当前楼栋
      nowUnit: -1, // 当前单元
      status: -1, // 当前状态
      nowProject: -1, // 当前欠费项目
      projects: [],
      units: [],
      statusList: [],
      doors: [],
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
            label: "房屋信息",
            prop: "info",
            width: 263,
            custom: true,
          },
          {
            label: "房屋面积",
            prop: "area",
            width: 114,
            custom: true,
          },
          {
            label: "房屋状态",
            prop: "status",
            width: 114,
            custom: true,
          },
          {
            label: "住户信息",
            prop: "user",
            width: 196,
            custom: true,
          },
          {
            label: "入住人数",
            prop: "num",
            width: 122,
            custom: true,
          },
          {
            label: "入住日期",
            prop: "intime",
            width: 126,
            custom: true,
          },
          {
            label: "欠费项目&金额",
            prop: "arrears",
            width: 232,
            custom: true,
          },
        ],
      },
      // 右边信息
      right: null,
    };
  },
  created() {
    this.getDictData();
  },
  methods: {
    // 获取搜索条件数据
    getDictData() {
      this.$api.house.getDict().then((res) => {
        this.doors = res.regionListModels || [];
        this.statusList = res.houseStatusDictDataModels || [];
        this.projects = res.feeTypeDictDataModels || [];
        this.clickBuild({ id: this.doors[0].id });
        this.getListData();
      });
    },
    // 点击楼栋
    clickBuild(obj) {
      this.nowDoor = obj.id;
      const item = this.doors.find((d) => d.id === obj.id);
      this.units = item.children;
      this.nowUnit = -1;
      this.tb.pag.pageNum = 1;
      this.getListData();
    },
    // 点击列表行，获取详情
    getRowDetail(row) {
      this.right = row;
    },
    // 点击搜索区域进行赋值和获取列表数据
    clickSearchArea(key, value) {
      this[key] = value;
      this.tb.pag.pageNum = 1;
      this.getListData();
    },
    // 获取列表数据
    getListData() {
      const { nowProject, tb, status, nowDoor, nowUnit } = this;
      this.right = null;
      this.$api.house
        .getList({
          pageIndex: tb.pag.pageNum,
          pageSize: tb.pag.pageSize,
          buildCode: nowDoor,
          buildUnit: nowUnit,
          houseStatus: status,
          feeType: nowProject,
        })
        .then((res) => {
          this.tb.list = res.records || [];
          this.tb.pag.total = res.total;
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
    height: 132px;
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
  width: 1172px;
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
}
.unit-line {
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding-top: 8px;
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
.rc-info-header {
  display: flex;
  padding: 25px 0 0 35px;
}
.rih-img {
  width: 76px;
  height: 95px;
  margin-right: 8px;
  &-text {
    text-align: center;
    margin-top: 4px;
    font-size: $font-size-10;
    color: $color-ffffff;
  }
}
.rih-cont > p {
  margin-bottom: 8px;
  line-height: 20px;
  color: $color-E1E1E1;
  font-size: $font-size-14;
  > span {
    color: $color-faad14;
  }
}
.rih-right {
  height: 116px;
  border-left: 1px dashed $color-D8D8D8;
  padding-left: 7px;
  margin-left: 8px;
  > p {
    margin-bottom: 8px;
    font-size: $font-size-14;
    color: $color-E1E1E1;
    line-height: 20px;
  }
}
.mr8 {
  margin-right: 8px;
}
.rc-common {
  font-size: $font-size-14;
  color: $color-E1E1E1;
  line-height: 20px;
}
.mr36 {
  margin-right: 36px;
}
.ml32 {
  margin-left: 32px;
}
.mt8 {
  margin-top: 8px;
}
.mt16 {
  margin-top: 16px;
}
.pl35 {
  padding-left: 35px;
}
.rc-flex {
  display: flex;
}
.rip-list {
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  margin-left: 8px;
  > li {
    margin: 0 26px 8px 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.rc-base {
  padding: 16px 0 16px 35px;
  font-size: $font-size-16;
  font-weight: $font-weight-500;
  color: $color-ffffff;
}
.project-list {
  width: 250px;
  display: flex;
  flex-wrap: wrap;
  > li {
    font-size: $font-size-14;
    font-weight: $font-weight-400;
    color: $color-ffffff;
    margin-left: 8px;
    margin-bottom: 8px;
  }
}
.rc-history-time {
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
.w-50 {
  display: inline-block;
  width: 50%;
}
</style>
