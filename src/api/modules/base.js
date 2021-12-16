import { getAction } from "../action";

// 字典
export const getDict = (dictCode) =>
  getAction(`/system/dict/data/type/${dictCode}`);
