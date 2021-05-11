<template>
  <div class="max-h-30 overflow-hidden pointer-events-none">
    <div
      class="marquee flex flex-col space-y-1"
      :class="{ paused: isPaused }"
      :style="`--total-count: ${doubledAvatarList.length};`"
    >
      <div
        class="relative flex items-center"
        v-for="(item, i) in doubledAvatarList"
        :key="i"
      >
        <img :src="item.pic" alt="" class="avatar w-9 h-9" />
        <div>{{ item.name }}刚刚参与了</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ky from "kyouka";

export default defineComponent({
  name: "InfiniteMarquee",
  props: {
    avatarList: {
      type: Array,
    },
    count: {
      type: Number,
      default: 12,
    },
    enableLength: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const isPaused = computed(() => {
      return props.avatarList
        ? props.avatarList.length <= props.enableLength
        : true;
    });
    const doubledAvatarList = computed(() => {
      const randomOrderList = ky.sampleSize(props.avatarList!, props.count);
      const doubledList = [...randomOrderList, ...randomOrderList];
      return isPaused.value ? props.avatarList : doubledList;
    });
    return { isPaused, doubledAvatarList };
  },
});
</script>

<style lang="scss" scoped>
.marquee {
  --basic-height: 5.5vw;
  --basic-duration: 1s;
  --total-duration: calc(var(--basic-duration) * var(--total-count));
  --total-height: calc(var(--basic-height) * var(--total-count) * -1);

  animation: marquee-scroll-down var(--total-duration) linear infinite;

  &.paused {
    animation: none !important;
  }
}

@keyframes marquee-scroll-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(var(--total-height));
  }
}
</style>
