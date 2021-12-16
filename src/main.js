import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// elementui的引入
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import "@/assets/scss/common.scss";

// echarts的引入
import MyChart from "@/plugins/echarts";
Vue.use(MyChart);

// 接口api的引入
import Api from "@a";
Vue.use(Api);

// filter的引入
import "@u/filter";

// 通用组件的注册
import BaseComp from "@comp";
Vue.use(BaseComp);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
