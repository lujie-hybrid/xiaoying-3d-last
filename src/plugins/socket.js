import store from "@/store";
import Vue from "vue";
class WebSocketClass {
  constructor(url) {
    this.connectNumber = 1;
    this.timer = null;
    this.wsUrl = url || process.env.VUE_APP_WS;
    this.connect();
  }

  connect() {
    const that = this;
    try {
      that.ws = new WebSocket(this.wsUrl);
      that.initEventHandle();
    } catch (e) {
      !this.timer && that.reconnect();
    }
  }

  initEventHandle() {
    this.ws.onopen = (e) => {
      console.log(`连接成功`, e);
      if (this.timer) {
        clearInterval(this.timer);
        this.connectNumber = 1;
        this.timer = null;
        this.userClose = false;
      }
      // 综合态势里面
      this.send({ xiaoying: "access_carstus" });
      this.send({ xiaoying: "access_alarm" });
    };
    this.ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      switch (msg.messageType) {
        case "access_alarm":
          store.commit("access/set_value", {
            key: "statusList",
            val: msg.result.alarmDtos || [],
          });
          store.commit("access/set_value", {
            key: "statusCount",
            val: msg.result.accessCount,
          });
          break;
        case "access_record":
          store.commit("access/set_value", {
            key: "personList",
            val: msg.result.accessRecordDetailDtos,
          });
          break;
        case "access_carstus":
          store.commit("car/set_value", {
            key: "status",
            val: msg.result,
          });
          break;
        case "access_careast":
          store.commit("car/set_value", {
            key: "eastCar",
            val: msg.result.slice(0, 2),
          });
          break;
        case "access_carwest":
          store.commit("car/set_value", {
            key: "westCar",
            val: msg.result.slice(0, 2),
          });
          break;
        // 监控报警推送
        case "camera_alarm_event": {
          const list = [msg.result, ...store.state.video.records].slice(0, 3);
          store.commit("video/set_value", {
            key: "records",
            val: list,
          });
          const homeList = [msg.result, ...store.state.video.homeRecords].slice(
            0,
            3
          );
          store.commit("video/set_value", {
            key: "records",
            val: list,
          });
          store.commit("video/set_value", {
            key: "homeRecords",
            val: homeList,
          });
          break;
        }
        // 监控报警正常推送
        case "camera_alarm_remove_event": {
          const id = msg.result.event_index_code;
          const list = store.state.video.homeRecords.filter(
            (d) => d.eventIndexCode != id
          );
          store.commit("video/set_value", {
            key: "homeRecords",
            val: list,
          });
          break;
        }
        // 周界报警报警记录推送
        case "world_alarm_push": {
          const list = msg.result || [];
          store.commit("perimeter/set_value", {
            key: "records",
            val: list,
          });
          break;
        }
        // 监控巡视推送
        case "camera_patrol_event": {
          const list = msg.list || [];
          const $rd = Vue.prototype.$render;
          const $handler = Vue.prototype.$handler;
          store.commit("video/set_value", {
            key: "tourList",
            val: list,
          });
          $handler.tourCameraPOI();
          if ($rd) {
            $rd.updateEffectStyle(store.state.video.tourPOIList, msg.id);
            $rd.focusCovering(`tour_effect_${msg.id}`, "scene_effect", 150);
          }
          break;
        }

        default:
          break;
      }

      return e.data;
    };
    //连接关闭后响应
    this.ws.onclose = () => {
      console.log("ws close");
      Vue.prototype.$skt = null;
      this.reconnect(); //重连
    };
    this.ws.onerror = () => {
      Vue.prototype.$skt = null;
      console.log("ws error");
      this.reconnect(); //重连
    };
  }

  send(msg) {
    if (this.ws && this.ws.readyState == 1) {
      this.ws.send(JSON.stringify(msg));
    }
  }

  reconnect() {
    if (this.userClose) return;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.connectNumber >= 10) {
        console.log("over");
        clearInterval(this.timer);
        this.timer = null;
        this.userClose = true;
      }
      this.connectNumber++;
      this.connect();
    }, 10000);
  }

  close() {
    if (this.ws) {
      this.userClose = true;
      this.ws.close();
    }
  }
}

export default WebSocketClass;
