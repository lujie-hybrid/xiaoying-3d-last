export default {
  namespaced: true,
  state: () => ({
    statShow: false, // 统计页面展示
    recordShow: false, // 记录页面展示
    houseRightMsg: null, // 详情右边的信息
    stat: null, // 统计数据
    poiList: [], // house的poi点
    poi: "", // 当前聚焦的poi点
    buildName: "", // 楼栋名称
    realList: [],
  }),
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {},
  getters: {},
};
