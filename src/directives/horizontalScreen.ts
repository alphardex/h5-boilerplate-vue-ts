// https://juejin.cn/post/6844903708786950157
const horizontalScreen = {
  mounted(el: any) {
    let width = document.documentElement.clientWidth,
      height = document.documentElement.clientHeight;
    el.style.webkitTransform = el.style.transform = `rotate(90deg)`;
    el.style.width = `${height}px`;
    el.style.height = `${width}px`;
    el.style.webkitTransformOrigin = el.style.transformOrigin = `${width /
      2}px center`;
  },
};

export default horizontalScreen;
