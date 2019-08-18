<template>
  <div :class="$style.helper">
    <span :class="$style.left">{{ unFinishedTodoLength }} items left</span>
    <span :class="$style.tabs">
      <span
        v-for="state in states"
        :key="state"
        :class="[$style.state, {[$style.actived]: filter === state}]"
        @click="toggleFilter(state)"
      >
        {{ state }}
      </span>
    </span>
    <span
      :class="$style.clear"
      @click="clearAllCompleted()"
    >Clear Completed</span>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      required: true,
    },
    todos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      states: ['all', 'active', 'completed'],
    };
  },
  computed: {
    unFinishedTodoLength() {
      return this.todos.filter(todo => !todo.completed).length;
    },
  },
  methods: {
    toggleFilter(state) {
      this.$emit('toggle', state);
    },
    clearAllCompleted() {
      this.$emit('clearAllCompleted');
    },
  },
};
</script>

<style lang="scss" module>
.helper{
  font-weight: 100;
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  line-height: 30px;
  background: radial-gradient(black, transparent);
  font-size: 14px;
  color: white;
  // font-smoothing: antialiased;
}
.left, .clear, .tabs{
  padding: 0 10px;
  box-sizing: border-box;
}
.left, .clear{
  width: 150px;
}
.left{
  text-align: left;
}
.clear{
  text-align: right;
  cursor: pointer;
}
.tabs{
  width: 200px;
  display: flex;
  justify-content: space-around;
  * {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    border: 1px solid rgba(175,47,47,0);
    &.actived{
      border-color: rgba(175,47,47,0.4);
      border-radius: 5px;
    }
  }
}
</style>
