import Alert from "@/utils/alert";

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

export { checkDate };
