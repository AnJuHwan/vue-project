<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm @add-todo="addTodo" />
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
  </div>
</template>

<script>
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { TodoSimpleForm, TodoList },
  setup() {
    const todos = ref([]);

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'grey',
    };

    const addTodo = (todo) => {
      todos.value.push(todo);
    };
    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
    };
  },
};
</script>

<style>
.todo {
  color: grey;
  text-decoration: line-through;
}
</style>
