import { getAction } from "../action";

// 营区改造项目统计
export const getLeftTop = (params) =>
  getAction("/xiaoying/project/getTransformationCount", params);

// 营区改造项目工期统计
export const getLeftBottom = (params) =>
  getAction("/xiaoying/project/getCountByTime", params);

// 改造点
export const getRemouldPOI = (params) =>
  getAction("/xiaoying/project/getProjectList", params);

// 改造点详情
export const getDetail = (params) =>
  getAction("/xiaoying/project/getProjectinfoById", params);

// 改造点图像
export const getImage = (params) =>
  getAction("/xiaoying/project/getProjectImageByStatus", params);
