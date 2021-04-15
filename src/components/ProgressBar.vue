<template>
  <div class="my-progress relative" :style="`--progress: ${progress}`">
    <div class="my-progress-bar bg-stripe rounded-3xl h-5"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "ProgressBar",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    const progress = computed(() => {
      return props.value / props.max;
    });
    return { progress };
  },
});
</script>

<style lang="scss" scoped>
.my-progress {
  &-bar {
    width: calc(var(--progress) * 100% - 8px);
    transition: 0.3s;
  }

  &-indicator {
    left: calc(var(--progress) * calc(100%));
    transform: translateX(-50%);
    transition: 0.3s;
  }
}

.bg-stripe {
  --stripe-deg: -45deg;
  --stripe-offset-1: 4px;
  --stripe-offset-2: 8px;
  --stripe-color-1: var(--primary-color);
  --stripe-color-2: var(--primary-color-darker);

  background: repeating-linear-gradient(
    var(--stripe-deg),
    var(--stripe-color-1) 0,
    var(--stripe-color-1) var(--stripe-offset-1),
    var(--stripe-color-2) 0,
    var(--stripe-color-2) var(--stripe-offset-2)
  );
}
</style>
