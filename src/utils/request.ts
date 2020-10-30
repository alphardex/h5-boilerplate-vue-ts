import axios from "axios";
import Alert from "@/utils/alert";

const service = axios.create();

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const get = (url: string, params = {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    service
      .get(url, { params })
      .then((res) => {
        const data = res.data;
        if (parseInt(data.code) === 200) {
          resolve(data.data);
        } else {
          Alert.fire(data.msg);
          resolve(data);
        }
      })
      .catch((res) => {
        reject(res.data);
      });
  });
};

const post = (url: string, data: FormData): Promise<any> => {
  return new Promise((resolve, reject) => {
    service
      .post(url, data)
      .then((res) => {
        const data = res.data;
        if (parseInt(data.code) === 200) {
          resolve(data);
        } else {
          Alert.fire(data.msg);
          resolve(data);
        }
      })
      .catch((res) => {
        reject(res.data);
      });
  });
};

export { get, post };
