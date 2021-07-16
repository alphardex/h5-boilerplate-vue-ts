<template>
  <i class="chevron-icon left text-white scale-150" @click="goBack"></i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { goBack } from "@/utils/dom";

export default defineComponent({
  name: "GoBack",
  setup() {
    return {
      goBack,
    };
  },
});
</script>
