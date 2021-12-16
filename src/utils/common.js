import store from "@/store";
import Vue from "vue";
import { Message } from "element-ui";

// 添加resize事件
export const resizeFunc = (callback) => {
  window.vResize = window.addEventListener("resize", callback);
};

// 删除resize事件
export const removeResizeFunc = () => {
  window.removeEventListener(window.vResize);
};

// 补全月份 12月
export const fillMonth = (list, valueName = "value", monthName = "month") => {
  let result = [];
  const lastMonth = list[list.length - 1].month;
  const fillLength = 12 - lastMonth;
  for (let i = fillLength; i > 0; i--) {
    result.push({ [monthName]: 12 - i + 1, [valueName]: 0 });
  }
  return list.concat(result);
};

// 获取字典对应的label
export const getDictLabel = (codeIndex, value) => {
  const { dictKeys, dict } = store.state;
  const list = dict[dictKeys[codeIndex]];
  if (list && list.length > 0) {
    const item = list.find((d) => d.value == value);
    return item ? item.label : "";
  } else {
    return "";
  }
};

// 判断chart返回label是多少万
export const dealChartValue = (value) => {
  if (value < 10000) {
    return value;
  } else {
    const r = value / 10000;
    if (/^[1-9]\d* | 0$/.test(r)) {
      return r + ".00万";
    } else {
      return (Math.floor(r * 100) / 100).toFixed(2) + " 万";
    }
  }
};

// 获取整数百分比
export const getPercent = (value) => {
  return Math.floor(value * 100) + "%";
};

export const validateNoComps = () => {
  const st = store.state;
  const leftCom = st.currentLeftComponent;
  if (
    leftCom === "perimeter-left" ||
    (!st.house.houseRightMsg && leftCom === "house-detail-left") ||
    ((!st.access.personList ||
      (st.access.personList && st.access.personList.length === 0)) &&
      leftCom === "access-actual-left") ||
    (!st.video.live && leftCom === "video-actual-left")
  ) {
    store.commit("set_value", {
      key: "noRightComponent",
      val: true,
    });
  } else {
    store.commit("set_value", {
      key: "noRightComponent",
      val: false,
    });
  }
};

// 点击子导航的方法
export function clickNav(n) {
  const $handler = Vue.prototype.$handler;
  validateNoComps();
  const comp = {
    left: [
      [],
      [
        ["access-left", "access-right"],
        ["access-actual-left", "access-actual-right"],
        ["", ""],
      ],
      [
        ["video-left", "video-right"],
        ["video-actual-left", "video-actual-right"],
        ["video-tour-left", "video-tour-right"],
      ],
    ],
    right: [
      [
        ["perimeter-left", ""],
        ["perimeter-actual-left", "perimeter-actual-right"],
      ],
      [
        ["car-left", "car-right"],
        ["", ""],
      ],
      [
        ["house-left", "house-right"],
        ["house-detail-left", "house-detail-right"],
        ["", ""],
      ],
    ],
  };
  const leftCom = comp[store.state.navbarType][store.state.navbarIndex][n][0];
  const rightCom = comp[store.state.navbarType][store.state.navbarIndex][n][1];
  const fn = () => {
    store.commit("set_value", { key: "childNavActiveIndex", val: n });
    store.commit("set_value", {
      key: "currentLeftComponent",
      val: leftCom,
    });
    store.commit("set_value", {
      key: "currentRightComponent",
      val: rightCom,
    });
    if (store.state.navbarType === "left") {
      switch (store.state.navbarIndex) {
        case 1:
          store.commit("set_value", { key: "recordPageShow", val: n === 2 });
          break;
        case 2:
          if (n == 0 || n == 1) {
            $handler.cameraPOI(true);
          } else {
            $handler.removeCameraPoi("poi");
          }
          break;

        default:
          break;
      }
    } else {
      switch (store.state.navbarIndex) {
        case 0:
          break;
        case 1:
          store.commit("car/set_value", {
            key: "recordShow",
            val: n === 1,
          });
          break;
        case 2:
          store.commit("house/set_value", {
            key: "recordShow",
            val: n === 2,
          });
          break;
        default:
          break;
      }
    }
  };
  fn();
}

// 点击主导航

export function clickNavbar(types, i, notPoi = false, isIcon = false) {
  const $handler = Vue.prototype.$handler;
  if (!store.state.renderOver || !store.state.homeOver) {
    Message({ type: "warning", message: "请等待渲染结束在操作!" });
    return;
  }
  const accessNav = ["门禁总览", "门禁实况", "记录查询"];
  const videoNav = ["监控总览", "监控实况", "监控巡视"];
  const carNav = ["车辆总览", "记录查询"];
  const perimeterNav = ["周界总览", "周界实况"];
  const houseNav = ["房屋总览", "住户详情", "记录查询"];

  const $render = Vue.prototype.$render;
  // 交互
  if ($render && !notPoi) {
    $render.removeAllCovering();
  }

  if ($render && $handler && !notPoi) {
    if (types === "left" || (types === "right" && i != 0)) {
      $handler.removePerimeter();
      // $handler.addHighlight();
      $render.showHideCovering("home_range", true);
      store.commit("set_value", { key: "hignlight", val: true });
    }
  }

  // 设置全局的导航类型和index，方便全局使用
  store.commit("set_value", { key: "navbarType", val: types });
  store.commit("set_value", { key: "navbarIndex", val: i });
  validateNoComps();
  store.commit("set_value", { key: "recordPageShow", val: false }); // 门禁记录
  store.commit("access/set_value", { key: "yearShow", val: false }); // 门禁年度统计
  store.commit("car/set_value", { key: "carYearShow", val: false }); // 车辆年度统计
  store.commit("house/set_value", { key: "statShow", val: false }); // 房屋统计
  store.commit("car/set_value", { key: "recordShow", val: false }); // 车辆记录
  store.commit("house/set_value", { key: "recordShow", val: false }); // 房屋记录
  store.commit("set_value", { key: "remouldDetailShow", val: false }); // 改造详情

  store.commit("set_value", { key: "childNavActiveIndex", val: 0 });
  if (types === "left") {
    switch (i) {
      case 0: {
        store.commit("set_value", { key: "navList", val: [] });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "home-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "home-right",
        });
        $render && $render.resetHomeCamera();
        !isIcon &&
          store.commit("set_value", { key: "currentImgIndex", val: -1 });
        $handler && $handler.housePOI(true);
        $handler && $handler.addOtherPoi();
        break;
      }
      case 1: {
        store.commit("set_value", { key: "childNavWidth", val: 355 });
        store.commit("set_value", { key: "navList", val: accessNav });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "access-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "access-right",
        });
        !notPoi && $handler.accessPOI();
        !notPoi && $handler.housePOI(true);
        break;
      }
      case 2:
        store.commit("set_value", { key: "childNavWidth", val: 355 });
        store.commit("set_value", { key: "navList", val: videoNav });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "video-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "video-right",
        });
        !notPoi && $handler.cameraPOI();
        !notPoi && $handler.housePOI(true);

        break;
    }
  } else {
    switch (i) {
      case 0:
        store.commit("set_value", { key: "childNavWidth", val: 238 });
        store.commit("set_value", { key: "navList", val: perimeterNav });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "perimeter-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "",
        });
        !notPoi && $handler.addPerimeter();
        !notPoi && $handler.housePOI(true);

        break;
      case 1:
        store.commit("set_value", { key: "childNavWidth", val: 238 });
        store.commit("set_value", { key: "navList", val: carNav });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "car-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "car-right",
        });
        break;
      case 2:
        store.commit("set_value", { key: "childNavWidth", val: 355 });
        store.commit("set_value", { key: "navList", val: houseNav });
        store.commit("set_value", {
          key: "currentLeftComponent",
          val: "house-left",
        });
        store.commit("set_value", {
          key: "currentRightComponent",
          val: "house-right",
        });

        !notPoi && $handler.houseRealPOI();

        break;
    }
  }
}
