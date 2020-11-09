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
      <div class="share-tip" v-if="dialog.showShareTip.value"></div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, reactive, toRefs } from "vue";
import useDialog from "@/hooks/useDialog";
import useWx from "@/hooks/useWx";
import { Info } from "@/types";
import { dummyInfo } from "@/data/fake";
import { getInfo } from "@/apis";

interface State {
  info: Info;
}

export default defineComponent({
  name: "Home",
  setup() {
    const isDevMode = computed(() => process.env.NODE_ENV === "development");
    const dialog = useDialog();
    const wx = useWx();
    const state = reactive<State>({
      info: {}
    });

    onMounted(async () => {
      if (isDevMode.value) {
        state.info = { ...dummyInfo };
      } else {
        state.info = await getInfo();
      }
      await wx.wxShare(state.info);
    });
    return { isDevMode, dialog, wx, ...toRefs(state) };
  }
});
</script>

<style lang="scss" scoped>
.home {
  background: url("~@/assets/bg-index.jpg") 0 0 / 100% no-repeat;
}
</style>
