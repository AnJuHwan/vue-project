<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form @submit.prevent="onSubmit">
      <div class="d-flex">
        <div class="flex-grow-1 me-2">
          <input
            class="form-control "
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          />
        </div>
        <div class="ml-2">
          <button type="submit" class="btn btn-primary">
            Add
          </button>
        </div>
      </div>
      <div v-show="hasError" style="color:red">This field cannot be empty</div>
    </form>

    <div class="card mt-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능

export default {
  setup() {
    const todo = ref('');
    const todos = ref([
      { id: 1, subject: '휴대폰 사기' },
      { id: 2, subject: '장보기' },
    ]);

    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value == '') {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
        });
        todo.value = '';
        hasError.value = false;
      }
    };

    return {
      todo,
      todos,
      onSubmit,
      hasError,
    };
  },
};
</script>

<style>
.name {
  color: red;
}
</style>
