const importComponent = path => () => import(/* webpackChunckName: "component_" */ `@/components/${path}.vue`);

export default {
  // eslint-disable-next-line no-unused-vars
  install(Vue, options) {
    Vue.component('ac-button', importComponent('Button'));
    Vue.component('ac-loading', importComponent('Loading'));
    Vue.component('ac-full-loading', importComponent('LoadingFull'));
  },
};
