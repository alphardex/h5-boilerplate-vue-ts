import ky from "kyouka";
import { compressImage } from "./image";

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
  beforeUpload: Function,
  onUpload: Function
) => {
  const files = (e.target as HTMLInputElement).files;
  if (!ky.isEmpty(files)) {
    beforeUpload();
    Array.from(files!).forEach((file: any) => {
      compressImage(file, (compressed: Blob) => {
        ky.loadImageAsBase64URL(compressed, (base64URL: string) => {
          onUpload(base64URL);
        });
      });
    });
  }
};

export { preloadAudios, compressAndUploadMultipleImages };
