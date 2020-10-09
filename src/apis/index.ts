import { get } from "@/utils/request";
import { API } from "@/types";

const BASEPATH = "main.php?mod=";

const API = {
  info: "info",
} as API;

Object.entries(API).forEach(([key, value]) => {
  API[key] = `${BASEPATH}${value}`;
});

const getInfo = (): Promise<Record<string, any>> => get(API.info);

export { getInfo };
