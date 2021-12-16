import { getAction } from "../action";

// 获取周界报警主界面数据
export const getAllData = (params) =>
  getAction("/xiaoying/api/world/alarm/main/data", params);

// 获取周界报警地区列表
export const getArea = (params) =>
  getAction("/xiaoying/api/world/alarm/region/worldAlarm/list", params);

// 获取此报警布防下绑定的监控点信息
export const getRightMsg = (params) =>
  getAction("/xiaoying/api/world/alarm/camera/worldAlarmId", params);

// 获取报警状态
export const getStatus = (params) =>
  getAction("/xiaoying/api/world/alarm/bestNew/list", params);

// 获取综合态势周界报警记录
export const getHomeMsg = (params) =>
  getAction("/xiaoying/api/world/alarm/comprehensiveSituation", params);
