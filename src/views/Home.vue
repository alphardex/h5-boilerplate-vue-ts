<template>
  <div class="home min-h-screen">
    <div
      class="absolute bottom-2 h-center text-grey text-sm whitespace-no-wrap"
    >
      常熟零距离技术支持
    </div>
    <teleport to="#dialogs">
      <div
        class="backdrop"
        :class="{ 'pointer-events-none': !dialog.isBackdropClosable.value }"
        v-if="dialog.showBackdrop.value"
        @click="dialog.closeAllDialog"
      ></div>
    </teleport>
    <teleport to="#dialogs">
      <div class="share-tip" v-show="dialog.showShareTip.value"></div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import useDialog from "@/hooks/useDialog";
import useWx from "@/hooks/useWx";
import { Info } from "@/types";
import { getInfo } from "@/apis";

interface State {
  info: Info | null;
}

export default defineComponent({
  name: "Home",
  setup() {
    const dialog = useDialog();
    const wx = useWx();
    const state = reactive<State>({
      info: null,
    });
    onMounted(async () => {
      state.info = await getInfo();
      await wx.wxShare(state.info);
    });
    return { dialog, wx, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped>
.home {
  background: url("~@/assets/bg-index.jpg") 0 0 / 100% no-repeat;
}
</style>
