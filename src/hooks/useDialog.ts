import { ref } from "vue";
import ky from "kyouka";

export default () => {
  const showBackdrop = ref(false);
  const isBackdropClosable = ref(true);
  const showShareTip = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showShareTip.value = false;
  };

  const openDialog = (fn: Function, closable = true) => () => {
    showBackdrop.value = true;
    isBackdropClosable.value = closable;
    fn();
  };

  const openShareTip = openDialog(() => {
    showShareTip.value = true;
  });

  return {
    showBackdrop,
    isBackdropClosable,
    closeAllDialog,
    showShareTip,
    openShareTip,
  };
};
