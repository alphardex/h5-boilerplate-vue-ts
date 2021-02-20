<template>
  <router-view />
</template>

<script lang="ts">
import "@alphardex/aqua.css/dist/aqua.sp.min.css";
import { defineComponent } from "vue";
import MockServer from "@/mock/index";
import VConsole from "vconsole";
import { isDevMode } from "./consts";
import ky from "kyouka";

export default defineComponent({
  setup() {
    ky.iosInputScrollFix();
    if (isDevMode) {
      const mockServer = new MockServer();
      mockServer.start();
    }
    new VConsole();
  },
});
</script>

<style lang="scss">
body {
  min-height: 100vh;
  margin: 0;
  background: white;
}

// mixins

@mixin sp-layout {
  @media screen and (max-width: 750px) {
    @content;
  }
}

@mixin pc-layout {
  @media screen and (min-width: 751px) {
    @content;
  }
}

@mixin cover(
  $top: 0,
  $left: 0,
  $width: 100%,
  $height: 100%,
  $position: absolute
) {
  position: $position;
  top: $top;
  left: $left;
  width: $width;
  height: $height;
}

@mixin inset($inset: 0, $position: absolute) {
  position: $position;
  top: $inset;
  left: $inset;
  right: $inset;
  bottom: $inset;
}

@mixin square($width) {
  width: $width;
  height: $width;
}

@mixin circle($radius) {
  width: $radius;
  height: $radius;
  border-radius: 50%;
}

@mixin flex-center($display: flex) {
  display: $display;
  justify-content: center;
  align-items: center;
}

@mixin h-center($position: absolute) {
  position: $position;
  left: 50%;
  transform: translateX(-50%);
}

@mixin v-center($position: absolute) {
  position: $position;
  top: 50%;
  transform: translateY(-50%);
}

@mixin hv-center($position: absolute) {
  position: $position;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

// functions

@function random_range($min, $max) {
  $rand: random();
  $random_range: $min + floor($rand * (($max - $min) + 1));
  @return $random_range;
}

@function sample($list) {
  @return nth($list, random(length($list)));
}

// colors

:root {
}

// reset

* {
  border-width: 0;
  -webkit-tap-highlight-color: transparent;
}

a {
  color: currentColor;
  text-decoration: none;
}

p {
  margin: 0;
}

// sweetalert2

.alert-title {
  font-weight: normal !important;
}

@include sp-layout {
  body {
    font-size: 4vw;
  }

  .alert-title {
    font-size: 3.8vw !important;
  }

  .alert-popup {
    max-width: 72vw !important;
  }
}

// utils

$colors: "red", "orange", "yellow", "green", "blue", "purple", "brown", "grey",
  "white";
@each $c in $colors {
  @for $i from 1 through 8 {
    .text-#{$c}-#{$i} {
      color: var(--#{$c}-color-#{$i});
    }

    .bg-#{$c}-#{$i} {
      background: var(--#{$c}-color-#{$i});
    }

    .border-#{$c}-#{$i} {
      border-color: var(--#{$c}-color-#{$i});
    }
  }
}

.marquee {
  --basic-height: 17.2vw;
  --basic-duration: 3s;
  --total-duration: calc(var(--basic-duration) * var(--total-count));
  --total-height: calc(var(--basic-height) * var(--total-count) * -1);

  animation: scroll-down var(--total-duration) linear infinite;
}

@keyframes scroll-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(var(--total-height));
  }
}

// common

.music {
  position: fixed;
  z-index: 1000;
  top: 12vh;
  right: 5vw;
  width: 30px;
  height: 30px;
  background: url("./assets/music-1.png") 0 0 / cover no-repeat;

  &.active {
    background-image: url("./assets/music-0.png");
  }
}

.share-tip {
  position: fixed;
  z-index: 10000;
  top: 4vh;
  right: 6vw;
  width: 38vw;
  height: 21vh;
  background: url("./assets/share-tip.png") 0 0 / contain no-repeat;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
</style>
