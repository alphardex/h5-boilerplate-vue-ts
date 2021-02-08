import { get } from "@/utils/request";
import { WxShare } from "@/types";
import { API } from "@/consts/index";

const getWxShare = (): Promise<WxShare> => get(API.wxShare);

const getInfo = () => get(API.info);

export { getWxShare, getInfo };
