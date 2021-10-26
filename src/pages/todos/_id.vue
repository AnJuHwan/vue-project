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

    <button
      :disabled="!todoUpdated"
      type="submit"
      class="btn btn-primary mt-3 "
    >
      Save
    </button>
    <button class="btn btn-outline-dark mt-3 mx-2" @click="moveToTodoListPage">
      Cancel
    </button>
  </form>
  <Toast :message="toastMessage" v-if="showToast" :type="toastAleartType" />
</template>

<script>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from '@vue/reactivity';
import _ from 'lodash';
import Toast from '../../components/Toast.vue';
export default {
  components: {
    Toast,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const todo = ref(null);
    const originalTodo = ref(null);
    const loading = ref(true);
    const id = route.params.id;
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAleartType = ref('');

    const getTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/todos/${id}`);

        todo.value = { ...res.data };
        originalTodo.value = { ...res.data };
        loading.value = false;
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    const todoUpdated = computed(() => {
      return !_.isEqual(todo.value, originalTodo.value);
    });

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

    const triggerToast = (message, type = 'success') => {
      toastMessage.value = message;
      toastAleartType.value = type;
      showToast.value = true;
      setTimeout(() => {
        toastMessage.value = '';
        toastAleartType.value = '';
        showToast.value = false;
      }, 3000);
    };

    const onSave = async () => {
      try {
        const res = await axios.put(`http://localhost:3000/todos/${id}`, {
          subject: todo.value.subject,
          completed: todo.value.completed,
        });
        console.log(res);
        originalTodo.value = { ...res.data };
        triggerToast('Successfully saved!');
      } catch (error) {
        console.log(error);
        triggerToast('Something went wrong', 'danger');
      }
    };

    return {
      todo,
      loading,
      toggleTodoStatus,
      moveToTodoListPage,
      onSave,
      todoUpdated,
      showToast,
      toastMessage,
      toastAleartType,
    };
  },
};
</script>

<style></style>
