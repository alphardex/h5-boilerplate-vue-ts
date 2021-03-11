import { NavItem } from "@/types";
import ky from "kyouka";

const activityID = "";
const publicKey = ``;

const isDevMode = process.env.NODE_ENV === "development";
const isMobile = ky.detectDeviceType() === "Mobile";

const statusCode = {
  UNAUTHORIZED: 300,
};

const BASEPATH = "main.php?mod=";

const API = {
  wxShare: "wxShareConfigParameters",
  wxLogin: "wxLogin",
  info: "info",
  uploadPic: "uploadPic",
};

Object.entries(API).forEach(([key, value]) => {
  (API as Record<string, string>)[key] = `${BASEPATH}${value}`;
});

console.log(JSON.stringify(API));

const navItems: NavItem[] = [{ to: { name: "Home" }, text: "首页" }];

const masonryConfig = {
  sel: ".masonry",
  config: {
    itemSelector: `.masonry-item`,
    columnWidth: ky.vw2px(42),
    fitWidth: true,
    gutter: ky.vw2px(3),
  },
};

export {
  activityID,
  publicKey,
  isDevMode,
  isMobile,
  API,
  navItems,
  statusCode,
  masonryConfig,
};
