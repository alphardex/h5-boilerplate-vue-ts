import CryptoJS from "crypto-js";

const encrypt = (str: string) =>
  CryptoJS.AES.encrypt(str, "most secret key").toString();

const decrypt = (encrypted: string) =>
  CryptoJS.AES.decrypt(encrypted, "most secret key").toString(
    CryptoJS.enc.Utf8
  );

export { encrypt, decrypt };
