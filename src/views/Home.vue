<template>
  <div>
    <input type="text" v-model="inputRef" />
    <button @click="addTodo">添加</button>
  </div>
  <div>
    <select @change="filterTodos" v-model="selectRef">
      <option value="all">all</option>
      <option value="finished">finished</option>
      <option value="unfinished">unfinished</option>
    </select>
  </div>
  <ul>
    <li v-for="item of todoStore.filteredTodos" :key="item.id">
      <p>
        {{ item.text }} [ {{ item.isFinished ? "finished" : "unfinished" }} ]
      </p>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue";
import { useTodos } from "@/store";

const inputRef = ref("");
const selectRef = ref("all");
const todoStore = useTodos();

// 添加 TODO
const addTodo = () => {
  todoStore.addTodo(inputRef.value);
};

// 筛选
const filterTodos = () => {
  todoStore.setFilter(selectRef.value);
};
</script>
