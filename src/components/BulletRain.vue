<template>
  <div class="bullets" v-if="bullets">
    <div
      v-for="(item, i) in bullets"
      :key="i"
      class="bullet inline-flex px-4 py-1 leading-snug text-sm text-white bg-primary rounded-3xl pointer-events-none"
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
  $min-height: 24;
  $max-height: 60;

  position: absolute;
  z-index: 100;
  right: 0;
  white-space: nowrap;
  transform: translateX(100%);
  animation: bullet-slide-left linear 10s forwards;

  @for $i from 1 through 5 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s};
    }
  }

  @for $i from 6 through 10 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s + 10s * 1};
    }
  }

  @for $i from 11 through 15 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s + 10s * 2};
    }
  }

  @for $i from 16 through 20 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s + 10s * 3};
    }
  }

  @for $i from 21 through 25 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s + 10s * 4};
    }
  }

  @for $i from 26 through 30 {
    &:nth-child(#{$i}) {
      top: nth($heights, $i);
      animation-delay: #{random_range(40, 400) / 100 * 1s + 10s * 5};
    }
  }
}

@keyframes bullet-slide-left {
  to {
    transform: translateX(calc(-100vw));
  }
}
</style>
