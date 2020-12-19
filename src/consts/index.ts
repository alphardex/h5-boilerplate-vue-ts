import { NavItem } from "@/types";
import ky from "kyouka";

const activityID = "";
const publicKey = ``;

const isDevMode = process.env.NODE_ENV === "development";
const isMobile = ky.detectDeviceType() === "Mobile";

const BASEPATH = "main.php?mod=";

const API = {
  wxShare: "wxShareConfigParameters",
  info: "info",
};

Object.entries(API).forEach(([key, value]) => {
  (API as Record<string, string>)[key] = `${BASEPATH}${value}`;
});

const navItems: NavItem[] = [{ to: { name: "Home" }, text: "首页" }];

export { activityID, publicKey, isDevMode, isMobile, API, navItems };
