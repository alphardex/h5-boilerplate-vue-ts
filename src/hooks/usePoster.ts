import { ref } from "vue";
import html2canvas from "html2canvas";
import ky from "kyouka";

export default () => {
  const posterUrl = ref("");
  const isGenerating = ref(false);

  const generatePoster = async (backgroundColor = "transparent") => {
    window.scrollTo(0, 0);
    isGenerating.value = true;
    posterUrl.value = "";
    await ky.sleep(200);
    const capture = document.querySelector(".capture")! as HTMLElement;
    const canvas = await html2canvas(capture, {
      useCORS: true,
      backgroundColor,
    });
    const dataUrl = canvas.toDataURL("image/jpg");
    posterUrl.value = dataUrl;
    isGenerating.value = false;
  };
  return { posterUrl, generatePoster, isGenerating };
};
