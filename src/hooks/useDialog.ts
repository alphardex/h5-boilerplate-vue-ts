import { ref } from "vue";

export default () => {
  const showBackdrop = ref(false);
  const isBackdropClosable = ref(true);
  const showShareTip = ref(false);
  const showFollowDialog = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showShareTip.value = false;
    showFollowDialog.value = false;
  };

  const openDialog = (fn: Function, closable = true) => () => {
    closeAllDialog();
    showBackdrop.value = true;
    isBackdropClosable.value = closable;
    fn();
  };

  const openShareTip = openDialog(() => {
    showShareTip.value = true;
  });

  const openFollowDialog = openDialog(() => {
    showFollowDialog.value = true;
  });

  return {
    showBackdrop,
    isBackdropClosable,
    closeAllDialog,
    showShareTip,
    openShareTip,
    showFollowDialog,
    openFollowDialog,
  };
};
