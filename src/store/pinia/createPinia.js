"use strict";

export function createPinia() {
  const pinia = {
    _s: new Map(), // 所有 store 集合 { id: store }
  };
  // 安装
  pinia.install = function(app) {
    app.provide("$pinia", pinia);
    app.config.globalProperties.$pinia = pinia;
    console.log("[use] install pinia");
  };

  return pinia;
}
