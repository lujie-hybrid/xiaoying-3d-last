export default {
  namespaced: true,
  state: () => ({
    right: [], //右边信息
    records: [], //报警数组信息
    rangeList: [], // 周界报警栏杆数组
    rangeId: "", // 当前的周界报警栏杆
  }),
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {},
  getters: {},
};
