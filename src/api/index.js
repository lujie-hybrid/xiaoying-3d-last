import * as accessApi from "./modules/access";
import * as baseApi from "./modules/base";
import * as videoApi from "./modules/video";
import * as carApi from "./modules/car";
import * as houseApi from "./modules/house";
import * as perimeterApi from "./modules/perimeter";
import * as remouldApi from "./modules/remould";

const install = (Vue) => {
  const r = {
    access: accessApi,
    base: baseApi,
    video: videoApi,
    car: carApi,
    house: houseApi,
    perimeter: perimeterApi,
    remould: remouldApi,
  };
  Vue.prototype.$api = r;
};

export default {
  install,
};
