<template>
  <router-view />
</template>

<script lang="ts">
import "@alphardex/aqua.css/dist/aqua.sp.min.css";
import { defineComponent } from "vue";
import MockServer from "@/mock/index";
import VConsole from "vconsole";
import { isDevMode } from "./consts";

export default defineComponent({
  setup() {
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
  font-size: 4vw;
  background: white;
}

// colors

:root {
  --grey-color: #6a6a6a;
}

// reset

a {
  color: currentColor;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
}

* {
  border-width: 0;
}

input,
select {
  outline: none !important;
  appearance: none !important;
}

// sweetalert2

.alert-title {
  font-size: 3.8vw !important;
  font-weight: normal !important;
}

.alert-popup {
  max-width: 72vw !important;
}

// utils

.text-grey {
  color: var(--grey-color);
}

// common

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
