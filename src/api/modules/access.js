import { getAction } from "../action";

// 入营人员类型统计
export const getInPeople = (params) =>
  getAction("/access/recordStatistic", params);

// 月度入营人员类型统计
export const getInMonthPeople = (params) =>
  getAction("/access/monthRecordStatistic", params);

// 年度统计
export const getYearMsg = (params) =>
  getAction("/access/yearStatistic", params);

// 门禁列表
export const getTreeList = (params) => getAction("/build/access/list", params);

// 门禁首页全部poi
export const getHomeAllPoi = (params) =>
  getAction("/build/access/data", params);

// 获取区域
export const getArea = (params) =>
  getAction("/xiaoying/accessRegion/list/bg", params);

// 获取顶部楼层/根据楼层获取单元
export const getRecordBuild = (params) =>
  getAction("/build/getbulidlist", params);

// 记录查询分页
export const getRecords = (params) => getAction("/access/recordQuery", params);

// 走访记录
export const getRecordDetail = (params) =>
  getAction("/access/recordDetail", params);

// 东门视频
export const getEastVideo = (params) =>
  getAction("/build/selecteastvideo", params);

// 西门视频
export const getWestVideo = (params) =>
  getAction("/build/selectwestvideo", params);

// 实时视频
export const getCurrentVideo = (params) =>
  getAction("/build/selectvideobydoorid", params);

// 默认点
export const getDefaultPOI = (params) =>
  getAction("/build/access/default", params);
