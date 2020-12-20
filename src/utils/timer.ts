import { Time } from "kyouka/types/types";
import ky from "kyouka";

class Timer {
  beginDate: Date | number;
  endDate: Date | number;
  timer: number;
  duration: Time;
  totalSeconds: number;
  constructor(beginDate: Date | number, endDate: Date | number) {
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.timer = 0;
    this.duration = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.totalSeconds = ky.getTimeDeltaAsSeconds(beginDate, endDate);
  }
  start() {
    const timer = setInterval(() => {
      let { totalSeconds } = this;
      const duration = ky.formatDuration(totalSeconds);
      this.duration = duration;
      totalSeconds--;
      this.totalSeconds = totalSeconds;
      if (totalSeconds <= 0) {
        this.totalSeconds = 0;
        clearInterval(this.timer);
      }
    }, 1000);
    this.timer = timer;
  }
}

export { Timer };
