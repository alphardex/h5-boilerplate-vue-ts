<template>
  <div class="bullets" v-if="bullets">
    <div
      v-for="(item, i) in bullets"
      :key="i"
      class="bullet inline-flex leading-snug text-sm pointer-events-none"
    >
      {{ item.msg }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BulletRain",
  props: {
    bullets: {
      type: Object,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

.bullet {
  $heights: 25vh, 35vh, 45vh, 55vh, 65vh, 75vh, 25vh, 35vh, 45vh, 55vh, 65vh,
    75vh, 25vh, 35vh, 45vh, 55vh, 65vh, 75vh, 25vh, 35vh, 45vh, 55vh, 65vh, 75vh,
    25vh, 35vh, 45vh, 55vh, 65vh, 75vh, 25vh, 35vh, 45vh, 55vh, 65vh, 75vh;
  $interval: 10s;

  position: absolute;
  z-index: 100;
  right: 0;
  white-space: nowrap;
  transform: translateX(100%);
  animation: bullet-slide-left linear 10s forwards;

  $m: 5;
  $n: 6;
  @for $i from 1 through $m {
    @for $j from 1 through $n {
      $k: $n * ($i - 1) + $j;
      &:nth-child(#{$k}) {
        top: nth($heights, $k);
        animation-delay: #{random_range(40, 400) / 100 + $interval * ($i - 1)};
      }
    }
  }
}

@keyframes bullet-slide-left {
  to {
    transform: translateX(calc(-100vw));
  }
}
</style>
