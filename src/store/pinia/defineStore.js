"use strict";

import { computed, inject, reactive, toRef } from "vue";

function createStore({ state, getters, actions }) {
  const store = {};

  // 处理 state, 代理到 store 上
  if (typeof state === "function") {
    const _state = state();
    store.$state = reactive(_state);

    for (const key of Object.keys(_state)) {
      store[key] = toRef(store.$state, key);
    }
  }

  // 处理 getters, 将 this 指向 $state 并且传入 $state 参数
  if (getters && typeof getters === "object") {
    for (const [key, getter] of Object.entries(getters)) {
      store[key] = computed(getter.bind(store.$state, store.$state));
      store.$state[key] = store[key]; // 在getter中调用其他getter
    }
  }

  // 处理 actions, 将 this 指向 $state
  if (actions && typeof actions === "object") {
    for (const [key, action] of Object.entries(actions)) {
      store[key] = action.bind(store.$state);
    }
  }

  return reactive(store);
}

export function defineStore(id, options) {
  return () => {
    // 使用时(useTodoStore), 从 $pinia 取出
    // store 如果没有就创建放入, 然后返回
    const pinia = inject("$pinia");
    const storeMap = pinia._s;
    if (!storeMap.has(id)) {
      const store = createStore(options);
      storeMap.set(id, store);
    }
    return storeMap.get(id);
  };
}
