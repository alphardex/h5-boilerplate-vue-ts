<template>
  <video
    :src="src"
    :poster="poster"
    controls
    playsinline
    webkit-playsinline
    x5-video-player-type="h5-page"
    controlslist="nodownload"
    class="bg-black"
  ></video>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "VideoPlayer",
  props: {
    src: String,
    poster: {
      type: String,
      default: "",
    },
  },
});
</script>
