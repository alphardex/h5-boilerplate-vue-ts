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

@mixin cover($top: 0, $left: 0, $width: 100%, $height: 100%) {
  position: absolute;
  top: $top;
  left: $left;
  width: $width;
  height: $height;
}

@mixin inset($inset: 0) {
  position: absolute;
  top: $inset;
  left: $inset;
  right: $inset;
  bottom: $inset;
}

@mixin flex-center() {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin hv-center() {
  position: absolute;
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
