import LazyLoad, { ILazyLoadInstance } from "vanilla-lazyload";
import Masonry from "masonry-layout";
import { masonryConfig } from "@/consts";
import { ref } from "vue";

export default () => {
  const lazyloadInstance: any = ref(null);
  const lazyload = (
    callback_loaded = (
      elt: HTMLElement,
      instance: ILazyLoadInstance
    ): void => {}
  ) => {
    if (!lazyloadInstance.value) {
      const lazy = new LazyLoad({
        callback_loaded,
      });
      lazyloadInstance.value = lazy;
    } else {
      // 这里的新元素还在最上方，应重新计算布局，再进行懒加载更新
      new Masonry(masonryConfig.sel, masonryConfig.config);
      lazyloadInstance.value.update();
    }
  };
  return {
    lazyload,
  };
};
