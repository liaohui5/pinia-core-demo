import { defineStore } from "./pinia";

export const useTodos = defineStore("todos", {
  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [
      {
        id: 1,
        text: "code",
        isFinished: false,
      },
      {
        id: 2,
        text: "eat",
        isFinished: true,
      },
      {
        id: 3,
        text: "sleep",
        isFinished: false,
      },
    ],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: "all",
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      console.log("finishedTodos", state);
      return state.todos.filter((todo) => todo.isFinished);
    },
    unfinishedTodos(state) {
      console.log("unfinishedTodos", state);
      return state.todos.filter((todo) => !todo.isFinished);
    },
    filteredTodos() {
      console.log("getters", this);
      if (this.filter === "finished") {
        // 调用其他 getters
        return this.finishedTodos;
      }
      if (this.filter === "unfinished") {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    // 接受任何数量的参数，返回一个 Promise 或不返回
    addTodo(text) {
      console.log("addTodo:", this);
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
    // 设置 filter
    setFilter(filter) {
      console.log("actions", this);
      this.filter = filter;
    },
  },
});
