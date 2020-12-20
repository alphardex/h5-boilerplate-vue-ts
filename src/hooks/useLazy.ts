// @ts-ignore
import LazyLoad from "lazyload";

export default () => {
  const lazyload = (imgs: NodeListOf<Element>) => {
    // @ts-ignore
    new LazyLoad(imgs, {
      rootMargin: "0px 0px -100px",
    });
  };
  return {
    lazyload,
  };
};
