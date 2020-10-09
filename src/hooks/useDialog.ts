import { ref } from "vue";

export default () => {
  const showBackdrop = ref(false);
  const showShareTip = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showShareTip.value = false;
  };

  const openShareTip = () => {
    showBackdrop.value = true;
    showShareTip.value = true;
  };

  return {
    showBackdrop,
    showShareTip,
    closeAllDialog,
    openShareTip,
  };
};
