import { ref } from "vue";
import ky from "kyouka";

export default () => {
  const showBackdrop = ref(false);
  const showShareTip = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showShareTip.value = false;
  };

  const openDialog = (fn: Function) => () => {
    showBackdrop.value = true;
    fn();
  };

  const openDialogCurry = ky.curry(openDialog);

  const openShareTip = openDialogCurry(() => {
    showShareTip.value = true;
  });

  return {
    showBackdrop,
    showShareTip,
    closeAllDialog,
    openShareTip,
  };
};
