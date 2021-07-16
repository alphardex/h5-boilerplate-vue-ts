import { Alert } from "@/utils/alert";
import { compressAndUploadMultipleImages } from "@/utils/dom";
import { ref } from "vue";

export default () => {
  const uploadedPics = ref<any[]>([]);
  const previewImages = ref<any[]>([]);
  const fileCountLimit = ref(3);
  const isUploading = ref(false);

  const onUploaderChange = (e: Event) => {
    compressAndUploadMultipleImages(
      e,
      (files: FileList) => {
        const fileCount = files.length;
        const currentFileCount = uploadedPics.value.length;
        if (fileCount + currentFileCount > fileCountLimit.value) {
          Alert.fire(`最多上传${fileCountLimit.value}张图片`);
          return false;
        }
        isUploading.value = true;
        return true;
      },
      (base64URL: string) => {
        isUploading.value = false;
        uploadedPics.value = [...uploadedPics.value, base64URL];
        previewImages.value = [...previewImages.value, base64URL];
      }
    );
  };

  const onDeleteItem = (item: string) => {
    const oldValue = [...uploadedPics.value];
    const newValue = oldValue.filter((v) => v !== item);
    uploadedPics.value = [...newValue];
    previewImages.value = [...newValue];
  };

  return {
    uploadedPics,
    previewImages,
    fileCountLimit,
    isUploading,
    onUploaderChange,
    onDeleteItem,
  };
};
