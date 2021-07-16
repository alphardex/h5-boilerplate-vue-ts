const wx = {
  state() {
    return {
      config: null,
    };
  },
  mutations: {
    setConfig(state: any, config: any) {
      state.config = config;
    },
  },
};

export default wx;
