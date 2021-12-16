import Vue from "vue";
import Vuex from "vuex";
import access from "./modules/access";
import video from "./modules/video";
import car from "./modules/car";
import house from "./modules/house";
import perimeter from "./modules/perimeter";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    access,
    video,
    car,
    house,
    perimeter,
  },
  getters: {},
  state: {
    childNavWidth: 355, // 子集导航的宽度
    navList: [], // 子集导航的数组
    navbarType: "left", // 顶部导航是左边还是右边
    navbarIndex: 0, // 左边或者右边的当前的index
    currentLeftComponent: "home-left", // 左边的组件
    currentRightComponent: "home-right", // 右边的组件
    noRightComponent: false, // 当前页面没有右边组件 默认false
    recordPageShow: false, // 出入记录弹框页面是否展示
    childNavActiveIndex: 0, // 子集导航的当前index
    dict: {}, // 字典
    dictKeys: [
      "person_type",
      "access_type",
      "cartype",
      "carportype",
      "channeltype",
    ],
    renderOver: false, //场景是否已经加载结束
    homeOver: false, // 首页基本数据加载完毕
    currentImgIndex: -1, //综合态势图片的index
    remouldDetailShow: false, // 改造详情弹框
    remouldId: -1, //当前的改造点
    isRemould: false,
    remouldPOI: [], //改造点列表
    remouldLeftImg: [],
    remouldRightImg: [],
    hignlight: true,
  },
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
    set_dict_value(state, { key, val }) {
      state.dict[key] = val;
    },
  },
  actions: {},
});
