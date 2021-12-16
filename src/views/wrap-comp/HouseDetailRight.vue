<template>
  <v-inner is-right v-if="msg">
    <v-unit :title="`缴费金额统计（${buildName}）${year}年`" no-right>
      <house-progress
        v-if="list && list.length > 0"
        :list="list"
      ></house-progress>
    </v-unit>
    <v-unit
      :title="`房屋&住户基本信息（${buildName}${msg.bsHouseDetailModel.name}室）`"
      no-right
    >
      <div class="hdr-user" v-if="msg.masterMemberInfo">
        <div class="flex-1">
          <div class="hdr-user-inner">
            <!-- <div>
              <el-image
                class="hdr-user-img mt8"
                fit="cover"
                :src="msg.masterMemberInfo.headImageUrl"
              ></el-image>
              <p class="hdr-user-tip">( 户主照片 )</p>
            </div> -->
            <div class="common">
              <p class="mt8 ml8">
                姓名：{{ msg.masterMemberInfo.name }} <span>(户主)</span>
                {{ msg.masterMemberInfo.sex == 0 ? "男" : "女" }}
              </p>
              <p class="mt8 ml8">
                入住时间：{{ msg.masterMemberInfo.enterTime }}
              </p>
              <p class="mt8 ml8">联系电话：{{ msg.masterMemberInfo.phone }}</p>
              <div class="mt8 ml8">
                <p>身份证号：</p>
                <p class="mt4">{{ msg.masterMemberInfo.cardId }}</p>
              </div>
            </div>
          </div>
          <!-- <div class="hdr-user-car common mt8">
            <p>车牌号:</p>
            <ul class="hdr-user-carList">
              <li v-for="(item, i) in carList" :key="i">{{ item }}</li>
            </ul>
          </div> -->
        </div>

        <div
          class="hdr-user-right common"
          v-if="msg.otherEnterMembers && msg.otherEnterMembers.length > 0"
        >
          <p class="mt8 ml8">入住人数：{{ msg.otherEnterMembers.length }}人</p>
          <p v-for="(per, p) in msg.otherEnterMembers" :key="p" class="mt8 ml8">
            {{ per.relationship }}：{{ per.name }}
          </p>
        </div>
      </div>
      <div
        class="common hdr-user-bottom"
        :class="{ 'no-top': !msg.masterMemberInfo }"
      >
        <p class="mt8 pct-50">房间面积：{{ msg.bsHouseDetailModel.area }} ㎡</p>
        <p class="mt8 pl pct-50">
          上一任住户：<span v-if="msg.formerEnterMember"
            >{{ msg.formerEnterMember.name }}
            {{ msg.formerEnterMember.sex == 0 ? "男" : "女" }}</span
          >
        </p>
        <div class="flex pct-100">
          <div class="pct-50">
            <p class="mt8">房间状态：{{ msg.bsHouseDetailModel.statusName }}</p>
            <p class="mt8">
              装修时间：<span v-if="msg.bsHouseDetailModel.buildStartTime"
                >{{ msg.bsHouseDetailModel.buildStartTime }}-{{
                  msg.bsHouseDetailModel.buildEndTime
                }}</span
              >
            </p>
          </div>
          <div class="mt8 pl pct-50">
            上一任居住时间：
            <p class="mt4" v-if="msg.formerEnterMember">
              {{ msg.formerEnterMember.enterTime }}-{{
                msg.formerEnterMember.moveTime
              }}
            </p>
          </div>
        </div>
      </div>
    </v-unit>
    <v-unit
      :title="`房屋缴费情况（${buildName}${msg.bsHouseDetailModel.name}室）${year}年`"
      no-right
    >
      <div
        class="tb no-scrll"
        v-if="msg.feeInfoModels && msg.feeInfoModels.length > 0"
      >
        <div>
          <div class="tb-header tb-item">
            <p>项目</p>
            <p>状态</p>
          </div>
          <p class="tb-item">总金额</p>
          <p class="tb-item">已缴费</p>
          <p class="tb-item">未交费</p>
        </div>
        <div v-for="(mon, m) in msg.feeInfoModels" :key="m">
          <p class="tb-item header">{{ mon.feeTypeName }}</p>
          <p class="tb-item">{{ mon.totalMoney }}元</p>
          <p class="tb-item">{{ mon.totalPayMoney }}元</p>
          <p class="tb-item">{{ mon.arrearsMoney }}元</p>
        </div>
      </div>
      <p class="tb-warning" v-for="(item, i) in msg.feeInfo" :key="i">
        <i class="el-icon-warning-outline"></i>{{ item }}
      </p>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import HouseProgress from "@comp/house/HouseProgress";
import { getNowYear } from "@u/date";
export default {
  components: { HouseProgress },
  data() {
    return {
      year: getNowYear(),
      carList: ["苏A·9A6Q6", "苏A·9A6Q6", "苏A·9A6Q6"],
    };
  },
  computed: {
    ...mapState("house", {
      msg: (state) => state.houseRightMsg,
      list: (state) => state.stat,
      buildName: (state) => state.buildName,
    }),
  },
  beforeDestroy() {
    this.set_value({ key: "houseRightMsg", val: null });
  },
  methods: {
    ...mapMutations("house", ["set_value"]),
  },
};
</script>
<style lang="scss" scoped>
.hdr-user {
  width: 100%;
  padding: 0 8px 8px 8px;
  background-color: $color-356970;
  margin-top: 16px;
  display: flex;
  &-img {
    width: 76px;
    height: 95px;
  }
  &-tip {
    font-size: $font-size-10;
    color: $color-ffffff;
    margin-top: 8px;
    text-align: center;
  }
  &-inner {
    display: flex;
    flex: 1;
  }
  &-car {
    display: flex;
    padding-left: 36px;
  }
  &-carList {
    width: 150px;
    flex-wrap: wrap;
    display: flex;
    > li {
      margin: 4px 0 0 8px;
    }
  }
  &-right {
    padding: 0 20px 0 15px;
    border-left: 1px dashed $color-DBDBDB;
  }
  &-bottom {
    padding: 7px 8px 8px 16px;
    display: flex;
    background-color: $color-356970;
    border-top: 1px dashed $color-DBDBDB;
    flex-wrap: wrap;
    margin-bottom: 16px;
    &.no-top {
      border: none;
      margin-top: 16px;
    }
    > p {
      width: 50%;
    }
  }
}
.common {
  font-size: 12px;
  color: $color-E1E1E1;
  line-height: 17px;
  &.cont {
    color: $color-ffffff;
  }
}
.ml8 {
  margin-left: 8px;
}
.mt8 {
  margin-top: 8px;
}
.mt4 {
  margin-top: 4px;
}
.flex-1 {
  flex: 1;
}
.flex {
  display: flex;
}
.pl {
  padding-left: 30px;
}
.tb {
  display: flex;
  border-left: 1px solid $color-78F7FD;
  margin: 16px 5px 16px 5px;
  overflow-x: auto;
  &-header {
    border-top: 1px solid $color-78F7FD;
    position: relative;
    background: url("~@/assets/images/path.png") no-repeat left top;
    background-size: 100% 100%;
    > p {
      position: absolute;
      font-size: $font-size-10;
      color: $color-E1E1E1;
      line-height: 1;
    }
    > p:nth-child(1) {
      right: 2px;
      top: 2px;
    }
    > p:nth-child(2) {
      left: 2px;
      bottom: 2px;
    }
  }
  &-warning {
    display: flex;
    align-items: center;
    color: #dd9900;
    font-weight: 600;
    padding-left: 7px;
    margin: 12px 0;
    letter-spacing: 1px;
    font-size: 12px;
    > i {
      margin-right: 5px;
      font-size: $font-size-14;
    }
  }
}
.tb-item {
  width: 64px;
  height: 27px;
  border-right: 1px solid $color-78F7FD;
  border-bottom: 1px solid $color-78F7FD;
  font-size: $font-size-12;
  color: $color-E1E1E1;
  text-align: center;
  line-height: 27px;
  &.header {
    border-top: 1px solid $color-78F7FD;
    background: rgba(120, 247, 253, 0.3);
  }
}
.pct-50 {
  width: 50%;
}
.pct-100 {
  width: 100%;
}
</style>
