import router from "@/router";
import ky from "kyouka";
import { compressImage } from "./image";
import dayjs from "dayjs";
import imagesLoaded from "imagesloaded";

dayjs.locale("zh-cn");

const preloadAudios = () => {
  const audios = document.querySelectorAll("audio:not(.bgm)");
  audios.forEach((audio: any) => {
    document.addEventListener(
      "touchstart",
      () => {
        audio.play();
        audio.pause();
      },
      { once: true }
    );
  });
};

const compressAndUploadMultipleImages = (
  e: Event,
  beforeUpload: Function = (files: FileList) => {
    return true;
  },
  onUpload: Function = (base64URL: string) => {
    console.log(base64URL);
  }
) => {
  const files = (e.target as HTMLInputElement).files;
  if (!ky.isEmpty(files)) {
    if (!beforeUpload(files)) {
      return;
    }
    Array.from(files!).forEach((file: any) => {
      compressImage(file, (compressed: Blob) => {
        ky.loadImageAsBase64URL(compressed, (base64URL: string) => {
          onUpload(base64URL);
        });
      });
    });
  }
};

const goBack = () => {
  router.go(-1);
};

const formatDate = (timestamp: number, format = "M月DD日") =>
  dayjs.unix(Number(timestamp)).format(format);

const isElBottomVisible = (el: HTMLElement, offset = 0): boolean =>
  el.offsetHeight + el.scrollTop >= el.scrollHeight - offset;

const unescapeHTML = (str: string) => {
  const replaced = str.replace(/&#8226;/g, "•");
  return replaced;
};

const preloadImages = (sel = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(sel, { background: true }, resolve);
  });
};

export {
  preloadAudios,
  compressAndUploadMultipleImages,
  goBack,
  formatDate,
  isElBottomVisible,
  unescapeHTML,
  preloadImages,
};
