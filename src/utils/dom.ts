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

const formatDate = (timestamp: number, format = "M月DD日HH:mm") =>
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

const reload = () => location.reload();

const reverseObject = (obj: any) =>
  Object.fromEntries(Object.entries(obj).reverse());

const isIdcard = (str: string) =>
  /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/.test(
    str
  );

const maskName = (name: string) => {
  let newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + "*";
  } else {
    let char = "";
    for (let i = 0, len = name.length - 1; i < len; i++) {
      char += "*";
    }
    newStr = name.substr(0, 1) + char;
  }
  return newStr;
};

const maskTel = (tel: string) => tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");

export {
  preloadAudios,
  compressAndUploadMultipleImages,
  goBack,
  formatDate,
  isElBottomVisible,
  unescapeHTML,
  preloadImages,
  reload,
  reverseObject,
  isIdcard,
  maskName,
  maskTel,
};
