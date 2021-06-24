<template>
  <div>{{ timeRangeText }}</div>
</template>

<script lang="ts">
import { formatDate } from "@/utils/dom";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TimeRange",
  props: {
    startDate: {
      type: String,
      default: "0",
    },
    endDate: {
      type: String,
      default: "0",
    },
  },
  setup(props) {
    const timeRangeText = computed(() => {
      return `${formatDate(Number(props.startDate))}-${formatDate(
        Number(props.endDate)
      )}`;
    });
    return { timeRangeText };
  },
});
</script>
