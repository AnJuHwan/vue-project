<template>
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
</template>

<script>
import { ref } from '@vue/reactivity';
export default {
  emits: ['add-todo'],
  setup(props, { emit }) {
    // context : 자식 -> 부모 데이터 옮길때 context.emit 사용
    const todo = ref('');
    const hasError = ref(false);

    const onSubmit = () => {
      if (todo.value == '') {
        hasError.value = true;
      } else {
        emit('add-todo', {
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });

        hasError.value = false;
        todo.value = '';
      }
    };

    return {
      todo,
      hasError,
      onSubmit,
    };
  },
};
</script>

<style></style>
