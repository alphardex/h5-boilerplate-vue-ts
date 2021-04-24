import { ref } from "vue";
import html2canvas from "html2canvas";
import ky from "kyouka";

export default () => {
  const posterUrl = ref("");
  const isGenerating = ref(false);

  const generateCapture = async (
    capture: HTMLElement,
    backgroundColor = "transparent",
    scale = 2,
    height = 0
  ) => {
    const canvasOptions: any = {
      useCORS: true,
      backgroundColor,
      scale: window.devicePixelRatio * scale,
    };
    if (height) {
      canvasOptions.height = height;
    }
    const canvas = await html2canvas(capture);
    const dataUrl = canvas.toDataURL("image/jpg");
    return dataUrl;
  };

  const generatePoster = async (
    sel = ".poster-capture",
    bgColor = "transparent"
  ) => {
    posterUrl.value = "";
    window.scrollTo(0, 0);
    isGenerating.value = true;
    await ky.sleep(200);
    const poster = document.querySelector(sel) as HTMLElement;
    const dataUrl = await generateCapture(poster, bgColor, 2, ky.vw2px(210));
    posterUrl.value = dataUrl;
    isGenerating.value = false;
  };

  return {
    posterUrl,
    isGenerating,
    generatePoster,
  };
};
