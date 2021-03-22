<template>
  <div class="relative min-h-screen">
    <div class="absolute bottom-4 h-center text-sm">常熟零距离技术支持</div>
    <teleport to="#dialogs">
      <div
        class="backdrop"
        :class="{ 'pointer-events-none': !dialog.isBackdropClosable.value }"
        v-if="dialog.showBackdrop.value"
        @click="dialog.closeAllDialog"
      ></div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import useDialog from "@/hooks/useDialog";
import useWx from "@/hooks/useWx";
import { getInfo } from "@/apis";

export default defineComponent({
  name: "Home",
  setup() {
    const dialog = useDialog();
    const wx = useWx();
    const state = reactive<any>({
      info: null,
    });
    onMounted(async () => {
      state.info = await getInfo();
      await wx.wxShare(state.info);
      wx.appShare(state.info);
    });
    return { dialog, wx, ...toRefs(state) };
  },
});
</script>

<style lang="scss" scoped></style>
