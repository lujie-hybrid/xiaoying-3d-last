export default {
  namespaced: true,
  state: () => ({
    videoShow: false,
    videoCode: "", // 当前监控code
    records: [], // 报警记录
    homeRecords: [], // 综合态势报警记录
    history: [], // 历史
    live: null, // 实时视频
    navIndex: 0, //大视频弹框的tabIndex
    poiList: [],
    poi: "",
    tourList: [],
    tourPOIList: [],
    fullScreenShow: false, // 全屏视频展示
    fullScreenUrl: "",
  }),
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {},
  getters: {},
};
