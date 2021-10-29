<template>
  <h1>Create Todo</h1>
  <TodoForm />
</template>

<script>
import TodoForm from '@/components/TodoForm.vue';
export default {
  components: {
    TodoForm,
  },
};

// <TodoSimpleForm @add-todo="addTodo" />
// <div style="color:red">{{ error }}</div>
</script>

<style></style>
