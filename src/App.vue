<template>
  <router-view />
</template>

<script lang="ts">
import "@alphardex/aqua.sp/dist/aqua.sp.min.css";
import VConsole from "vconsole";

export default {
  mounted() {
    const vconsole = new VConsole();
  }
};
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

// sweetalert2

.alert-title {
  font-size: 4vw !important;
  font-weight: normal !important;
  white-space: nowrap !important;
}

.alert-popup {
  max-width: 72vw !important;
}

// utils

.bottom-2 {
  bottom: 2vw;
}

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
