import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import useLazyMasonry from "@/hooks/useLazyMasonry";
import { masonryConfig } from "@/consts";

export default (cb = () => {}) => {
  const lazyMasonry = useLazyMasonry();
  const loadMasonry = () => {
    // @ts-ignore
    new imagesLoaded(masonryConfig.sel, () => {
      new Masonry(masonryConfig.sel, masonryConfig.config);
      cb();
    });
  };
  const lazyloadMasonry = () => {
    // 图片懒加载完后才能计算布局
    lazyMasonry.lazyload(loadMasonry);
  };
  return {
    loadMasonry,
    lazyloadMasonry,
  };
};
