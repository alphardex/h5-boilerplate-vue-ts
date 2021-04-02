import { ref } from "vue";
import html2canvas from "html2canvas";
import ky from "kyouka";

export default () => {
  const posterUrl = ref("");
  const isGenerating = ref(false);

  const generateCapture = async (
    capture: HTMLElement,
    backgroundColor = "transparent",
    scale = 2
  ) => {
    const canvas = await html2canvas(capture, {
      useCORS: true,
      backgroundColor,
      scale: window.devicePixelRatio * scale,
    });
    const dataUrl = canvas.toDataURL("image/jpg");
    return dataUrl;
  };

  const generatePoster = async (sel = ".poster-capture") => {
    posterUrl.value = "";
    window.scrollTo(0, 0);
    isGenerating.value = true;
    await ky.sleep(200);
    const poster = document.querySelector(sel) as HTMLElement;
    const dataUrl = await generateCapture(poster);
    posterUrl.value = dataUrl;
    isGenerating.value = false;
  };

  return {
    posterUrl,
    isGenerating,
    generatePoster,
  };
};
