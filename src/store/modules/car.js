export default {
  namespaced: true,
  state: () => ({
    status: {},
    eastCar: {},
    westCar: {},
    carYearShow: false, // 年度统计页面展示
    recordShow: false, // 记录查询
  }),
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {},
  getters: {},
};
