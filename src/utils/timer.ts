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
    const totalSeconds = ky.getTimeDeltaAsSeconds(beginDate, endDate);
    this.totalSeconds = totalSeconds >= 0 ? totalSeconds : 0;
  }
  start() {
    const timer = setInterval(() => {
      let { totalSeconds } = this;
      const duration = ky.formatDuration(totalSeconds);
      this.duration = duration;
      totalSeconds--;
      this.totalSeconds = totalSeconds;
      if (totalSeconds < 0) {
        this.totalSeconds = 0;
        clearInterval(this.timer);
      }
    }, 1000);
    this.timer = timer;
  }
}

const addHoursToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 3600000);
  return d;
};

const addMinutesToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 60000);
  return d;
};

const addSecondsToDate = (d: Date, n: number) => {
  d.setTime(d.getTime() + n * 1000);
  return d;
};

export { Timer, addHoursToDate, addMinutesToDate, addSecondsToDate };
