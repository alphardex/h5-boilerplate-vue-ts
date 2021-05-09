<template>
  <div>
    <span>活动时间：</span>
    <span>{{ timeRangeText }}</span>
  </div>
</template>

<script lang="ts">
import { formatDate } from "@/utils/dom";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TimeRange",
  props: {
    info: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const timeRangeText = computed(() => {
      return props.info
        ? `${formatDate(props.info.startdate)}-${formatDate(
            props.info.enddate
          )}`
        : "";
    });
    return { timeRangeText };
  },
});
</script>
