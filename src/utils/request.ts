import axios from "axios";
import { Alert } from "@/utils/alert";
import {
  activityID,
  publicKey,
  API,
  statusCode,
  isDevMode,
} from "@/consts/index";
import qs from "qs";
import md5 from "blueimp-md5";
// @ts-ignore
import JSEncrypt from "jsencrypt";
import ky from "kyouka";
import { serialize } from "object-to-formdata";

const service = axios.create();

const isOk = (res: any) => {
  return Number(res.code) === 200;
};

const checkAuth = (data: any) => {
  const code = data.code;
  const app = data.data ? data.data.app : "no";
  const currentUrl = location.href;
  if (Number(code) === statusCode.UNAUTHORIZED && !ky.yesNo(app)) {
    location.href = `${API.wxLogin}&backUri=${currentUrl}`;
  }
};

const rsaEncrypt = (rawData: any) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(publicKey);
  const rsaData = encryptor.encrypt(JSON.stringify(rawData));
  return rsaData;
};

const md5Encrypt = (rawData: any) => {
  const query = qs.stringify(rawData, { encode: false });
  const md5Data = md5(query);
  return md5Data;
};

const getEncryptedData = (rawData: any) => {
  const entries = Object.entries(rawData);
  entries.sort();
  const rsaRawData = Object.fromEntries(entries);
  const md5RawData = { ...rsaRawData, key: activityID };
  const md5Data = md5Encrypt(md5RawData);
  const rsaData = rsaEncrypt(rsaRawData);
  return { md5Data, rsaData };
};

service.interceptors.request.use((config) => {
  if (config.method === "post") {
    const data = config.data;
    if (!isDevMode && data.useEncrypt) {
      delete data.useEncrypt;
      const { md5Data, rsaData } = getEncryptedData(data);
      config.headers.Authorization = md5Data;
      const fd = new FormData();
      fd.append("data", rsaData);
      config.data = fd;
    } else {
      const fd = serialize(data, { allowEmptyArrays: true, indices: true });
      config.data = fd;
    }
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    if (Number(response.status) === 200) {
      checkAuth(response.data);
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const get = (
  url: string,
  params: Record<string, any> = {},
  alertExcludeCodes = [300, 301]
): Promise<any> => {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((res) => {
        const data = res.data;
        if (isOk(data)) {
          resolve(data.data);
        } else {
          if (!alertExcludeCodes.includes(data.code)) {
            Alert.fire(data.msg);
          }
          resolve(data);
        }
      })
      .catch((res) => {
        reject(res.data);
      });
  });
};

const post = (
  url: string,
  data: Record<string, any> = {},
  useEncrypt = false,
  alertExcludeCodes = [300, 301]
): Promise<any> => {
  if (useEncrypt) {
    data.useEncrypt = true;
  }
  return new Promise((resolve, reject) => {
    service
      .post(url, data)
      .then((res) => {
        const data = res.data;
        if (isOk(data)) {
          resolve(data);
        } else {
          if (!alertExcludeCodes.includes(data.code)) {
            Alert.fire(data.msg);
          }
          resolve(data);
        }
      })
      .catch((res) => {
        reject(res.data);
      });
  });
};

export { get, post, service, isOk };
