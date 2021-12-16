import { getAction } from "../action";

// 获取监控总览
export const getVideo = (params) =>
  getAction("/xiaoying/api/camera/overView", params);

// 获取此监控点的回放(包括单画面回放、多画面回放)
export const getMultiVideo = (params) =>
  getAction("/xiaoying/api/camera/payback", params);

// 监控点回放时间列表
export const getTime = (params) =>
  getAction("/xiaoying/api/camera/date/list", params);

// 获取监控列表
export const getCameraList = (params) =>
  getAction("/xiaoying/api/camera/region/list", params);

// 获取监控实况
export const getCameraLive = (params) =>
  getAction("/xiaoying/api/camera/live", params);

// 获取监控实况
export const getCameraDetail = (params) =>
  getAction("/xiaoying/api/camera/preView/cameraCode", params);

// 综合态势 监控点
export const getHomeCamera = (params) =>
  getAction("/xiaoying/api/camera/comprehensiveSituation", params);

export const getTourPOI = (params) =>
  getAction("/xiaoying/api/camera/getCameraPatrolList", params);

// 默认点
export const getDefaultPOI = (params) =>
  getAction("/xiaoying/api/camera/live/default", params);

//
export const startTourData = (params) =>
  getAction("/xiaoying/api/camera/cameraPatrolJob", params);

// 结束巡视
export const endTour = (params) =>
  getAction("/xiaoying/api/camera/pauseCameraPatrolJob", params);
