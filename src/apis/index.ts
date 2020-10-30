import { get } from "@/utils/request";
import { WxShare, Info } from "@/types";

const BASEPATH = "main.php?mod=";

const API = {
  wxShare: "wxShareConfigParameters",
  info: "info",
} as Record<string, string>;

Object.entries(API).forEach(([key, value]) => {
  API[key] = `${BASEPATH}${value}`;
});

const getWxShare = (): Promise<WxShare> => get(API.wxShare);

const getInfo = (): Promise<Info> => get(API.info);

export { getWxShare, getInfo };
