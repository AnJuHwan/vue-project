<template>
  <h1>To-Do Page</h1>
  <div v-if="loading">Loading ...</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>Subject</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>Status</label>
          <div>
            <button
              class="btn"
              type="button"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleTodoStatus"
            >
              {{ todo.completed ? 'Completed' : 'Incompleted' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <button type="submit" class="btn btn-primary mt-3 ">
      Save
    </button>
    <button class="btn btn-outline-dark mt-3 mx-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const loading = ref(true);
    const id = route.params.id;
    const getTodo = async () => {
      const res = await axios.get(`http://localhost:3000/todos/${id}`);

      todo.value = res.data;
      loading.value = false;
    };

    getTodo();

    const toggleTodoStatus = () => {
      // e.preventDefault();
      todo.value.completed = !todo.value.completed;
    };

    const moveToTodoListPage = () => {
      router.push({
        name: 'Todos',
      });
    };

    const onSave = async () => {
      const res = await axios.put(`http://localhost:3000/todos/${id}`, {
        subject: todo.value.subject,
        completed: todo.value.completed,
      });
      console.log(res);
    };
    console.log(route.params.id);

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
    };
  },
};
</script>

<style></style>
