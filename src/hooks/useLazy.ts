// @ts-ignore
import LazyLoad from "lazyload";

export default () => {
  const lazyload = (imgs: NodeListOf<Element>) => {
    // @ts-ignore
    if (!navigator.userAgent.includes("WindowsWechat")) {
      new LazyLoad(imgs, {
        rootMargin: "0px 0px -100px",
      });
    } else {
      imgs.forEach((img) => {
        (img as HTMLImageElement).src = (img as HTMLImageElement).dataset.src!;
      });
    }
  };
  return {
    lazyload,
  };
};
