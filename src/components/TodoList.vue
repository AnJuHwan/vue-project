<template>
  <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
    <div
      class="card-body p-2 d-flex align-items-center"
      @click="mpoveToPage(todo.id)"
    >
      <div class="flex-grow-1" style="cursor:pointer">
        <input
          class="mx-2"
          type="checkbox"
          :checked="todo.completed"
          @change.stop="toggleTodo(index, $event)"
          @click.stop
        />
        <!-- @click.stop="toggleTodo(index)"  대체 가능 -->

        <span :class="{ todo: todo.completed }">
          <!--  -->
          {{ todo.subject }}
          <!--  -->
        </span>
      </div>
      <div>
        <button class="btn btn-danger btn-sm" @click.stop="deleteTodo(index)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router';
export default {
  props: {
    todos: {
      type: Array,
      required: true,
    },
  },

  emits: ['toggle-todo', 'delete-todo'],
  setup(props, { emit }) {
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };

    const mpoveToPage = (todoId) => {
      console.log(todoId);
      // router.push(`/todos/${todoId}`);
      router.push({
        name: 'Todo',
        params: { id: todoId },
      });
    };

    return {
      toggleTodo,
      deleteTodo,
      mpoveToPage,
    };
  },
};
</script>

<style></style>
