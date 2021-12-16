<template>
  <v-inner is-right v-if="accessPersonList && accessPersonList.length > 0">
    <v-unit title="当前通行人员信息" no-right>
      <div
        class="actual-wrap"
        v-if="accessPersonList && accessPersonList.length > 0"
      >
        <!-- <div class="actual-img-wrap">
          <el-image
            class="actual-img"
            :src="accessPersonList[0].takePhoto"
            fit="cover"
          ></el-image>
          <p>(门禁抓拍照片)</p>
        </div> -->
        <div class="actual-img-wrap">
          <el-image
            class="actual-img"
            :src="accessPersonList[0].employeePhoto"
            fit="cover"
          ></el-image>
          <!-- <p>(系统录入照片)</p> -->
        </div>
        <div class="actual-info">
          <div class="actual-info-item">
            <span>姓名：</span><span>{{ accessPersonList[0].name }}</span>
          </div>
          <div class="actual-info-item">
            <span>人员类型：</span
            ><span>{{ accessPersonList[0].personType }}</span>
          </div>
          <div class="actual-info-item">
            <span>所属网格：</span
            ><span>{{ accessPersonList[0].deptName }}</span>
          </div>
          <div class="actual-info-item">
            <span>联系电话：</span><span>{{ accessPersonList[0].phone }}</span>
          </div>
          <div class="actual-info-item">
            <span>身份证号：</span>
            <p class="actual-info-card">{{ accessPersonList[0].cardNo }}</p>
          </div>
        </div>
      </div>
    </v-unit>
    <v-unit title="门禁实时视频" is-video :code="current.cameraIndexCode">
      <v-f-player
        id="aar-player"
        :url="current.url"
        :code="current.cameraIndexCode"
      ></v-f-player
    ></v-unit>
    <v-unit title="门禁通行人员" no-right>
      <v-scroll
        class="actual-people-wrap"
        v-if="accessPersonList && accessPersonList.length > 0"
      >
        <ul class="actual-people">
          <li v-for="(item, i) in accessPersonList" :key="i">
            <img src="~@/assets/images/actual-person.png" />
            <span>{{ item.name }}</span>
            <span :title="item.cardNo">{{ item.cardNo }}</span>
            <span :title="item.deptName">{{ item.deptName }}</span>
            <span :title="item.personType">{{ item.personType }}</span>
            <span>{{ item.passTime | part_date_time }}</span>
          </li>
        </ul>
      </v-scroll>
    </v-unit>
  </v-inner>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      current: {},
    };
  },
  computed: {
    ...mapState("access", {
      accessPersonList: (state) => state.personList,
      id: (state) => state.id,
    }),
  },
  watch: {
    id: {
      handler: function (val) {
        if (val) {
          this.getCurrentData();
        }
      },
      immediate: true,
    },
  },
  methods: {
    getCurrentData() {
      this.$api.access
        .getCurrentVideo({
          id: this.id,
        })
        .then((res) => {
          this.current = res;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.actual-wrap {
  margin: 18px 0;
  display: flex;
}
.actual-img-wrap {
  margin-left: 10px;
  font-size: $font-size-10;
  font-weight: $font-weight-400;
  color: $color-ffffff;
  &:nth-child(2) {
    margin-left: 16px;
  }
}
.actual-img {
  width: 86px;
  height: 107px;
  margin-bottom: 8px;
}
.actual-info {
  margin-left: 16px;
  &-item {
    font-weight: $font-weight-400;
    color: $color-E1E1E1;
    margin-bottom: 8px;
    line-height: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 180px;
    > span:nth-child(1) {
      display: inline-block;
      width: 70px;
      margin-right: 2px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  &-card {
    margin-top: 2px;
  }
}
.actual-people-wrap {
  height: 255px;
  margin: 8px 0;
}
.actual-people {
  // padding-left: 10px;
  > li {
    height: 32px;
    font-size: $font-size-12;
    color: $color-ffffff;
    font-weight: $font-weight-400;
    display: flex;
    align-items: center;
    > span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:nth-child(2) {
        width: 40px;
      }
      &:nth-child(5) {
        width: 30px;
      }
      &:nth-child(3) {
        width: 135px;
      }
      &:nth-child(4) {
        width: 75px;
      }
      &:nth-child(6) {
        width: 93px;
      }
    }
    > img {
      width: 16px;
      margin-right: 8px;
    }
  }
}
</style>
