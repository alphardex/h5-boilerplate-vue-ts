<template>
  <div class="backdrop flex-center">
    <div class="flex flex-col items-center space-y-2">
      <div class="loader"></div>
      <div class="text-white">{{ text }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoadingScreen",
  props: {
    text: {
      type: String,
      default: "加载中",
    },
  },
});
</script>
