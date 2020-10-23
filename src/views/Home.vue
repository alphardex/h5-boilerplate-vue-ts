<template>
  <div class="home min-h-screen">
    <div
      class="absolute bottom-2 h-center text-grey text-sm whitespace-no-wrap"
    >
      常熟零距离技术支持
    </div>
    <div
      class="backdrop"
      v-if="dialog.showBackdrop.value"
      @click="dialog.closeAllDialog"
    ></div>
    <div class="share-tip" v-if="dialog.showShareTip.value"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useDialog from "@/hooks/useDialog";

export default defineComponent({
  name: "Home",
  setup() {
    const dialog = useDialog();
    return { dialog };
  }
});
</script>

<style lang="scss" scoped>
.home {
  background: url("~@/assets/bg-index.jpg") 0 0 / 100% no-repeat;
}
</style>
