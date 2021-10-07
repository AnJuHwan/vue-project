<template>
  <div class="container">
    <h2>To-Do List</h2>
    <TodoSimpleForm />

    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>

    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />

          <label class="form-check-label" :class="{ todo: todo.completed }">
            <!--  -->
            {{ todo.subject }}
            <!--  -->
          </label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm" @click="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';

export default {
  components: { TodoSimpleForm },
  setup() {
    const todo = ref('');
    const todos = ref([]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'grey',
    };

    const onSubmit = () => {
      if (todo.value == '') {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';
      }
    };

    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
      todoStyle,
      deleteTodo,
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
