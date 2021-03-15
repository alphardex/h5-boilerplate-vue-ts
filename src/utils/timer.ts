import { Time } from "kyouka/types/types";
import ky from "kyouka";

// https:stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
const padZero = (n: number | string, width: number, z = "0") => {
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

class Timer {
  beginDate: Date | number;
  endDate: Date | number;
  timer: number;
  duration: Time;
  totalSeconds: number;
  isPadZero: boolean;
  convertMinuteToSecond: boolean;
  constructor(
    beginDate: Date | number,
    endDate: Date | number,
    isPadZero = false,
    convertMinuteToSecond = false
  ) {
    this.beginDate = beginDate;
    this.endDate = endDate;
    this.isPadZero = isPadZero;
    this.convertMinuteToSecond = convertMinuteToSecond;
    this.timer = 0;
    this.duration = {
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
    this.padDuration(this.duration);
    const totalSeconds = ky.getTimeDeltaAsSeconds(beginDate, endDate);
    this.totalSeconds = totalSeconds >= 0 ? totalSeconds : 0;
  }
  start() {
    const timer = setInterval(() => {
      let { totalSeconds } = this;
      const duration = ky.formatDuration(totalSeconds);
      if (this.convertMinuteToSecond && duration.minute === 1) {
        duration.minute = 0;
        duration.second = 60;
      }
      this.padDuration(duration);
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
  padDuration(duration: any) {
    if (this.isPadZero) {
      Object.entries(duration).forEach(([key, value]) => {
        (duration as any)[key] = padZero(value as any, 2);
      });
    }
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

export { Timer, addHoursToDate, addMinutesToDate, addSecondsToDate, padZero };
