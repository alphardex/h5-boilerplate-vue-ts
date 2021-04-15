<template>
  <div class="nav-tab">
    <router-link
      :to="{ name, query: { type: item.type } }"
      class="nav-tab-item"
      v-for="(item, i) in tabItems"
      :class="{ active: item.type === currentType }"
      :key="i"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "NavTab",
  props: {
    name: String,
    tabItems: Array,
  },
  setup() {
    const route = useRoute();
    const currentType = computed(() => route.query.type || "1");
    return {
      currentType,
    };
  },
});
</script>

<style lang="scss" scoped></style>
