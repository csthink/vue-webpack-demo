<template>
  <section :class="$style.realApp">
    <input
      type="text"
      :class="$style.addInput"
      autofocus="autofocus"
      placeholder="要去完成的事"
      @keyup.enter="addTodo"
    >

    <Item
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"
    />

    <Tab
      :filter="filter"
      :todos="todos"
      @toggle="toggleFilter"
      @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import Item from './Item.vue';
import Tab from './Tab.vue';

export default {
  components: {
    Item,
    Tab,
  },
  data() {
    return {
      todos: [],
      filter: 'all',
      id: 0,
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos;
      }

      const completed = this.filter === 'completed';
      return this.todos.filter(todo => completed === todo.completed);
    },
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: this.id += 1,
        content: e.target.value.trim(),
        completed: false,
      });
      e.target.value = '';
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
    },
    toggleFilter(state) {
      this.filter = state;
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
  },
};
</script>

<style lang="scss" module>
.real-app{
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: white;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  // font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
  background: radial-gradient(black, transparent);
}
</style>
