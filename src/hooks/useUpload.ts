import { postUploadPic } from "@/apis";
import Alert from "@/utils/alert";
import { compressAndUploadMultipleImages } from "@/utils/dom";
import { ref } from "vue";

export default () => {
  const uploadedPics = ref<any[]>([]);
  const previewImages = ref<any[]>([]);
  const fileCountLimit = ref(6);
  const isUploading = ref(false);

  const onUploaderChange = (e: Event) => {
    previewImages.value = [];
    uploadedPics.value = [];
    compressAndUploadMultipleImages(
      e,
      (files: FileList) => {
        const fileCount = files.length;
        if (fileCount > fileCountLimit.value) {
          Alert.fire(`最多上传${fileCountLimit.value}张图片`);
          return false;
        }
        isUploading.value = true;
        return true;
      },
      async (base64URL: string) => {
        const res = await postUploadPic({ pic: base64URL });
        if (Number(res.code) === 200) {
          const { data } = res;
          const { big, small } = data;
          isUploading.value = false;
          uploadedPics.value = [...uploadedPics.value, big];
          previewImages.value = [...previewImages.value, small];
        }
      }
    );
  };

  return {
    uploadedPics,
    previewImages,
    fileCountLimit,
    isUploading,
    onUploaderChange,
  };
};
