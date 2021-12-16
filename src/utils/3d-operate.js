import Vue from "vue";
import { MySuperAPI } from "@u/3d";
import store from "@/store";
import { clickNavbar, clickNav } from "@u/common";

const url = process.env.VUE_APP_IMG;

export default class MyOperater {
  // 实例化
  constructor(id) {
    this.$rd = new MySuperAPI(id, this.handleResponseFunction.bind(this));
    this.$skt = Vue.prototype.$skt;
    Vue.prototype.$render = this.$rd;
  }
  setPOI(
    list,
    {
      img = "",
      imgActive = "",
      bgSize = "150,30",
      coord_z = 0,
      coord_type = 1,
      none = false,
      always_show_label = false,
      size = "24,36",
      bg_image_url = `${url}/label-bg.png`,
      bg_offset = "20,39",
      text_offset = "8,5",
      text_style = ["78F7FDE6", "14"],
      show_label_range = "0,105",
    },
    callback
  ) {
    const points = list.map((item) => ({
      id: item.id,
      coord: item.coord,
      coord_z: item.z || coord_z,
      show_label_range,
      coord_type,
      always_show_label,
      marker: {
        size,
        images: [
          {
            normal_url: item.img || img, //normal 图片url地址
            activate_url: item.imgActive || imgActive, //hover, active 图片url地址
          },
        ],
      },
      label: {
        bg_size: bgSize, //label大小(宽, 高 单位:像素)
        bg_offset,
        bg_image_url,
        content: [
          {
            text_offset,
            text: [
              item.text,
              item.text_style ? item.text_style[0] : text_style[0],
              item.text_style ? item.text_style[1] : text_style[1],
            ], //[文本内容, HEXA颜色, 文本大小]
          },
        ],
      },
    }));
    this.$rd.addCustomPOI(points, none ? "none" : "poi", callback);
  }
  removeCameraPoi(types) {
    store.state.video.poiList.forEach((item) => {
      this.$rd.removeCovering(`camera_${item.cameraIndexCode}`, types);
    });
  }
  // 监控视频POI点
  cameraPOI(none = false) {
    const points = store.state.video.poiList.map((item) => ({
      id: `camera_${item.cameraIndexCode}`,
      text: item.cameraName,
      coord: `${item.longitude},${item.latitude}`,
      img: item.isAlarm
        ? `${url}/jiankong-red.png`
        : `${url}/jiankong-blue.png`,
      imgActive: item.isAlarm
        ? `${url}/jiankong-red-active.png`
        : `${url}/jiankong-blue-active.png`,
      text_style: item.isAlarm ? ["DD0000E6", "14"] : ["78F7FDE6", "14"],
    }));
    this.setPOI(points, {
      bgSize: "310,30",
      show_label_range: "0,5",
      none,
    });
  }

  // 监控视频POI点
  tourCameraPOI(none = false) {
    this.$rd.removeAllCovering(["poi"]);
    const points = store.state.video.tourList.map((item) => ({
      id: `camera_${item.cameraIndexCode}`,
      text: item.cameraName,
      coord: `${item.longitude},${item.latitude}`,
      img: item.isAlarm
        ? `${url}/jiankong-red.png`
        : `${url}/jiankong-blue.png`,
      imgActive: item.isAlarm
        ? `${url}/jiankong-red-active.png`
        : `${url}/jiankong-blue-active.png`,
      text_style: item.isAlarm ? ["DD0000E6", "14"] : ["78F7FDE6", "14"],
    }));
    setTimeout(() => {
      this.setPOI(points, {
        bgSize: "310,30",
        show_label_range: "0,5",
        none,
      });
    }, 500);
  }
  // 房屋报警
  housePOI(none = false) {
    const points = store.state.house.poiList.map((item) => ({
      id: `house_${item.id}`,
      text: item.name,
      coord: `${item.longitude},${item.latitude}`,
    }));
    this.setPOI(points, {
      img: `${url}/house-blue.png`,
      imgActive: `${url}/house-blue.png`,
      coord_z: 20,
      none,
      size: "30,43",
      bg_offset: "15,35",
      bgSize: "60,24",
      text_offset: "5,3",
      text_style: ["FFFFFFE6", "12"],
      always_show_label: true,
      bg_image_url: `${url}/label-bg2.png`,
    });
  }
  // 房屋报警
  houseRealPOI(none = false) {
    const points = store.state.house.realList.map((item) => ({
      id: `housereal_${item.id}`,
      text: item.name,
      coord: `${item.longitude},${item.latitude}`,
    }));
    this.setPOI(points, {
      img: `${url}/house-blue.png`,
      imgActive: `${url}/house-blue.png`,
      coord_z: 20,
      none,
      size: "30,43",
      bg_offset: "15,35",
      bgSize: "60,24",
      text_offset: "5,3",
      text_style: ["FFFFFFE6", "12"],
      always_show_label: true,
      bg_image_url: `${url}/label-bg2.png`,
    });
  }
  remouldPOI(none = false) {
    const points = store.state.remouldPOI.map((item) => ({
      id: `remould_${item.id}`,
      text: item.name,
      coord: `${item.longitude},${item.latitude}`,
    }));
    this.setPOI(points, {
      img: `${url}/remould-blue.png`,
      imgActive: `${url}/remould-blue-active.png`,
      none,
    });
  }
  // 门禁POI点
  accessPOI(none = false) {
    const points = store.state.access.poiList.map((item) => ({
      id: `access_${item.doorId}`,
      text: item.doorName,
      coord: `${item.longitude},${item.latitude}`,
      img: item.isDanger ? `${url}/menjin-red.png` : `${url}/menjin-blue.png`,
      imgActive: item.isDanger
        ? `${url}/menjin-red-active.png`
        : `${url}/menjin-blue-active.png`,
    }));
    this.setPOI(points, {
      show_label_range: "0,5",
      bgSize: "300,30",
      none,
      bg_offset: "15,39",
    });
  }
  // 设置房屋镜头
  setHouseCamera() {
    this.$rd.setCameraInfo({
      center_coord: "0.003637,-0.000767",
      arm_distance: 358.164459, //镜头距中心点距离(单位:米)
      pitch: 76.042999, //镜头俯仰角(5~89)
      yaw: 171.475189,
    });
  }
  removePerimeter() {
    store.state.perimeter.rangeList.forEach((item) => {
      this.$rd.removeCovering(`perimeter_${item.id}`);
    });
  }
  // 添加周界报警
  addPerimeter() {
    // this.$rd.removeCovering(`home_range`);
    this.$rd.showHideCovering("home_range", false);
    this.$rd.removeAllCovering();
    store.commit("set_value", { key: "hignlight", val: false });
    // this.$rd.removeAllCovering("range");
    store.state.perimeter.rangeList.forEach((item) => {
      this.$rd.addRange({
        id: `perimeter_${item.id}`,
        color: item.status == 2 ? "DD0000" : "78F7FD",
        points: [
          { coord: `${item.longitude},${item.latitude}` },
          { coord: `${item.otherLongitude},${item.otherLatitude}` },
        ],
        range_height: 40,
        type: "loop_line",
      });
    });
    const points = store.state.perimeter.rangeList.map((item) => ({
      id: `perimeterpoi_${item.id}`,
      text: item.name,
      coord: `${item.centerLongitude},${item.centerLatitude}`,
    }));
    this.setPOI(points, {
      img: `${url}/zhoujie.png`,
      imgActive: `${url}/zhoujie.png`,
      coord_z: 40,
      none: true,
      size: "30,43",
      bg_offset: "18,40",
      bgSize: "115,24",
      text_offset: "5,3",
      text_style: ["FFFFFFE6", "12"],
      always_show_label: true,
    });
  }
  addOtherPoi() {
    const pois = [
      {
        id: "other1",
        name: "立体车库",
        coord: "65589.257813,108453.828125",
      },
    ];

    const points = pois.map((item) => ({
      id: `car3d_${item.id}`,
      text: item.name,
      coord: item.coord,
    }));
    this.setPOI(points, {
      img: `${url}/car.png`,
      imgActive: `${url}/car.png`,
      coord_z: 20,
      none: true,
      size: "30,43",
      bg_offset: "20,40.5",
      bgSize: "80,24",
      text_offset: "5,3",
      text_style: ["FFFFFFE6", "12"],
      always_show_label: true,
      bg_image_url: `${url}/label-bg2.png`,
    });
  }
  // 添加高亮区域
  addHighlight() {
    // const points = [
    //   "-93791.8125,-84535.007812",
    //   "-28181.484375,-63028.015625",
    //   "56.5625,-99426.960938",
    //   "93844.375,-64515.75",
    //   "123389.453125,-57669.953125",
    //   "132468.5625,-21685.927734",
    //   "172113.203125,-6231.855469",
    //   "241336.59375,18015.966797",
    //   "189675.234375,85743.398438",
    //   "118688.515625,165169.25",
    //   "35511.210938,121100.820312",
    //   "68656.796875,66546.101562",
    //   "-10089.960938,22988.759766",
    //   "-13315.898438,25259.404297",
    //   "-120364.75,-36571.191406",
    // ]
    store.commit("set_value", { key: "hignlight", val: true });
    const points = [
      "-121969.75,-36701.992188",
      "-93501.15625,-86465.304688",
      "-31780.507812,-64078.554688",
      "57.421875,-101723.875",
      "94714.335938,-65647.59375",
      "124664.765625,-61546.179688",
      "132687.625,-21611.5625",
      "242747.15625,18242.125",
      "178030.1875,100248.578125",
      "124054.101563,173049.296875",
      "34499.84375,120713.242188",
      "116473.007812,-13827.099609",
      "28215.820312,-44688.546875",
      "-12868.632812,26234.4375",
    ].map((p) => ({
      coord: p,
    }));
    this.$rd.addRange({
      id: `home_range`,
      color: "FF85AB",
      points,
      type: "loop_line",
    });
  }
  // 事件监听
  handleResponseFunction(data) {
    console.log("收到的事件: " + data);
    // const that = this;
    const jsonObject =
      typeof data === "object"
        ? JSON.parse(JSON.stringify(data))
        : JSON.parse(data);
    switch (jsonObject.func_name) {
      case "beginPlay":
        // 云渲染连接成功 do Something
        break;

      case "APIAlready":
        // 3D世界加载完成 do Something
        this.$rd.removeAllCovering();
        this.$rd.endGetCoord();
        this.$rd.setMultiRendering(2);
        store.commit("set_value", { key: "renderOver", val: true });
        this.$rd.setEnvTime("12:00");
        this.addHighlight();
        this.$rd.resetHomeCamera();
        this.$rd.setCompass();
        setTimeout(() => {
          this.housePOI(true);
          this.addOtherPoi();
        }, 1000);
        break;
      case "OnPOILabelClick":
        {
          const ids = jsonObject.args.id;
          const arr = ids.split("_");
          const navbarIndex = store.state.navbarIndex;
          const navbarType = store.state.navbarType;
          if (arr[0] === "housereal") {
            if (
              navbarType == "left" ||
              (navbarType == "right" && navbarIndex != 2)
            ) {
              if (navbarIndex == 0 && navbarType == "left") {
                clickNavbar("right", 2, true);
              } else {
                clickNavbar("right", 2);
              }
            }
            clickNav(1);
            store.commit("house/set_value", {
              key: "poi",
              val: arr[1],
            });
          }
        }
        break;

      case "OnPOIClick": {
        // 自定义POI点击事件
        const ids = jsonObject.args.id;
        const arr = ids.split("_");
        const navbarIndex = store.state.navbarIndex;
        const navbarType = store.state.navbarType;
        if (arr[0] === "access") {
          if (
            navbarType == "right" ||
            (navbarType == "left" && navbarIndex != 1)
          ) {
            if (navbarIndex == 0 && navbarType == "left") {
              clickNavbar("left", 1, true);
            } else {
              clickNavbar("left", 1);
            }
          }
          clickNav(1);
          store.commit("access/set_value", {
            key: "id",
            val: arr[1],
          });
          // that.$skt.send({ xiaoying: "access_record", doorId: arr[1] });
        } else if (arr[0] === "housereal") {
          if (
            navbarType == "left" ||
            (navbarType == "right" && navbarIndex != 2)
          ) {
            if (navbarIndex == 0 && navbarType == "left") {
              clickNavbar("right", 2, true);
            } else {
              clickNavbar("right", 2);
            }
          }
          clickNav(1);
          store.commit("house/set_value", {
            key: "poi",
            val: arr[1],
          });
        } else if (arr[0] === "camera") {
          if (
            navbarType == "right" ||
            (navbarType == "left" && navbarIndex != 2)
          ) {
            if (navbarIndex == 0 && navbarType == "left") {
              clickNavbar("left", 2, true);
            } else {
              clickNavbar("left", 2);
            }
          }
          clickNav(1);
          store.commit("video/set_value", {
            key: "poi",
            val: arr[1],
          });
        } else if (arr[0] === "remould") {
          store.commit("set_value", {
            key: "remouldId",
            val: arr[1],
          });
          this.$rd.setPOISelect(`remould_${arr[1]}`);
          this.$rd.focusCovering(`remould_${arr[1]}`, "poi", 50);
        }

        break;
      }

      case "OnRangeClick":
        // 点击区域
        {
          const ids = jsonObject.args.id;
          const arr = ids.split("_");
          const navbarIndex = store.state.navbarIndex;
          const navbarType = store.state.navbarType;
          if (arr[0] === "perimeter") {
            if (
              navbarType == "left" ||
              (navbarType == "right" && navbarIndex != 0)
            ) {
              if (navbarIndex == 0 && navbarType == "left") {
                clickNavbar("right", 0, true);
              } else {
                clickNavbar("right", 0);
              }
            }
            clickNav(1);
            store.commit("perimeter/set_value", {
              key: "rangeId",
              val: arr[1],
            });
          }
        }
        break;

      case "OnUpdatePathCoordSuccess":
        // 更新路径数据点成功 do Something
        break;

      case "OnUpdatePathCoordFailed":
        // 更新路径数据点失败 do Something
        break;

      case "OnFocusPathEnd":
        // 聚焦路径结束 do Something
        break;

      case "OnPathClick":
        // 点击路径 do Something
        break;

      case "OnSuperAPI_Error_Catch":
        // 错误捕捉 do Something
        // "args": {
        //   "error_type": "SuperAPI JSon Body Field Error",
        //   "error_information": "id"
        // }
        break;

      //更多func_name类型 回调通知, 详见各API事件
    }
    return data;
  }
}
