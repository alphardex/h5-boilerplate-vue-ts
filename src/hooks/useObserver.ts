import { computed, ref } from "vue";

export default () => {
  const intersection = ref(1);
  const intersectEntry = ref<any>(null);

  const isIntersecting = computed(() => {
    return intersection.value > 0;
  });

  const isNonIntersecting = computed(() => {
    return intersection.value <= 0;
  });

  const observe = (el: HTMLElement) => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      intersectEntry.value = entry;
      const intersectionRatio = entry.intersectionRatio;
      intersection.value = intersectionRatio;
    });
    observer.observe(el);
  };

  return {
    isIntersecting,
    isNonIntersecting,
    intersectEntry,
    observe,
  };
};
