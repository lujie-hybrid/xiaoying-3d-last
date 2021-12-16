export default {
  namespaced: true,
  state: () => ({
    statusList: [], // 门禁状态
    personList: [], // 通行人员
    yearShow: false, // 年度统计页面展示
    id: "",
    parentId: "",
    statusCount: 0, // 总门禁数
    poiList: [],
    poi: "",
  }),
  mutations: {
    set_value(state, { key, val }) {
      state[key] = val;
    },
  },
  actions: {},
  getters: {},
};
