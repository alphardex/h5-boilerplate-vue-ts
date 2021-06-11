<template>
  <div class="marquee">
    <div class="marquee-wrapper">
      <span class="marquee-text">
        {{ text }}
      </span>
      <span class="marquee-text">
        {{ text }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MarqueeText",
  props: {
    text: {
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.marquee {
  position: relative;
  height: 1rem;
  line-height: 1;
  overflow: hidden;

  &-wrapper {
    position: absolute;
    width: 200%;
    animation: marquee 5s linear infinite;
  }

  &-text {
    float: left;
    width: 50%;
  }
}

@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -100%;
  }
}
</style>
