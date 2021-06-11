import { Alert } from "@/utils/alert";
import ky from "kyouka";
import { isIdcard } from "./dom";

const checkDate = (beginDate: Date, endDate: Date) => {
  const now = new Date();
  if (now < beginDate) {
    Alert.fire("活动未开始");
    return false;
  }
  if (now > endDate) {
    Alert.fire("活动已结束");
    return false;
  }
  return true;
};

const checkTel = (tel: string) => {
  if (!tel) {
    Alert.fire("请输入电话");
    return false;
  }
  if (!ky.isPhoneNumber(tel)) {
    Alert.fire("电话号码的格式不对");
    return false;
  }
  return true;
};

const checkNameAndTel = (name: string, tel: string) => {
  if (!name) {
    Alert.fire("请输入姓名");
    return false;
  }
  if (!checkTel(tel)) {
    return false;
  }
  return true;
};

const checkIdcard = (idcard: string) => {
  if (!idcard) {
    Alert.fire("请输入身份证");
    return false;
  }
  if (!isIdcard(idcard)) {
    Alert.fire("身份证号的格式不对");
    return false;
  }
  return true;
};

const checkAgree = (agree: boolean) => {
  if (!agree) {
    Alert.fire("请先同意隐私条款");
    return false;
  }
  return true;
};

export { checkDate, checkTel, checkNameAndTel, checkIdcard, checkAgree };
