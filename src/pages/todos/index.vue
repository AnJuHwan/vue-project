<template>
  <div>
    <h2>To-Do List</h2>
    <input
      class="form-control "
      type="text"
      v-model="searchText"
      placeholder="Search"
      @keyup.enter="searchTodo"
    />

    <hr />
    <TodoSimpleForm @add-todo="addTodo" />
    <div style="color:red">{{ error }}</div>

    <div v-if="!todos.length">
      There is nothing to display
    </div>

    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !== 1" class="page-item">
          <a
            style="cursor:pointer"
            class="page-link"
            @click="getTodos(currentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          v-for="page in numberOfPages"
          :key="page"
          class="page-item"
          :class="currentPage === page ? 'active' : ''"
        >
          <a style="cursor:pointer" class="page-link" @click="getTodos(page)">{{
            page
          }}</a>
        </li>

        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a
            style="cursor:pointer"
            class="page-link"
            @click="getTodos(currentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
  <Toast :message="toastMessage" v-if="showToast" :type="toastAleartType" />
</template>

<script>
// ref : 사용시 name.value.id 으로 접근하여 object , array 접근 가능 ,
// reactive : 직접적으로 name.id 으로 접근가능
// computed : 인자를 받아 올 수 없음 ,
import { computed, ref, watch } from 'vue';
import TodoSimpleForm from '@/components/TodoSimpleForm.vue';
import TodoList from '@/components/TodoList.vue';
import axios from 'axios';
import Toast from '../../components/Toast.vue';
import { useToast } from '@/composables/toast.js';

export default {
  components: { TodoSimpleForm, TodoList, Toast },
  setup() {
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    let limit = 5;
    const currentPage = ref(1);
    const searchText = ref('');

    const {
      toastMessage,
      toastAleartType,
      showToast,
      triggerToast,
    } = useToast();

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value / limit);
    });

    const todoStyle = {
      textDecoration: 'line-through',
      color: 'grey',
    };

    const getTodos = async (page = currentPage.value) => {
      currentPage.value = page;
      try {
        const res = await axios.get(
          `http://localhost:3000/todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`,
        );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      } catch (error) {
        console.log(error);
        error.value = 'Something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    getTodos();

    const addTodo = async (todo) => {
      // 데이터베이스 투두를 저장
      error.value = '';

      try {
        await axios.post('http://localhost:3000/todos', {
          subject: todo.subject,
          completed: todo.completed,
        });
        getTodos(1);
      } catch (error) {
        //   console.log(err);
        error.value = 'Something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.delete(`http://localhost:3000/todos/${id}`);
        getTodos(1);
      } catch (error) {
        console.log(error);
        error.value = 'Something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    const toggleTodo = async (index, checked) => {
      error.value = '';
      const id = todos.value[index].id;
      try {
        await axios.patch(`http://localhost:3000/todos/${id}`, {
          completed: checked,
        });
        todos.value[index].completed = checked;
      } catch (error) {
        console.log(error);
        error.value = 'Something went wrong.';
        triggerToast('Something went wrong', 'danger');
      }
    };

    let timeout;

    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1);
    };

    watch(searchText, () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        getTodos(1);
      }, 2000);
    });

    return {
      todos,
      addTodo,
      todoStyle,
      deleteTodo,
      toggleTodo,
      searchText,
      error,
      getTodos,
      numberOfPages,
      currentPage,
      searchTodo,
      toastMessage,
      toastAleartType,
      showToast,
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
