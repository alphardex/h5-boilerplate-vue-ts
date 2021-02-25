// @ts-ignore
import Compressor from "compressorjs";

const compressImage = (file: File, cb: Function) => {
  new Compressor(file, {
    quality: 0.5,
    success(result: any) {
      cb(result);
    },
  });
};

export { compressImage };
