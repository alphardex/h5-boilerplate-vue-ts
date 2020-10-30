declare module "@alphardex/aqua.sp/dist/aqua.sp.min.css";
declare module "weixin-js-sdk";

export interface NavItem {
  to: Path;
  text: string;
}

export interface Path {
  name?: string;
  path?: string;
  query?: Record<string, any>;
}

export interface WxShare {
  appid: string;
  noncestr: string;
  signature: string;
  ticket: string;
  timestamp: string;
  url: string;
}

export interface Info {
  title?: string;
  rules?: string;
  description?: string;
  keywords?: string;
  share_info?: ShareInfo;
}

export interface ShareInfo {
  mid: string;
  title: string;
  desc: string;
  img: string;
  url: string;
  callback: Function;
  apilist: string[];
}

export interface PostReturn {
  code: string;
  msg: string;
}
