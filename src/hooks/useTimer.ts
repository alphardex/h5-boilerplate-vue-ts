import { Time } from "kyouka/types/types";
import { Timer } from "@/utils/timer";
import { ref } from "vue";
import ky from "kyouka";

export default () => {
  const timer = ref<Timer | null>(null);
  const duration = ref<Time | {}>({});
  const countDown = async (beginDate: Date | number, endDate: Date | number) => {
    const timerInstance = new Timer(beginDate, endDate);
    timerInstance.start();
    timer.value = timerInstance;
    while (timerInstance.totalSeconds) {
      timer.value = timerInstance;
      duration.value = timerInstance.duration;
      await ky.sleep(1000);
    }
  };
  return { timer, duration, countDown };
};
