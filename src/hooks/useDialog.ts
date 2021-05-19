import { ref } from "vue";

export default () => {
  const showBackdrop = ref(false);
  const isBackdropClosable = ref(true);
  const showShareTip = ref(false);
  const showFollowDialog = ref(false);
  const showRuleDialog = ref(false);
  const showCustomDialog = ref(false);

  const closeAllDialog = () => {
    showBackdrop.value = false;
    showShareTip.value = false;
    showFollowDialog.value = false;
    showRuleDialog.value = false;
    showCustomDialog.value = false;
  };

  const openDialog = (fn: Function, closable = true) => () => {
    closeAllDialog();
    showBackdrop.value = true;
    isBackdropClosable.value = closable;
    fn();
  };

  const clickCloseDialog = () => {
    if (!isBackdropClosable.value) {
      return;
    }
    closeAllDialog();
  };

  const openShareTip = openDialog(() => {
    showShareTip.value = true;
  });

  const openFollowDialog = openDialog(() => {
    showFollowDialog.value = true;
  });

  const openRuleDialog = openDialog(() => {
    showRuleDialog.value = true;
  });

  const openCustomDialog = openDialog(() => {
    showCustomDialog.value = true;
  });

  return {
    showBackdrop,
    isBackdropClosable,
    closeAllDialog,
    clickCloseDialog,
    showShareTip,
    openShareTip,
    showFollowDialog,
    openFollowDialog,
    showRuleDialog,
    openRuleDialog,
    showCustomDialog,
    openCustomDialog,
  };
};
