import { getAction } from "../action";

// 各楼栋缴费数据统计
export const getAllData = (params) =>
  getAction("/xiaoying/api/house/build/fee/statistics", params);

export const getAllDataNew = (params) =>
  getAction("/xiaoying/api/house/fee/new/getBsBuildFeeDetail", params);

// 获取字典数据
export const getDict = (params) =>
  getAction("/xiaoying/api/house/record/queryParam", params);

// 获取列表数据
export const getList = (params) =>
  getAction("/xiaoying/api/house/record/list", params);

// 总览数据
export const getView = (params) =>
  getAction("/xiaoying/api/house/overView", params);

// 总览数据New
export const getViewNew = (params) =>
  getAction("/xiaoying/api/house/fee/new/houseFeeOver", params);

// 总览数据New
export const getViewNewDetail = (params) =>
  getAction("/xiaoying/api/house/fee/new/houseFeeBuildOver", params);

// 获取楼栋列表
export const getDetailBuild = (params) =>
  getAction("/xiaoying/api/house/build/list", params);

// 获取此楼栋下的所有房间列表
export const getDetailHouse = (params) =>
  getAction("/xiaoying/api/house/build/house/list", params);

// 获取此房间的入住信息（入住人员信息、缴费信息）
export const getHouseMsg = (params) =>
  getAction("/xiaoying/api/house/build/house/info", params);

// 获取某栋楼的统计数据(房屋入住统计、缴费金额统计)
export const getStat = (params) =>
  getAction("/xiaoying/api/house/build/statistics/data", params);

// 楼栋-月份根据缴费类型查询缴费信息(房屋总览界面)
export const getMonthData = (params) =>
  getAction("/xiaoying/api/house/overView/buildAndMonth/fee", params);

export const getMonthNewData = (params) =>
  getAction("/xiaoying/api/house/fee/new/countHouseFeeByMonth", params);

export const getBuildNewData = (params) =>
  getAction("/xiaoying/api/house/fee/new/countHouseFeeByBuild", params);
