<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input
      class="form-control "
      type="text"
      v-model="searchText"
      placeholder="Search"
    />

    <hr />
    <TodoSimpleForm @add-todo="addTodo" />

    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>

    <TodoList
      :todos="filteredTodos"
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
// computed : 인자를 받아 올 수 없음 ,
import { computed, ref } from 'vue';
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

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const toggleTodo = (index) => {
      todos.value[index].completed = !todos.value[index].completed;
    };

    const searchText = ref('');

    const filteredTodos = computed(() => {
      if (searchText.value) {
        return todos.value.filter((todo) => {
          return todo.subject.includes(searchText.value);
        });
      }
      return todos.value;
    });

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      filteredTodos,
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
