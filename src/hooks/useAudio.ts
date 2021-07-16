import { ref } from "vue";

export default () => {
  const currentAudio = ref<HTMLAudioElement | null>(null);
  const isAudioActive = ref(false);
  const playBGM = (audio: HTMLAudioElement) => {
    isAudioActive.value = true;
    currentAudio.value = audio;
    document.addEventListener("WeixinJSBridgeReady", () => {
      audio.play();
    });
  };
  const playSE = (audio: HTMLAudioElement) => {
    audio.play();
  };
  const toggleAudio = () => {
    if (isAudioActive.value) {
      isAudioActive.value = false;
      currentAudio.value!.pause();
    } else {
      isAudioActive.value = true;
      currentAudio.value!.play();
    }
  };
  return {
    currentAudio,
    isAudioActive,
    playBGM,
    playSE,
    toggleAudio,
  };
};
