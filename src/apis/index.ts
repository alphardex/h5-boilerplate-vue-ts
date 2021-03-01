import { get, post } from "@/utils/request";
import { WxShare } from "@/types";
import { API } from "@/consts/index";

const getWxShare = (): Promise<WxShare> => get(API.wxShare);

const getInfo = () => get(API.info);

const postUploadPic = (body: any) => post(API.uploadPic, body);

export { getWxShare, getInfo, postUploadPic };
