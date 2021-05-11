<template>
  <div class="flex items-center" v-if="timer">
    <span>{{ timer.duration.day }}</span>
    <span>天</span>
    <span>{{ timer.duration.hour }}</span>
    <span>小时</span>
    <span>{{ timer.duration.minute }}</span>
    <span>分</span>
    <span>{{ timer.duration.second }}</span>
    <span>秒</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs } from "vue";
import ky from "kyouka";
import { Timer } from "@/utils/timer";

export default defineComponent({
  name: "MyTimer",
  props: {
    endTime: {
      type: Number,
    },
  },
  setup(props) {
    const state = reactive<any>({
      timer: null,
    });
    const startTimer = async () => {
      const begin = new Date();
      const end = new Date(ky.fromTimestamp(props.endTime!));
      const timer = new Timer(begin, end);
      timer.start();
      while (timer.totalMs >= 0) {
        state.timer = { ...timer };
        await ky.sleep(0.001);
      }
    };
    const endTimer = () => {
      if (state.timer) {
        clearInterval(state.timer);
      }
    };
    onMounted(async () => {
      await startTimer();
    });
    onUnmounted(() => {
      endTimer();
    });
    return { ...toRefs(state) };
  },
});
</script>
