import horizontalScreen from "./horizontalScreen";

const directives = {
  horizontalScreen,
};

export default {
  install(Vue: any) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, (directives as any)[key]);
    });
  },
};
