import { getAction } from "../action";

// 入营车辆类型统计
export const getInCar = (params) =>
  getAction("/xiaoying/carStatus/inhomecount", params);

// 月度入营车辆类型统计
export const getInMonthCar = (params) =>
  getAction("/xiaoying/carStatus/inhomeyearcount", params);

// 年度统计
export const getYearStat = (params) =>
  getAction("/xiaoying/carStatus/inhomecountbyear", params);

// 记录查询
export const getList = (params) =>
  getAction("/xiaoying/carStatus/recordQuery", params);

// 通行车辆详细信息查询（根据车牌）
export const getDetail = (params) =>
  getAction("/xiaoying/carStatus/recorddetailQuery", params);

// 异常记录处置
export const deal = (params) =>
  getAction("/xiaoying/carStatus/exceptionHandling", params);
