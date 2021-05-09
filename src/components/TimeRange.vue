<template>
  <span>{{ timeRangeText }}</span>
</template>

<script lang="ts">
import { formatDate } from "@/utils/dom";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TimeRange",
  props: {
    startDate: {
      type: Number,
      default: 0,
    },
    endDate: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const timeRangeText = computed(() => {
      return `${formatDate(props.startDate)}-${formatDate(props.endDate)}`;
    });
    return { timeRangeText };
  },
});
</script>
